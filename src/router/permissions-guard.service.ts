import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PermissionsService } from '../permissions.service';
import { PermissionsRouterData } from '../model/permissions-router-data.model';

@Injectable()
export class PermissionsGuard implements CanActivate {

    constructor(private roleService: PermissionsService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        const permissions = route.data['permissions'] as PermissionsRouterData;
        if (permissions.only) {
            if (this.roleService)
                if (this.roleService.hasPermission(permissions.only)) {
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
            if (!this.roleService.hasPermission(permissions.except)) {
                if  (permissions.redirectTo) {
                    this.router.navigate([permissions.redirectTo]);
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
        return true;
    }
}