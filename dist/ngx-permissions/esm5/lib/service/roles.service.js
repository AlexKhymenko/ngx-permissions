/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, from, of } from 'rxjs';
import { catchError, every, first, map, mergeAll, mergeMap, switchMap } from 'rxjs/operators';
import { NgxRolesStore } from '../store/roles.store';
import { isBoolean, isFunction, isPromise, transformStringToArray } from '../utils/utils';
import { NgxPermissionsService } from './permissions.service';
/** @type {?} */
import * as ɵngcc0 from '@angular/core';
export var USE_ROLES_STORE = new InjectionToken('USE_ROLES_STORE');
var NgxRolesService = /** @class */ (function () {
    function NgxRolesService(isolate, rolesStore, permissionsService) {
        if (isolate === void 0) { isolate = false; }
        this.isolate = isolate;
        this.rolesStore = rolesStore;
        this.permissionsService = permissionsService;
        this.rolesSource = this.isolate ? new BehaviorSubject({}) : this.rolesStore.rolesSource;
        this.roles$ = this.rolesSource.asObservable();
    }
    /**
     * @param {?} name
     * @param {?} validationFunction
     * @return {?}
     */
    NgxRolesService.prototype.addRole = /**
     * @param {?} name
     * @param {?} validationFunction
     * @return {?}
     */
    function (name, validationFunction) {
        var _a;
        /** @type {?} */
        var roles = tslib_1.__assign({}, this.rolesSource.value, (_a = {}, _a[name] = { name: name, validationFunction: validationFunction }, _a));
        this.rolesSource.next(roles);
    };
    /**
     * @param {?} rolesObj
     * @return {?}
     */
    NgxRolesService.prototype.addRoles = /**
     * @param {?} rolesObj
     * @return {?}
     */
    function (rolesObj) {
        var _this = this;
        Object.keys(rolesObj).forEach((/**
         * @param {?} key
         * @param {?} index
         * @return {?}
         */
        function (key, index) {
            _this.addRole(key, rolesObj[key]);
        }));
    };
    /**
     * @return {?}
     */
    NgxRolesService.prototype.flushRoles = /**
     * @return {?}
     */
    function () {
        this.rolesSource.next({});
    };
    /**
     * @param {?} roleName
     * @return {?}
     */
    NgxRolesService.prototype.removeRole = /**
     * @param {?} roleName
     * @return {?}
     */
    function (roleName) {
        /** @type {?} */
        var roles = tslib_1.__assign({}, this.rolesSource.value);
        delete roles[roleName];
        this.rolesSource.next(roles);
    };
    /**
     * @return {?}
     */
    NgxRolesService.prototype.getRoles = /**
     * @return {?}
     */
    function () {
        return this.rolesSource.value;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    NgxRolesService.prototype.getRole = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return this.rolesSource.value[name];
    };
    /**
     * @param {?} names
     * @return {?}
     */
    NgxRolesService.prototype.hasOnlyRoles = /**
     * @param {?} names
     * @return {?}
     */
    function (names) {
        /** @type {?} */
        var isNamesEmpty = !names || (Array.isArray(names) && names.length === 0);
        if (isNamesEmpty)
            return Promise.resolve(true);
        names = transformStringToArray(names);
        return Promise.all([this.hasRoleKey(names), this.hasRolePermission(this.rolesSource.value, names)])
            .then((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), hasRoles = _b[0], hasPermissions = _b[1];
            return hasRoles || hasPermissions;
        }));
    };
    /**
     * @private
     * @param {?} roleName
     * @return {?}
     */
    NgxRolesService.prototype.hasRoleKey = /**
     * @private
     * @param {?} roleName
     * @return {?}
     */
    function (roleName) {
        var _this = this;
        /** @type {?} */
        var promises = roleName.map((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            /** @type {?} */
            var hasValidationFunction = !!_this.rolesSource.value[key] &&
                !!_this.rolesSource.value[key].validationFunction &&
                isFunction(_this.rolesSource.value[key].validationFunction);
            if (hasValidationFunction && !isPromise(_this.rolesSource.value[key].validationFunction)) {
                /** @type {?} */
                var validationFunction_1 = (/** @type {?} */ (_this.rolesSource.value[key].validationFunction));
                return of(null).pipe(map((/**
                 * @return {?}
                 */
                function () { return validationFunction_1(); })), switchMap((/**
                 * @param {?} promise
                 * @return {?}
                 */
                function (promise) { return isBoolean(promise) ?
                    of((/** @type {?} */ (promise))) : (/** @type {?} */ (promise)); })), catchError((/**
                 * @return {?}
                 */
                function () { return of(false); })));
            }
            return of(false);
        }));
        return from(promises).pipe(mergeAll(), first((/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return data !== false; }), false), map((/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return data !== false; }))).toPromise().then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return data; }));
    };
    /**
     * @private
     * @param {?} roles
     * @param {?} roleNames
     * @return {?}
     */
    NgxRolesService.prototype.hasRolePermission = /**
     * @private
     * @param {?} roles
     * @param {?} roleNames
     * @return {?}
     */
    function (roles, roleNames) {
        var _this = this;
        return from(roleNames).pipe(mergeMap((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            if (roles[key] && Array.isArray(roles[key].validationFunction)) {
                return from((/** @type {?} */ (roles[key].validationFunction))).pipe(mergeMap((/**
                 * @param {?} permission
                 * @return {?}
                 */
                function (permission) { return _this.permissionsService.hasPermission(permission); })), every((/**
                 * @param {?} hasPermissions
                 * @return {?}
                 */
                function (hasPermissions) { return hasPermissions === true; })));
            }
            return of(false);
        })), first((/**
         * @param {?} hasPermission
         * @return {?}
         */
        function (hasPermission) { return hasPermission === true; }), false)).toPromise();
    };
    /** @nocollapse */
    NgxRolesService.ctorParameters = function () { return [
        { type: Boolean, decorators: [{ type: Inject, args: [USE_ROLES_STORE,] }] },
        { type: NgxRolesStore },
        { type: NgxPermissionsService }
    ]; };
