import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    NavigationExtras,
    Route,
    Router,
    RouterStateSnapshot
} from '@angular/router';

import { forkJoin, from, Observable, of } from 'rxjs';
import { first, mergeMap, tap } from 'rxjs/operators';

import {
    DEFAULT_REDIRECT_KEY,
    ExceptFn,
    NavigationCommandsFn,
    NavigationExtrasFn,
    NgxPermissionsRouterData,
    NgxRedirectToNavigationParameters,
    OnlyFn,
    RedirectTo,
    RedirectToFn
} from '../model/permissions-router-data.model';
import { NgxPermissionsService } from '../service/permissions.service';
import { NgxRolesService } from '../service/roles.service';
import { isFunction, isPlainObject, transformStringToArray } from '../utils/utils';

export interface NgxPermissionsData {
    only?: string | string[];
    except?: string | string[];
    redirectTo?: RedirectTo | RedirectToFn;
}

@Injectable()
export class NgxPermissionsGuard implements CanActivate, CanLoad, CanActivateChild {

    constructor(private permissionsService: NgxPermissionsService, private rolesService: NgxRolesService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        return this.hasPermissions(route, state);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.hasPermissions(childRoute, state);
    }

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
        return this.hasPermissions(route);
    }

    private hasPermissions(route: ActivatedRouteSnapshot | Route, state?: RouterStateSnapshot) {
        const routeDataPermissions = !!route && route.data ? (route.data['permissions'] as NgxPermissionsRouterData) : {};
        const permissions = this.transformPermission(routeDataPermissions, route, state);

        if (this.isParameterAvailable(permissions.except)) {
            return this.passingExceptPermissionsValidation(permissions, route, state);
        }

        if (this.isParameterAvailable(permissions.only)) {
            return this.passingOnlyPermissionsValidation(permissions, route, state);
        }

        return true;
    }

    private transformPermission(
        permissions: NgxPermissionsRouterData,
        route: ActivatedRouteSnapshot | Route,
        state?: RouterStateSnapshot
    ): NgxPermissionsData {
        const only = isFunction<OnlyFn>(permissions.only)
            ? permissions.only(route, state)
            : transformStringToArray(permissions.only);
        const except = isFunction<ExceptFn>(permissions.except)
            ? permissions.except(route, state)
            : transformStringToArray(permissions.except);
        const redirectTo = permissions.redirectTo;


        return {
            only,
            except,
            redirectTo
        };
    }

    private isParameterAvailable(permission: string | string[]) {
        return !!permission && permission.length > 0;
    }

    private passingExceptPermissionsValidation(
        permissions: NgxPermissionsData,
        route: ActivatedRouteSnapshot | Route,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        if (
            !!permissions.redirectTo
            && (
                (isFunction<RedirectToFn>(permissions.redirectTo))
                || (isPlainObject(permissions.redirectTo) && !this.isRedirectionWithParameters(permissions.redirectTo))
            )
        ) {
            let failedPermission = '';

            return from(permissions.except)
                .pipe(
                    mergeMap(permissionsExcept => {
                        return forkJoin([
                            this.permissionsService.hasPermission(permissionsExcept),
                            this.rolesService.hasOnlyRoles(permissionsExcept)
                        ]).pipe(
                            tap(hasPermissions => {
                                const dontHavePermissions = hasPermissions.every(hasPermission => hasPermission === false);

                                if (!dontHavePermissions) {
                                    failedPermission = permissionsExcept;
                                }
                            })
                        );
                    }),
                    first(hasPermissions => hasPermissions.some(hasPermission => hasPermission === true), false),
                    mergeMap(isAllFalse => {
                        if (!!failedPermission) {
                            this.handleRedirectOfFailedPermission(permissions, failedPermission, route, state);

                            return of(false);
                        }

                        if (!isAllFalse && permissions.only) {
                            return this.onlyRedirectCheck(permissions, route, state);
                        }

                        return of(!isAllFalse);
                    })
                )
                .toPromise();
        }

        return Promise.all([
            this.permissionsService.hasPermission(permissions.except),
            this.rolesService.hasOnlyRoles(permissions.except)
        ]).then(([hasPermission, hasRoles]) => {
            if (hasPermission || hasRoles) {
                if (permissions.redirectTo) {
                    this.redirectToAnotherRoute(
                        permissions.redirectTo,
                        route,
                        state
                    );
                }

                return false;
            }

            if (permissions.only) {
                return this.checkOnlyPermissions(permissions, route, state);
            }
            return true;
        });
    }

    private redirectToAnotherRoute(
        permissionRedirectTo: RedirectTo | RedirectToFn,
        route: ActivatedRouteSnapshot | Route,
        state?: RouterStateSnapshot,
        failedPermissionName?: string
    ): void {

        const redirectTo = isFunction<RedirectToFn>(permissionRedirectTo)
            ? permissionRedirectTo(failedPermissionName, route, state)
            : permissionRedirectTo;

        if (this.isRedirectionWithParameters(redirectTo)) {
            redirectTo.navigationCommands = this.transformNavigationCommands(redirectTo.navigationCommands, route, state);
            redirectTo.navigationExtras = this.transformNavigationExtras(redirectTo.navigationExtras, route, state);
            this.router.navigate(redirectTo.navigationCommands, redirectTo.navigationExtras);
            return;
        }

        if (Array.isArray(redirectTo)) {
            this.router.navigate(redirectTo);
        } else {
            this.router.navigate([redirectTo]);
        }
    }

    private isRedirectionWithParameters(object: any | NgxRedirectToNavigationParameters): object is NgxRedirectToNavigationParameters {
        return (isPlainObject(object) && (!!object.navigationCommands || !!object.navigationExtras));
    }

    private transformNavigationCommands(
        navigationCommands: any[] | NavigationCommandsFn,
        route: ActivatedRouteSnapshot | Route,
        state?: RouterStateSnapshot
    ): any[] {
        return isFunction<NavigationCommandsFn>(navigationCommands)
            ? navigationCommands(route, state)
            : navigationCommands;
    }

    private transformNavigationExtras(
        navigationExtras: NavigationExtras | NavigationExtrasFn,
        route: ActivatedRouteSnapshot | Route,
        state?: RouterStateSnapshot
    ): NavigationExtras {
        return isFunction<NavigationExtrasFn>(navigationExtras)
            ? navigationExtras(route, state)
            : navigationExtras;
    }

    private onlyRedirectCheck(
        permissions: NgxPermissionsData,
        route: ActivatedRouteSnapshot | Route,
        state?: RouterStateSnapshot
    ): Promise<boolean> {
        let failedPermission = '';

        return from(permissions.only)
            .pipe(
                mergeMap(permissionsOnly => {
                    return forkJoin([
                        this.permissionsService.hasPermission(permissionsOnly),
                        this.rolesService.hasOnlyRoles(permissionsOnly)
                    ]).pipe(
                        tap(hasPermissions => {
                            const failed = hasPermissions.every(hasPermission => hasPermission === false);

                            if (failed) {
                                failedPermission = permissionsOnly;
                            }
                        })
                    );
                }),
                first(hasPermissions => {
                        if (isFunction<RedirectToFn>(permissions.redirectTo)) {
                            return hasPermissions.some(hasPermission => hasPermission === true);
                        }

                        return hasPermissions.every(hasPermission => hasPermission === false);
                    },
                    false),
                mergeMap(
                    (pass: boolean): Observable<boolean> => {
                        if (isFunction<RedirectToFn>(permissions.redirectTo)) {
                            if (pass) {
                                return of(true);
                            } else {
                                this.handleRedirectOfFailedPermission(permissions, failedPermission, route, state);
                                return of(false);
                            }
                        } else {
                            if (!!failedPermission) {
                                this.handleRedirectOfFailedPermission(permissions, failedPermission, route, state);
                            }
                            return of(!pass);
                        }
                    }
                )
            )
            .toPromise();
    }

    private handleRedirectOfFailedPermission(
        permissions: NgxPermissionsData,
        failedPermission: string,
        route: ActivatedRouteSnapshot | Route,
        state?: RouterStateSnapshot
    ) {
        if (this.isFailedPermissionPropertyOfRedirectTo(permissions, failedPermission)) {
            this.redirectToAnotherRoute(permissions.redirectTo[failedPermission], route, state, failedPermission);
        } else {
            if (isFunction<RedirectToFn>(permissions.redirectTo)) {
                this.redirectToAnotherRoute(permissions.redirectTo, route, state, failedPermission);
            } else {
                this.redirectToAnotherRoute(permissions.redirectTo[DEFAULT_REDIRECT_KEY], route, state, failedPermission);
            }
        }
    }

    private isFailedPermissionPropertyOfRedirectTo(permissions: NgxPermissionsData, failedPermission: string): boolean {
        return (!!permissions.redirectTo && permissions.redirectTo[failedPermission]);
    }

    private checkOnlyPermissions(
        purePermissions: NgxPermissionsData,
        route: ActivatedRouteSnapshot | Route,
        state?: RouterStateSnapshot
    ): Promise<boolean> {
        const permissions: NgxPermissionsData = {
            ...purePermissions
        };

        return Promise.all([
            this.permissionsService.hasPermission(permissions.only),
            this.rolesService.hasOnlyRoles(permissions.only)
        ]).then(([hasPermission, hasRole]) => {
            if (hasPermission || hasRole) {
                return true;
            }

            if (permissions.redirectTo) {
                this.redirectToAnotherRoute(permissions.redirectTo, route, state);
            }

            return false;
        });
    }

    private passingOnlyPermissionsValidation(
        permissions: NgxPermissionsData,
        route: ActivatedRouteSnapshot | Route,
        state?: RouterStateSnapshot
    ): Promise<boolean> {
        if (
            (isFunction<RedirectToFn>(permissions.redirectTo)
                || isPlainObject(permissions.redirectTo) && !this.isRedirectionWithParameters(permissions.redirectTo))
        ) {
            return this.onlyRedirectCheck(permissions, route, state);
        }
        return this.checkOnlyPermissions(permissions, route, state);
    }
}
