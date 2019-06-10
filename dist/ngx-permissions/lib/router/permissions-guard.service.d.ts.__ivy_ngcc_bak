import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxPermissionsService } from '../service/permissions.service';
import { NgxRolesService } from '../service/roles.service';
export declare class NgxPermissionsGuard implements CanActivate, CanLoad, CanActivateChild {
    private permissionsService;
    private rolesService;
    private router;
    constructor(permissionsService: NgxPermissionsService, rolesService: NgxRolesService, router: Router);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean;
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;
    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean>;
    private hasPermissions;
    private transformPermission;
    private isParameterAvailable;
    private passingExceptPermissionsValidation;
    private redirectToAnotherRoute;
    private isRedirectionWithParameters;
    private hasNavigationExtrasAsFunction;
    private hasNavigationCommandsAsFunction;
    private onlyRedirectCheck;
    private handleRedirectOfFailedPermission;
    private isFailedPermissionPropertyOfRedirectTo;
    private checkOnlyPermissions;
    private passingOnlyPermissionsValidation;
}
