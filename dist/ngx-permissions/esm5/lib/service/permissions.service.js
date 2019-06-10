/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, from, of } from 'rxjs';
import { catchError, first, map, mergeAll, switchMap } from 'rxjs/operators';
import { NgxPermissionsStore } from '../store/permissions.store';
import { isBoolean, isFunction, transformStringToArray } from '../utils/utils';
/** @type {?} */
import * as ɵngcc0 from '@angular/core';
export var USE_PERMISSIONS_STORE = new InjectionToken('USE_PERMISSIONS_STORE');
var NgxPermissionsService = /** @class */ (function () {
    function NgxPermissionsService(isolate, permissionsStore) {
        if (isolate === void 0) { isolate = false; }
        this.isolate = isolate;
        this.permissionsStore = permissionsStore;
        this.permissionsSource = isolate ? new BehaviorSubject({}) : permissionsStore.permissionsSource;
        this.permissions$ = this.permissionsSource.asObservable();
    }
    /**
     * Remove all permissions from permissions source
     */
    /**
     * Remove all permissions from permissions source
     * @return {?}
     */
    NgxPermissionsService.prototype.flushPermissions = /**
     * Remove all permissions from permissions source
     * @return {?}
     */
    function () {
        this.permissionsSource.next({});
    };
    /**
     * @param {?} permission
     * @return {?}
     */
    NgxPermissionsService.prototype.hasPermission = /**
     * @param {?} permission
     * @return {?}
     */
    function (permission) {
        if (!permission || (Array.isArray(permission) && permission.length === 0)) {
            return Promise.resolve(true);
        }
        permission = transformStringToArray(permission);
        return this.hasArrayPermission(permission);
    };
    /**
     * @param {?} permissions
     * @param {?=} validationFunction
     * @return {?}
     */
    NgxPermissionsService.prototype.loadPermissions = /**
     * @param {?} permissions
     * @param {?=} validationFunction
     * @return {?}
     */
    function (permissions, validationFunction) {
        var _this = this;
        /** @type {?} */
        var newPermissions = permissions.reduce((/**
         * @param {?} source
         * @param {?} p
         * @return {?}
         */
        function (source, p) {
            return _this.reducePermission(source, p, validationFunction);
        }), {});
        this.permissionsSource.next(newPermissions);
    };
    /**
     * @param {?} permission
     * @param {?=} validationFunction
     * @return {?}
     */
    NgxPermissionsService.prototype.addPermission = /**
     * @param {?} permission
     * @param {?=} validationFunction
     * @return {?}
     */
    function (permission, validationFunction) {
        var _this = this;
        if (Array.isArray(permission)) {
            /** @type {?} */
            var permissions = permission.reduce((/**
             * @param {?} source
             * @param {?} p
             * @return {?}
             */
            function (source, p) {
                return _this.reducePermission(source, p, validationFunction);
            }), this.permissionsSource.value);
            this.permissionsSource.next(permissions);
        }
        else {
            /** @type {?} */
            var permissions = this.reducePermission(this.permissionsSource.value, permission, validationFunction);
            this.permissionsSource.next(permissions);
        }
    };
    /**
     * @param {?} permissionName
     * @return {?}
     */
    NgxPermissionsService.prototype.removePermission = /**
     * @param {?} permissionName
     * @return {?}
     */
    function (permissionName) {
        /** @type {?} */
        var permissions = tslib_1.__assign({}, this.permissionsSource.value);
        delete permissions[permissionName];
        this.permissionsSource.next(permissions);
    };
    /**
     * @param {?} name
     * @return {?}
     */
    NgxPermissionsService.prototype.getPermission = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return this.permissionsSource.value[name];
    };
    /**
     * @return {?}
     */
    NgxPermissionsService.prototype.getPermissions = /**
     * @return {?}
     */
    function () {
        return this.permissionsSource.value;
    };
    /**
     * @private
     * @param {?} source
     * @param {?} name
     * @param {?=} validationFunction
     * @return {?}
     */
    NgxPermissionsService.prototype.reducePermission = /**
     * @private
     * @param {?} source
     * @param {?} name
     * @param {?=} validationFunction
     * @return {?}
     */
    function (source, name, validationFunction) {
        var _a, _b;
        if (!!validationFunction && isFunction(validationFunction)) {
            return tslib_1.__assign({}, source, (_a = {}, _a[name] = { name: name, validationFunction: validationFunction }, _a));
        }
        else {
            return tslib_1.__assign({}, source, (_b = {}, _b[name] = { name: name }, _b));
        }
    };
    /**
     * @private
     * @param {?} permissions
     * @return {?}
     */
    NgxPermissionsService.prototype.hasArrayPermission = /**
     * @private
     * @param {?} permissions
     * @return {?}
     */
    function (permissions) {
        var _this = this;
        /** @type {?} */
        var promises = permissions.map((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            if (_this.hasPermissionValidationFunction(key)) {
                /** @type {?} */
                var immutableValue_1 = tslib_1.__assign({}, _this.permissionsSource.value);
                /** @type {?} */
                var validationFunction_1 = (/** @type {?} */ (_this.permissionsSource.value[key].validationFunction));
                return of(null).pipe(map((/**
                 * @return {?}
                 */
                function () {
                    return validationFunction_1(key, immutableValue_1);
                })), switchMap((/**
                 * @param {?} promise
                 * @return {?}
                 */
                function (promise) {
                    /** @type {?} */
                    var b = isBoolean(promise);
                    if (b) {
                        return of((/** @type {?} */ (promise)));
                    }
                    else {
                        return (/** @type {?} */ (promise));
                    }
                })), catchError((/**
                 * @return {?}
                 */
                function () { return of(false); })));
            }
            // check for name of the permission if there is no validation function
            return of(!!_this.permissionsSource.value[key]);
        }));
        return from(promises).pipe(mergeAll(), first((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var r = data !== false;
            return r;
        }), false), map((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var r = data === false ? false : true;
            return r;
        }))).toPromise().then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            return data;
        }));
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    NgxPermissionsService.prototype.hasPermissionValidationFunction = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return !!this.permissionsSource.value[key] &&
            !!this.permissionsSource.value[key].validationFunction &&
            isFunction(this.permissionsSource.value[key].validationFunction);
    };
    /** @nocollapse */
    NgxPermissionsService.ctorParameters = function () { return [
        { type: Boolean, decorators: [{ type: Inject, args: [USE_PERMISSIONS_STORE,] }] },
        { type: NgxPermissionsStore }
    ]; };