NgxRolesService.ngInjectableDef = ɵngcc0.ɵɵdefineInjectable({ token: NgxRolesService, factory: function NgxRolesService_Factory(t) { return new (t || NgxRolesService)(ɵngcc0.ɵɵinject(USE_ROLES_STORE), ɵngcc0.ɵɵinject(NgxRolesStore), ɵngcc0.ɵɵinject(NgxPermissionsService)); }, providedIn: null });
/*@__PURE__*/ ɵngcc0.ɵsetClassMetadata(NgxRolesService, [{
        type: Injectable
    }], function () { return [{ type: Boolean, decorators: [{
                type: Inject,
                args: [USE_ROLES_STORE]
            }] }, { type: NgxRolesStore }, { type: NgxPermissionsService }]; }, { isolate: [], rolesStore: [], permissionsService: [], rolesSource: [], roles$: [], addRole: [], addRoles: [], flushRoles: [], removeRole: [], getRoles: [], getRole: [], hasOnlyRoles: [], hasRoleKey: [], hasRolePermission: [] });
    return NgxRolesService;
}());
export { NgxRolesService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxRolesService.prototype.rolesSource;
    /** @type {?} */
    NgxRolesService.prototype.roles$;
    /**
     * @type {?}
     * @private
     */
    NgxRolesService.prototype.isolate;
    /**
     * @type {?}
     * @private
     */
    NgxRolesService.prototype.rolesStore;
    /**
     * @type {?}
     * @private
     */
    NgxRolesService.prototype.permissionsService;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL09sZWtzYW5kci5LaHltZW5rby9XZWJzdG9ybVByb2plY3RzL25neC1wZXJtaXNzaW9ucy9kaXN0L25neC1wZXJtaXNzaW9ucy9lc201L2xpYi9zZXJ2aWNlL3JvbGVzLnNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7QUFZQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQTBNTSxBQUdBOzs7Ozs7Ozs7Ozs7O3FUQU1HIiwiZmlsZSI6InJvbGVzLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGVvdmVydmlldyBhZGRlZCBieSB0c2lja2xlXHJcbiAqIEBzdXBwcmVzcyB7Y2hlY2tUeXBlcyxleHRyYVJlcXVpcmUsbWlzc2luZ092ZXJyaWRlLG1pc3NpbmdSZXR1cm4sdW51c2VkUHJpdmF0ZU1lbWJlcnMsdXNlbGVzc0NvZGV9IGNoZWNrZWQgYnkgdHNjXHJcbiAqL1xyXG5pbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xyXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgZnJvbSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgZXZlcnksIGZpcnN0LCBtYXAsIG1lcmdlQWxsLCBtZXJnZU1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBOZ3hSb2xlc1N0b3JlIH0gZnJvbSAnLi4vc3RvcmUvcm9sZXMuc3RvcmUnO1xyXG5pbXBvcnQgeyBpc0Jvb2xlYW4sIGlzRnVuY3Rpb24sIGlzUHJvbWlzZSwgdHJhbnNmb3JtU3RyaW5nVG9BcnJheSB9IGZyb20gJy4uL3V0aWxzL3V0aWxzJztcclxuaW1wb3J0IHsgTmd4UGVybWlzc2lvbnNTZXJ2aWNlIH0gZnJvbSAnLi9wZXJtaXNzaW9ucy5zZXJ2aWNlJztcclxuLyoqIEB0eXBlIHs/fSAqL1xyXG5leHBvcnQgdmFyIFVTRV9ST0xFU19TVE9SRSA9IG5ldyBJbmplY3Rpb25Ub2tlbignVVNFX1JPTEVTX1NUT1JFJyk7XHJcbnZhciBOZ3hSb2xlc1NlcnZpY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBOZ3hSb2xlc1NlcnZpY2UoaXNvbGF0ZSwgcm9sZXNTdG9yZSwgcGVybWlzc2lvbnNTZXJ2aWNlKSB7XHJcbiAgICAgICAgaWYgKGlzb2xhdGUgPT09IHZvaWQgMCkgeyBpc29sYXRlID0gZmFsc2U7IH1cclxuICAgICAgICB0aGlzLmlzb2xhdGUgPSBpc29sYXRlO1xyXG4gICAgICAgIHRoaXMucm9sZXNTdG9yZSA9IHJvbGVzU3RvcmU7XHJcbiAgICAgICAgdGhpcy5wZXJtaXNzaW9uc1NlcnZpY2UgPSBwZXJtaXNzaW9uc1NlcnZpY2U7XHJcbiAgICAgICAgdGhpcy5yb2xlc1NvdXJjZSA9IHRoaXMuaXNvbGF0ZSA/IG5ldyBCZWhhdmlvclN1YmplY3Qoe30pIDogdGhpcy5yb2xlc1N0b3JlLnJvbGVzU291cmNlO1xyXG4gICAgICAgIHRoaXMucm9sZXMkID0gdGhpcy5yb2xlc1NvdXJjZS5hc09ic2VydmFibGUoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHs/fSBuYW1lXHJcbiAgICAgKiBAcGFyYW0gez99IHZhbGlkYXRpb25GdW5jdGlvblxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4Um9sZXNTZXJ2aWNlLnByb3RvdHlwZS5hZGRSb2xlID0gLyoqXHJcbiAgICAgKiBAcGFyYW0gez99IG5hbWVcclxuICAgICAqIEBwYXJhbSB7P30gdmFsaWRhdGlvbkZ1bmN0aW9uXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAobmFtZSwgdmFsaWRhdGlvbkZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgICAgICB2YXIgcm9sZXMgPSB0c2xpYl8xLl9fYXNzaWduKHt9LCB0aGlzLnJvbGVzU291cmNlLnZhbHVlLCAoX2EgPSB7fSwgX2FbbmFtZV0gPSB7IG5hbWU6IG5hbWUsIHZhbGlkYXRpb25GdW5jdGlvbjogdmFsaWRhdGlvbkZ1bmN0aW9uIH0sIF9hKSk7XHJcbiAgICAgICAgdGhpcy5yb2xlc1NvdXJjZS5uZXh0KHJvbGVzKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7P30gcm9sZXNPYmpcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIE5neFJvbGVzU2VydmljZS5wcm90b3R5cGUuYWRkUm9sZXMgPSAvKipcclxuICAgICAqIEBwYXJhbSB7P30gcm9sZXNPYmpcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIChyb2xlc09iaikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgT2JqZWN0LmtleXMocm9sZXNPYmopLmZvckVhY2goKC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7P30ga2V5XHJcbiAgICAgICAgICogQHBhcmFtIHs/fSBpbmRleFxyXG4gICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gKGtleSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgX3RoaXMuYWRkUm9sZShrZXksIHJvbGVzT2JqW2tleV0pO1xyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIE5neFJvbGVzU2VydmljZS5wcm90b3R5cGUuZmx1c2hSb2xlcyA9IC8qKlxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucm9sZXNTb3VyY2UubmV4dCh7fSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gez99IHJvbGVOYW1lXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBOZ3hSb2xlc1NlcnZpY2UucHJvdG90eXBlLnJlbW92ZVJvbGUgPSAvKipcclxuICAgICAqIEBwYXJhbSB7P30gcm9sZU5hbWVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIChyb2xlTmFtZSkge1xyXG4gICAgICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgICAgICB2YXIgcm9sZXMgPSB0c2xpYl8xLl9fYXNzaWduKHt9LCB0aGlzLnJvbGVzU291cmNlLnZhbHVlKTtcclxuICAgICAgICBkZWxldGUgcm9sZXNbcm9sZU5hbWVdO1xyXG4gICAgICAgIHRoaXMucm9sZXNTb3VyY2UubmV4dChyb2xlcyk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBOZ3hSb2xlc1NlcnZpY2UucHJvdG90eXBlLmdldFJvbGVzID0gLyoqXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm9sZXNTb3VyY2UudmFsdWU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gez99IG5hbWVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIE5neFJvbGVzU2VydmljZS5wcm90b3R5cGUuZ2V0Um9sZSA9IC8qKlxyXG4gICAgICogQHBhcmFtIHs/fSBuYW1lXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvbGVzU291cmNlLnZhbHVlW25hbWVdO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHs/fSBuYW1lc1xyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4Um9sZXNTZXJ2aWNlLnByb3RvdHlwZS5oYXNPbmx5Um9sZXMgPSAvKipcclxuICAgICAqIEBwYXJhbSB7P30gbmFtZXNcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIChuYW1lcykge1xyXG4gICAgICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgICAgICB2YXIgaXNOYW1lc0VtcHR5ID0gIW5hbWVzIHx8IChBcnJheS5pc0FycmF5KG5hbWVzKSAmJiBuYW1lcy5sZW5ndGggPT09IDApO1xyXG4gICAgICAgIGlmIChpc05hbWVzRW1wdHkpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgbmFtZXMgPSB0cmFuc2Zvcm1TdHJpbmdUb0FycmF5KG5hbWVzKTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3RoaXMuaGFzUm9sZUtleShuYW1lcyksIHRoaXMuaGFzUm9sZVBlcm1pc3Npb24odGhpcy5yb2xlc1NvdXJjZS52YWx1ZSwgbmFtZXMpXSlcclxuICAgICAgICAgICAgLnRoZW4oKC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7P30gX18wXHJcbiAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgdmFyIF9iID0gdHNsaWJfMS5fX3JlYWQoX2EsIDIpLCBoYXNSb2xlcyA9IF9iWzBdLCBoYXNQZXJtaXNzaW9ucyA9IF9iWzFdO1xyXG4gICAgICAgICAgICByZXR1cm4gaGFzUm9sZXMgfHwgaGFzUGVybWlzc2lvbnM7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gcm9sZU5hbWVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIE5neFJvbGVzU2VydmljZS5wcm90b3R5cGUuaGFzUm9sZUtleSA9IC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gcm9sZU5hbWVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIChyb2xlTmFtZSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgICAgIHZhciBwcm9taXNlcyA9IHJvbGVOYW1lLm1hcCgoLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHs/fSBrZXlcclxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgICAgICAgICB2YXIgaGFzVmFsaWRhdGlvbkZ1bmN0aW9uID0gISFfdGhpcy5yb2xlc1NvdXJjZS52YWx1ZVtrZXldICYmXHJcbiAgICAgICAgICAgICAgICAhIV90aGlzLnJvbGVzU291cmNlLnZhbHVlW2tleV0udmFsaWRhdGlvbkZ1bmN0aW9uICYmXHJcbiAgICAgICAgICAgICAgICBpc0Z1bmN0aW9uKF90aGlzLnJvbGVzU291cmNlLnZhbHVlW2tleV0udmFsaWRhdGlvbkZ1bmN0aW9uKTtcclxuICAgICAgICAgICAgaWYgKGhhc1ZhbGlkYXRpb25GdW5jdGlvbiAmJiAhaXNQcm9taXNlKF90aGlzLnJvbGVzU291cmNlLnZhbHVlW2tleV0udmFsaWRhdGlvbkZ1bmN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbGlkYXRpb25GdW5jdGlvbl8xID0gKC8qKiBAdHlwZSB7P30gKi8gKF90aGlzLnJvbGVzU291cmNlLnZhbHVlW2tleV0udmFsaWRhdGlvbkZ1bmN0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2YobnVsbCkucGlwZShtYXAoKC8qKlxyXG4gICAgICAgICAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gdmFsaWRhdGlvbkZ1bmN0aW9uXzEoKTsgfSkpLCBzd2l0Y2hNYXAoKC8qKlxyXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHs/fSBwcm9taXNlXHJcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocHJvbWlzZSkgeyByZXR1cm4gaXNCb29sZWFuKHByb21pc2UpID9cclxuICAgICAgICAgICAgICAgICAgICBvZigoLyoqIEB0eXBlIHs/fSAqLyAocHJvbWlzZSkpKSA6ICgvKiogQHR5cGUgez99ICovIChwcm9taXNlKSk7IH0pKSwgY2F0Y2hFcnJvcigoLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBvZihmYWxzZSk7IH0pKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG9mKGZhbHNlKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgcmV0dXJuIGZyb20ocHJvbWlzZXMpLnBpcGUobWVyZ2VBbGwoKSwgZmlyc3QoKC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7P30gZGF0YVxyXG4gICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIGRhdGEgIT09IGZhbHNlOyB9KSwgZmFsc2UpLCBtYXAoKC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7P30gZGF0YVxyXG4gICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIGRhdGEgIT09IGZhbHNlOyB9KSkpLnRvUHJvbWlzZSgpLnRoZW4oKC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7P30gZGF0YVxyXG4gICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIGRhdGE7IH0pKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHJvbGVzXHJcbiAgICAgKiBAcGFyYW0gez99IHJvbGVOYW1lc1xyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4Um9sZXNTZXJ2aWNlLnByb3RvdHlwZS5oYXNSb2xlUGVybWlzc2lvbiA9IC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gcm9sZXNcclxuICAgICAqIEBwYXJhbSB7P30gcm9sZU5hbWVzXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAocm9sZXMsIHJvbGVOYW1lcykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIGZyb20ocm9sZU5hbWVzKS5waXBlKG1lcmdlTWFwKCgvKipcclxuICAgICAgICAgKiBAcGFyYW0gez99IGtleVxyXG4gICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICBpZiAocm9sZXNba2V5XSAmJiBBcnJheS5pc0FycmF5KHJvbGVzW2tleV0udmFsaWRhdGlvbkZ1bmN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyb20oKC8qKiBAdHlwZSB7P30gKi8gKHJvbGVzW2tleV0udmFsaWRhdGlvbkZ1bmN0aW9uKSkpLnBpcGUobWVyZ2VNYXAoKC8qKlxyXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHs/fSBwZXJtaXNzaW9uXHJcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocGVybWlzc2lvbikgeyByZXR1cm4gX3RoaXMucGVybWlzc2lvbnNTZXJ2aWNlLmhhc1Blcm1pc3Npb24ocGVybWlzc2lvbik7IH0pKSwgZXZlcnkoKC8qKlxyXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHs/fSBoYXNQZXJtaXNzaW9uc1xyXG4gICAgICAgICAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGhhc1Blcm1pc3Npb25zKSB7IHJldHVybiBoYXNQZXJtaXNzaW9ucyA9PT0gdHJ1ZTsgfSkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gb2YoZmFsc2UpO1xyXG4gICAgICAgIH0pKSwgZmlyc3QoKC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7P30gaGFzUGVybWlzc2lvblxyXG4gICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gKGhhc1Blcm1pc3Npb24pIHsgcmV0dXJuIGhhc1Blcm1pc3Npb24gPT09IHRydWU7IH0pLCBmYWxzZSkpLnRvUHJvbWlzZSgpO1xyXG4gICAgfTtcclxuICAgIE5neFJvbGVzU2VydmljZS5kZWNvcmF0b3JzID0gW1xyXG4gICAgICAgIHsgdHlwZTogSW5qZWN0YWJsZSB9XHJcbiAgICBdO1xyXG4gICAgLyoqIEBub2NvbGxhcHNlICovXHJcbiAgICBOZ3hSb2xlc1NlcnZpY2UuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXHJcbiAgICAgICAgeyB0eXBlOiBCb29sZWFuLCBkZWNvcmF0b3JzOiBbeyB0eXBlOiBJbmplY3QsIGFyZ3M6IFtVU0VfUk9MRVNfU1RPUkUsXSB9XSB9LFxyXG4gICAgICAgIHsgdHlwZTogTmd4Um9sZXNTdG9yZSB9LFxyXG4gICAgICAgIHsgdHlwZTogTmd4UGVybWlzc2lvbnNTZXJ2aWNlIH1cclxuICAgIF07IH07XHJcbiAgICByZXR1cm4gTmd4Um9sZXNTZXJ2aWNlO1xyXG59KCkpO1xyXG5leHBvcnQgeyBOZ3hSb2xlc1NlcnZpY2UgfTtcclxuaWYgKGZhbHNlKSB7XHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHs/fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgTmd4Um9sZXNTZXJ2aWNlLnByb3RvdHlwZS5yb2xlc1NvdXJjZTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFJvbGVzU2VydmljZS5wcm90b3R5cGUucm9sZXMkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7P31cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIE5neFJvbGVzU2VydmljZS5wcm90b3R5cGUuaXNvbGF0ZTtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgez99XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBOZ3hSb2xlc1NlcnZpY2UucHJvdG90eXBlLnJvbGVzU3RvcmU7XHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHs/fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgTmd4Um9sZXNTZXJ2aWNlLnByb3RvdHlwZS5wZXJtaXNzaW9uc1NlcnZpY2U7XHJcbn1cciJdfQ==