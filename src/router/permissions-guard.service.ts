import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PermissionsService } from '../permissions.service';
import { PermissionsRouterData } from '../model/permissions-router-data.model';
import { RolesService } from "../roles.service";

@Injectable()
export class PermissionsGuard implements CanActivate {

    constructor(private permissionsService: PermissionsService, private  rolesService: RolesService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        const permissions = route.data['permissions'] as PermissionsRouterData;

        if (permissions.except) {
            return Promise.all([this.permissionsService.hasPermission(permissions.except), this.rolesService.hasOnlyRoles(permissions.except)])
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
                            return this.checkOnlyPermissions(permissions);
                        }
                        return true;
                    }
                })
        }

        if (permissions.only) {
            return this.checkOnlyPermissions(permissions);
        }

        return true;
    }

    private checkOnlyPermissions(permissions: any) {
        return Promise.all([this.permissionsService.hasPermission(permissions.only), this.rolesService.hasOnlyRoles(permissions.only)])
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