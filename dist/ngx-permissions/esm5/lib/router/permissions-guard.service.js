/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var NgxPermissionsGuard = /** @class */ (function () {
    function NgxPermissionsGuard(permissionsService, rolesService, router) {
        this.permissionsService = permissionsService;
        this.rolesService = rolesService;
        this.router = router;
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    NgxPermissionsGuard.prototype.canActivate = /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (route, state) {
        return this.hasPermissions(route, state);
    };
    /**
     * @param {?} childRoute
     * @param {?} state
     * @return {?}
     */
    NgxPermissionsGuard.prototype.canActivateChild = /**
     * @param {?} childRoute
     * @param {?} state
     * @return {?}
     */
    function (childRoute, state) {
        return this.hasPermissions(childRoute, state);
    };
    /**
     * @param {?} route
     * @return {?}
     */
    NgxPermissionsGuard.prototype.canLoad = /**
     * @param {?} route
     * @return {?}
     */
    function (route) {
        return this.hasPermissions(route);
    };
    /**
     * @private
     * @param {?} route
     * @param {?=} state
     * @return {?}
     */
    NgxPermissionsGuard.prototype.hasPermissions = /**
     * @private
     * @param {?} route
     * @param {?=} state
     * @return {?}
     */
    function (route, state) {
        /** @type {?} */
        var purePermissions = !!route && route.data ? (/** @type {?} */ (route.data['permissions'])) : {};
        /** @type {?} */
        var permissions = this.transformPermission(purePermissions, route, state);
        if (this.isParameterAvailable(permissions.except)) {
            return this.passingExceptPermissionsValidation(permissions, route, state);
        }
        if (this.isParameterAvailable(permissions.only)) {
            return this.passingOnlyPermissionsValidation(permissions, route, state);
        }
        return true;
    };
    /**
     * @private
     * @param {?} purePermissions
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    NgxPermissionsGuard.prototype.transformPermission = /**
     * @private
     * @param {?} purePermissions
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (purePermissions, route, state) {
        /** @type {?} */
        var permissions = tslib_1.__assign({}, purePermissions);
        if (isFunction(permissions.except)) {
            permissions.except = ((/** @type {?} */ (permissions.except)))(route, state);
        }
        if (isFunction(permissions.only)) {
            permissions.only = ((/** @type {?} */ (permissions.only)))(route, state);
        }
        permissions.except = transformStringToArray(permissions.except);
        permissions.only = transformStringToArray(permissions.only);
        return permissions;
    };
    /**
     * @private
     * @param {?} permission
     * @return {?}
     */
    NgxPermissionsGuard.prototype.isParameterAvailable = /**
     * @private
     * @param {?} permission
     * @return {?}
     */
    function (permission) {
        return !!(permission) && permission.length > 0;
    };
    /**
     * @private
     * @param {?} permissions
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    NgxPermissionsGuard.prototype.passingExceptPermissionsValidation = /**
     * @private
     * @param {?} permissions
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (permissions, route, state) {
        var _this = this;
        if (!!permissions.redirectTo && ((isFunction(permissions.redirectTo)) || (isPlainObject(permissions.redirectTo) && !this.isRedirectionWithParameters(permissions.redirectTo)))) {
            /** @type {?} */
            var failedPermission_1 = '';
            return from((/** @type {?} */ (permissions.except))).pipe(mergeMap((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                return forkJoin([
                    _this.permissionsService.hasPermission((/** @type {?} */ (data))),
                    _this.rolesService.hasOnlyRoles((/** @type {?} */ (data)))
                ]).pipe(tap((/**
                 * @param {?} hasPermissions
                 * @return {?}
                 */
                function (hasPermissions) {
                    /** @type {?} */
                    var dontHavePermissions = hasPermissions.every((/**
                     * @param {?} data
                     * @return {?}
                     */
                    function (data) { return data === false; }));
                    if (!dontHavePermissions) {
                        failedPermission_1 = data;
                    }
                })));
            })), first((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return data.some((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return data === true; })); }), false), mergeMap((/**
             * @param {?} isAllFalse
             * @return {?}
             */
            function (isAllFalse) {
                if (!!failedPermission_1) {
                    _this.handleRedirectOfFailedPermission(permissions, failedPermission_1, route, state);
                    return of(false);
                }
                if (!isAllFalse && permissions.only) {
                    return _this.onlyRedirectCheck(permissions, route, state);
                }
                return of(!isAllFalse);
            }))).toPromise();
        }
        return Promise.all([this.permissionsService.hasPermission((/** @type {?} */ (permissions.except))), this.rolesService.hasOnlyRoles((/** @type {?} */ (permissions.except)))])
            .then((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), hasPermission = _b[0], hasRoles = _b[1];
            if (hasPermission || hasRoles) {
                if (permissions.redirectTo) {
                    _this.redirectToAnotherRoute(permissions.redirectTo, route, state);
                }
                return false;
            }
            if (permissions.only) {
                return _this.checkOnlyPermissions(permissions, route, state);
            }
            return true;
        }));
    };
    /**
     * @private
     * @param {?} redirectTo
     * @param {?} route
     * @param {?=} state
     * @param {?=} failedPermissionName
     * @return {?}
     */
    NgxPermissionsGuard.prototype.redirectToAnotherRoute = /**
     * @private
     * @param {?} redirectTo
     * @param {?} route
     * @param {?=} state
     * @param {?=} failedPermissionName
     * @return {?}
     */
    function (redirectTo, route, state, failedPermissionName) {
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
    };
    /**
     * @private
     * @param {?} object
     * @return {?}
     */
    NgxPermissionsGuard.prototype.isRedirectionWithParameters = /**
     * @private
     * @param {?} object
     * @return {?}
     */
    function (object) {
        return isPlainObject(object) && (!!object.navigationCommands || !!object.navigationExtras);
    };
    /**
     * @private
     * @param {?} redirectTo
     * @return {?}
     */
    NgxPermissionsGuard.prototype.hasNavigationExtrasAsFunction = /**
     * @private
     * @param {?} redirectTo
     * @return {?}
     */
    function (redirectTo) {
        return !!((/** @type {?} */ (redirectTo))).navigationExtras &&
            isFunction(((/** @type {?} */ (redirectTo))).navigationExtras);
    };
    /**
     * @private
     * @param {?} redirectTo
     * @return {?}
     */
    NgxPermissionsGuard.prototype.hasNavigationCommandsAsFunction = /**
     * @private
     * @param {?} redirectTo
     * @return {?}
     */
    function (redirectTo) {
        return !!((/** @type {?} */ (redirectTo))).navigationCommands &&
            isFunction(((/** @type {?} */ (redirectTo))).navigationCommands);
    };
    /**
     * @private
     * @param {?} permissions
     * @param {?} route
     * @param {?=} state
     * @return {?}
     */
    NgxPermissionsGuard.prototype.onlyRedirectCheck = /**
     * @private
     * @param {?} permissions
     * @param {?} route
     * @param {?=} state
     * @return {?}
     */
    function (permissions, route, state) {
        var _this = this;
        /** @type {?} */
        var failedPermission = '';
        return from(permissions.only).pipe(mergeMap((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            return forkJoin([
                _this.permissionsService.hasPermission((/** @type {?} */ (data))),
                _this.rolesService.hasOnlyRoles((/** @type {?} */ (data)))
            ]).pipe(tap((/**
             * @param {?} hasPermission
             * @return {?}
             */
            function (hasPermission) {
                /** @type {?} */
                var failed = hasPermission.every((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return data === false; }));
                if (failed) {
                    failedPermission = data;
                }
            })));
        })), first((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (isFunction(permissions.redirectTo)) {
                return data.some((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return data === true; }));
            }
            return data.every((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return data === false; }));
        }), false), mergeMap((/**
         * @param {?} pass
         * @return {?}
         */
        function (pass) {
            if (isFunction(permissions.redirectTo)) {
                if (pass) {
                    return of(true);
                }
                else {
                    _this.handleRedirectOfFailedPermission(permissions, failedPermission, route, state);
                    return of(false);
                }
            }
            else {
                if (!!failedPermission) {
                    _this.handleRedirectOfFailedPermission(permissions, failedPermission, route, state);
                }
                return of(!pass);
            }
        }))).toPromise();
    };
    /**
     * @private
     * @param {?} permissions
     * @param {?} failedPermission
     * @param {?} route
     * @param {?=} state
     * @return {?}
     */
    NgxPermissionsGuard.prototype.handleRedirectOfFailedPermission = /**
     * @private
     * @param {?} permissions
     * @param {?} failedPermission
     * @param {?} route
     * @param {?=} state
     * @return {?}
     */
    function (permissions, failedPermission, route, state) {
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
    };
    /**
     * @private
     * @param {?} permissions
     * @param {?} failedPermission
     * @return {?}
     */
    NgxPermissionsGuard.prototype.isFailedPermissionPropertyOfRedirectTo = /**
     * @private
     * @param {?} permissions
     * @param {?} failedPermission
     * @return {?}
     */
    function (permissions, failedPermission) {
        return !!permissions.redirectTo && permissions.redirectTo[(/** @type {?} */ (failedPermission))];
    };
    /**
     * @private
     * @param {?} purePermissions
     * @param {?} route
     * @param {?=} state
     * @return {?}
     */
    NgxPermissionsGuard.prototype.checkOnlyPermissions = /**
     * @private
     * @param {?} purePermissions
     * @param {?} route
     * @param {?=} state
     * @return {?}
     */
    function (purePermissions, route, state) {
        var _this = this;
        /** @type {?} */
        var permissions = tslib_1.__assign({}, purePermissions);
        return Promise.all([this.permissionsService.hasPermission((/** @type {?} */ (permissions.only))), this.rolesService.hasOnlyRoles((/** @type {?} */ (permissions.only)))])
            .then((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), hasPermission = _b[0], hasRole = _b[1];
            if (hasPermission || hasRole)
                return true;
            if (permissions.redirectTo) {
                _this.redirectToAnotherRoute(permissions.redirectTo, route, state);
            }
            return false;
        }));
    };
    /**
     * @private
     * @param {?} permissions
     * @param {?} route
     * @param {?=} state
     * @return {?}
     */
    NgxPermissionsGuard.prototype.passingOnlyPermissionsValidation = /**
     * @private
     * @param {?} permissions
     * @param {?} route
     * @param {?=} state
     * @return {?}
     */
    function (permissions, route, state) {
        if ((isFunction(permissions.redirectTo) || isPlainObject(permissions.redirectTo) && !this.isRedirectionWithParameters(permissions.redirectTo))) {
            return this.onlyRedirectCheck(permissions, route, state);
        }
        return this.checkOnlyPermissions(permissions, route, state);
    };
    /** @nocollapse */
    NgxPermissionsGuard.ctorParameters = function () { return [
        { type: NgxPermissionsService },
        { type: NgxRolesService },
        { type: Router }
    ]; };
