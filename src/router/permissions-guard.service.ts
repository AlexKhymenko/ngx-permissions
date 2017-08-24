import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationExtras, Router, RouterStateSnapshot } from '@angular/router';
import { PermissionsService } from '../permissions.service';
import { PermissionsRouterData } from '../model/permissions-router-data.model';
import { RolesService } from "../roles.service";
import { isFunction, isPlainObject, isString } from '../utils/utils';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/observable/forkJoin'
import  'rxjs/add/observable/from'
import  'rxjs/add/operator/mergeMap'
import  'rxjs/add/operator/do'
import  'rxjs/add/operator/map'

type RedirectToNavigationParameters = {
    navigationCommands: any[] | Function,
    navigationExtras?: NavigationExtras | Function
}
@Injectable()
export class PermissionsGuard implements CanActivate {

    constructor(private permissionsService: PermissionsService, private  rolesService: RolesService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        const purePermissions = route.data['permissions'] as PermissionsRouterData;
        let permissions: PermissionsRouterData = {
            ...purePermissions
        };
        if (isFunction(permissions.except)) {
            permissions.except = (purePermissions.except as Function)(route, state);
        }

        if (isFunction(permissions.only)) {
            permissions.only = (purePermissions.only as Function)(route, state);
        }

        if (isString(permissions.except)) {
            permissions.except = [<string>permissions.except]
        }
        if (isString(permissions.only)) {
            permissions.only = [<string>permissions.only]
        }

        if (!!permissions.except) {
            if (!!permissions.redirectTo && isPlainObject(permissions.redirectTo) &&  !this.isRedirectionWithParameters(permissions.redirectTo)) {
                if (Array.isArray(permissions.except)) {
                    let failedPermission = '';
                    return Observable.from(permissions.except)
                        .mergeMap((data) => {
                            return Observable.forkJoin([this.permissionsService.hasPermission(<string | string[]>data), this.rolesService.hasOnlyRoles(<string | string[]>data)]).do((hasPerm) => {
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
                                if (!!permissions.redirectTo && permissions.redirectTo[<any>failedPermission]) {
                                    this.redirectToAnotherRoute((<any>permissions.redirectTo)[failedPermission], route, state);
                                } else {
                                    this.redirectToAnotherRoute((<any>permissions.redirectTo)['default'], route, state);
                                }
                            }
                            if (!isAllFalse && permissions.only) {
                                return this.onlyRedirectCheck(permissions, route, state);
                            }
                            return Observable.of(!isAllFalse);
                    }).toPromise()
                }
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

        if (permissions.only) {

            if (!!permissions.only && isPlainObject(permissions.redirectTo) &&  !this.isRedirectionWithParameters(permissions.redirectTo)) {
                return this.onlyRedirectCheck(permissions, route, state)
            }
            return this.checkOnlyPermissions(permissions, route, state);
        }

        return true;
    }

    private checkOnlyPermissions(purePermissions: any, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let permissions: PermissionsRouterData = {
            ...purePermissions
        };
        if (isFunction(purePermissions.only)) {
            permissions.only =  (permissions.only as Function)(route, state);
        }
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



    private redirectToAnotherRoute(redirectTo: string | any[] | RedirectToNavigationParameters | Function, route : ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(isFunction(redirectTo)) {
            redirectTo = (redirectTo as Function)(route, state);
        }

        if(this.isRedirectionWithParameters(redirectTo)) {
            if (this.hasNavigationExtrasAsFunction(redirectTo)) {
                (<RedirectToNavigationParameters>redirectTo).navigationExtras = ((<RedirectToNavigationParameters>redirectTo).navigationExtras as Function)(route, state);
            }

            if (this.hasNavigationCommandsAsFunction(redirectTo)) {
                (<RedirectToNavigationParameters>redirectTo).navigationCommands = ((<RedirectToNavigationParameters>redirectTo).navigationCommands as Function)(route, state);
            }

            this.router.navigate(((<RedirectToNavigationParameters>redirectTo).navigationCommands as any[]), ((<RedirectToNavigationParameters> redirectTo).navigationExtras as NavigationExtras));
            return;
        }

        if (Array.isArray(redirectTo)) {
            this.router.navigate(redirectTo);
        } else {
            this.router.navigate([redirectTo]);
        }
    }

    private isRedirectionWithParameters(object: any | RedirectToNavigationParameters): boolean {
        return isPlainObject(object) && (!!object.navigationCommands || !!object.navigationExtras);
    }


    private hasNavigationExtrasAsFunction(redirectTo: any): boolean {
        return !!(<RedirectToNavigationParameters> redirectTo).navigationExtras && isFunction((<RedirectToNavigationParameters> redirectTo).navigationExtras)
    }

    private hasNavigationCommandsAsFunction(redirectTo: any): boolean {
        return !!(<RedirectToNavigationParameters> redirectTo).navigationCommands && isFunction((<RedirectToNavigationParameters> redirectTo).navigationCommands);
    }

    private onlyRedirectCheck(permissions: any, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        let failedPermission = '';
        return Observable.from(permissions.only)
            .mergeMap((data: string) => {
                return Observable.forkJoin([this.permissionsService.hasPermission(<string | string[]>data), this.rolesService.hasOnlyRoles(<string | string[]>data)]).do((hasPerm) => {
                    const failed = hasPerm.every((data) => {
                        return data === false;
                    });
                    if (failed) {
                        failedPermission = data;
                    }
                })
            }).first((data: any[]) => {
                return data.every((data) => {
                    return data === false;
                })
            }, () => true, false).mergeMap((isAllFalse: boolean): Observable<boolean> => {
                if (!!failedPermission) {
                    if (!!permissions.redirectTo && permissions.redirectTo[<any>failedPermission]) {
                        this.redirectToAnotherRoute((<any>permissions.redirectTo)[failedPermission], route, state);
                    } else {
                        this.redirectToAnotherRoute((<any>permissions.redirectTo)['default'], route, state);
                    }
                }
                return Observable.of(!isAllFalse);
            }).toPromise()
    }
}