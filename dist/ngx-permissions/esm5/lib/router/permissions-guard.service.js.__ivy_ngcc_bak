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
    NgxPermissionsGuard.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NgxPermissionsGuard.ctorParameters = function () { return [
        { type: NgxPermissionsService },
        { type: NgxRolesService },
        { type: Router }
    ]; };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbnMtZ3VhcmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1wZXJtaXNzaW9ucy8iLCJzb3VyY2VzIjpbImxpYi9yb3V0ZXIvcGVybWlzc2lvbnMtZ3VhcmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQU9ILE1BQU0sRUFFVCxNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd0RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUVuRixnREFHQzs7O0lBRkcsK0RBQXFDOztJQUNyQyw2REFBK0M7O0FBR25EO0lBR0ksNkJBQW9CLGtCQUF5QyxFQUFXLFlBQTZCLEVBQVUsTUFBYztRQUF6Ryx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXVCO1FBQVcsaUJBQVksR0FBWixZQUFZLENBQWlCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUM3SCxDQUFDOzs7Ozs7SUFFRCx5Q0FBVzs7Ozs7SUFBWCxVQUFZLEtBQTZCLEVBQUUsS0FBMEI7UUFDakUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs7Ozs7SUFFRCw4Q0FBZ0I7Ozs7O0lBQWhCLFVBQWlCLFVBQWtDLEVBQUUsS0FBMEI7UUFDM0UsT0FBTyxJQUFJLENBQUMs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QUUxQyxJQUFJLFdBQVcsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3hCLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNyRTtZQUVELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUMsRUFBQyxDQUFDO0lBQ1gsQ0FBQzs7Ozs7Ozs7SUFFTyw4REFBZ0M7Ozs7Ozs7SUFBeEMsVUFBeUMsV0FBcUMsRUFBRSxLQUFxQyxFQUFFLEtBQTJCO1FBQzlJLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUU7WUFDNUksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtTQUMzRDtRQUNELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEUsQ0FBQzs7Z0JBM1BKLFVBQVU7Ozs7Z0JBVEYscUJBQXFCO2dCQUNyQixlQUFlO2dCQVRwQixNQUFNOztJQThRViwwQkFBQztDQUFBLEFBN1BELElBNlBDO1NBNVBZLG1CQUFtQjs7Ozs7O0lBRWhCLGlEQUFpRDs7Ozs7SUFBRSwyQ0FBc0M7Ozs7O0lBQUUscUNBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gICAgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcclxuICAgIENhbkFjdGl2YXRlLFxyXG4gICAgQ2FuQWN0aXZhdGVDaGlsZCxcclxuICAgIENhbkxvYWQsXHJcbiAgICBOYXZpZ2F0aW9uRXh0cmFzLFxyXG4gICAgUm91dGUsXHJcbiAgICBSb3V0ZXIsXHJcbiAgICBSb3V0ZXJTdGF0ZVNuYXBzaG90XHJcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IGZvcmtKb2luLCBmcm9tLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaXJzdCwgbWVyZ2VNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IE5neFBlcm1pc3Npb25zUm91dGVyRGF0YSB9IGZyb20gJy4uL21vZGVsL3Blcm1pc3Npb25zLXJvdXRlci1kYXRhLm1vZGVsJztcclxuaW1wb3J0IHsgTmd4UGVybWlzc2lvbnNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9wZXJtaXNzaW9ucy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd4Um9sZXNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9yb2xlcy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgaXNGdW5jdGlvbiwgaXNQbGFpbk9iamVjdCwgdHJhbnNmb3JtU3RyaW5nVG9BcnJheSB9IGZyb20gJy4uL3V0aWxzL3V0aWxzJztcclxuXHJcbmludGVyZmFjZSBOZ3hSZWRpcmVjdFRvTmF2aWdhdGlvblBhcmFtZXRlcnMge1xyXG4gICAgbmF2aWdhdGlvbkNvbW1hbmRzOiBhbnlbXSB8IEZ1bmN0aW9uO1xyXG4gICAgbmF2aWdhdGlvbkV4dHJhcz86IE5hdmlnYXRpb25FeHRyYXMgfCBGdW5jdGlvbjtcclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTmd4UGVybWlzc2lvbnNHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlLCBDYW5Mb2FkLCBDYW5BY3RpdmF0ZUNoaWxkIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBlcm1pc3Npb25zU2VydmljZTogTmd4UGVybWlzc2lvbnNTZXJ2aWNlLCBwcml2YXRlICByb2xlc1NlcnZpY2U6IE5neFJvbGVzU2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xyXG4gICAgfVxyXG5cclxuICAgIGNhbkFjdGl2YXRlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IFByb21pc2U8Ym9vbGVhbj4gfCBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oYXNQZXJtaXNzaW9ucyhyb3V0ZSwgc3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbkFjdGl2YXRlQ2hpbGQoY2hpbGRSb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHwgUHJvbWlzZTxib29sZWFuPiB8IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhhc1Blcm1pc3Npb25zKGNoaWxkUm91dGUsIHN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBjYW5Mb2FkKHJvdXRlOiBSb3V0ZSk6IGJvb2xlYW4gfCBPYnNlcnZhYmxlPGJvb2xlYW4+IHwgUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzUGVybWlzc2lvbnMocm91dGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFzUGVybWlzc2lvbnMocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QgfCBSb3V0ZSwgc3RhdGU/OiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSB7XHJcbiAgICAgICAgY29uc3QgcHVyZVBlcm1pc3Npb25zID0gISFyb3V0ZSAmJiByb3V0ZS5kYXRhID8gcm91dGUuZGF0YVsncGVybWlzc2lvbnMnXSBhcyBOZ3hQZXJtaXNzaW9uc1JvdXRlckRhdGEgOiB7fTtcclxuICAgICAgICBsZXQgcGVybWlzc2lvbnM6IE5neFBlcm1pc3Npb25zUm91dGVyRGF0YSA9IHRoaXMudHJhbnNmb3JtUGVybWlzc2lvbihwdXJlUGVybWlzc2lvbnMsIHJvdXRlLCBzdGF0ZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzUGFyYW1ldGVyQXZhaWxhYmxlKHBlcm1pc3Npb25zLmV4Y2VwdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFzc2luZ0V4Y2VwdFBlcm1pc3Npb25zVmFsaWRhdGlvbihwZXJtaXNzaW9ucywgcm91dGUsIHN0YXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzUGFyYW1ldGVyQXZhaWxhYmxlKHBlcm1pc3Npb25zLm9ubHkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhc3NpbmdPbmx5UGVybWlzc2lvbnNWYWxpZGF0aW9uKHBlcm1pc3Npb25zLCByb3V0ZSwgc3RhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmFuc2Zvcm1QZXJtaXNzaW9uKHB1cmVQZXJtaXNzaW9uczogTmd4UGVybWlzc2lvbnNSb3V0ZXJEYXRhLCByb3V0ZTogYW55LCBzdGF0ZTogYW55KTogYW55IHtcclxuICAgICAgICBsZXQgcGVybWlzc2lvbnMgPSB7XHJcbiAgICAgICAgICAgIC4uLnB1cmVQZXJtaXNzaW9uc1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHBlcm1pc3Npb25zLmV4Y2VwdCkpIHtcclxuICAgICAgICAgICAgcGVybWlzc2lvbnMuZXhjZXB0ID0gKHBlcm1pc3Npb25zLmV4Y2VwdCBhcyBGdW5jdGlvbikocm91dGUsIHN0YXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHBlcm1pc3Npb25zLm9ubHkpKSB7XHJcbiAgICAgICAgICAgIHBlcm1pc3Npb25zLm9ubHkgPSAocGVybWlzc2lvbnMub25seSBhcyBGdW5jdGlvbikocm91dGUsIHN0YXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBlcm1pc3Npb25zLmV4Y2VwdCA9IHRyYW5zZm9ybVN0cmluZ1RvQXJyYXkocGVybWlzc2lvbnMuZXhjZXB0KTtcclxuICAgICAgICBwZXJtaXNzaW9ucy5vbmx5ID0gdHJhbnNmb3JtU3RyaW5nVG9BcnJheShwZXJtaXNzaW9ucy5vbmx5KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBlcm1pc3Npb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNQYXJhbWV0ZXJBdmFpbGFibGUocGVybWlzc2lvbjogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuICEhKHBlcm1pc3Npb24pICYmIHBlcm1pc3Npb24ubGVuZ3RoID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBhc3NpbmdFeGNlcHRQZXJtaXNzaW9uc1ZhbGlkYXRpb24ocGVybWlzc2lvbnM6IE5neFBlcm1pc3Npb25zUm91dGVyRGF0YSwgcm91dGU6IGFueSwgc3RhdGU6IGFueSkge1xyXG4gICAgICAgIGlmICghIXBlcm1pc3Npb25zLnJlZGlyZWN0VG8gJiYgKChpc0Z1bmN0aW9uKHBlcm1pc3Npb25zLnJlZGlyZWN0VG8pKSB8fCAoaXNQbGFpbk9iamVjdChwZXJtaXNzaW9ucy5yZWRpcmVjdFRvKSAmJiAhdGhpcy5pc1JlZGlyZWN0aW9uV2l0aFBhcmFtZXRlcnMoXHJcbiAgICAgICAgICAgIHBlcm1pc3Npb25zLnJlZGlyZWN0VG8pKSkpIHtcclxuICAgICAgICAgICAgbGV0IGZhaWxlZFBlcm1pc3Npb24gPSAnJztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmcm9tKHBlcm1pc3Npb25zLmV4Y2VwdCBhcyBhbnlbXSkucGlwZShcclxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcmtKb2luKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXJtaXNzaW9uc1NlcnZpY2UuaGFzUGVybWlzc2lvbig8c3RyaW5nIHwgc3RyaW5nW10+ZGF0YSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZXNTZXJ2aWNlLmhhc09ubHlSb2xlcyg8c3RyaW5nIHwgc3RyaW5nW10+ZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICBdKS5waXBlKHRhcCgoaGFzUGVybWlzc2lvbnM6IGJvb2xlYW5bXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkb250SGF2ZVBlcm1pc3Npb25zID0gaGFzUGVybWlzc2lvbnMuZXZlcnkoKGRhdGEpID0+IGRhdGEgPT09IGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZG9udEhhdmVQZXJtaXNzaW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFpbGVkUGVybWlzc2lvbiA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGZpcnN0KChkYXRhOiBhbnkpID0+IGRhdGEuc29tZSgoZGF0YTogYm9vbGVhbikgPT4gZGF0YSA9PT0gdHJ1ZSksIGZhbHNlKSxcclxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKChpc0FsbEZhbHNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhZmFpbGVkUGVybWlzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVJlZGlyZWN0T2ZGYWlsZWRQZXJtaXNzaW9uKHBlcm1pc3Npb25zLCBmYWlsZWRQZXJtaXNzaW9uLCByb3V0ZSwgc3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNBbGxGYWxzZSAmJiBwZXJtaXNzaW9ucy5vbmx5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9ubHlSZWRpcmVjdENoZWNrKHBlcm1pc3Npb25zLCByb3V0ZSwgc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKCFpc0FsbEZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICkudG9Qcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3RoaXMucGVybWlzc2lvbnNTZXJ2aWNlLmhhc1Blcm1pc3Npb24oPHN0cmluZyB8IHN0cmluZ1tdPnBlcm1pc3Npb25zLmV4Y2VwdCksIHRoaXMucm9sZXNTZXJ2aWNlLmhhc09ubHlSb2xlcyg8c3RyaW5nIHwgc3RyaW5nW10+cGVybWlzc2lvbnMuZXhjZXB0KV0pXHJcbiAgICAgICAgICAgIC50aGVuKChbaGFzUGVybWlzc2lvbiwgaGFzUm9sZXNdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGFzUGVybWlzc2lvbiB8fCBoYXNSb2xlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwZXJtaXNzaW9ucy5yZWRpcmVjdFRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVkaXJlY3RUb0Fub3RoZXJSb3V0ZShwZXJtaXNzaW9ucy5yZWRpcmVjdFRvLCByb3V0ZSwgc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGVybWlzc2lvbnMub25seSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNoZWNrT25seVBlcm1pc3Npb25zKHBlcm1pc3Npb25zLCByb3V0ZSwgc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVkaXJlY3RUb0Fub3RoZXJSb3V0ZShyZWRpcmVjdFRvOiBzdHJpbmcgfCBhbnlbXSB8IE5neFJlZGlyZWN0VG9OYXZpZ2F0aW9uUGFyYW1ldGVycyB8IEZ1bmN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90IHwgUm91dGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU/OiBSb3V0ZXJTdGF0ZVNuYXBzaG90LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWxlZFBlcm1pc3Npb25OYW1lPzogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHJlZGlyZWN0VG8pKSB7XHJcbiAgICAgICAgICAgIHJlZGlyZWN0VG8gPSAocmVkaXJlY3RUbyBhcyBGdW5jdGlvbikoZmFpbGVkUGVybWlzc2lvbk5hbWUsIHJvdXRlLCBzdGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1JlZGlyZWN0aW9uV2l0aFBhcmFtZXRlcnMocmVkaXJlY3RUbykpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzTmF2aWdhdGlvbkV4dHJhc0FzRnVuY3Rpb24ocmVkaXJlY3RUbykpIHtcclxuICAgICAgICAgICAgICAgICg8Tmd4UmVkaXJlY3RUb05hdmlnYXRpb25QYXJhbWV0ZXJzPnJlZGlyZWN0VG8pLm5hdmlnYXRpb25FeHRyYXMgPSAoKDxOZ3hSZWRpcmVjdFRvTmF2aWdhdGlvblBhcmFtZXRlcnM+cmVkaXJlY3RUbykubmF2aWdhdGlvbkV4dHJhcyBhcyBGdW5jdGlvbikoXHJcbiAgICAgICAgICAgICAgICAgICAgcm91dGUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc05hdmlnYXRpb25Db21tYW5kc0FzRnVuY3Rpb24ocmVkaXJlY3RUbykpIHtcclxuICAgICAgICAgICAgICAgICg8Tmd4UmVkaXJlY3RUb05hdmlnYXRpb25QYXJhbWV0ZXJzPnJlZGlyZWN0VG8pLm5hdmlnYXRpb25Db21tYW5kcyA9ICgoPE5neFJlZGlyZWN0VG9OYXZpZ2F0aW9uUGFyYW1ldGVycz5yZWRpcmVjdFRvKS5uYXZpZ2F0aW9uQ29tbWFuZHMgYXMgRnVuY3Rpb24pKFxyXG4gICAgICAgICAgICAgICAgICAgIHJvdXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICgoPE5neFJlZGlyZWN0VG9OYXZpZ2F0aW9uUGFyYW1ldGVycz5yZWRpcmVjdFRvKS5uYXZpZ2F0aW9uQ29tbWFuZHMgYXMgYW55W10pLFxyXG4gICAgICAgICAgICAgICAgKCg8Tmd4UmVkaXJlY3RUb05hdmlnYXRpb25QYXJhbWV0ZXJzPiByZWRpcmVjdFRvKS5uYXZpZ2F0aW9uRXh0cmFzIGFzIE5hdmlnYXRpb25FeHRyYXMpXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZWRpcmVjdFRvKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShyZWRpcmVjdFRvKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcmVkaXJlY3RUb10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzUmVkaXJlY3Rpb25XaXRoUGFyYW1ldGVycyhvYmplY3Q6IGFueSB8IE5neFJlZGlyZWN0VG9OYXZpZ2F0aW9uUGFyYW1ldGVycyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBpc1BsYWluT2JqZWN0KG9iamVjdCkgJiYgKCEhb2JqZWN0Lm5hdmlnYXRpb25Db21tYW5kcyB8fCAhIW9iamVjdC5uYXZpZ2F0aW9uRXh0cmFzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhc05hdmlnYXRpb25FeHRyYXNBc0Z1bmN0aW9uKHJlZGlyZWN0VG86IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhISg8Tmd4UmVkaXJlY3RUb05hdmlnYXRpb25QYXJhbWV0ZXJzPiByZWRpcmVjdFRvKS5uYXZpZ2F0aW9uRXh0cmFzICYmXHJcbiAgICAgICAgICAgIGlzRnVuY3Rpb24oKDxOZ3hSZWRpcmVjdFRvTmF2aWdhdGlvblBhcmFtZXRlcnM+IHJlZGlyZWN0VG8pLm5hdmlnYXRpb25FeHRyYXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFzTmF2aWdhdGlvbkNvbW1hbmRzQXNGdW5jdGlvbihyZWRpcmVjdFRvOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gISEoPE5neFJlZGlyZWN0VG9OYXZpZ2F0aW9uUGFyYW1ldGVycz4gcmVkaXJlY3RUbykubmF2aWdhdGlvbkNvbW1hbmRzICYmXHJcbiAgICAgICAgICAgIGlzRnVuY3Rpb24oKDxOZ3hSZWRpcmVjdFRvTmF2aWdhdGlvblBhcmFtZXRlcnM+IHJlZGlyZWN0VG8pLm5hdmlnYXRpb25Db21tYW5kcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbmx5UmVkaXJlY3RDaGVjayhwZXJtaXNzaW9uczogYW55LCByb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCB8IFJvdXRlLCBzdGF0ZT86IFJvdXRlclN0YXRlU25hcHNob3QpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICBsZXQgZmFpbGVkUGVybWlzc2lvbiA9ICcnO1xyXG5cclxuICAgICAgICByZXR1cm4gZnJvbShwZXJtaXNzaW9ucy5vbmx5KS5waXBlKFxyXG4gICAgICAgICAgICBtZXJnZU1hcCgoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ya0pvaW4oW1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGVybWlzc2lvbnNTZXJ2aWNlLmhhc1Blcm1pc3Npb24oPHN0cmluZyB8IHN0cmluZ1tdPmRhdGEpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZXNTZXJ2aWNlLmhhc09ubHlSb2xlcyg8c3RyaW5nIHwgc3RyaW5nW10+ZGF0YSlcclxuICAgICAgICAgICAgICAgIF0pLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgICAgdGFwKChoYXNQZXJtaXNzaW9uOiBib29sZWFuW10pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmFpbGVkID0gaGFzUGVybWlzc2lvbi5ldmVyeSgoZGF0YSkgPT4gZGF0YSA9PT0gZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZhaWxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFpbGVkUGVybWlzc2lvbiA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGZpcnN0KFxyXG4gICAgICAgICAgICAgICAgKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHBlcm1pc3Npb25zLnJlZGlyZWN0VG8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnNvbWUoKGRhdGE6IGJvb2xlYW4pID0+IGRhdGEgPT09IHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuZXZlcnkoKGRhdGE6IGJvb2xlYW4pID0+IGRhdGEgPT09IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWxzZVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBtZXJnZU1hcCgocGFzczogYm9vbGVhbik6IE9ic2VydmFibGU8Ym9vbGVhbj4gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24ocGVybWlzc2lvbnMucmVkaXJlY3RUbykpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVSZWRpcmVjdE9mRmFpbGVkUGVybWlzc2lvbihwZXJtaXNzaW9ucywgZmFpbGVkUGVybWlzc2lvbiwgcm91dGUsIHN0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghIWZhaWxlZFBlcm1pc3Npb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVSZWRpcmVjdE9mRmFpbGVkUGVybWlzc2lvbihwZXJtaXNzaW9ucywgZmFpbGVkUGVybWlzc2lvbiwgcm91dGUsIHN0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKCFwYXNzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApLnRvUHJvbWlzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlUmVkaXJlY3RPZkZhaWxlZFBlcm1pc3Npb24oXHJcbiAgICAgICAgcGVybWlzc2lvbnM6IGFueSxcclxuICAgICAgICBmYWlsZWRQZXJtaXNzaW9uOiBzdHJpbmcsXHJcbiAgICAgICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QgfCBSb3V0ZSxcclxuICAgICAgICBzdGF0ZT86IFJvdXRlclN0YXRlU25hcHNob3RcclxuICAgICkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRmFpbGVkUGVybWlzc2lvblByb3BlcnR5T2ZSZWRpcmVjdFRvKHBlcm1pc3Npb25zLCBmYWlsZWRQZXJtaXNzaW9uKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZGlyZWN0VG9Bbm90aGVyUm91dGUoKDxhbnk+cGVybWlzc2lvbnMucmVkaXJlY3RUbylbZmFpbGVkUGVybWlzc2lvbl0sIHJvdXRlLCBzdGF0ZSwgZmFpbGVkUGVybWlzc2lvbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24ocGVybWlzc2lvbnMucmVkaXJlY3RUbykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVkaXJlY3RUb0Fub3RoZXJSb3V0ZSgoPGFueT5wZXJtaXNzaW9ucy5yZWRpcmVjdFRvKSwgcm91dGUsIHN0YXRlLCBmYWlsZWRQZXJtaXNzaW9uKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVkaXJlY3RUb0Fub3RoZXJSb3V0ZSgoPGFueT5wZXJtaXNzaW9ucy5yZWRpcmVjdFRvKVsnZGVmYXVsdCddLCByb3V0ZSwgc3RhdGUsIGZhaWxlZFBlcm1pc3Npb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNGYWlsZWRQZXJtaXNzaW9uUHJvcGVydHlPZlJlZGlyZWN0VG8ocGVybWlzc2lvbnM6IGFueSwgZmFpbGVkUGVybWlzc2lvbjogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuICEhcGVybWlzc2lvbnMucmVkaXJlY3RUbyAmJiBwZXJtaXNzaW9ucy5yZWRpcmVjdFRvWzxhbnk+ZmFpbGVkUGVybWlzc2lvbl07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja09ubHlQZXJtaXNzaW9ucyhwdXJlUGVybWlzc2lvbnM6IGFueSwgcm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QgfCBSb3V0ZSwgc3RhdGU/OiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSB7XHJcbiAgICAgICAgbGV0IHBlcm1pc3Npb25zOiBOZ3hQZXJtaXNzaW9uc1JvdXRlckRhdGEgPSB7XHJcbiAgICAgICAgICAgIC4uLnB1cmVQZXJtaXNzaW9uc1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbdGhpcy5wZXJtaXNzaW9uc1NlcnZpY2UuaGFzUGVybWlzc2lvbig8c3RyaW5nIHwgc3RyaW5nW10+cGVybWlzc2lvbnMub25seSksIHRoaXMucm9sZXNTZXJ2aWNlLmhhc09ubHlSb2xlcyg8c3RyaW5nIHwgc3RyaW5nW10+cGVybWlzc2lvbnMub25seSldKVxyXG4gICAgICAgICAgICAudGhlbigoW2hhc1Blcm1pc3Npb24sIGhhc1JvbGVdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGFzUGVybWlzc2lvbiB8fCBoYXNSb2xlKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGVybWlzc2lvbnMucmVkaXJlY3RUbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVkaXJlY3RUb0Fub3RoZXJSb3V0ZShwZXJtaXNzaW9ucy5yZWRpcmVjdFRvLCByb3V0ZSwgc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwYXNzaW5nT25seVBlcm1pc3Npb25zVmFsaWRhdGlvbihwZXJtaXNzaW9uczogTmd4UGVybWlzc2lvbnNSb3V0ZXJEYXRhLCByb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCB8IFJvdXRlLCBzdGF0ZT86IFJvdXRlclN0YXRlU25hcHNob3QpIHtcclxuICAgICAgICBpZiAoKGlzRnVuY3Rpb24ocGVybWlzc2lvbnMucmVkaXJlY3RUbykgfHwgaXNQbGFpbk9iamVjdChwZXJtaXNzaW9ucy5yZWRpcmVjdFRvKSAmJiAhdGhpcy5pc1JlZGlyZWN0aW9uV2l0aFBhcmFtZXRlcnMocGVybWlzc2lvbnMucmVkaXJlY3RUbykpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9ubHlSZWRpcmVjdENoZWNrKHBlcm1pc3Npb25zLCByb3V0ZSwgc3RhdGUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrT25seVBlcm1pc3Npb25zKHBlcm1pc3Npb25zLCByb3V0ZSwgc3RhdGUpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=