NgxPermissionsGuard.ngInjectableDef = ɵngcc0.ɵɵdefineInjectable({ token: NgxPermissionsGuard, factory: function NgxPermissionsGuard_Factory(t) { return new (t || NgxPermissionsGuard)(ɵngcc0.ɵɵinject(NgxPermissionsService), ɵngcc0.ɵɵinject(NgxRolesService), ɵngcc0.ɵɵinject(Router)); }, providedIn: null });
/*@__PURE__*/ ɵngcc0.ɵsetClassMetadata(NgxPermissionsGuard, [{
        type: Injectable
    }], function () { return [{ type: NgxPermissionsService }, { type: NgxRolesService }, { type: Router }]; }, { permissionsService: [], rolesService: [], router: [], canActivate: [], canActivateChild: [], canLoad: [], hasPermissions: [], transformPermission: [], isParameterAvailable: [], passingExceptPermissionsValidation: [], redirectToAnotherRoute: [], isRedirectionWithParameters: [], hasNavigationExtrasAsFunction: [], hasNavigationCommandsAsFunction: [], onlyRedirectCheck: [], handleRedirectOfFailedPermission: [], isFailedPermissionPropertyOfRedirectTo: [], checkOnlyPermissions: [], passingOnlyPermissionsValidation: [] });
    return NgxPermissionsGuard;
}());
export { NgxPermissionsGuard };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL09sZWtzYW5kci5LaHltZW5rby9XZWJzdG9ybVByb2plY3RzL25neC1wZXJtaXNzaW9ucy9hcHBsaWNhdGlvbi9kaXN0L25neC1wZXJtaXNzaW9ucy9lc201L2xpYi9yb3V0ZXIvcGVybWlzc2lvbnMtZ3VhcmQuc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7OztBQWVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFxY00sQUFHQTs7Ozs7Ozs7OzsybkJBTUciLCJmaWxlIjoicGVybWlzc2lvbnMtZ3VhcmQuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3IGFkZGVkIGJ5IHRzaWNrbGVcclxuICogQHN1cHByZXNzIHtjaGVja1R5cGVzLGV4dHJhUmVxdWlyZSxtaXNzaW5nT3ZlcnJpZGUsbWlzc2luZ1JldHVybix1bnVzZWRQcml2YXRlTWVtYmVycyx1c2VsZXNzQ29kZX0gY2hlY2tlZCBieSB0c2NcclxuICovXHJcbmltcG9ydCAqIGFzIHRzbGliXzEgZnJvbSBcInRzbGliXCI7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgZm9ya0pvaW4sIGZyb20sIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpcnN0LCBtZXJnZU1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBOZ3hQZXJtaXNzaW9uc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL3Blcm1pc3Npb25zLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZ3hSb2xlc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL3JvbGVzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBpc0Z1bmN0aW9uLCBpc1BsYWluT2JqZWN0LCB0cmFuc2Zvcm1TdHJpbmdUb0FycmF5IH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xyXG4vKipcclxuICogQHJlY29yZFxyXG4gKi9cclxuZnVuY3Rpb24gTmd4UmVkaXJlY3RUb05hdmlnYXRpb25QYXJhbWV0ZXJzKCkgeyB9XHJcbmlmIChmYWxzZSkge1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UmVkaXJlY3RUb05hdmlnYXRpb25QYXJhbWV0ZXJzLnByb3RvdHlwZS5uYXZpZ2F0aW9uQ29tbWFuZHM7XHJcbiAgICAvKiogQHR5cGUgez98dW5kZWZpbmVkfSAqL1xyXG4gICAgTmd4UmVkaXJlY3RUb05hdmlnYXRpb25QYXJhbWV0ZXJzLnByb3RvdHlwZS5uYXZpZ2F0aW9uRXh0cmFzO1xyXG59XHJcbnZhciBOZ3hQZXJtaXNzaW9uc0d1YXJkID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTmd4UGVybWlzc2lvbnNHdWFyZChwZXJtaXNzaW9uc1NlcnZpY2UsIHJvbGVzU2VydmljZSwgcm91dGVyKSB7XHJcbiAgICAgICAgdGhpcy5wZXJtaXNzaW9uc1NlcnZpY2UgPSBwZXJtaXNzaW9uc1NlcnZpY2U7XHJcbiAgICAgICAgdGhpcy5yb2xlc1NlcnZpY2UgPSByb2xlc1NlcnZpY2U7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7P30gcm91dGVcclxuICAgICAqIEBwYXJhbSB7P30gc3RhdGVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zR3VhcmQucHJvdG90eXBlLmNhbkFjdGl2YXRlID0gLyoqXHJcbiAgICAgKiBAcGFyYW0gez99IHJvdXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHN0YXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAocm91dGUsIHN0YXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzUGVybWlzc2lvbnMocm91dGUsIHN0YXRlKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7P30gY2hpbGRSb3V0ZVxyXG4gICAgICogQHBhcmFtIHs/fSBzdGF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNHdWFyZC5wcm90b3R5cGUuY2FuQWN0aXZhdGVDaGlsZCA9IC8qKlxyXG4gICAgICogQHBhcmFtIHs/fSBjaGlsZFJvdXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHN0YXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAoY2hpbGRSb3V0ZSwgc3RhdGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oYXNQZXJtaXNzaW9ucyhjaGlsZFJvdXRlLCBzdGF0ZSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gez99IHJvdXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0d1YXJkLnByb3RvdHlwZS5jYW5Mb2FkID0gLyoqXHJcbiAgICAgKiBAcGFyYW0gez99IHJvdXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAocm91dGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oYXNQZXJtaXNzaW9ucyhyb3V0ZSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSByb3V0ZVxyXG4gICAgICogQHBhcmFtIHs/PX0gc3RhdGVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zR3VhcmQucHJvdG90eXBlLmhhc1Blcm1pc3Npb25zID0gLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSByb3V0ZVxyXG4gICAgICogQHBhcmFtIHs/PX0gc3RhdGVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIChyb3V0ZSwgc3RhdGUpIHtcclxuICAgICAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICAgICAgdmFyIHB1cmVQZXJtaXNzaW9ucyA9ICEhcm91dGUgJiYgcm91dGUuZGF0YSA/ICgvKiogQHR5cGUgez99ICovIChyb3V0ZS5kYXRhWydwZXJtaXNzaW9ucyddKSkgOiB7fTtcclxuICAgICAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICAgICAgdmFyIHBlcm1pc3Npb25zID0gdGhpcy50cmFuc2Zvcm1QZXJtaXNzaW9uKHB1cmVQZXJtaXNzaW9ucywgcm91dGUsIHN0YXRlKTtcclxuICAgICAgICBpZiAodGhpcy5pc1BhcmFtZXRlckF2YWlsYWJsZShwZXJtaXNzaW9ucy5leGNlcHQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhc3NpbmdFeGNlcHRQZXJtaXNzaW9uc1ZhbGlkYXRpb24ocGVybWlzc2lvbnMsIHJvdXRlLCBzdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzUGFyYW1ldGVyQXZhaWxhYmxlKHBlcm1pc3Npb25zLm9ubHkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhc3NpbmdPbmx5UGVybWlzc2lvbnNWYWxpZGF0aW9uKHBlcm1pc3Npb25zLCByb3V0ZSwgc3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHB1cmVQZXJtaXNzaW9uc1xyXG4gICAgICogQHBhcmFtIHs/fSByb3V0ZVxyXG4gICAgICogQHBhcmFtIHs/fSBzdGF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNHdWFyZC5wcm90b3R5cGUudHJhbnNmb3JtUGVybWlzc2lvbiA9IC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gcHVyZVBlcm1pc3Npb25zXHJcbiAgICAgKiBAcGFyYW0gez99IHJvdXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHN0YXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAocHVyZVBlcm1pc3Npb25zLCByb3V0ZSwgc3RhdGUpIHtcclxuICAgICAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICAgICAgdmFyIHBlcm1pc3Npb25zID0gdHNsaWJfMS5fX2Fzc2lnbih7fSwgcHVyZVBlcm1pc3Npb25zKTtcclxuICAgICAgICBpZiAoaXNGdW5jdGlvbihwZXJtaXNzaW9ucy5leGNlcHQpKSB7XHJcbiAgICAgICAgICAgIHBlcm1pc3Npb25zLmV4Y2VwdCA9ICgoLyoqIEB0eXBlIHs/fSAqLyAocGVybWlzc2lvbnMuZXhjZXB0KSkpKHJvdXRlLCBzdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHBlcm1pc3Npb25zLm9ubHkpKSB7XHJcbiAgICAgICAgICAgIHBlcm1pc3Npb25zLm9ubHkgPSAoKC8qKiBAdHlwZSB7P30gKi8gKHBlcm1pc3Npb25zLm9ubHkpKSkocm91dGUsIHN0YXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGVybWlzc2lvbnMuZXhjZXB0ID0gdHJhbnNmb3JtU3RyaW5nVG9BcnJheShwZXJtaXNzaW9ucy5leGNlcHQpO1xyXG4gICAgICAgIHBlcm1pc3Npb25zLm9ubHkgPSB0cmFuc2Zvcm1TdHJpbmdUb0FycmF5KHBlcm1pc3Npb25zLm9ubHkpO1xyXG4gICAgICAgIHJldHVybiBwZXJtaXNzaW9ucztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHBlcm1pc3Npb25cclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zR3VhcmQucHJvdG90eXBlLmlzUGFyYW1ldGVyQXZhaWxhYmxlID0gLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSBwZXJtaXNzaW9uXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAocGVybWlzc2lvbikge1xyXG4gICAgICAgIHJldHVybiAhIShwZXJtaXNzaW9uKSAmJiBwZXJtaXNzaW9uLmxlbmd0aCA+IDA7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSBwZXJtaXNzaW9uc1xyXG4gICAgICogQHBhcmFtIHs/fSByb3V0ZVxyXG4gICAgICogQHBhcmFtIHs/fSBzdGF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNHdWFyZC5wcm90b3R5cGUucGFzc2luZ0V4Y2VwdFBlcm1pc3Npb25zVmFsaWRhdGlvbiA9IC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gcGVybWlzc2lvbnNcclxuICAgICAqIEBwYXJhbSB7P30gcm91dGVcclxuICAgICAqIEBwYXJhbSB7P30gc3RhdGVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIChwZXJtaXNzaW9ucywgcm91dGUsIHN0YXRlKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoISFwZXJtaXNzaW9ucy5yZWRpcmVjdFRvICYmICgoaXNGdW5jdGlvbihwZXJtaXNzaW9ucy5yZWRpcmVjdFRvKSkgfHwgKGlzUGxhaW5PYmplY3QocGVybWlzc2lvbnMucmVkaXJlY3RUbykgJiYgIXRoaXMuaXNSZWRpcmVjdGlvbldpdGhQYXJhbWV0ZXJzKHBlcm1pc3Npb25zLnJlZGlyZWN0VG8pKSkpIHtcclxuICAgICAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgICAgICAgICB2YXIgZmFpbGVkUGVybWlzc2lvbl8xID0gJyc7XHJcbiAgICAgICAgICAgIHJldHVybiBmcm9tKCgvKiogQHR5cGUgez99ICovIChwZXJtaXNzaW9ucy5leGNlcHQpKSkucGlwZShtZXJnZU1hcCgoLyoqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7P30gZGF0YVxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmb3JrSm9pbihbXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucGVybWlzc2lvbnNTZXJ2aWNlLmhhc1Blcm1pc3Npb24oKC8qKiBAdHlwZSB7P30gKi8gKGRhdGEpKSksXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucm9sZXNTZXJ2aWNlLmhhc09ubHlSb2xlcygoLyoqIEB0eXBlIHs/fSAqLyAoZGF0YSkpKVxyXG4gICAgICAgICAgICAgICAgXSkucGlwZSh0YXAoKC8qKlxyXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHs/fSBoYXNQZXJtaXNzaW9uc1xyXG4gICAgICAgICAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGhhc1Blcm1pc3Npb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkb250SGF2ZVBlcm1pc3Npb25zID0gaGFzUGVybWlzc2lvbnMuZXZlcnkoKC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7P30gZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIGRhdGEgPT09IGZhbHNlOyB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkb250SGF2ZVBlcm1pc3Npb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWxlZFBlcm1pc3Npb25fMSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICAgICAgfSkpLCBmaXJzdCgoLyoqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7P30gZGF0YVxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIGRhdGEuc29tZSgoLyoqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7P30gZGF0YVxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIGRhdGEgPT09IHRydWU7IH0pKTsgfSksIGZhbHNlKSwgbWVyZ2VNYXAoKC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gez99IGlzQWxsRmFsc2VcclxuICAgICAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChpc0FsbEZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISFmYWlsZWRQZXJtaXNzaW9uXzEpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5oYW5kbGVSZWRpcmVjdE9mRmFpbGVkUGVybWlzc2lvbihwZXJtaXNzaW9ucywgZmFpbGVkUGVybWlzc2lvbl8xLCByb3V0ZSwgc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzQWxsRmFsc2UgJiYgcGVybWlzc2lvbnMub25seSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5vbmx5UmVkaXJlY3RDaGVjayhwZXJtaXNzaW9ucywgcm91dGUsIHN0YXRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBvZighaXNBbGxGYWxzZSk7XHJcbiAgICAgICAgICAgIH0pKSkudG9Qcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5wZXJtaXNzaW9uc1NlcnZpY2UuaGFzUGVybWlzc2lvbigoLyoqIEB0eXBlIHs/fSAqLyAocGVybWlzc2lvbnMuZXhjZXB0KSkpLCB0aGlzLnJvbGVzU2VydmljZS5oYXNPbmx5Um9sZXMoKC8qKiBAdHlwZSB7P30gKi8gKHBlcm1pc3Npb25zLmV4Y2VwdCkpKV0pXHJcbiAgICAgICAgICAgIC50aGVuKCgvKipcclxuICAgICAgICAgKiBAcGFyYW0gez99IF9fMFxyXG4gICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgIHZhciBfYiA9IHRzbGliXzEuX19yZWFkKF9hLCAyKSwgaGFzUGVybWlzc2lvbiA9IF9iWzBdLCBoYXNSb2xlcyA9IF9iWzFdO1xyXG4gICAgICAgICAgICBpZiAoaGFzUGVybWlzc2lvbiB8fCBoYXNSb2xlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBlcm1pc3Npb25zLnJlZGlyZWN0VG8pIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZWRpcmVjdFRvQW5vdGhlclJvdXRlKHBlcm1pc3Npb25zLnJlZGlyZWN0VG8sIHJvdXRlLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBlcm1pc3Npb25zLm9ubHkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5jaGVja09ubHlQZXJtaXNzaW9ucyhwZXJtaXNzaW9ucywgcm91dGUsIHN0YXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSByZWRpcmVjdFRvXHJcbiAgICAgKiBAcGFyYW0gez99IHJvdXRlXHJcbiAgICAgKiBAcGFyYW0gez89fSBzdGF0ZVxyXG4gICAgICogQHBhcmFtIHs/PX0gZmFpbGVkUGVybWlzc2lvbk5hbWVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zR3VhcmQucHJvdG90eXBlLnJlZGlyZWN0VG9Bbm90aGVyUm91dGUgPSAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHJlZGlyZWN0VG9cclxuICAgICAqIEBwYXJhbSB7P30gcm91dGVcclxuICAgICAqIEBwYXJhbSB7Pz19IHN0YXRlXHJcbiAgICAgKiBAcGFyYW0gez89fSBmYWlsZWRQZXJtaXNzaW9uTmFtZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gKHJlZGlyZWN0VG8sIHJvdXRlLCBzdGF0ZSwgZmFpbGVkUGVybWlzc2lvbk5hbWUpIHtcclxuICAgICAgICBpZiAoaXNGdW5jdGlvbihyZWRpcmVjdFRvKSkge1xyXG4gICAgICAgICAgICByZWRpcmVjdFRvID0gKCgvKiogQHR5cGUgez99ICovIChyZWRpcmVjdFRvKSkpKGZhaWxlZFBlcm1pc3Npb25OYW1lLCByb3V0ZSwgc3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc1JlZGlyZWN0aW9uV2l0aFBhcmFtZXRlcnMocmVkaXJlY3RUbykpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzTmF2aWdhdGlvbkV4dHJhc0FzRnVuY3Rpb24ocmVkaXJlY3RUbykpIHtcclxuICAgICAgICAgICAgICAgICgoLyoqIEB0eXBlIHs/fSAqLyAocmVkaXJlY3RUbykpKS5uYXZpZ2F0aW9uRXh0cmFzID0gKCgvKiogQHR5cGUgez99ICovICgoKC8qKiBAdHlwZSB7P30gKi8gKHJlZGlyZWN0VG8pKSkubmF2aWdhdGlvbkV4dHJhcykpKShyb3V0ZSwgc3RhdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc05hdmlnYXRpb25Db21tYW5kc0FzRnVuY3Rpb24ocmVkaXJlY3RUbykpIHtcclxuICAgICAgICAgICAgICAgICgoLyoqIEB0eXBlIHs/fSAqLyAocmVkaXJlY3RUbykpKS5uYXZpZ2F0aW9uQ29tbWFuZHMgPSAoKC8qKiBAdHlwZSB7P30gKi8gKCgoLyoqIEB0eXBlIHs/fSAqLyAocmVkaXJlY3RUbykpKS5uYXZpZ2F0aW9uQ29tbWFuZHMpKSkocm91dGUsIHN0YXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZSgoKC8qKiBAdHlwZSB7P30gKi8gKCgoLyoqIEB0eXBlIHs/fSAqLyAocmVkaXJlY3RUbykpKS5uYXZpZ2F0aW9uQ29tbWFuZHMpKSksICgoLyoqIEB0eXBlIHs/fSAqLyAoKCgvKiogQHR5cGUgez99ICovIChyZWRpcmVjdFRvKSkpLm5hdmlnYXRpb25FeHRyYXMpKSkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlZGlyZWN0VG8pKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKHJlZGlyZWN0VG8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3JlZGlyZWN0VG9dKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSBvYmplY3RcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zR3VhcmQucHJvdG90eXBlLmlzUmVkaXJlY3Rpb25XaXRoUGFyYW1ldGVycyA9IC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAob2JqZWN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGlzUGxhaW5PYmplY3Qob2JqZWN0KSAmJiAoISFvYmplY3QubmF2aWdhdGlvbkNvbW1hbmRzIHx8ICEhb2JqZWN0Lm5hdmlnYXRpb25FeHRyYXMpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gcmVkaXJlY3RUb1xyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNHdWFyZC5wcm90b3R5cGUuaGFzTmF2aWdhdGlvbkV4dHJhc0FzRnVuY3Rpb24gPSAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHJlZGlyZWN0VG9cclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIChyZWRpcmVjdFRvKSB7XHJcbiAgICAgICAgcmV0dXJuICEhKCgvKiogQHR5cGUgez99ICovIChyZWRpcmVjdFRvKSkpLm5hdmlnYXRpb25FeHRyYXMgJiZcclxuICAgICAgICAgICAgaXNGdW5jdGlvbigoKC8qKiBAdHlwZSB7P30gKi8gKHJlZGlyZWN0VG8pKSkubmF2aWdhdGlvbkV4dHJhcyk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSByZWRpcmVjdFRvXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0d1YXJkLnByb3RvdHlwZS5oYXNOYXZpZ2F0aW9uQ29tbWFuZHNBc0Z1bmN0aW9uID0gLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSByZWRpcmVjdFRvXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAocmVkaXJlY3RUbykge1xyXG4gICAgICAgIHJldHVybiAhISgoLyoqIEB0eXBlIHs/fSAqLyAocmVkaXJlY3RUbykpKS5uYXZpZ2F0aW9uQ29tbWFuZHMgJiZcclxuICAgICAgICAgICAgaXNGdW5jdGlvbigoKC8qKiBAdHlwZSB7P30gKi8gKHJlZGlyZWN0VG8pKSkubmF2aWdhdGlvbkNvbW1hbmRzKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHBlcm1pc3Npb25zXHJcbiAgICAgKiBAcGFyYW0gez99IHJvdXRlXHJcbiAgICAgKiBAcGFyYW0gez89fSBzdGF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNHdWFyZC5wcm90b3R5cGUub25seVJlZGlyZWN0Q2hlY2sgPSAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHBlcm1pc3Npb25zXHJcbiAgICAgKiBAcGFyYW0gez99IHJvdXRlXHJcbiAgICAgKiBAcGFyYW0gez89fSBzdGF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gKHBlcm1pc3Npb25zLCByb3V0ZSwgc3RhdGUpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgICAgICB2YXIgZmFpbGVkUGVybWlzc2lvbiA9ICcnO1xyXG4gICAgICAgIHJldHVybiBmcm9tKHBlcm1pc3Npb25zLm9ubHkpLnBpcGUobWVyZ2VNYXAoKC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7P30gZGF0YVxyXG4gICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcmtKb2luKFtcclxuICAgICAgICAgICAgICAgIF90aGlzLnBlcm1pc3Npb25zU2VydmljZS5oYXNQZXJtaXNzaW9uKCgvKiogQHR5cGUgez99ICovIChkYXRhKSkpLFxyXG4gICAgICAgICAgICAgICAgX3RoaXMucm9sZXNTZXJ2aWNlLmhhc09ubHlSb2xlcygoLyoqIEB0eXBlIHs/fSAqLyAoZGF0YSkpKVxyXG4gICAgICAgICAgICBdKS5waXBlKHRhcCgoLyoqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7P30gaGFzUGVybWlzc2lvblxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZnVuY3Rpb24gKGhhc1Blcm1pc3Npb24pIHtcclxuICAgICAgICAgICAgICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgICAgICAgICAgICAgIHZhciBmYWlsZWQgPSBoYXNQZXJtaXNzaW9uLmV2ZXJ5KCgvKipcclxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7P30gZGF0YVxyXG4gICAgICAgICAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIGRhdGEgPT09IGZhbHNlOyB9KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmFpbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmFpbGVkUGVybWlzc2lvbiA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgfSkpLCBmaXJzdCgoLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHs/fSBkYXRhXHJcbiAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihwZXJtaXNzaW9ucy5yZWRpcmVjdFRvKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuc29tZSgoLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0gez99IGRhdGFcclxuICAgICAgICAgICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBkYXRhID09PSB0cnVlOyB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGEuZXZlcnkoKC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gez99IGRhdGFcclxuICAgICAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBkYXRhID09PSBmYWxzZTsgfSkpO1xyXG4gICAgICAgIH0pLCBmYWxzZSksIG1lcmdlTWFwKCgvKipcclxuICAgICAgICAgKiBAcGFyYW0gez99IHBhc3NcclxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIChwYXNzKSB7XHJcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHBlcm1pc3Npb25zLnJlZGlyZWN0VG8pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZih0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmhhbmRsZVJlZGlyZWN0T2ZGYWlsZWRQZXJtaXNzaW9uKHBlcm1pc3Npb25zLCBmYWlsZWRQZXJtaXNzaW9uLCByb3V0ZSwgc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISFmYWlsZWRQZXJtaXNzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGFuZGxlUmVkaXJlY3RPZkZhaWxlZFBlcm1pc3Npb24ocGVybWlzc2lvbnMsIGZhaWxlZFBlcm1pc3Npb24sIHJvdXRlLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2YoIXBhc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpKS50b1Byb21pc2UoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHBlcm1pc3Npb25zXHJcbiAgICAgKiBAcGFyYW0gez99IGZhaWxlZFBlcm1pc3Npb25cclxuICAgICAqIEBwYXJhbSB7P30gcm91dGVcclxuICAgICAqIEBwYXJhbSB7Pz19IHN0YXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0d1YXJkLnByb3RvdHlwZS5oYW5kbGVSZWRpcmVjdE9mRmFpbGVkUGVybWlzc2lvbiA9IC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gcGVybWlzc2lvbnNcclxuICAgICAqIEBwYXJhbSB7P30gZmFpbGVkUGVybWlzc2lvblxyXG4gICAgICogQHBhcmFtIHs/fSByb3V0ZVxyXG4gICAgICogQHBhcmFtIHs/PX0gc3RhdGVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIChwZXJtaXNzaW9ucywgZmFpbGVkUGVybWlzc2lvbiwgcm91dGUsIHN0YXRlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNGYWlsZWRQZXJtaXNzaW9uUHJvcGVydHlPZlJlZGlyZWN0VG8ocGVybWlzc2lvbnMsIGZhaWxlZFBlcm1pc3Npb24pKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVkaXJlY3RUb0Fub3RoZXJSb3V0ZSgoKC8qKiBAdHlwZSB7P30gKi8gKHBlcm1pc3Npb25zLnJlZGlyZWN0VG8pKSlbZmFpbGVkUGVybWlzc2lvbl0sIHJvdXRlLCBzdGF0ZSwgZmFpbGVkUGVybWlzc2lvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihwZXJtaXNzaW9ucy5yZWRpcmVjdFRvKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWRpcmVjdFRvQW5vdGhlclJvdXRlKCgoLyoqIEB0eXBlIHs/fSAqLyAocGVybWlzc2lvbnMucmVkaXJlY3RUbykpKSwgcm91dGUsIHN0YXRlLCBmYWlsZWRQZXJtaXNzaW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVkaXJlY3RUb0Fub3RoZXJSb3V0ZSgoKC8qKiBAdHlwZSB7P30gKi8gKHBlcm1pc3Npb25zLnJlZGlyZWN0VG8pKSlbJ2RlZmF1bHQnXSwgcm91dGUsIHN0YXRlLCBmYWlsZWRQZXJtaXNzaW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHBlcm1pc3Npb25zXHJcbiAgICAgKiBAcGFyYW0gez99IGZhaWxlZFBlcm1pc3Npb25cclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zR3VhcmQucHJvdG90eXBlLmlzRmFpbGVkUGVybWlzc2lvblByb3BlcnR5T2ZSZWRpcmVjdFRvID0gLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSBwZXJtaXNzaW9uc1xyXG4gICAgICogQHBhcmFtIHs/fSBmYWlsZWRQZXJtaXNzaW9uXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAocGVybWlzc2lvbnMsIGZhaWxlZFBlcm1pc3Npb24pIHtcclxuICAgICAgICByZXR1cm4gISFwZXJtaXNzaW9ucy5yZWRpcmVjdFRvICYmIHBlcm1pc3Npb25zLnJlZGlyZWN0VG9bKC8qKiBAdHlwZSB7P30gKi8gKGZhaWxlZFBlcm1pc3Npb24pKV07XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSBwdXJlUGVybWlzc2lvbnNcclxuICAgICAqIEBwYXJhbSB7P30gcm91dGVcclxuICAgICAqIEBwYXJhbSB7Pz19IHN0YXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0d1YXJkLnByb3RvdHlwZS5jaGVja09ubHlQZXJtaXNzaW9ucyA9IC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gcHVyZVBlcm1pc3Npb25zXHJcbiAgICAgKiBAcGFyYW0gez99IHJvdXRlXHJcbiAgICAgKiBAcGFyYW0gez89fSBzdGF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gKHB1cmVQZXJtaXNzaW9ucywgcm91dGUsIHN0YXRlKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICAgICAgdmFyIHBlcm1pc3Npb25zID0gdHNsaWJfMS5fX2Fzc2lnbih7fSwgcHVyZVBlcm1pc3Npb25zKTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3RoaXMucGVybWlzc2lvbnNTZXJ2aWNlLmhhc1Blcm1pc3Npb24oKC8qKiBAdHlwZSB7P30gKi8gKHBlcm1pc3Npb25zLm9ubHkpKSksIHRoaXMucm9sZXNTZXJ2aWNlLmhhc09ubHlSb2xlcygoLyoqIEB0eXBlIHs/fSAqLyAocGVybWlzc2lvbnMub25seSkpKV0pXHJcbiAgICAgICAgICAgIC50aGVuKCgvKipcclxuICAgICAgICAgKiBAcGFyYW0gez99IF9fMFxyXG4gICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgIHZhciBfYiA9IHRzbGliXzEuX19yZWFkKF9hLCAyKSwgaGFzUGVybWlzc2lvbiA9IF9iWzBdLCBoYXNSb2xlID0gX2JbMV07XHJcbiAgICAgICAgICAgIGlmIChoYXNQZXJtaXNzaW9uIHx8IGhhc1JvbGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHBlcm1pc3Npb25zLnJlZGlyZWN0VG8pIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnJlZGlyZWN0VG9Bbm90aGVyUm91dGUocGVybWlzc2lvbnMucmVkaXJlY3RUbywgcm91dGUsIHN0YXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gcGVybWlzc2lvbnNcclxuICAgICAqIEBwYXJhbSB7P30gcm91dGVcclxuICAgICAqIEBwYXJhbSB7Pz19IHN0YXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0d1YXJkLnByb3RvdHlwZS5wYXNzaW5nT25seVBlcm1pc3Npb25zVmFsaWRhdGlvbiA9IC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gcGVybWlzc2lvbnNcclxuICAgICAqIEBwYXJhbSB7P30gcm91dGVcclxuICAgICAqIEBwYXJhbSB7Pz19IHN0YXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAocGVybWlzc2lvbnMsIHJvdXRlLCBzdGF0ZSkge1xyXG4gICAgICAgIGlmICgoaXNGdW5jdGlvbihwZXJtaXNzaW9ucy5yZWRpcmVjdFRvKSB8fCBpc1BsYWluT2JqZWN0KHBlcm1pc3Npb25zLnJlZGlyZWN0VG8pICYmICF0aGlzLmlzUmVkaXJlY3Rpb25XaXRoUGFyYW1ldGVycyhwZXJtaXNzaW9ucy5yZWRpcmVjdFRvKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub25seVJlZGlyZWN0Q2hlY2socGVybWlzc2lvbnMsIHJvdXRlLCBzdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrT25seVBlcm1pc3Npb25zKHBlcm1pc3Npb25zLCByb3V0ZSwgc3RhdGUpO1xyXG4gICAgfTtcclxuICAgIE5neFBlcm1pc3Npb25zR3VhcmQuZGVjb3JhdG9ycyA9IFtcclxuICAgICAgICB7IHR5cGU6IEluamVjdGFibGUgfVxyXG4gICAgXTtcclxuICAgIC8qKiBAbm9jb2xsYXBzZSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNHdWFyZC5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcclxuICAgICAgICB7IHR5cGU6IE5neFBlcm1pc3Npb25zU2VydmljZSB9LFxyXG4gICAgICAgIHsgdHlwZTogTmd4Um9sZXNTZXJ2aWNlIH0sXHJcbiAgICAgICAgeyB0eXBlOiBSb3V0ZXIgfVxyXG4gICAgXTsgfTtcclxuICAgIHJldHVybiBOZ3hQZXJtaXNzaW9uc0d1YXJkO1xyXG59KCkpO1xyXG5leHBvcnQgeyBOZ3hQZXJtaXNzaW9uc0d1YXJkIH07XHJcbmlmIChmYWxzZSkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7P31cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zR3VhcmQucHJvdG90eXBlLnBlcm1pc3Npb25zU2VydmljZTtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgez99XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0d1YXJkLnByb3RvdHlwZS5yb2xlc1NlcnZpY2U7XHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHs/fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNHdWFyZC5wcm90b3R5cGUucm91dGVyO1xyXG59XHIiXX0=