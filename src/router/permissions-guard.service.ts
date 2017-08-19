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
        if (permissions.only) {
            if (this.permissionsService.hasPermission(permissions.only) || this.rolesService.hasOnlyRoles(permissions.only))  {
                if (permissions.redirectTo) {
                    this.router.navigate([permissions.redirectTo]);
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
        if (permissions.except) {
            if (this.permissionsService.hasPermission(permissions.except) || this.rolesService.hasOnlyRoles(permissions.except)) {
                return false;
            } else {
                if  (permissions.redirectTo) {
                    this.router.navigate([permissions.redirectTo]);
                } else {
                    return true;
                }
            }
        }
        return true;
    }
}