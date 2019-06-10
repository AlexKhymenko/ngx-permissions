/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, from, of } from 'rxjs';
import { catchError, first, map, mergeAll, switchMap } from 'rxjs/operators';
import { NgxPermissionsStore } from '../store/permissions.store';
import { isBoolean, isFunction, transformStringToArray } from '../utils/utils';
/** @type {?} */
import * as ɵngcc0 from '@angular/core';
export const USE_PERMISSIONS_STORE = new InjectionToken('USE_PERMISSIONS_STORE');
export class NgxPermissionsService {
    /**
     * @param {?=} isolate
     * @param {?=} permissionsStore
     */
    constructor(isolate = false, permissionsStore) {
        this.isolate = isolate;
        this.permissionsStore = permissionsStore;
        this.permissionsSource = isolate ? new BehaviorSubject({}) : permissionsStore.permissionsSource;
        this.permissions$ = this.permissionsSource.asObservable();
    }
    /**
     * Remove all permissions from permissions source
     * @return {?}
     */
    flushPermissions() {
        this.permissionsSource.next({});
    }
    /**
     * @param {?} permission
     * @return {?}
     */
    hasPermission(permission) {
        if (!permission || (Array.isArray(permission) && permission.length === 0)) {
            return Promise.resolve(true);
        }
        permission = transformStringToArray(permission);
        return this.hasArrayPermission(permission);
    }
    /**
     * @param {?} permissions
     * @param {?=} validationFunction
     * @return {?}
     */
    loadPermissions(permissions, validationFunction) {
        /** @type {?} */
        const newPermissions = permissions.reduce((/**
         * @param {?} source
         * @param {?} p
         * @return {?}
         */
        (source, p) => this.reducePermission(source, p, validationFunction)), {});
        this.permissionsSource.next(newPermissions);
    }
    /**
     * @param {?} permission
     * @param {?=} validationFunction
     * @return {?}
     */
    addPermission(permission, validationFunction) {
        if (Array.isArray(permission)) {
            /** @type {?} */
            const permissions = permission.reduce((/**
             * @param {?} source
             * @param {?} p
             * @return {?}
             */
            (source, p) => this.reducePermission(source, p, validationFunction)), this.permissionsSource.value);
            this.permissionsSource.next(permissions);
        }
        else {
            /** @type {?} */
            const permissions = this.reducePermission(this.permissionsSource.value, permission, validationFunction);
            this.permissionsSource.next(permissions);
        }
    }
    /**
     * @param {?} permissionName
     * @return {?}
     */
    removePermission(permissionName) {
        /** @type {?} */
        const permissions = Object.assign({}, this.permissionsSource.value);
        delete permissions[permissionName];
        this.permissionsSource.next(permissions);
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getPermission(name) {
        return this.permissionsSource.value[name];
    }
    /**
     * @return {?}
     */
    getPermissions() {
        return this.permissionsSource.value;
    }
    /**
     * @private
     * @param {?} source
     * @param {?} name
     * @param {?=} validationFunction
     * @return {?}
     */
    reducePermission(source, name, validationFunction) {
        if (!!validationFunction && isFunction(validationFunction)) {
            return Object.assign({}, source, { [name]: { name, validationFunction } });
        }
        else {
            return Object.assign({}, source, { [name]: { name } });
        }
    }
    /**
     * @private
     * @param {?} permissions
     * @return {?}
     */
    hasArrayPermission(permissions) {
        /** @type {?} */
        const promises = permissions.map((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            if (this.hasPermissionValidationFunction(key)) {
                /** @type {?} */
                const immutableValue = Object.assign({}, this.permissionsSource.value);
                /** @type {?} */
                const validationFunction = (/** @type {?} */ (this.permissionsSource.value[key].validationFunction));
                return of(null).pipe(map((/**
                 * @return {?}
                 */
                () => {
                    return validationFunction(key, immutableValue);
                })), switchMap((/**
                 * @param {?} promise
                 * @return {?}
                 */
                (promise) => {
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
                () => of(false))));
            }
            // check for name of the permission if there is no validation function
            return of(!!this.permissionsSource.value[key]);
        }));
        return from(promises).pipe(mergeAll(), first((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            /** @type {?} */
            const r = data !== false;
            return r;
        }), false), map((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            /** @type {?} */
            const r = data === false ? false : true;
            return r;
        }))).toPromise().then((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            return data;
        }));
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    hasPermissionValidationFunction(key) {
        return !!this.permissionsSource.value[key] &&
            !!this.permissionsSource.value[key].validationFunction &&
            isFunction(this.permissionsSource.value[key].validationFunction);
    }
}
NgxPermissionsService.ngInjectableDef = ɵngcc0.ɵɵdefineInjectable({ token: NgxPermissionsService, factory: function NgxPermissionsService_Factory(t) { return new (t || NgxPermissionsService)(ɵngcc0.ɵɵinject(USE_PERMISSIONS_STORE), ɵngcc0.ɵɵinject(NgxPermissionsStore)); }, providedIn: null });
/*@__PURE__*/ ɵngcc0.ɵsetClassMetadata(NgxPermissionsService, [{
        type: Injectable
    }], function () { return [{ type: Boolean, decorators: [{
                type: Inject,
                args: [USE_PERMISSIONS_STORE]
            }] }, { type: NgxPermissionsStore }]; }, { constructor: [], isolate: [], permissionsStore: [], permissionsSource: [], permissions$: [], flushPermissions: [], hasPermission: [], loadPermissions: [], addPermission: [], removePermission: [], getPermission: [], getPermissions: [], reducePermission: [], hasArrayPermission: [], hasPermissionValidationFunction: [] });
