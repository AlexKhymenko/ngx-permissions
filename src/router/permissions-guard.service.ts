import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PermissionsService } from '../permissions.service';
import { PermissionsRouterData } from '../model/permissions-router-data.model';
import { RolesService } from "../roles.service";
import { isFunction } from '../utils/utils';

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

        if (!!permissions.except) {
            return Promise.all([this.permissionsService.hasPermission(<string | string[]>permissions.except), this.rolesService.hasOnlyRoles(<string | string[]>permissions.except)])
                .then(([permissionsPr, roles]) => {
                    if (permissionsPr || roles)  {
                        if  (permissions.redirectTo) {
                            this.router.navigate([permissions.redirectTo]);
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
                        this.router.navigate([permissions.redirectTo]);
                        return false;
                    } else {
                        return false;
                    }
                }
            })
    }
}