NgxPermissionsService.ngInjectableDef = ɵngcc0.ɵɵdefineInjectable({ token: NgxPermissionsService, factory: function NgxPermissionsService_Factory(t) { return new (t || NgxPermissionsService)(ɵngcc0.ɵɵinject(USE_PERMISSIONS_STORE), ɵngcc0.ɵɵinject(NgxPermissionsStore)); }, providedIn: null });
/*@__PURE__*/ ɵngcc0.ɵsetClassMetadata(NgxPermissionsService, [{
        type: Injectable
    }], function () { return [{ type: Boolean, decorators: [{
                type: Inject,
                args: [USE_PERMISSIONS_STORE]
            }] }, { type: NgxPermissionsStore }]; }, { isolate: [], permissionsStore: [], permissionsSource: [], permissions$: [], flushPermissions: [], hasPermission: [], loadPermissions: [], addPermission: [], removePermission: [], getPermission: [], getPermissions: [], reducePermission: [], hasArrayPermission: [], hasPermissionValidationFunction: [] });
    return NgxPermissionsService;
}());
export { NgxPermissionsService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxPermissionsService.prototype.permissionsSource;
    /** @type {?} */
    NgxPermissionsService.prototype.permissions$;
    /**
     * @type {?}
     * @private
     */
    NgxPermissionsService.prototype.isolate;
    /**
     * @type {?}
     * @private
     */
    NgxPermissionsService.prototype.permissionsStore;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL09sZWtzYW5kci5LaHltZW5rby9XZWJzdG9ybVByb2plY3RzL25neC1wZXJtaXNzaW9ucy9hcHBsaWNhdGlvbi9kaXN0L25neC1wZXJtaXNzaW9ucy9lc201L2xpYi9zZXJ2aWNlL3Blcm1pc3Npb25zLnNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BMk9NLEFBR0E7Ozs7Ozs7Ozs7OztzV0FLRyIsImZpbGUiOiJwZXJtaXNzaW9ucy5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcgYWRkZWQgYnkgdHNpY2tsZVxyXG4gKiBAc3VwcHJlc3Mge2NoZWNrVHlwZXMsZXh0cmFSZXF1aXJlLG1pc3NpbmdPdmVycmlkZSxtaXNzaW5nUmV0dXJuLHVudXNlZFByaXZhdGVNZW1iZXJzLHVzZWxlc3NDb2RlfSBjaGVja2VkIGJ5IHRzY1xyXG4gKi9cclxuaW1wb3J0ICogYXMgdHNsaWJfMSBmcm9tIFwidHNsaWJcIjtcclxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGZyb20sIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGZpcnN0LCBtYXAsIG1lcmdlQWxsLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE5neFBlcm1pc3Npb25zU3RvcmUgfSBmcm9tICcuLi9zdG9yZS9wZXJtaXNzaW9ucy5zdG9yZSc7XHJcbmltcG9ydCB7IGlzQm9vbGVhbiwgaXNGdW5jdGlvbiwgdHJhbnNmb3JtU3RyaW5nVG9BcnJheSB9IGZyb20gJy4uL3V0aWxzL3V0aWxzJztcclxuLyoqIEB0eXBlIHs/fSAqL1xyXG5leHBvcnQgdmFyIFVTRV9QRVJNSVNTSU9OU19TVE9SRSA9IG5ldyBJbmplY3Rpb25Ub2tlbignVVNFX1BFUk1JU1NJT05TX1NUT1JFJyk7XHJcbnZhciBOZ3hQZXJtaXNzaW9uc1NlcnZpY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBOZ3hQZXJtaXNzaW9uc1NlcnZpY2UoaXNvbGF0ZSwgcGVybWlzc2lvbnNTdG9yZSkge1xyXG4gICAgICAgIGlmIChpc29sYXRlID09PSB2b2lkIDApIHsgaXNvbGF0ZSA9IGZhbHNlOyB9XHJcbiAgICAgICAgdGhpcy5pc29sYXRlID0gaXNvbGF0ZTtcclxuICAgICAgICB0aGlzLnBlcm1pc3Npb25zU3RvcmUgPSBwZXJtaXNzaW9uc1N0b3JlO1xyXG4gICAgICAgIHRoaXMucGVybWlzc2lvbnNTb3VyY2UgPSBpc29sYXRlID8gbmV3IEJlaGF2aW9yU3ViamVjdCh7fSkgOiBwZXJtaXNzaW9uc1N0b3JlLnBlcm1pc3Npb25zU291cmNlO1xyXG4gICAgICAgIHRoaXMucGVybWlzc2lvbnMkID0gdGhpcy5wZXJtaXNzaW9uc1NvdXJjZS5hc09ic2VydmFibGUoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGFsbCBwZXJtaXNzaW9ucyBmcm9tIHBlcm1pc3Npb25zIHNvdXJjZVxyXG4gICAgICovXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBhbGwgcGVybWlzc2lvbnMgZnJvbSBwZXJtaXNzaW9ucyBzb3VyY2VcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zU2VydmljZS5wcm90b3R5cGUuZmx1c2hQZXJtaXNzaW9ucyA9IC8qKlxyXG4gICAgICogUmVtb3ZlIGFsbCBwZXJtaXNzaW9ucyBmcm9tIHBlcm1pc3Npb25zIHNvdXJjZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucGVybWlzc2lvbnNTb3VyY2UubmV4dCh7fSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gez99IHBlcm1pc3Npb25cclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zU2VydmljZS5wcm90b3R5cGUuaGFzUGVybWlzc2lvbiA9IC8qKlxyXG4gICAgICogQHBhcmFtIHs/fSBwZXJtaXNzaW9uXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAocGVybWlzc2lvbikge1xyXG4gICAgICAgIGlmICghcGVybWlzc2lvbiB8fCAoQXJyYXkuaXNBcnJheShwZXJtaXNzaW9uKSAmJiBwZXJtaXNzaW9uLmxlbmd0aCA9PT0gMCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGVybWlzc2lvbiA9IHRyYW5zZm9ybVN0cmluZ1RvQXJyYXkocGVybWlzc2lvbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQXJyYXlQZXJtaXNzaW9uKHBlcm1pc3Npb24pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHs/fSBwZXJtaXNzaW9uc1xyXG4gICAgICogQHBhcmFtIHs/PX0gdmFsaWRhdGlvbkZ1bmN0aW9uXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc1NlcnZpY2UucHJvdG90eXBlLmxvYWRQZXJtaXNzaW9ucyA9IC8qKlxyXG4gICAgICogQHBhcmFtIHs/fSBwZXJtaXNzaW9uc1xyXG4gICAgICogQHBhcmFtIHs/PX0gdmFsaWRhdGlvbkZ1bmN0aW9uXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAocGVybWlzc2lvbnMsIHZhbGlkYXRpb25GdW5jdGlvbikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgICAgIHZhciBuZXdQZXJtaXNzaW9ucyA9IHBlcm1pc3Npb25zLnJlZHVjZSgoLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHs/fSBzb3VyY2VcclxuICAgICAgICAgKiBAcGFyYW0gez99IHBcclxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIChzb3VyY2UsIHApIHtcclxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnJlZHVjZVBlcm1pc3Npb24oc291cmNlLCBwLCB2YWxpZGF0aW9uRnVuY3Rpb24pO1xyXG4gICAgICAgIH0pLCB7fSk7XHJcbiAgICAgICAgdGhpcy5wZXJtaXNzaW9uc1NvdXJjZS5uZXh0KG5ld1Blcm1pc3Npb25zKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7P30gcGVybWlzc2lvblxyXG4gICAgICogQHBhcmFtIHs/PX0gdmFsaWRhdGlvbkZ1bmN0aW9uXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc1NlcnZpY2UucHJvdG90eXBlLmFkZFBlcm1pc3Npb24gPSAvKipcclxuICAgICAqIEBwYXJhbSB7P30gcGVybWlzc2lvblxyXG4gICAgICogQHBhcmFtIHs/PX0gdmFsaWRhdGlvbkZ1bmN0aW9uXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAocGVybWlzc2lvbiwgdmFsaWRhdGlvbkZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwZXJtaXNzaW9uKSkge1xyXG4gICAgICAgICAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICAgICAgICAgIHZhciBwZXJtaXNzaW9ucyA9IHBlcm1pc3Npb24ucmVkdWNlKCgvKipcclxuICAgICAgICAgICAgICogQHBhcmFtIHs/fSBzb3VyY2VcclxuICAgICAgICAgICAgICogQHBhcmFtIHs/fSBwXHJcbiAgICAgICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBmdW5jdGlvbiAoc291cmNlLCBwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMucmVkdWNlUGVybWlzc2lvbihzb3VyY2UsIHAsIHZhbGlkYXRpb25GdW5jdGlvbik7XHJcbiAgICAgICAgICAgIH0pLCB0aGlzLnBlcm1pc3Npb25zU291cmNlLnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5wZXJtaXNzaW9uc1NvdXJjZS5uZXh0KHBlcm1pc3Npb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgICAgICAgICAgdmFyIHBlcm1pc3Npb25zID0gdGhpcy5yZWR1Y2VQZXJtaXNzaW9uKHRoaXMucGVybWlzc2lvbnNTb3VyY2UudmFsdWUsIHBlcm1pc3Npb24sIHZhbGlkYXRpb25GdW5jdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMucGVybWlzc2lvbnNTb3VyY2UubmV4dChwZXJtaXNzaW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHs/fSBwZXJtaXNzaW9uTmFtZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNTZXJ2aWNlLnByb3RvdHlwZS5yZW1vdmVQZXJtaXNzaW9uID0gLyoqXHJcbiAgICAgKiBAcGFyYW0gez99IHBlcm1pc3Npb25OYW1lXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAocGVybWlzc2lvbk5hbWUpIHtcclxuICAgICAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICAgICAgdmFyIHBlcm1pc3Npb25zID0gdHNsaWJfMS5fX2Fzc2lnbih7fSwgdGhpcy5wZXJtaXNzaW9uc1NvdXJjZS52YWx1ZSk7XHJcbiAgICAgICAgZGVsZXRlIHBlcm1pc3Npb25zW3Blcm1pc3Npb25OYW1lXTtcclxuICAgICAgICB0aGlzLnBlcm1pc3Npb25zU291cmNlLm5leHQocGVybWlzc2lvbnMpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHs/fSBuYW1lXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc1NlcnZpY2UucHJvdG90eXBlLmdldFBlcm1pc3Npb24gPSAvKipcclxuICAgICAqIEBwYXJhbSB7P30gbmFtZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wZXJtaXNzaW9uc1NvdXJjZS52YWx1ZVtuYW1lXTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zU2VydmljZS5wcm90b3R5cGUuZ2V0UGVybWlzc2lvbnMgPSAvKipcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wZXJtaXNzaW9uc1NvdXJjZS52YWx1ZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHNvdXJjZVxyXG4gICAgICogQHBhcmFtIHs/fSBuYW1lXHJcbiAgICAgKiBAcGFyYW0gez89fSB2YWxpZGF0aW9uRnVuY3Rpb25cclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zU2VydmljZS5wcm90b3R5cGUucmVkdWNlUGVybWlzc2lvbiA9IC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gc291cmNlXHJcbiAgICAgKiBAcGFyYW0gez99IG5hbWVcclxuICAgICAqIEBwYXJhbSB7Pz19IHZhbGlkYXRpb25GdW5jdGlvblxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gKHNvdXJjZSwgbmFtZSwgdmFsaWRhdGlvbkZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICBpZiAoISF2YWxpZGF0aW9uRnVuY3Rpb24gJiYgaXNGdW5jdGlvbih2YWxpZGF0aW9uRnVuY3Rpb24pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0c2xpYl8xLl9fYXNzaWduKHt9LCBzb3VyY2UsIChfYSA9IHt9LCBfYVtuYW1lXSA9IHsgbmFtZTogbmFtZSwgdmFsaWRhdGlvbkZ1bmN0aW9uOiB2YWxpZGF0aW9uRnVuY3Rpb24gfSwgX2EpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0c2xpYl8xLl9fYXNzaWduKHt9LCBzb3VyY2UsIChfYiA9IHt9LCBfYltuYW1lXSA9IHsgbmFtZTogbmFtZSB9LCBfYikpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHBlcm1pc3Npb25zXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc1NlcnZpY2UucHJvdG90eXBlLmhhc0FycmF5UGVybWlzc2lvbiA9IC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gcGVybWlzc2lvbnNcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIChwZXJtaXNzaW9ucykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgICAgIHZhciBwcm9taXNlcyA9IHBlcm1pc3Npb25zLm1hcCgoLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHs/fSBrZXlcclxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgaWYgKF90aGlzLmhhc1Blcm1pc3Npb25WYWxpZGF0aW9uRnVuY3Rpb24oa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgICAgICAgICAgICAgdmFyIGltbXV0YWJsZVZhbHVlXzEgPSB0c2xpYl8xLl9fYXNzaWduKHt9LCBfdGhpcy5wZXJtaXNzaW9uc1NvdXJjZS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsaWRhdGlvbkZ1bmN0aW9uXzEgPSAoLyoqIEB0eXBlIHs/fSAqLyAoX3RoaXMucGVybWlzc2lvbnNTb3VyY2UudmFsdWVba2V5XS52YWxpZGF0aW9uRnVuY3Rpb24pKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvZihudWxsKS5waXBlKG1hcCgoLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRpb25GdW5jdGlvbl8xKGtleSwgaW1tdXRhYmxlVmFsdWVfMSk7XHJcbiAgICAgICAgICAgICAgICB9KSksIHN3aXRjaE1hcCgoLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0gez99IHByb21pc2VcclxuICAgICAgICAgICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChwcm9taXNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBiID0gaXNCb29sZWFuKHByb21pc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZigoLyoqIEB0eXBlIHs/fSAqLyAocHJvbWlzZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoLyoqIEB0eXBlIHs/fSAqLyAocHJvbWlzZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKSwgY2F0Y2hFcnJvcigoLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBvZihmYWxzZSk7IH0pKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIG5hbWUgb2YgdGhlIHBlcm1pc3Npb24gaWYgdGhlcmUgaXMgbm8gdmFsaWRhdGlvbiBmdW5jdGlvblxyXG4gICAgICAgICAgICByZXR1cm4gb2YoISFfdGhpcy5wZXJtaXNzaW9uc1NvdXJjZS52YWx1ZVtrZXldKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgcmV0dXJuIGZyb20ocHJvbWlzZXMpLnBpcGUobWVyZ2VBbGwoKSwgZmlyc3QoKC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7P30gZGF0YVxyXG4gICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgICAgICAgICB2YXIgciA9IGRhdGEgIT09IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICB9KSwgZmFsc2UpLCBtYXAoKC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7P30gZGF0YVxyXG4gICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgICAgICAgICB2YXIgciA9IGRhdGEgPT09IGZhbHNlID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICB9KSkpLnRvUHJvbWlzZSgpLnRoZW4oKC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7P30gZGF0YVxyXG4gICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30ga2V5XHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc1NlcnZpY2UucHJvdG90eXBlLmhhc1Blcm1pc3Npb25WYWxpZGF0aW9uRnVuY3Rpb24gPSAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IGtleVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMucGVybWlzc2lvbnNTb3VyY2UudmFsdWVba2V5XSAmJlxyXG4gICAgICAgICAgICAhIXRoaXMucGVybWlzc2lvbnNTb3VyY2UudmFsdWVba2V5XS52YWxpZGF0aW9uRnVuY3Rpb24gJiZcclxuICAgICAgICAgICAgaXNGdW5jdGlvbih0aGlzLnBlcm1pc3Npb25zU291cmNlLnZhbHVlW2tleV0udmFsaWRhdGlvbkZ1bmN0aW9uKTtcclxuICAgIH07XHJcbiAgICBOZ3hQZXJtaXNzaW9uc1NlcnZpY2UuZGVjb3JhdG9ycyA9IFtcclxuICAgICAgICB7IHR5cGU6IEluamVjdGFibGUgfVxyXG4gICAgXTtcclxuICAgIC8qKiBAbm9jb2xsYXBzZSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNTZXJ2aWNlLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xyXG4gICAgICAgIHsgdHlwZTogQm9vbGVhbiwgZGVjb3JhdG9yczogW3sgdHlwZTogSW5qZWN0LCBhcmdzOiBbVVNFX1BFUk1JU1NJT05TX1NUT1JFLF0gfV0gfSxcclxuICAgICAgICB7IHR5cGU6IE5neFBlcm1pc3Npb25zU3RvcmUgfVxyXG4gICAgXTsgfTtcclxuICAgIHJldHVybiBOZ3hQZXJtaXNzaW9uc1NlcnZpY2U7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IE5neFBlcm1pc3Npb25zU2VydmljZSB9O1xyXG5pZiAoZmFsc2UpIHtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgez99XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc1NlcnZpY2UucHJvdG90eXBlLnBlcm1pc3Npb25zU291cmNlO1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNTZXJ2aWNlLnByb3RvdHlwZS5wZXJtaXNzaW9ucyQ7XHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHs/fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNTZXJ2aWNlLnByb3RvdHlwZS5pc29sYXRlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7P31cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zU2VydmljZS5wcm90b3R5cGUucGVybWlzc2lvbnNTdG9yZTtcclxufVxyIl19