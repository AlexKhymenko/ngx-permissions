import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, NavigationExtras, Route, Router,
    RouterStateSnapshot
} from '@angular/router';
import { NgxPermissionsService } from '../service/permissions.service';
import { NgxPermissionsRouterData } from '../model/permissions-router-data.model';
import { NgxRolesService } from "../service/roles.service";
import { isFunction, isPlainObject, isString } from '../utils/utils';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/observable/forkJoin'
import  'rxjs/add/observable/from'
import  'rxjs/add/operator/mergeMap'
import  'rxjs/add/operator/do'
import  'rxjs/add/operator/map'

type NgxRedirectToNavigationParameters = {
    navigationCommands: any[] | Function,
    navigationExtras?: NavigationExtras | Function
}
@Injectable()
export class NgxPermissionsGuard implements CanActivate, CanLoad, CanActivateChild {


    constructor(private permissionsService: NgxPermissionsService, private  rolesService: NgxRolesService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        return this.hasPermissions(route, state);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.hasPermissions(childRoute, state)
    }

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
        return this.hasPermissions(route)
    }

    private hasPermissions(route: ActivatedRouteSnapshot | Route, state?: RouterStateSnapshot) {
        const purePermissions = !!route && route.data ? route.data['permissions'] as NgxPermissionsRouterData : {};
        let permissions: NgxPermissionsRouterData = this.transformPermission(purePermissions, route, state);

        if (this.isParameterAvailable(permissions.except)) {
            return this.passingExceptPermissionsValidation(permissions, route, state);
        }

        if (this.isParameterAvailable(permissions.only)) {
            return this.passingOnlyPermissionsValidation(permissions, route, state);
        }

        return true;
    }

    private transformPermission(purePermissions: NgxPermissionsRouterData, route: any, state: any): any {
        let permissions = {
            ...purePermissions
        };

        if (isFunction(permissions.except)) {
            permissions.except = (permissions.except as Function)(route, state);
        }

        if (isFunction(permissions.only)) {
            permissions.only = (permissions.only as Function)(route, state);
        }

        if (isString(permissions.except)) {
            permissions.except = [permissions.except]
        }
        if (isString(permissions.only)) {
            permissions.only = [permissions.only]
        }
        return permissions;
    }

    private isParameterAvailable(permission: any) {
        return !!(permission) && permission.length > 0
    }

    private passingExceptPermissionsValidation(permissions: NgxPermissionsRouterData, route: any, state: any) {
        if (!!permissions.redirectTo && ((isFunction(permissions.redirectTo)) || (isPlainObject(permissions.redirectTo) &&  !this.isRedirectionWithParameters(permissions.redirectTo)))) {
            let failedPermission = '';
            return Observable.from(permissions.except as any[])
                .mergeMap((data) => {
                    return Observable.forkJoin([this.permissionsService.hasPermission(<string | string[]>data), this.rolesService.hasOnlyRoles(<string | string[]>data)])
                        .do((hasPerm) => {
                            const dontHavePermissions = hasPerm.every((data) => {
                                return data === false;
                            });
                            if (!dontHavePermissions) {
                                failedPermission = data;
                            }
                        })
                }).first((data: any[]) => {
                    return data.some((data) => {
                        return data === true;
                    })
                }, () => true, false).mergeMap((isAllFalse) => {
                    if (!!failedPermission) {
                        this.handleRedirectOfFailedPermission(permissions, failedPermission, route, state);
                        return Observable.of(false);
                    }
                    if (!isAllFalse && permissions.only) {
                        return this.onlyRedirectCheck(permissions, route, state);
                    }
                    return Observable.of(!isAllFalse);
                }).toPromise()

        }

        return Promise.all([this.permissionsService.hasPermission(<string | string[]>permissions.except), this.rolesService.hasOnlyRoles(<string | string[]>permissions.except)])
            .then(([permissionsPr, roles]) => {
                if (permissionsPr || roles)  {
                    if  (permissions.redirectTo) {
                        this.redirectToAnotherRoute(permissions.redirectTo, route, state);
                        return false;
                    } else {
                        return false;
                    }
                } else {
                    if (permissions.only) {
                        return this.checkOnlyPermissions(permissions, route, state);
                    }
                    return true;
                }
            })
    }

    private redirectToAnotherRoute(redirectTo: string | any[] | NgxRedirectToNavigationParameters | Function, route : ActivatedRouteSnapshot | Route, state?: RouterStateSnapshot, failedPermissionName?: string) {
        if(isFunction(redirectTo)) {
            redirectTo = (redirectTo as Function)(failedPermissionName, route, state);
        }

        if(this.isRedirectionWithParameters(redirectTo)) {
            if (this.hasNavigationExtrasAsFunction(redirectTo)) {
                (<NgxRedirectToNavigationParameters>redirectTo).navigationExtras = ((<NgxRedirectToNavigationParameters>redirectTo).navigationExtras as Function)(route, state);
            }

            if (this.hasNavigationCommandsAsFunction(redirectTo)) {
                (<NgxRedirectToNavigationParameters>redirectTo).navigationCommands = ((<NgxRedirectToNavigationParameters>redirectTo).navigationCommands as Function)(route, state);
            }

            this.router.navigate(((<NgxRedirectToNavigationParameters>redirectTo).navigationCommands as any[]), ((<NgxRedirectToNavigationParameters> redirectTo).navigationExtras as NavigationExtras));
            return;
        }

        if (Array.isArray(redirectTo)) {
            this.router.navigate(redirectTo);
        } else {
            this.router.navigate([redirectTo]);
        }
    }

    private isRedirectionWithParameters(object: any | NgxRedirectToNavigationParameters): boolean {
        return isPlainObject(object) && (!!object.navigationCommands || !!object.navigationExtras);
    }


    private hasNavigationExtrasAsFunction(redirectTo: any): boolean {
        return !!(<NgxRedirectToNavigationParameters> redirectTo).navigationExtras && isFunction((<NgxRedirectToNavigationParameters> redirectTo).navigationExtras)
    }

    private hasNavigationCommandsAsFunction(redirectTo: any): boolean {
        return !!(<NgxRedirectToNavigationParameters> redirectTo).navigationCommands && isFunction((<NgxRedirectToNavigationParameters> redirectTo).navigationCommands);
    }

    private onlyRedirectCheck(permissions: any, route: ActivatedRouteSnapshot | Route, state?: RouterStateSnapshot): Promise<boolean> {
        let failedPermission = '';
        return Observable.from(permissions.only)
            .mergeMap((data: string) => {
                return Observable.forkJoin([this.permissionsService.hasPermission(<string | string[]>data), this.rolesService.hasOnlyRoles(<string | string[]>data)])
            .do((hasPerm) => {
                const failed = hasPerm.every((data) => {
                    return data === false;
                });
                if (failed) {
                    failedPermission = data;
                }
            })})
            .first((data: any[]) => {
                return data.every((data) => {
                    return data === false;
                })
            }, () => true, false)
            .mergeMap((isAllFalse: boolean): Observable<boolean> => {
                if (!!failedPermission) {
                    this.handleRedirectOfFailedPermission(permissions, failedPermission, route, state);
                }
                return Observable.of(!isAllFalse);
            }).toPromise()
    }

    private handleRedirectOfFailedPermission(permissions: any, failedPermission: string, route: ActivatedRouteSnapshot | Route, state?: RouterStateSnapshot) {
        if (this.isFailedPermissionPropertyOfRedirectTo(permissions, failedPermission)) {
            this.redirectToAnotherRoute((<any>permissions.redirectTo)[failedPermission], route, state, failedPermission);
        } else {
            if (isFunction(permissions.redirectTo)) {
                this.redirectToAnotherRoute((<any>permissions.redirectTo), route, state, failedPermission);
            } else {
                this.redirectToAnotherRoute((<any>permissions.redirectTo)['default'], route, state, failedPermission);
            }
        }
    }

    private isFailedPermissionPropertyOfRedirectTo(permissions: any, failedPermission: string) {
       return !!permissions.redirectTo && permissions.redirectTo[<any>failedPermission]
    }

    private checkOnlyPermissions(purePermissions: any, route: ActivatedRouteSnapshot | Route, state?: RouterStateSnapshot) {
        let permissions: NgxPermissionsRouterData = {
            ...purePermissions
        };
        return Promise.all([this.permissionsService.hasPermission(<string | string[]>permissions.only), this.rolesService.hasOnlyRoles(<string | string[]>permissions.only)])
            .then(([permissionsPr, roles]) => {
                if (permissionsPr || roles)  {
                    return true;
                } else {
                    if (permissions.redirectTo) {
                        this.redirectToAnotherRoute(permissions.redirectTo, route, state);
                        return false;
                    } else {
                        return false;
                    }
                }
            })
    }

    private passingOnlyPermissionsValidation(permissions: NgxPermissionsRouterData, route: ActivatedRouteSnapshot | Route, state?: RouterStateSnapshot) {
        if ((isFunction(permissions.redirectTo) || isPlainObject(permissions.redirectTo) &&  !this.isRedirectionWithParameters(permissions.redirectTo))) {
            return this.onlyRedirectCheck(permissions, route, state)
        }
        return this.checkOnlyPermissions(permissions, route, state);
    }

    private hasRedirectToAsFunctionOrObject(redirectTo: any) {
        return isFunction(redirectTo) || isPlainObject(redirectTo) &&  !this.isRedirectionWithParameters(redirectTo)
    }
}