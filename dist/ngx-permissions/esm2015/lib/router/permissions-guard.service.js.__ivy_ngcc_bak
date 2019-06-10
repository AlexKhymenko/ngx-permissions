/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, from, of } from 'rxjs';
import { first, mergeMap, tap } from 'rxjs/operators';
import { NgxPermissionsService } from '../service/permissions.service';
import { NgxRolesService } from '../service/roles.service';
import { isFunction, isPlainObject, transformStringToArray } from '../utils/utils';
/**
 * @record
 */
function NgxRedirectToNavigationParameters() { }
if (false) {
    /** @type {?} */
    NgxRedirectToNavigationParameters.prototype.navigationCommands;
    /** @type {?|undefined} */
    NgxRedirectToNavigationParameters.prototype.navigationExtras;
}
export class NgxPermissionsGuard {
    /**
     * @param {?} permissionsService
     * @param {?} rolesService
     * @param {?} router
     */
    constructor(permissionsService, rolesService, router) {
        this.permissionsService = permissionsService;
        this.rolesService = rolesService;
        this.router = router;
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    canActivate(route, state) {
        return this.hasPermissions(route, state);
    }
    /**
     * @param {?} childRoute
     * @param {?} state
     * @return {?}
     */
    canActivateChild(childRoute, state) {
        return this.hasPermissions(childRoute, state);
    }
    /**
     * @param {?} route
     * @return {?}
     */
    canLoad(route) {
        return this.hasPermissions(route);
    }
    /**
     * @private
     * @param {?} route
     * @param {?=} state
     * @return {?}
     */
    hasPermissions(route, state) {
        /** @type {?} */
        const purePermissions = !!route && route.data ? (/** @type {?} */ (route.data['permissions'])) : {};
        /** @type {?} */
        let permissions = this.transformPermission(purePermissions, route, state);
        if (this.isParameterAvailable(permissions.except)) {
            return this.passingExceptPermissionsValidation(permissions, route, state);
        }
        if (this.isParameterAvailable(permissions.only)) {
            return this.passingOnlyPermissionsValidation(permissions, route, state);
        }
        return true;
    }
    /**
     * @private
     * @param {?} purePermissions
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    transformPermission(purePermissions, route, state) {
        /** @type {?} */
        let permissions = Object.assign({}, purePermissions);
        if (isFunction(permissions.except)) {
            permissions.except = ((/** @type {?} */ (permissions.except)))(route, state);
        }
        if (isFunction(permissions.only)) {
            permissions.only = ((/** @type {?} */ (permissions.only)))(route, state);
        }
        permissions.except = transformStringToArray(permissions.except);
        permissions.only = transformStringToArray(permissions.only);
        return permissions;
    }
    /**
     * @private
     * @param {?} permission
     * @return {?}
     */
    isParameterAvailable(permission) {
        return !!(permission) && permission.length > 0;
    }
    /**
     * @private
     * @param {?} permissions
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    passingExceptPermissionsValidation(permissions, route, state) {
        if (!!permissions.redirectTo && ((isFunction(permissions.redirectTo)) || (isPlainObject(permissions.redirectTo) && !this.isRedirectionWithParameters(permissions.redirectTo)))) {
            /** @type {?} */
            let failedPermission = '';
            return from((/** @type {?} */ (permissions.except))).pipe(mergeMap((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                return forkJoin([
                    this.permissionsService.hasPermission((/** @type {?} */ (data))),
                    this.rolesService.hasOnlyRoles((/** @type {?} */ (data)))
                ]).pipe(tap((/**
                 * @param {?} hasPermissions
                 * @return {?}
                 */
                (hasPermissions) => {
                    /** @type {?} */
                    const dontHavePermissions = hasPermissions.every((/**
                     * @param {?} data
                     * @return {?}
                     */
                    (data) => data === false));
                    if (!dontHavePermissions) {
                        failedPermission = data;
                    }
                })));
            })), first((/**
             * @param {?} data
             * @return {?}
             */
            (data) => data.some((/**
             * @param {?} data
             * @return {?}
             */
            (data) => data === true))), false), mergeMap((/**
             * @param {?} isAllFalse
             * @return {?}
             */
            (isAllFalse) => {
                if (!!failedPermission) {
                    this.handleRedirectOfFailedPermission(permissions, failedPermission, route, state);
                    return of(false);
                }
                if (!isAllFalse && permissions.only) {
                    return this.onlyRedirectCheck(permissions, route, state);
                }
                return of(!isAllFalse);
            }))).toPromise();
        }
        return Promise.all([this.permissionsService.hasPermission((/** @type {?} */ (permissions.except))), this.rolesService.hasOnlyRoles((/** @type {?} */ (permissions.except)))])
            .then((/**
         * @param {?} __0
         * @return {?}
         */
        ([hasPermission, hasRoles]) => {
            if (hasPermission || hasRoles) {
                if (permissions.redirectTo) {
                    this.redirectToAnotherRoute(permissions.redirectTo, route, state);
                }
                return false;
            }
            if (permissions.only) {
                return this.checkOnlyPermissions(permissions, route, state);
            }
            return true;
        }));
    }
    /**
     * @private
     * @param {?} redirectTo
     * @param {?} route
     * @param {?=} state
     * @param {?=} failedPermissionName
     * @return {?}
     */
    redirectToAnotherRoute(redirectTo, route, state, failedPermissionName) {
        if (isFunction(redirectTo)) {
            redirectTo = ((/** @type {?} */ (redirectTo)))(failedPermissionName, route, state);
        }
        if (this.isRedirectionWithParameters(redirectTo)) {
            if (this.hasNavigationExtrasAsFunction(redirectTo)) {
                ((/** @type {?} */ (redirectTo))).navigationExtras = ((/** @type {?} */ (((/** @type {?} */ (redirectTo))).navigationExtras)))(route, state);
            }
            if (this.hasNavigationCommandsAsFunction(redirectTo)) {
                ((/** @type {?} */ (redirectTo))).navigationCommands = ((/** @type {?} */ (((/** @type {?} */ (redirectTo))).navigationCommands)))(route, state);
            }
            this.router.navigate(((/** @type {?} */ (((/** @type {?} */ (redirectTo))).navigationCommands))), ((/** @type {?} */ (((/** @type {?} */ (redirectTo))).navigationExtras))));
            return;
        }
        if (Array.isArray(redirectTo)) {
            this.router.navigate(redirectTo);
        }
        else {
            this.router.navigate([redirectTo]);
        }
    }
    /**
     * @private
     * @param {?} object
     * @return {?}
     */
    isRedirectionWithParameters(object) {
        return isPlainObject(object) && (!!object.navigationCommands || !!object.navigationExtras);
    }
    /**
     * @private
     * @param {?} redirectTo
     * @return {?}
     */
    hasNavigationExtrasAsFunction(redirectTo) {
        return !!((/** @type {?} */ (redirectTo))).navigationExtras &&
            isFunction(((/** @type {?} */ (redirectTo))).navigationExtras);
    }
    /**
     * @private
     * @param {?} redirectTo
     * @return {?}
     */
    hasNavigationCommandsAsFunction(redirectTo) {
        return !!((/** @type {?} */ (redirectTo))).navigationCommands &&
            isFunction(((/** @type {?} */ (redirectTo))).navigationCommands);
    }
    /**
     * @private
     * @param {?} permissions
     * @param {?} route
     * @param {?=} state
     * @return {?}
     */
    onlyRedirectCheck(permissions, route, state) {
        /** @type {?} */
        let failedPermission = '';
        return from(permissions.only).pipe(mergeMap((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            return forkJoin([
                this.permissionsService.hasPermission((/** @type {?} */ (data))),
                this.rolesService.hasOnlyRoles((/** @type {?} */ (data)))
            ]).pipe(tap((/**
             * @param {?} hasPermission
             * @return {?}
             */
            (hasPermission) => {
                /** @type {?} */
                const failed = hasPermission.every((/**
                 * @param {?} data
                 * @return {?}
                 */
                (data) => data === false));
                if (failed) {
                    failedPermission = data;
                }
            })));
        })), first((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (isFunction(permissions.redirectTo)) {
                return data.some((/**
                 * @param {?} data
                 * @return {?}
                 */
                (data) => data === true));
            }
            return data.every((/**
             * @param {?} data
             * @return {?}
             */
            (data) => data === false));
        }), false), mergeMap((/**
         * @param {?} pass
         * @return {?}
         */
        (pass) => {
            if (isFunction(permissions.redirectTo)) {
                if (pass) {
                    return of(true);
                }
                else {
                    this.handleRedirectOfFailedPermission(permissions, failedPermission, route, state);
                    return of(false);
                }
            }
            else {
                if (!!failedPermission) {
                    this.handleRedirectOfFailedPermission(permissions, failedPermission, route, state);
                }
                return of(!pass);
            }
        }))).toPromise();
    }
    /**
     * @private
     * @param {?} permissions
     * @param {?} failedPermission
     * @param {?} route
     * @param {?=} state
     * @return {?}
     */
    handleRedirectOfFailedPermission(permissions, failedPermission, route, state) {
        if (this.isFailedPermissionPropertyOfRedirectTo(permissions, failedPermission)) {
            this.redirectToAnotherRoute(((/** @type {?} */ (permissions.redirectTo)))[failedPermission], route, state, failedPermission);
        }
        else {
            if (isFunction(permissions.redirectTo)) {
                this.redirectToAnotherRoute(((/** @type {?} */ (permissions.redirectTo))), route, state, failedPermission);
            }
            else {
                this.redirectToAnotherRoute(((/** @type {?} */ (permissions.redirectTo)))['default'], route, state, failedPermission);
            }
        }
    }
    /**
     * @private
     * @param {?} permissions
     * @param {?} failedPermission
     * @return {?}
     */
    isFailedPermissionPropertyOfRedirectTo(permissions, failedPermission) {
        return !!permissions.redirectTo && permissions.redirectTo[(/** @type {?} */ (failedPermission))];
    }
    /**
     * @private
     * @param {?} purePermissions
     * @param {?} route
     * @param {?=} state
     * @return {?}
     */
    checkOnlyPermissions(purePermissions, route, state) {
        /** @type {?} */
        let permissions = Object.assign({}, purePermissions);
        return Promise.all([this.permissionsService.hasPermission((/** @type {?} */ (permissions.only))), this.rolesService.hasOnlyRoles((/** @type {?} */ (permissions.only)))])
            .then((/**
         * @param {?} __0
         * @return {?}
         */
        ([hasPermission, hasRole]) => {
            if (hasPermission || hasRole)
                return true;
            if (permissions.redirectTo) {
                this.redirectToAnotherRoute(permissions.redirectTo, route, state);
            }
            return false;
        }));
    }
    /**
     * @private
     * @param {?} permissions
     * @param {?} route
     * @param {?=} state
     * @return {?}
     */
    passingOnlyPermissionsValidation(permissions, route, state) {
        if ((isFunction(permissions.redirectTo) || isPlainObject(permissions.redirectTo) && !this.isRedirectionWithParameters(permissions.redirectTo))) {
            return this.onlyRedirectCheck(permissions, route, state);
        }
        return this.checkOnlyPermissions(permissions, route, state);
    }
}
NgxPermissionsGuard.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgxPermissionsGuard.ctorParameters = () => [
    { type: NgxPermissionsService },
    { type: NgxRolesService },
    { type: Router }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxPermissionsGuard.prototype.permissionsService;
    /**
     * @type {?}
     * @private
     */
    NgxPermissionsGuard.prototype.rolesService;
    /**
     * @type {?}
     * @private
     */
    NgxPermissionsGuard.prototype.router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbnMtZ3VhcmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1wZXJtaXNzaW9ucy8iLCJzb3VyY2VzIjpbImxpYi9yb3V0ZXIvcGVybWlzc2lvbnMtZ3VhcmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBT0gsTUFBTSxFQUVULE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3RELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRW5GLGdEQUdDOzs7SUFGRywrREFBcUM7O0lBQ3JDLDZEQUErQzs7QUFJbkQsTUFBTSxPQUFPLG1CQUFtQjs7Ozs7O0lBRTVCLFlBQW9CLGtCQUF5QyxFQUFXLFlBQTZCLEVBQVUsTUFBYztRQUF6Ryx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXVCO1FBQVcsaUJBQVksR0FBWixZQUFZLENBQWlCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUM3SCxDQUFDOzs7Ozs7SUFFRCxXQUFXLENBQUMsS0FBNkIsRUFBRSxLQUEwQjtRQUNqRSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7OztJQUVELGdCQUFnQixDQUFDLFVBQWtDLEVBQUUsS0FBMEI7UUFDM0UsT0FBTyxJQUFJLENBQUMs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SUFFTyxnQ0FBZ0MsQ0FBQyxXQUFxQyxFQUFFLEtBQXFDLEVBQUUsS0FBMkI7UUFDOUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksYUFBYSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRTtZQUM1SSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO1NBQzNEO1FBQ0QsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRSxDQUFDOzs7WUEzUEosVUFBVTs7OztZQVRGLHFCQUFxQjtZQUNyQixlQUFlO1lBVHBCLE1BQU07Ozs7Ozs7SUFvQk0saURBQWlEOzs7OztJQUFFLDJDQUFzQzs7Ozs7SUFBRSxxQ0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgICBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxyXG4gICAgQ2FuQWN0aXZhdGUsXHJcbiAgICBDYW5BY3RpdmF0ZUNoaWxkLFxyXG4gICAgQ2FuTG9hZCxcclxuICAgIE5hdmlnYXRpb25FeHRyYXMsXHJcbiAgICBSb3V0ZSxcclxuICAgIFJvdXRlcixcclxuICAgIFJvdXRlclN0YXRlU25hcHNob3RcclxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHsgZm9ya0pvaW4sIGZyb20sIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpcnN0LCBtZXJnZU1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgTmd4UGVybWlzc2lvbnNSb3V0ZXJEYXRhIH0gZnJvbSAnLi4vbW9kZWwvcGVybWlzc2lvbnMtcm91dGVyLWRhdGEubW9kZWwnO1xyXG5pbXBvcnQgeyBOZ3hQZXJtaXNzaW9uc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL3Blcm1pc3Npb25zLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZ3hSb2xlc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL3JvbGVzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBpc0Z1bmN0aW9uLCBpc1BsYWluT2JqZWN0LCB0cmFuc2Zvcm1TdHJpbmdUb0FycmF5IH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xyXG5cclxuaW50ZXJmYWNlIE5neFJlZGlyZWN0VG9OYXZpZ2F0aW9uUGFyYW1ldGVycyB7XHJcbiAgICBuYXZpZ2F0aW9uQ29tbWFuZHM6IGFueVtdIHwgRnVuY3Rpb247XHJcbiAgICBuYXZpZ2F0aW9uRXh0cmFzPzogTmF2aWdhdGlvbkV4dHJhcyB8IEZ1bmN0aW9uO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ3hQZXJtaXNzaW9uc0d1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUsIENhbkxvYWQsIENhbkFjdGl2YXRlQ2hpbGQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGVybWlzc2lvbnNTZXJ2aWNlOiBOZ3hQZXJtaXNzaW9uc1NlcnZpY2UsIHByaXZhdGUgIHJvbGVzU2VydmljZTogTmd4Um9sZXNTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XHJcbiAgICB9XHJcblxyXG4gICAgY2FuQWN0aXZhdGUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogUHJvbWlzZTxib29sZWFuPiB8IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhhc1Blcm1pc3Npb25zKHJvdXRlLCBzdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FuQWN0aXZhdGVDaGlsZChjaGlsZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4gfCBQcm9taXNlPGJvb2xlYW4+IHwgYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzUGVybWlzc2lvbnMoY2hpbGRSb3V0ZSwgc3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbkxvYWQocm91dGU6IFJvdXRlKTogYm9vbGVhbiB8IE9ic2VydmFibGU8Ym9vbGVhbj4gfCBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oYXNQZXJtaXNzaW9ucyhyb3V0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYXNQZXJtaXNzaW9ucyhyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCB8IFJvdXRlLCBzdGF0ZT86IFJvdXRlclN0YXRlU25hcHNob3QpIHtcclxuICAgICAgICBjb25zdCBwdXJlUGVybWlzc2lvbnMgPSAhIXJvdXRlICYmIHJvdXRlLmRhdGEgPyByb3V0ZS5kYXRhWydwZXJtaXNzaW9ucyddIGFzIE5neFBlcm1pc3Npb25zUm91dGVyRGF0YSA6IHt9O1xyXG4gICAgICAgIGxldCBwZXJtaXNzaW9uczogTmd4UGVybWlzc2lvbnNSb3V0ZXJEYXRhID0gdGhpcy50cmFuc2Zvcm1QZXJtaXNzaW9uKHB1cmVQZXJtaXNzaW9ucywgcm91dGUsIHN0YXRlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNQYXJhbWV0ZXJBdmFpbGFibGUocGVybWlzc2lvbnMuZXhjZXB0KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXNzaW5nRXhjZXB0UGVybWlzc2lvbnNWYWxpZGF0aW9uKHBlcm1pc3Npb25zLCByb3V0ZSwgc3RhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNQYXJhbWV0ZXJBdmFpbGFibGUocGVybWlzc2lvbnMub25seSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFzc2luZ09ubHlQZXJtaXNzaW9uc1ZhbGlkYXRpb24ocGVybWlzc2lvbnMsIHJvdXRlLCBzdGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyYW5zZm9ybVBlcm1pc3Npb24ocHVyZVBlcm1pc3Npb25zOiBOZ3hQZXJtaXNzaW9uc1JvdXRlckRhdGEsIHJvdXRlOiBhbnksIHN0YXRlOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGxldCBwZXJtaXNzaW9ucyA9IHtcclxuICAgICAgICAgICAgLi4ucHVyZVBlcm1pc3Npb25zXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ocGVybWlzc2lvbnMuZXhjZXB0KSkge1xyXG4gICAgICAgICAgICBwZXJtaXNzaW9ucy5leGNlcHQgPSAocGVybWlzc2lvbnMuZXhjZXB0IGFzIEZ1bmN0aW9uKShyb3V0ZSwgc3RhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ocGVybWlzc2lvbnMub25seSkpIHtcclxuICAgICAgICAgICAgcGVybWlzc2lvbnMub25seSA9IChwZXJtaXNzaW9ucy5vbmx5IGFzIEZ1bmN0aW9uKShyb3V0ZSwgc3RhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGVybWlzc2lvbnMuZXhjZXB0ID0gdHJhbnNmb3JtU3RyaW5nVG9BcnJheShwZXJtaXNzaW9ucy5leGNlcHQpO1xyXG4gICAgICAgIHBlcm1pc3Npb25zLm9ubHkgPSB0cmFuc2Zvcm1TdHJpbmdUb0FycmF5KHBlcm1pc3Npb25zLm9ubHkpO1xyXG5cclxuICAgICAgICByZXR1cm4gcGVybWlzc2lvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc1BhcmFtZXRlckF2YWlsYWJsZShwZXJtaXNzaW9uOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gISEocGVybWlzc2lvbikgJiYgcGVybWlzc2lvbi5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGFzc2luZ0V4Y2VwdFBlcm1pc3Npb25zVmFsaWRhdGlvbihwZXJtaXNzaW9uczogTmd4UGVybWlzc2lvbnNSb3V0ZXJEYXRhLCByb3V0ZTogYW55LCBzdGF0ZTogYW55KSB7XHJcbiAgICAgICAgaWYgKCEhcGVybWlzc2lvbnMucmVkaXJlY3RUbyAmJiAoKGlzRnVuY3Rpb24ocGVybWlzc2lvbnMucmVkaXJlY3RUbykpIHx8IChpc1BsYWluT2JqZWN0KHBlcm1pc3Npb25zLnJlZGlyZWN0VG8pICYmICF0aGlzLmlzUmVkaXJlY3Rpb25XaXRoUGFyYW1ldGVycyhcclxuICAgICAgICAgICAgcGVybWlzc2lvbnMucmVkaXJlY3RUbykpKSkge1xyXG4gICAgICAgICAgICBsZXQgZmFpbGVkUGVybWlzc2lvbiA9ICcnO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZyb20ocGVybWlzc2lvbnMuZXhjZXB0IGFzIGFueVtdKS5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9ya0pvaW4oW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcm1pc3Npb25zU2VydmljZS5oYXNQZXJtaXNzaW9uKDxzdHJpbmcgfCBzdHJpbmdbXT5kYXRhKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlc1NlcnZpY2UuaGFzT25seVJvbGVzKDxzdHJpbmcgfCBzdHJpbmdbXT5kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIF0pLnBpcGUodGFwKChoYXNQZXJtaXNzaW9uczogYm9vbGVhbltdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRvbnRIYXZlUGVybWlzc2lvbnMgPSBoYXNQZXJtaXNzaW9ucy5ldmVyeSgoZGF0YSkgPT4gZGF0YSA9PT0gZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkb250SGF2ZVBlcm1pc3Npb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWlsZWRQZXJtaXNzaW9uID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgZmlyc3QoKGRhdGE6IGFueSkgPT4gZGF0YS5zb21lKChkYXRhOiBib29sZWFuKSA9PiBkYXRhID09PSB0cnVlKSwgZmFsc2UpLFxyXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoKGlzQWxsRmFsc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISFmYWlsZWRQZXJtaXNzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlUmVkaXJlY3RPZkZhaWxlZFBlcm1pc3Npb24ocGVybWlzc2lvbnMsIGZhaWxlZFBlcm1pc3Npb24sIHJvdXRlLCBzdGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0FsbEZhbHNlICYmIHBlcm1pc3Npb25zLm9ubHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub25seVJlZGlyZWN0Q2hlY2socGVybWlzc2lvbnMsIHJvdXRlLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoIWlzQWxsRmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKS50b1Byb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5wZXJtaXNzaW9uc1NlcnZpY2UuaGFzUGVybWlzc2lvbig8c3RyaW5nIHwgc3RyaW5nW10+cGVybWlzc2lvbnMuZXhjZXB0KSwgdGhpcy5yb2xlc1NlcnZpY2UuaGFzT25seVJvbGVzKDxzdHJpbmcgfCBzdHJpbmdbXT5wZXJtaXNzaW9ucy5leGNlcHQpXSlcclxuICAgICAgICAgICAgLnRoZW4oKFtoYXNQZXJtaXNzaW9uLCBoYXNSb2xlc10pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChoYXNQZXJtaXNzaW9uIHx8IGhhc1JvbGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBlcm1pc3Npb25zLnJlZGlyZWN0VG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWRpcmVjdFRvQW5vdGhlclJvdXRlKHBlcm1pc3Npb25zLnJlZGlyZWN0VG8sIHJvdXRlLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwZXJtaXNzaW9ucy5vbmx5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tPbmx5UGVybWlzc2lvbnMocGVybWlzc2lvbnMsIHJvdXRlLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWRpcmVjdFRvQW5vdGhlclJvdXRlKHJlZGlyZWN0VG86IHN0cmluZyB8IGFueVtdIHwgTmd4UmVkaXJlY3RUb05hdmlnYXRpb25QYXJhbWV0ZXJzIHwgRnVuY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QgfCBSb3V0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZT86IFJvdXRlclN0YXRlU25hcHNob3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFpbGVkUGVybWlzc2lvbk5hbWU/OiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ocmVkaXJlY3RUbykpIHtcclxuICAgICAgICAgICAgcmVkaXJlY3RUbyA9IChyZWRpcmVjdFRvIGFzIEZ1bmN0aW9uKShmYWlsZWRQZXJtaXNzaW9uTmFtZSwgcm91dGUsIHN0YXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzUmVkaXJlY3Rpb25XaXRoUGFyYW1ldGVycyhyZWRpcmVjdFRvKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNOYXZpZ2F0aW9uRXh0cmFzQXNGdW5jdGlvbihyZWRpcmVjdFRvKSkge1xyXG4gICAgICAgICAgICAgICAgKDxOZ3hSZWRpcmVjdFRvTmF2aWdhdGlvblBhcmFtZXRlcnM+cmVkaXJlY3RUbykubmF2aWdhdGlvbkV4dHJhcyA9ICgoPE5neFJlZGlyZWN0VG9OYXZpZ2F0aW9uUGFyYW1ldGVycz5yZWRpcmVjdFRvKS5uYXZpZ2F0aW9uRXh0cmFzIGFzIEZ1bmN0aW9uKShcclxuICAgICAgICAgICAgICAgICAgICByb3V0ZSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzTmF2aWdhdGlvbkNvbW1hbmRzQXNGdW5jdGlvbihyZWRpcmVjdFRvKSkge1xyXG4gICAgICAgICAgICAgICAgKDxOZ3hSZWRpcmVjdFRvTmF2aWdhdGlvblBhcmFtZXRlcnM+cmVkaXJlY3RUbykubmF2aWdhdGlvbkNvbW1hbmRzID0gKCg8Tmd4UmVkaXJlY3RUb05hdmlnYXRpb25QYXJhbWV0ZXJzPnJlZGlyZWN0VG8pLm5hdmlnYXRpb25Db21tYW5kcyBhcyBGdW5jdGlvbikoXHJcbiAgICAgICAgICAgICAgICAgICAgcm91dGUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgKCg8Tmd4UmVkaXJlY3RUb05hdmlnYXRpb25QYXJhbWV0ZXJzPnJlZGlyZWN0VG8pLm5hdmlnYXRpb25Db21tYW5kcyBhcyBhbnlbXSksXHJcbiAgICAgICAgICAgICAgICAoKDxOZ3hSZWRpcmVjdFRvTmF2aWdhdGlvblBhcmFtZXRlcnM+IHJlZGlyZWN0VG8pLm5hdmlnYXRpb25FeHRyYXMgYXMgTmF2aWdhdGlvbkV4dHJhcylcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlZGlyZWN0VG8pKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKHJlZGlyZWN0VG8pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtyZWRpcmVjdFRvXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNSZWRpcmVjdGlvbldpdGhQYXJhbWV0ZXJzKG9iamVjdDogYW55IHwgTmd4UmVkaXJlY3RUb05hdmlnYXRpb25QYXJhbWV0ZXJzKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGlzUGxhaW5PYmplY3Qob2JqZWN0KSAmJiAoISFvYmplY3QubmF2aWdhdGlvbkNvbW1hbmRzIHx8ICEhb2JqZWN0Lm5hdmlnYXRpb25FeHRyYXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFzTmF2aWdhdGlvbkV4dHJhc0FzRnVuY3Rpb24ocmVkaXJlY3RUbzogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEhKDxOZ3hSZWRpcmVjdFRvTmF2aWdhdGlvblBhcmFtZXRlcnM+IHJlZGlyZWN0VG8pLm5hdmlnYXRpb25FeHRyYXMgJiZcclxuICAgICAgICAgICAgaXNGdW5jdGlvbigoPE5neFJlZGlyZWN0VG9OYXZpZ2F0aW9uUGFyYW1ldGVycz4gcmVkaXJlY3RUbykubmF2aWdhdGlvbkV4dHJhcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYXNOYXZpZ2F0aW9uQ29tbWFuZHNBc0Z1bmN0aW9uKHJlZGlyZWN0VG86IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhISg8Tmd4UmVkaXJlY3RUb05hdmlnYXRpb25QYXJhbWV0ZXJzPiByZWRpcmVjdFRvKS5uYXZpZ2F0aW9uQ29tbWFuZHMgJiZcclxuICAgICAgICAgICAgaXNGdW5jdGlvbigoPE5neFJlZGlyZWN0VG9OYXZpZ2F0aW9uUGFyYW1ldGVycz4gcmVkaXJlY3RUbykubmF2aWdhdGlvbkNvbW1hbmRzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9ubHlSZWRpcmVjdENoZWNrKHBlcm1pc3Npb25zOiBhbnksIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90IHwgUm91dGUsIHN0YXRlPzogUm91dGVyU3RhdGVTbmFwc2hvdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIGxldCBmYWlsZWRQZXJtaXNzaW9uID0gJyc7XHJcblxyXG4gICAgICAgIHJldHVybiBmcm9tKHBlcm1pc3Npb25zLm9ubHkpLnBpcGUoXHJcbiAgICAgICAgICAgIG1lcmdlTWFwKChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmb3JrSm9pbihbXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXJtaXNzaW9uc1NlcnZpY2UuaGFzUGVybWlzc2lvbig8c3RyaW5nIHwgc3RyaW5nW10+ZGF0YSksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlc1NlcnZpY2UuaGFzT25seVJvbGVzKDxzdHJpbmcgfCBzdHJpbmdbXT5kYXRhKVxyXG4gICAgICAgICAgICAgICAgXSkucGlwZShcclxuICAgICAgICAgICAgICAgICAgICB0YXAoKGhhc1Blcm1pc3Npb246IGJvb2xlYW5bXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmYWlsZWQgPSBoYXNQZXJtaXNzaW9uLmV2ZXJ5KChkYXRhKSA9PiBkYXRhID09PSBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmFpbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWlsZWRQZXJtaXNzaW9uID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgZmlyc3QoXHJcbiAgICAgICAgICAgICAgICAoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24ocGVybWlzc2lvbnMucmVkaXJlY3RUbykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuc29tZSgoZGF0YTogYm9vbGVhbikgPT4gZGF0YSA9PT0gdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5ldmVyeSgoZGF0YTogYm9vbGVhbikgPT4gZGF0YSA9PT0gZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhbHNlXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIG1lcmdlTWFwKChwYXNzOiBib29sZWFuKTogT2JzZXJ2YWJsZTxib29sZWFuPiA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihwZXJtaXNzaW9ucy5yZWRpcmVjdFRvKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVJlZGlyZWN0T2ZGYWlsZWRQZXJtaXNzaW9uKHBlcm1pc3Npb25zLCBmYWlsZWRQZXJtaXNzaW9uLCByb3V0ZSwgc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhZmFpbGVkUGVybWlzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVJlZGlyZWN0T2ZGYWlsZWRQZXJtaXNzaW9uKHBlcm1pc3Npb25zLCBmYWlsZWRQZXJtaXNzaW9uLCByb3V0ZSwgc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoIXBhc3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkudG9Qcm9taXNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVSZWRpcmVjdE9mRmFpbGVkUGVybWlzc2lvbihcclxuICAgICAgICBwZXJtaXNzaW9uczogYW55LFxyXG4gICAgICAgIGZhaWxlZFBlcm1pc3Npb246IHN0cmluZyxcclxuICAgICAgICByb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCB8IFJvdXRlLFxyXG4gICAgICAgIHN0YXRlPzogUm91dGVyU3RhdGVTbmFwc2hvdFxyXG4gICAgKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNGYWlsZWRQZXJtaXNzaW9uUHJvcGVydHlPZlJlZGlyZWN0VG8ocGVybWlzc2lvbnMsIGZhaWxlZFBlcm1pc3Npb24pKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVkaXJlY3RUb0Fub3RoZXJSb3V0ZSgoPGFueT5wZXJtaXNzaW9ucy5yZWRpcmVjdFRvKVtmYWlsZWRQZXJtaXNzaW9uXSwgcm91dGUsIHN0YXRlLCBmYWlsZWRQZXJtaXNzaW9uKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihwZXJtaXNzaW9ucy5yZWRpcmVjdFRvKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWRpcmVjdFRvQW5vdGhlclJvdXRlKCg8YW55PnBlcm1pc3Npb25zLnJlZGlyZWN0VG8pLCByb3V0ZSwgc3RhdGUsIGZhaWxlZFBlcm1pc3Npb24pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWRpcmVjdFRvQW5vdGhlclJvdXRlKCg8YW55PnBlcm1pc3Npb25zLnJlZGlyZWN0VG8pWydkZWZhdWx0J10sIHJvdXRlLCBzdGF0ZSwgZmFpbGVkUGVybWlzc2lvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0ZhaWxlZFBlcm1pc3Npb25Qcm9wZXJ0eU9mUmVkaXJlY3RUbyhwZXJtaXNzaW9uczogYW55LCBmYWlsZWRQZXJtaXNzaW9uOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gISFwZXJtaXNzaW9ucy5yZWRpcmVjdFRvICYmIHBlcm1pc3Npb25zLnJlZGlyZWN0VG9bPGFueT5mYWlsZWRQZXJtaXNzaW9uXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrT25seVBlcm1pc3Npb25zKHB1cmVQZXJtaXNzaW9uczogYW55LCByb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCB8IFJvdXRlLCBzdGF0ZT86IFJvdXRlclN0YXRlU25hcHNob3QpIHtcclxuICAgICAgICBsZXQgcGVybWlzc2lvbnM6IE5neFBlcm1pc3Npb25zUm91dGVyRGF0YSA9IHtcclxuICAgICAgICAgICAgLi4ucHVyZVBlcm1pc3Npb25zXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFt0aGlzLnBlcm1pc3Npb25zU2VydmljZS5oYXNQZXJtaXNzaW9uKDxzdHJpbmcgfCBzdHJpbmdbXT5wZXJtaXNzaW9ucy5vbmx5KSwgdGhpcy5yb2xlc1NlcnZpY2UuaGFzT25seVJvbGVzKDxzdHJpbmcgfCBzdHJpbmdbXT5wZXJtaXNzaW9ucy5vbmx5KV0pXHJcbiAgICAgICAgICAgIC50aGVuKChbaGFzUGVybWlzc2lvbiwgaGFzUm9sZV0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChoYXNQZXJtaXNzaW9uIHx8IGhhc1JvbGUpIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwZXJtaXNzaW9ucy5yZWRpcmVjdFRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWRpcmVjdFRvQW5vdGhlclJvdXRlKHBlcm1pc3Npb25zLnJlZGlyZWN0VG8sIHJvdXRlLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBhc3NpbmdPbmx5UGVybWlzc2lvbnNWYWxpZGF0aW9uKHBlcm1pc3Npb25zOiBOZ3hQZXJtaXNzaW9uc1JvdXRlckRhdGEsIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90IHwgUm91dGUsIHN0YXRlPzogUm91dGVyU3RhdGVTbmFwc2hvdCkge1xyXG4gICAgICAgIGlmICgoaXNGdW5jdGlvbihwZXJtaXNzaW9ucy5yZWRpcmVjdFRvKSB8fCBpc1BsYWluT2JqZWN0KHBlcm1pc3Npb25zLnJlZGlyZWN0VG8pICYmICF0aGlzLmlzUmVkaXJlY3Rpb25XaXRoUGFyYW1ldGVycyhwZXJtaXNzaW9ucy5yZWRpcmVjdFRvKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub25seVJlZGlyZWN0Q2hlY2socGVybWlzc2lvbnMsIHJvdXRlLCBzdGF0ZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tPbmx5UGVybWlzc2lvbnMocGVybWlzc2lvbnMsIHJvdXRlLCBzdGF0ZSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==