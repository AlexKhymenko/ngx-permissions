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
import * as ɵngcc0 from '@angular/core';
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
NgxPermissionsGuard.ngInjectableDef = ɵngcc0.ɵɵdefineInjectable({ token: NgxPermissionsGuard, factory: function NgxPermissionsGuard_Factory(t) { return new (t || NgxPermissionsGuard)(ɵngcc0.ɵɵinject(NgxPermissionsService), ɵngcc0.ɵɵinject(NgxRolesService), ɵngcc0.ɵɵinject(Router)); }, providedIn: null });
/*@__PURE__*/ ɵngcc0.ɵsetClassMetadata(NgxPermissionsGuard, [{
        type: Injectable
    }], function () { return [{ type: NgxPermissionsService }, { type: NgxRolesService }, { type: Router }]; }, { constructor: [], permissionsService: [], rolesService: [], router: [], canActivate: [], canActivateChild: [], canLoad: [], hasPermissions: [], transformPermission: [], isParameterAvailable: [], passingExceptPermissionsValidation: [], redirectToAnotherRoute: [], isRedirectionWithParameters: [], hasNavigationExtrasAsFunction: [], hasNavigationCommandsAsFunction: [], onlyRedirectCheck: [], handleRedirectOfFailedPermission: [], isFailedPermissionPropertyOfRedirectTo: [], checkOnlyPermissions: [], passingOnlyPermissionsValidation: [] });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL09sZWtzYW5kci5LaHltZW5rby9XZWJzdG9ybVByb2plY3RzL25neC1wZXJtaXNzaW9ucy9hcHBsaWNhdGlvbi9kaXN0L25neC1wZXJtaXNzaW9ucy9lc20yMDE1L2xpYi9yb3V0ZXIvcGVybWlzc2lvbnMtZ3VhcmQuc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBY0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FxV0MsMm9CQUdDIiwiZmlsZSI6InBlcm1pc3Npb25zLWd1YXJkLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGVvdmVydmlldyBhZGRlZCBieSB0c2lja2xlXHJcbiAqIEBzdXBwcmVzcyB7Y2hlY2tUeXBlcyxleHRyYVJlcXVpcmUsbWlzc2luZ092ZXJyaWRlLG1pc3NpbmdSZXR1cm4sdW51c2VkUHJpdmF0ZU1lbWJlcnMsdXNlbGVzc0NvZGV9IGNoZWNrZWQgYnkgdHNjXHJcbiAqL1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IGZvcmtKb2luLCBmcm9tLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaXJzdCwgbWVyZ2VNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTmd4UGVybWlzc2lvbnNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9wZXJtaXNzaW9ucy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd4Um9sZXNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9yb2xlcy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgaXNGdW5jdGlvbiwgaXNQbGFpbk9iamVjdCwgdHJhbnNmb3JtU3RyaW5nVG9BcnJheSB9IGZyb20gJy4uL3V0aWxzL3V0aWxzJztcclxuLyoqXHJcbiAqIEByZWNvcmRcclxuICovXHJcbmZ1bmN0aW9uIE5neFJlZGlyZWN0VG9OYXZpZ2F0aW9uUGFyYW1ldGVycygpIHsgfVxyXG5pZiAoZmFsc2UpIHtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFJlZGlyZWN0VG9OYXZpZ2F0aW9uUGFyYW1ldGVycy5wcm90b3R5cGUubmF2aWdhdGlvbkNvbW1hbmRzO1xyXG4gICAgLyoqIEB0eXBlIHs/fHVuZGVmaW5lZH0gKi9cclxuICAgIE5neFJlZGlyZWN0VG9OYXZpZ2F0aW9uUGFyYW1ldGVycy5wcm90b3R5cGUubmF2aWdhdGlvbkV4dHJhcztcclxufVxyXG5leHBvcnQgY2xhc3MgTmd4UGVybWlzc2lvbnNHdWFyZCB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7P30gcGVybWlzc2lvbnNTZXJ2aWNlXHJcbiAgICAgKiBAcGFyYW0gez99IHJvbGVzU2VydmljZVxyXG4gICAgICogQHBhcmFtIHs/fSByb3V0ZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocGVybWlzc2lvbnNTZXJ2aWNlLCByb2xlc1NlcnZpY2UsIHJvdXRlcikge1xyXG4gICAgICAgIHRoaXMucGVybWlzc2lvbnNTZXJ2aWNlID0gcGVybWlzc2lvbnNTZXJ2aWNlO1xyXG4gICAgICAgIHRoaXMucm9sZXNTZXJ2aWNlID0gcm9sZXNTZXJ2aWNlO1xyXG4gICAgICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gez99IHJvdXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHN0YXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBjYW5BY3RpdmF0ZShyb3V0ZSwgc3RhdGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oYXNQZXJtaXNzaW9ucyhyb3V0ZSwgc3RhdGUpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gez99IGNoaWxkUm91dGVcclxuICAgICAqIEBwYXJhbSB7P30gc3RhdGVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGNhbkFjdGl2YXRlQ2hpbGQoY2hpbGRSb3V0ZSwgc3RhdGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oYXNQZXJtaXNzaW9ucyhjaGlsZFJvdXRlLCBzdGF0ZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7P30gcm91dGVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGNhbkxvYWQocm91dGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oYXNQZXJtaXNzaW9ucyhyb3V0ZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHJvdXRlXHJcbiAgICAgKiBAcGFyYW0gez89fSBzdGF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgaGFzUGVybWlzc2lvbnMocm91dGUsIHN0YXRlKSB7XHJcbiAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgICAgIGNvbnN0IHB1cmVQZXJtaXNzaW9ucyA9ICEhcm91dGUgJiYgcm91dGUuZGF0YSA/ICgvKiogQHR5cGUgez99ICovIChyb3V0ZS5kYXRhWydwZXJtaXNzaW9ucyddKSkgOiB7fTtcclxuICAgICAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICAgICAgbGV0IHBlcm1pc3Npb25zID0gdGhpcy50cmFuc2Zvcm1QZXJtaXNzaW9uKHB1cmVQZXJtaXNzaW9ucywgcm91dGUsIHN0YXRlKTtcclxuICAgICAgICBpZiAodGhpcy5pc1BhcmFtZXRlckF2YWlsYWJsZShwZXJtaXNzaW9ucy5leGNlcHQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhc3NpbmdFeGNlcHRQZXJtaXNzaW9uc1ZhbGlkYXRpb24ocGVybWlzc2lvbnMsIHJvdXRlLCBzdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzUGFyYW1ldGVyQXZhaWxhYmxlKHBlcm1pc3Npb25zLm9ubHkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhc3NpbmdPbmx5UGVybWlzc2lvbnNWYWxpZGF0aW9uKHBlcm1pc3Npb25zLCByb3V0ZSwgc3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gcHVyZVBlcm1pc3Npb25zXHJcbiAgICAgKiBAcGFyYW0gez99IHJvdXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHN0YXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICB0cmFuc2Zvcm1QZXJtaXNzaW9uKHB1cmVQZXJtaXNzaW9ucywgcm91dGUsIHN0YXRlKSB7XHJcbiAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgICAgIGxldCBwZXJtaXNzaW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHB1cmVQZXJtaXNzaW9ucyk7XHJcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ocGVybWlzc2lvbnMuZXhjZXB0KSkge1xyXG4gICAgICAgICAgICBwZXJtaXNzaW9ucy5leGNlcHQgPSAoKC8qKiBAdHlwZSB7P30gKi8gKHBlcm1pc3Npb25zLmV4Y2VwdCkpKShyb3V0ZSwgc3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNGdW5jdGlvbihwZXJtaXNzaW9ucy5vbmx5KSkge1xyXG4gICAgICAgICAgICBwZXJtaXNzaW9ucy5vbmx5ID0gKCgvKiogQHR5cGUgez99ICovIChwZXJtaXNzaW9ucy5vbmx5KSkpKHJvdXRlLCBzdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBlcm1pc3Npb25zLmV4Y2VwdCA9IHRyYW5zZm9ybVN0cmluZ1RvQXJyYXkocGVybWlzc2lvbnMuZXhjZXB0KTtcclxuICAgICAgICBwZXJtaXNzaW9ucy5vbmx5ID0gdHJhbnNmb3JtU3RyaW5nVG9BcnJheShwZXJtaXNzaW9ucy5vbmx5KTtcclxuICAgICAgICByZXR1cm4gcGVybWlzc2lvbnM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHBlcm1pc3Npb25cclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGlzUGFyYW1ldGVyQXZhaWxhYmxlKHBlcm1pc3Npb24pIHtcclxuICAgICAgICByZXR1cm4gISEocGVybWlzc2lvbikgJiYgcGVybWlzc2lvbi5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSBwZXJtaXNzaW9uc1xyXG4gICAgICogQHBhcmFtIHs/fSByb3V0ZVxyXG4gICAgICogQHBhcmFtIHs/fSBzdGF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgcGFzc2luZ0V4Y2VwdFBlcm1pc3Npb25zVmFsaWRhdGlvbihwZXJtaXNzaW9ucywgcm91dGUsIHN0YXRlKSB7XHJcbiAgICAgICAgaWYgKCEhcGVybWlzc2lvbnMucmVkaXJlY3RUbyAmJiAoKGlzRnVuY3Rpb24ocGVybWlzc2lvbnMucmVkaXJlY3RUbykpIHx8IChpc1BsYWluT2JqZWN0KHBlcm1pc3Npb25zLnJlZGlyZWN0VG8pICYmICF0aGlzLmlzUmVkaXJlY3Rpb25XaXRoUGFyYW1ldGVycyhwZXJtaXNzaW9ucy5yZWRpcmVjdFRvKSkpKSB7XHJcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgICAgICAgICAgbGV0IGZhaWxlZFBlcm1pc3Npb24gPSAnJztcclxuICAgICAgICAgICAgcmV0dXJuIGZyb20oKC8qKiBAdHlwZSB7P30gKi8gKHBlcm1pc3Npb25zLmV4Y2VwdCkpKS5waXBlKG1lcmdlTWFwKCgvKipcclxuICAgICAgICAgICAgICogQHBhcmFtIHs/fSBkYXRhXHJcbiAgICAgICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcmtKb2luKFtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcm1pc3Npb25zU2VydmljZS5oYXNQZXJtaXNzaW9uKCgvKiogQHR5cGUgez99ICovIChkYXRhKSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZXNTZXJ2aWNlLmhhc09ubHlSb2xlcygoLyoqIEB0eXBlIHs/fSAqLyAoZGF0YSkpKVxyXG4gICAgICAgICAgICAgICAgXSkucGlwZSh0YXAoKC8qKlxyXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHs/fSBoYXNQZXJtaXNzaW9uc1xyXG4gICAgICAgICAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgKGhhc1Blcm1pc3Npb25zKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRvbnRIYXZlUGVybWlzc2lvbnMgPSBoYXNQZXJtaXNzaW9ucy5ldmVyeSgoLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICogQHBhcmFtIHs/fSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICAoZGF0YSkgPT4gZGF0YSA9PT0gZmFsc2UpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRvbnRIYXZlUGVybWlzc2lvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFpbGVkUGVybWlzc2lvbiA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICAgICAgfSkpLCBmaXJzdCgoLyoqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7P30gZGF0YVxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgKGRhdGEpID0+IGRhdGEuc29tZSgoLyoqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7P30gZGF0YVxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgKGRhdGEpID0+IGRhdGEgPT09IHRydWUpKSksIGZhbHNlKSwgbWVyZ2VNYXAoKC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gez99IGlzQWxsRmFsc2VcclxuICAgICAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIChpc0FsbEZhbHNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISFmYWlsZWRQZXJtaXNzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVSZWRpcmVjdE9mRmFpbGVkUGVybWlzc2lvbihwZXJtaXNzaW9ucywgZmFpbGVkUGVybWlzc2lvbiwgcm91dGUsIHN0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc0FsbEZhbHNlICYmIHBlcm1pc3Npb25zLm9ubHkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vbmx5UmVkaXJlY3RDaGVjayhwZXJtaXNzaW9ucywgcm91dGUsIHN0YXRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBvZighaXNBbGxGYWxzZSk7XHJcbiAgICAgICAgICAgIH0pKSkudG9Qcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5wZXJtaXNzaW9uc1NlcnZpY2UuaGFzUGVybWlzc2lvbigoLyoqIEB0eXBlIHs/fSAqLyAocGVybWlzc2lvbnMuZXhjZXB0KSkpLCB0aGlzLnJvbGVzU2VydmljZS5oYXNPbmx5Um9sZXMoKC8qKiBAdHlwZSB7P30gKi8gKHBlcm1pc3Npb25zLmV4Y2VwdCkpKV0pXHJcbiAgICAgICAgICAgIC50aGVuKCgvKipcclxuICAgICAgICAgKiBAcGFyYW0gez99IF9fMFxyXG4gICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgKFtoYXNQZXJtaXNzaW9uLCBoYXNSb2xlc10pID0+IHtcclxuICAgICAgICAgICAgaWYgKGhhc1Blcm1pc3Npb24gfHwgaGFzUm9sZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwZXJtaXNzaW9ucy5yZWRpcmVjdFRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWRpcmVjdFRvQW5vdGhlclJvdXRlKHBlcm1pc3Npb25zLnJlZGlyZWN0VG8sIHJvdXRlLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBlcm1pc3Npb25zLm9ubHkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNoZWNrT25seVBlcm1pc3Npb25zKHBlcm1pc3Npb25zLCByb3V0ZSwgc3RhdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gcmVkaXJlY3RUb1xyXG4gICAgICogQHBhcmFtIHs/fSByb3V0ZVxyXG4gICAgICogQHBhcmFtIHs/PX0gc3RhdGVcclxuICAgICAqIEBwYXJhbSB7Pz19IGZhaWxlZFBlcm1pc3Npb25OYW1lXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICByZWRpcmVjdFRvQW5vdGhlclJvdXRlKHJlZGlyZWN0VG8sIHJvdXRlLCBzdGF0ZSwgZmFpbGVkUGVybWlzc2lvbk5hbWUpIHtcclxuICAgICAgICBpZiAoaXNGdW5jdGlvbihyZWRpcmVjdFRvKSkge1xyXG4gICAgICAgICAgICByZWRpcmVjdFRvID0gKCgvKiogQHR5cGUgez99ICovIChyZWRpcmVjdFRvKSkpKGZhaWxlZFBlcm1pc3Npb25OYW1lLCByb3V0ZSwgc3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc1JlZGlyZWN0aW9uV2l0aFBhcmFtZXRlcnMocmVkaXJlY3RUbykpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzTmF2aWdhdGlvbkV4dHJhc0FzRnVuY3Rpb24ocmVkaXJlY3RUbykpIHtcclxuICAgICAgICAgICAgICAgICgoLyoqIEB0eXBlIHs/fSAqLyAocmVkaXJlY3RUbykpKS5uYXZpZ2F0aW9uRXh0cmFzID0gKCgvKiogQHR5cGUgez99ICovICgoKC8qKiBAdHlwZSB7P30gKi8gKHJlZGlyZWN0VG8pKSkubmF2aWdhdGlvbkV4dHJhcykpKShyb3V0ZSwgc3RhdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc05hdmlnYXRpb25Db21tYW5kc0FzRnVuY3Rpb24ocmVkaXJlY3RUbykpIHtcclxuICAgICAgICAgICAgICAgICgoLyoqIEB0eXBlIHs/fSAqLyAocmVkaXJlY3RUbykpKS5uYXZpZ2F0aW9uQ29tbWFuZHMgPSAoKC8qKiBAdHlwZSB7P30gKi8gKCgoLyoqIEB0eXBlIHs/fSAqLyAocmVkaXJlY3RUbykpKS5uYXZpZ2F0aW9uQ29tbWFuZHMpKSkocm91dGUsIHN0YXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZSgoKC8qKiBAdHlwZSB7P30gKi8gKCgoLyoqIEB0eXBlIHs/fSAqLyAocmVkaXJlY3RUbykpKS5uYXZpZ2F0aW9uQ29tbWFuZHMpKSksICgoLyoqIEB0eXBlIHs/fSAqLyAoKCgvKiogQHR5cGUgez99ICovIChyZWRpcmVjdFRvKSkpLm5hdmlnYXRpb25FeHRyYXMpKSkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlZGlyZWN0VG8pKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKHJlZGlyZWN0VG8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3JlZGlyZWN0VG9dKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IG9iamVjdFxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgaXNSZWRpcmVjdGlvbldpdGhQYXJhbWV0ZXJzKG9iamVjdCkge1xyXG4gICAgICAgIHJldHVybiBpc1BsYWluT2JqZWN0KG9iamVjdCkgJiYgKCEhb2JqZWN0Lm5hdmlnYXRpb25Db21tYW5kcyB8fCAhIW9iamVjdC5uYXZpZ2F0aW9uRXh0cmFzKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gcmVkaXJlY3RUb1xyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgaGFzTmF2aWdhdGlvbkV4dHJhc0FzRnVuY3Rpb24ocmVkaXJlY3RUbykge1xyXG4gICAgICAgIHJldHVybiAhISgoLyoqIEB0eXBlIHs/fSAqLyAocmVkaXJlY3RUbykpKS5uYXZpZ2F0aW9uRXh0cmFzICYmXHJcbiAgICAgICAgICAgIGlzRnVuY3Rpb24oKCgvKiogQHR5cGUgez99ICovIChyZWRpcmVjdFRvKSkpLm5hdmlnYXRpb25FeHRyYXMpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSByZWRpcmVjdFRvXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBoYXNOYXZpZ2F0aW9uQ29tbWFuZHNBc0Z1bmN0aW9uKHJlZGlyZWN0VG8pIHtcclxuICAgICAgICByZXR1cm4gISEoKC8qKiBAdHlwZSB7P30gKi8gKHJlZGlyZWN0VG8pKSkubmF2aWdhdGlvbkNvbW1hbmRzICYmXHJcbiAgICAgICAgICAgIGlzRnVuY3Rpb24oKCgvKiogQHR5cGUgez99ICovIChyZWRpcmVjdFRvKSkpLm5hdmlnYXRpb25Db21tYW5kcyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHBlcm1pc3Npb25zXHJcbiAgICAgKiBAcGFyYW0gez99IHJvdXRlXHJcbiAgICAgKiBAcGFyYW0gez89fSBzdGF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgb25seVJlZGlyZWN0Q2hlY2socGVybWlzc2lvbnMsIHJvdXRlLCBzdGF0ZSkge1xyXG4gICAgICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgICAgICBsZXQgZmFpbGVkUGVybWlzc2lvbiA9ICcnO1xyXG4gICAgICAgIHJldHVybiBmcm9tKHBlcm1pc3Npb25zLm9ubHkpLnBpcGUobWVyZ2VNYXAoKC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7P30gZGF0YVxyXG4gICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcmtKb2luKFtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVybWlzc2lvbnNTZXJ2aWNlLmhhc1Blcm1pc3Npb24oKC8qKiBAdHlwZSB7P30gKi8gKGRhdGEpKSksXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGVzU2VydmljZS5oYXNPbmx5Um9sZXMoKC8qKiBAdHlwZSB7P30gKi8gKGRhdGEpKSlcclxuICAgICAgICAgICAgXSkucGlwZSh0YXAoKC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gez99IGhhc1Blcm1pc3Npb25cclxuICAgICAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIChoYXNQZXJtaXNzaW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICAgICAgICAgICAgICBjb25zdCBmYWlsZWQgPSBoYXNQZXJtaXNzaW9uLmV2ZXJ5KCgvKipcclxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7P30gZGF0YVxyXG4gICAgICAgICAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgKGRhdGEpID0+IGRhdGEgPT09IGZhbHNlKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmFpbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmFpbGVkUGVybWlzc2lvbiA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgfSkpLCBmaXJzdCgoLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHs/fSBkYXRhXHJcbiAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgKi9cclxuICAgICAgICAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihwZXJtaXNzaW9ucy5yZWRpcmVjdFRvKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuc29tZSgoLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0gez99IGRhdGFcclxuICAgICAgICAgICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIChkYXRhKSA9PiBkYXRhID09PSB0cnVlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGEuZXZlcnkoKC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gez99IGRhdGFcclxuICAgICAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIChkYXRhKSA9PiBkYXRhID09PSBmYWxzZSkpO1xyXG4gICAgICAgIH0pLCBmYWxzZSksIG1lcmdlTWFwKCgvKipcclxuICAgICAgICAgKiBAcGFyYW0gez99IHBhc3NcclxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIChwYXNzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHBlcm1pc3Npb25zLnJlZGlyZWN0VG8pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZih0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlUmVkaXJlY3RPZkZhaWxlZFBlcm1pc3Npb24ocGVybWlzc2lvbnMsIGZhaWxlZFBlcm1pc3Npb24sIHJvdXRlLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghIWZhaWxlZFBlcm1pc3Npb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVJlZGlyZWN0T2ZGYWlsZWRQZXJtaXNzaW9uKHBlcm1pc3Npb25zLCBmYWlsZWRQZXJtaXNzaW9uLCByb3V0ZSwgc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKCFwYXNzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKSkudG9Qcm9taXNlKCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHBlcm1pc3Npb25zXHJcbiAgICAgKiBAcGFyYW0gez99IGZhaWxlZFBlcm1pc3Npb25cclxuICAgICAqIEBwYXJhbSB7P30gcm91dGVcclxuICAgICAqIEBwYXJhbSB7Pz19IHN0YXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBoYW5kbGVSZWRpcmVjdE9mRmFpbGVkUGVybWlzc2lvbihwZXJtaXNzaW9ucywgZmFpbGVkUGVybWlzc2lvbiwgcm91dGUsIHN0YXRlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNGYWlsZWRQZXJtaXNzaW9uUHJvcGVydHlPZlJlZGlyZWN0VG8ocGVybWlzc2lvbnMsIGZhaWxlZFBlcm1pc3Npb24pKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVkaXJlY3RUb0Fub3RoZXJSb3V0ZSgoKC8qKiBAdHlwZSB7P30gKi8gKHBlcm1pc3Npb25zLnJlZGlyZWN0VG8pKSlbZmFpbGVkUGVybWlzc2lvbl0sIHJvdXRlLCBzdGF0ZSwgZmFpbGVkUGVybWlzc2lvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihwZXJtaXNzaW9ucy5yZWRpcmVjdFRvKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWRpcmVjdFRvQW5vdGhlclJvdXRlKCgoLyoqIEB0eXBlIHs/fSAqLyAocGVybWlzc2lvbnMucmVkaXJlY3RUbykpKSwgcm91dGUsIHN0YXRlLCBmYWlsZWRQZXJtaXNzaW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVkaXJlY3RUb0Fub3RoZXJSb3V0ZSgoKC8qKiBAdHlwZSB7P30gKi8gKHBlcm1pc3Npb25zLnJlZGlyZWN0VG8pKSlbJ2RlZmF1bHQnXSwgcm91dGUsIHN0YXRlLCBmYWlsZWRQZXJtaXNzaW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gcGVybWlzc2lvbnNcclxuICAgICAqIEBwYXJhbSB7P30gZmFpbGVkUGVybWlzc2lvblxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgaXNGYWlsZWRQZXJtaXNzaW9uUHJvcGVydHlPZlJlZGlyZWN0VG8ocGVybWlzc2lvbnMsIGZhaWxlZFBlcm1pc3Npb24pIHtcclxuICAgICAgICByZXR1cm4gISFwZXJtaXNzaW9ucy5yZWRpcmVjdFRvICYmIHBlcm1pc3Npb25zLnJlZGlyZWN0VG9bKC8qKiBAdHlwZSB7P30gKi8gKGZhaWxlZFBlcm1pc3Npb24pKV07XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHB1cmVQZXJtaXNzaW9uc1xyXG4gICAgICogQHBhcmFtIHs/fSByb3V0ZVxyXG4gICAgICogQHBhcmFtIHs/PX0gc3RhdGVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGNoZWNrT25seVBlcm1pc3Npb25zKHB1cmVQZXJtaXNzaW9ucywgcm91dGUsIHN0YXRlKSB7XHJcbiAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgICAgIGxldCBwZXJtaXNzaW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHB1cmVQZXJtaXNzaW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFt0aGlzLnBlcm1pc3Npb25zU2VydmljZS5oYXNQZXJtaXNzaW9uKCgvKiogQHR5cGUgez99ICovIChwZXJtaXNzaW9ucy5vbmx5KSkpLCB0aGlzLnJvbGVzU2VydmljZS5oYXNPbmx5Um9sZXMoKC8qKiBAdHlwZSB7P30gKi8gKHBlcm1pc3Npb25zLm9ubHkpKSldKVxyXG4gICAgICAgICAgICAudGhlbigoLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHs/fSBfXzBcclxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIChbaGFzUGVybWlzc2lvbiwgaGFzUm9sZV0pID0+IHtcclxuICAgICAgICAgICAgaWYgKGhhc1Blcm1pc3Npb24gfHwgaGFzUm9sZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBpZiAocGVybWlzc2lvbnMucmVkaXJlY3RUbykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWRpcmVjdFRvQW5vdGhlclJvdXRlKHBlcm1pc3Npb25zLnJlZGlyZWN0VG8sIHJvdXRlLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gcGVybWlzc2lvbnNcclxuICAgICAqIEBwYXJhbSB7P30gcm91dGVcclxuICAgICAqIEBwYXJhbSB7Pz19IHN0YXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBwYXNzaW5nT25seVBlcm1pc3Npb25zVmFsaWRhdGlvbihwZXJtaXNzaW9ucywgcm91dGUsIHN0YXRlKSB7XHJcbiAgICAgICAgaWYgKChpc0Z1bmN0aW9uKHBlcm1pc3Npb25zLnJlZGlyZWN0VG8pIHx8IGlzUGxhaW5PYmplY3QocGVybWlzc2lvbnMucmVkaXJlY3RUbykgJiYgIXRoaXMuaXNSZWRpcmVjdGlvbldpdGhQYXJhbWV0ZXJzKHBlcm1pc3Npb25zLnJlZGlyZWN0VG8pKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vbmx5UmVkaXJlY3RDaGVjayhwZXJtaXNzaW9ucywgcm91dGUsIHN0YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tPbmx5UGVybWlzc2lvbnMocGVybWlzc2lvbnMsIHJvdXRlLCBzdGF0ZSk7XHJcbiAgICB9XHJcbn1cclxuTmd4UGVybWlzc2lvbnNHdWFyZC5kZWNvcmF0b3JzID0gW1xyXG4gICAgeyB0eXBlOiBJbmplY3RhYmxlIH1cclxuXTtcclxuLyoqIEBub2NvbGxhcHNlICovXHJcbk5neFBlcm1pc3Npb25zR3VhcmQuY3RvclBhcmFtZXRlcnMgPSAoKSA9PiBbXHJcbiAgICB7IHR5cGU6IE5neFBlcm1pc3Npb25zU2VydmljZSB9LFxyXG4gICAgeyB0eXBlOiBOZ3hSb2xlc1NlcnZpY2UgfSxcclxuICAgIHsgdHlwZTogUm91dGVyIH1cclxuXTtcclxuaWYgKGZhbHNlKSB7XHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHs/fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNHdWFyZC5wcm90b3R5cGUucGVybWlzc2lvbnNTZXJ2aWNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7P31cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zR3VhcmQucHJvdG90eXBlLnJvbGVzU2VydmljZTtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgez99XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0d1YXJkLnByb3RvdHlwZS5yb3V0ZXI7XHJcbn1cciJdfQ==