/** @nocollapse */
NgxPermissionsService.ctorParameters = () => [
    { type: Boolean, decorators: [{ type: Inject, args: [USE_PERMISSIONS_STORE,] }] },
    { type: NgxPermissionsStore }
];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL09sZWtzYW5kci5LaHltZW5rby9XZWJzdG9ybVByb2plY3RzL25neC1wZXJtaXNzaW9ucy9kaXN0L25neC1wZXJtaXNzaW9ucy9lc20yMDE1L2xpYi9zZXJ2aWNlL3Blcm1pc3Npb25zLnNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXNMQyxzWEFHQyIsImZpbGUiOiJwZXJtaXNzaW9ucy5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcgYWRkZWQgYnkgdHNpY2tsZVxyXG4gKiBAc3VwcHJlc3Mge2NoZWNrVHlwZXMsZXh0cmFSZXF1aXJlLG1pc3NpbmdPdmVycmlkZSxtaXNzaW5nUmV0dXJuLHVudXNlZFByaXZhdGVNZW1iZXJzLHVzZWxlc3NDb2RlfSBjaGVja2VkIGJ5IHRzY1xyXG4gKi9cclxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGZyb20sIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGZpcnN0LCBtYXAsIG1lcmdlQWxsLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE5neFBlcm1pc3Npb25zU3RvcmUgfSBmcm9tICcuLi9zdG9yZS9wZXJtaXNzaW9ucy5zdG9yZSc7XHJcbmltcG9ydCB7IGlzQm9vbGVhbiwgaXNGdW5jdGlvbiwgdHJhbnNmb3JtU3RyaW5nVG9BcnJheSB9IGZyb20gJy4uL3V0aWxzL3V0aWxzJztcclxuLyoqIEB0eXBlIHs/fSAqL1xyXG5leHBvcnQgY29uc3QgVVNFX1BFUk1JU1NJT05TX1NUT1JFID0gbmV3IEluamVjdGlvblRva2VuKCdVU0VfUEVSTUlTU0lPTlNfU1RPUkUnKTtcclxuZXhwb3J0IGNsYXNzIE5neFBlcm1pc3Npb25zU2VydmljZSB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7Pz19IGlzb2xhdGVcclxuICAgICAqIEBwYXJhbSB7Pz19IHBlcm1pc3Npb25zU3RvcmVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaXNvbGF0ZSA9IGZhbHNlLCBwZXJtaXNzaW9uc1N0b3JlKSB7XHJcbiAgICAgICAgdGhpcy5pc29sYXRlID0gaXNvbGF0ZTtcclxuICAgICAgICB0aGlzLnBlcm1pc3Npb25zU3RvcmUgPSBwZXJtaXNzaW9uc1N0b3JlO1xyXG4gICAgICAgIHRoaXMucGVybWlzc2lvbnNTb3VyY2UgPSBpc29sYXRlID8gbmV3IEJlaGF2aW9yU3ViamVjdCh7fSkgOiBwZXJtaXNzaW9uc1N0b3JlLnBlcm1pc3Npb25zU291cmNlO1xyXG4gICAgICAgIHRoaXMucGVybWlzc2lvbnMkID0gdGhpcy5wZXJtaXNzaW9uc1NvdXJjZS5hc09ic2VydmFibGUoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGFsbCBwZXJtaXNzaW9ucyBmcm9tIHBlcm1pc3Npb25zIHNvdXJjZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZmx1c2hQZXJtaXNzaW9ucygpIHtcclxuICAgICAgICB0aGlzLnBlcm1pc3Npb25zU291cmNlLm5leHQoe30pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gez99IHBlcm1pc3Npb25cclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGhhc1Blcm1pc3Npb24ocGVybWlzc2lvbikge1xyXG4gICAgICAgIGlmICghcGVybWlzc2lvbiB8fCAoQXJyYXkuaXNBcnJheShwZXJtaXNzaW9uKSAmJiBwZXJtaXNzaW9uLmxlbmd0aCA9PT0gMCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGVybWlzc2lvbiA9IHRyYW5zZm9ybVN0cmluZ1RvQXJyYXkocGVybWlzc2lvbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQXJyYXlQZXJtaXNzaW9uKHBlcm1pc3Npb24pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gez99IHBlcm1pc3Npb25zXHJcbiAgICAgKiBAcGFyYW0gez89fSB2YWxpZGF0aW9uRnVuY3Rpb25cclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGxvYWRQZXJtaXNzaW9ucyhwZXJtaXNzaW9ucywgdmFsaWRhdGlvbkZ1bmN0aW9uKSB7XHJcbiAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgICAgIGNvbnN0IG5ld1Blcm1pc3Npb25zID0gcGVybWlzc2lvbnMucmVkdWNlKCgvKipcclxuICAgICAgICAgKiBAcGFyYW0gez99IHNvdXJjZVxyXG4gICAgICAgICAqIEBwYXJhbSB7P30gcFxyXG4gICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgKHNvdXJjZSwgcCkgPT4gdGhpcy5yZWR1Y2VQZXJtaXNzaW9uKHNvdXJjZSwgcCwgdmFsaWRhdGlvbkZ1bmN0aW9uKSksIHt9KTtcclxuICAgICAgICB0aGlzLnBlcm1pc3Npb25zU291cmNlLm5leHQobmV3UGVybWlzc2lvbnMpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gez99IHBlcm1pc3Npb25cclxuICAgICAqIEBwYXJhbSB7Pz19IHZhbGlkYXRpb25GdW5jdGlvblxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgYWRkUGVybWlzc2lvbihwZXJtaXNzaW9uLCB2YWxpZGF0aW9uRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwZXJtaXNzaW9uKSkge1xyXG4gICAgICAgICAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICAgICAgICAgIGNvbnN0IHBlcm1pc3Npb25zID0gcGVybWlzc2lvbi5yZWR1Y2UoKC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gez99IHNvdXJjZVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gez99IHBcclxuICAgICAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIChzb3VyY2UsIHApID0+IHRoaXMucmVkdWNlUGVybWlzc2lvbihzb3VyY2UsIHAsIHZhbGlkYXRpb25GdW5jdGlvbikpLCB0aGlzLnBlcm1pc3Npb25zU291cmNlLnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5wZXJtaXNzaW9uc1NvdXJjZS5uZXh0KHBlcm1pc3Npb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgICAgICAgICAgY29uc3QgcGVybWlzc2lvbnMgPSB0aGlzLnJlZHVjZVBlcm1pc3Npb24odGhpcy5wZXJtaXNzaW9uc1NvdXJjZS52YWx1ZSwgcGVybWlzc2lvbiwgdmFsaWRhdGlvbkZ1bmN0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5wZXJtaXNzaW9uc1NvdXJjZS5uZXh0KHBlcm1pc3Npb25zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7P30gcGVybWlzc2lvbk5hbWVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVBlcm1pc3Npb24ocGVybWlzc2lvbk5hbWUpIHtcclxuICAgICAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICAgICAgY29uc3QgcGVybWlzc2lvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnBlcm1pc3Npb25zU291cmNlLnZhbHVlKTtcclxuICAgICAgICBkZWxldGUgcGVybWlzc2lvbnNbcGVybWlzc2lvbk5hbWVdO1xyXG4gICAgICAgIHRoaXMucGVybWlzc2lvbnNTb3VyY2UubmV4dChwZXJtaXNzaW9ucyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7P30gbmFtZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZ2V0UGVybWlzc2lvbihuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGVybWlzc2lvbnNTb3VyY2UudmFsdWVbbmFtZV07XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGdldFBlcm1pc3Npb25zKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBlcm1pc3Npb25zU291cmNlLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSBzb3VyY2VcclxuICAgICAqIEBwYXJhbSB7P30gbmFtZVxyXG4gICAgICogQHBhcmFtIHs/PX0gdmFsaWRhdGlvbkZ1bmN0aW9uXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICByZWR1Y2VQZXJtaXNzaW9uKHNvdXJjZSwgbmFtZSwgdmFsaWRhdGlvbkZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKCEhdmFsaWRhdGlvbkZ1bmN0aW9uICYmIGlzRnVuY3Rpb24odmFsaWRhdGlvbkZ1bmN0aW9uKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc291cmNlLCB7IFtuYW1lXTogeyBuYW1lLCB2YWxpZGF0aW9uRnVuY3Rpb24gfSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzb3VyY2UsIHsgW25hbWVdOiB7IG5hbWUgfSB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHBlcm1pc3Npb25zXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBoYXNBcnJheVBlcm1pc3Npb24ocGVybWlzc2lvbnMpIHtcclxuICAgICAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBwZXJtaXNzaW9ucy5tYXAoKC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7P30ga2V5XHJcbiAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgKi9cclxuICAgICAgICAoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1Blcm1pc3Npb25WYWxpZGF0aW9uRnVuY3Rpb24oa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW1tdXRhYmxlVmFsdWUgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnBlcm1pc3Npb25zU291cmNlLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25GdW5jdGlvbiA9ICgvKiogQHR5cGUgez99ICovICh0aGlzLnBlcm1pc3Npb25zU291cmNlLnZhbHVlW2tleV0udmFsaWRhdGlvbkZ1bmN0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2YobnVsbCkucGlwZShtYXAoKC8qKlxyXG4gICAgICAgICAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZGF0aW9uRnVuY3Rpb24oa2V5LCBpbW11dGFibGVWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KSksIHN3aXRjaE1hcCgoLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0gez99IHByb21pc2VcclxuICAgICAgICAgICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIChwcm9taXNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBiID0gaXNCb29sZWFuKHByb21pc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZigoLyoqIEB0eXBlIHs/fSAqLyAocHJvbWlzZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoLyoqIEB0eXBlIHs/fSAqLyAocHJvbWlzZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKSwgY2F0Y2hFcnJvcigoLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAoKSA9PiBvZihmYWxzZSkpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIG5hbWUgb2YgdGhlIHBlcm1pc3Npb24gaWYgdGhlcmUgaXMgbm8gdmFsaWRhdGlvbiBmdW5jdGlvblxyXG4gICAgICAgICAgICByZXR1cm4gb2YoISF0aGlzLnBlcm1pc3Npb25zU291cmNlLnZhbHVlW2tleV0pO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICByZXR1cm4gZnJvbShwcm9taXNlcykucGlwZShtZXJnZUFsbCgpLCBmaXJzdCgoLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHs/fSBkYXRhXHJcbiAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgKi9cclxuICAgICAgICAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICAgICAgICAgIGNvbnN0IHIgPSBkYXRhICE9PSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgICAgfSksIGZhbHNlKSwgbWFwKCgvKipcclxuICAgICAgICAgKiBAcGFyYW0gez99IGRhdGFcclxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgICAgICAgICAgY29uc3QgciA9IGRhdGEgPT09IGZhbHNlID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICB9KSkpLnRvUHJvbWlzZSgpLnRoZW4oKC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7P30gZGF0YVxyXG4gICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSBrZXlcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGhhc1Blcm1pc3Npb25WYWxpZGF0aW9uRnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5wZXJtaXNzaW9uc1NvdXJjZS52YWx1ZVtrZXldICYmXHJcbiAgICAgICAgICAgICEhdGhpcy5wZXJtaXNzaW9uc1NvdXJjZS52YWx1ZVtrZXldLnZhbGlkYXRpb25GdW5jdGlvbiAmJlxyXG4gICAgICAgICAgICBpc0Z1bmN0aW9uKHRoaXMucGVybWlzc2lvbnNTb3VyY2UudmFsdWVba2V5XS52YWxpZGF0aW9uRnVuY3Rpb24pO1xyXG4gICAgfVxyXG59XHJcbk5neFBlcm1pc3Npb25zU2VydmljZS5kZWNvcmF0b3JzID0gW1xyXG4gICAgeyB0eXBlOiBJbmplY3RhYmxlIH1cclxuXTtcclxuLyoqIEBub2NvbGxhcHNlICovXHJcbk5neFBlcm1pc3Npb25zU2VydmljZS5jdG9yUGFyYW1ldGVycyA9ICgpID0+IFtcclxuICAgIHsgdHlwZTogQm9vbGVhbiwgZGVjb3JhdG9yczogW3sgdHlwZTogSW5qZWN0LCBhcmdzOiBbVVNFX1BFUk1JU1NJT05TX1NUT1JFLF0gfV0gfSxcclxuICAgIHsgdHlwZTogTmd4UGVybWlzc2lvbnNTdG9yZSB9XHJcbl07XHJcbmlmIChmYWxzZSkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7P31cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zU2VydmljZS5wcm90b3R5cGUucGVybWlzc2lvbnNTb3VyY2U7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc1NlcnZpY2UucHJvdG90eXBlLnBlcm1pc3Npb25zJDtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgez99XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc1NlcnZpY2UucHJvdG90eXBlLmlzb2xhdGU7XHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHs/fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNTZXJ2aWNlLnByb3RvdHlwZS5wZXJtaXNzaW9uc1N0b3JlO1xyXG59XHIiXX0=