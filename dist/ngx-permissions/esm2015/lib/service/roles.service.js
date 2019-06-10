/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, from, of } from 'rxjs';
import { catchError, every, first, map, mergeAll, mergeMap, switchMap } from 'rxjs/operators';
import { NgxRolesStore } from '../store/roles.store';
import { isBoolean, isFunction, isPromise, transformStringToArray } from '../utils/utils';
import { NgxPermissionsService } from './permissions.service';
/** @type {?} */
import * as ɵngcc0 from '@angular/core';
export const USE_ROLES_STORE = new InjectionToken('USE_ROLES_STORE');
export class NgxRolesService {
    /**
     * @param {?=} isolate
     * @param {?=} rolesStore
     * @param {?=} permissionsService
     */
    constructor(isolate = false, rolesStore, permissionsService) {
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
    addRole(name, validationFunction) {
        /** @type {?} */
        const roles = Object.assign({}, this.rolesSource.value, { [name]: { name, validationFunction } });
        this.rolesSource.next(roles);
    }
    /**
     * @param {?} rolesObj
     * @return {?}
     */
    addRoles(rolesObj) {
        Object.keys(rolesObj).forEach((/**
         * @param {?} key
         * @param {?} index
         * @return {?}
         */
        (key, index) => {
            this.addRole(key, rolesObj[key]);
        }));
    }
    /**
     * @return {?}
     */
    flushRoles() {
        this.rolesSource.next({});
    }
    /**
     * @param {?} roleName
     * @return {?}
     */
    removeRole(roleName) {
        /** @type {?} */
        let roles = Object.assign({}, this.rolesSource.value);
        delete roles[roleName];
        this.rolesSource.next(roles);
    }
    /**
     * @return {?}
     */
    getRoles() {
        return this.rolesSource.value;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getRole(name) {
        return this.rolesSource.value[name];
    }
    /**
     * @param {?} names
     * @return {?}
     */
    hasOnlyRoles(names) {
        /** @type {?} */
        const isNamesEmpty = !names || (Array.isArray(names) && names.length === 0);
        if (isNamesEmpty)
            return Promise.resolve(true);
        names = transformStringToArray(names);
        return Promise.all([this.hasRoleKey(names), this.hasRolePermission(this.rolesSource.value, names)])
            .then((/**
         * @param {?} __0
         * @return {?}
         */
        ([hasRoles, hasPermissions]) => {
            return hasRoles || hasPermissions;
        }));
    }
    /**
     * @private
     * @param {?} roleName
     * @return {?}
     */
    hasRoleKey(roleName) {
        /** @type {?} */
        const promises = roleName.map((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            /** @type {?} */
            const hasValidationFunction = !!this.rolesSource.value[key] &&
                !!this.rolesSource.value[key].validationFunction &&
                isFunction(this.rolesSource.value[key].validationFunction);
            if (hasValidationFunction && !isPromise(this.rolesSource.value[key].validationFunction)) {
                /** @type {?} */
                const validationFunction = (/** @type {?} */ (this.rolesSource.value[key].validationFunction));
                return of(null).pipe(map((/**
                 * @return {?}
                 */
                () => validationFunction())), switchMap((/**
                 * @param {?} promise
                 * @return {?}
                 */
                (promise) => isBoolean(promise) ?
                    of((/** @type {?} */ (promise))) : (/** @type {?} */ (promise)))), catchError((/**
                 * @return {?}
                 */
                () => of(false))));
            }
            return of(false);
        }));
        return from(promises).pipe(mergeAll(), first((/**
         * @param {?} data
         * @return {?}
         */
        (data) => data !== false), false), map((/**
         * @param {?} data
         * @return {?}
         */
        (data) => data !== false))).toPromise().then((/**
         * @param {?} data
         * @return {?}
         */
        (data) => data));
    }
    /**
     * @private
     * @param {?} roles
     * @param {?} roleNames
     * @return {?}
     */
    hasRolePermission(roles, roleNames) {
        return from(roleNames).pipe(mergeMap((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            if (roles[key] && Array.isArray(roles[key].validationFunction)) {
                return from((/** @type {?} */ (roles[key].validationFunction))).pipe(mergeMap((/**
                 * @param {?} permission
                 * @return {?}
                 */
                (permission) => this.permissionsService.hasPermission(permission))), every((/**
                 * @param {?} hasPermissions
                 * @return {?}
                 */
                (hasPermissions) => hasPermissions === true)));
            }
            return of(false);
        })), first((/**
         * @param {?} hasPermission
         * @return {?}
         */
        (hasPermission) => hasPermission === true), false)).toPromise();
    }
}
NgxRolesService.ngInjectableDef = ɵngcc0.ɵɵdefineInjectable({ token: NgxRolesService, factory: function NgxRolesService_Factory(t) { return new (t || NgxRolesService)(ɵngcc0.ɵɵinject(USE_ROLES_STORE), ɵngcc0.ɵɵinject(NgxRolesStore), ɵngcc0.ɵɵinject(NgxPermissionsService)); }, providedIn: null });
/*@__PURE__*/ ɵngcc0.ɵsetClassMetadata(NgxRolesService, [{
        type: Injectable
    }], function () { return [{ type: Boolean, decorators: [{
                type: Inject,
                args: [USE_ROLES_STORE]
            }] }, { type: NgxRolesStore }, { type: NgxPermissionsService }]; }, { constructor: [], isolate: [], rolesStore: [], permissionsService: [], rolesSource: [], roles$: [], addRole: [], addRoles: [], flushRoles: [], removeRole: [], getRoles: [], getRole: [], hasOnlyRoles: [], hasRoleKey: [], hasRolePermission: [] });
/** @nocollapse */
NgxRolesService.ctorParameters = () => [
    { type: Boolean, decorators: [{ type: Inject, args: [USE_ROLES_STORE,] }] },
    { type: NgxRolesStore },
    { type: NgxPermissionsService }
];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL09sZWtzYW5kci5LaHltZW5rby9XZWJzdG9ybVByb2plY3RzL25neC1wZXJtaXNzaW9ucy9kaXN0L25neC1wZXJtaXNzaW9ucy9lc20yMDE1L2xpYi9zZXJ2aWNlL3JvbGVzLnNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQVdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FvS0MscVVBR0MiLCJmaWxlIjoicm9sZXMuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3IGFkZGVkIGJ5IHRzaWNrbGVcclxuICogQHN1cHByZXNzIHtjaGVja1R5cGVzLGV4dHJhUmVxdWlyZSxtaXNzaW5nT3ZlcnJpZGUsbWlzc2luZ1JldHVybix1bnVzZWRQcml2YXRlTWVtYmVycyx1c2VsZXNzQ29kZX0gY2hlY2tlZCBieSB0c2NcclxuICovXHJcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBmcm9tLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBldmVyeSwgZmlyc3QsIG1hcCwgbWVyZ2VBbGwsIG1lcmdlTWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE5neFJvbGVzU3RvcmUgfSBmcm9tICcuLi9zdG9yZS9yb2xlcy5zdG9yZSc7XHJcbmltcG9ydCB7IGlzQm9vbGVhbiwgaXNGdW5jdGlvbiwgaXNQcm9taXNlLCB0cmFuc2Zvcm1TdHJpbmdUb0FycmF5IH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xyXG5pbXBvcnQgeyBOZ3hQZXJtaXNzaW9uc1NlcnZpY2UgfSBmcm9tICcuL3Blcm1pc3Npb25zLnNlcnZpY2UnO1xyXG4vKiogQHR5cGUgez99ICovXHJcbmV4cG9ydCBjb25zdCBVU0VfUk9MRVNfU1RPUkUgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ1VTRV9ST0xFU19TVE9SRScpO1xyXG5leHBvcnQgY2xhc3MgTmd4Um9sZXNTZXJ2aWNlIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHs/PX0gaXNvbGF0ZVxyXG4gICAgICogQHBhcmFtIHs/PX0gcm9sZXNTdG9yZVxyXG4gICAgICogQHBhcmFtIHs/PX0gcGVybWlzc2lvbnNTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGlzb2xhdGUgPSBmYWxzZSwgcm9sZXNTdG9yZSwgcGVybWlzc2lvbnNTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5pc29sYXRlID0gaXNvbGF0ZTtcclxuICAgICAgICB0aGlzLnJvbGVzU3RvcmUgPSByb2xlc1N0b3JlO1xyXG4gICAgICAgIHRoaXMucGVybWlzc2lvbnNTZXJ2aWNlID0gcGVybWlzc2lvbnNTZXJ2aWNlO1xyXG4gICAgICAgIHRoaXMucm9sZXNTb3VyY2UgPSB0aGlzLmlzb2xhdGUgPyBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9KSA6IHRoaXMucm9sZXNTdG9yZS5yb2xlc1NvdXJjZTtcclxuICAgICAgICB0aGlzLnJvbGVzJCA9IHRoaXMucm9sZXNTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7P30gbmFtZVxyXG4gICAgICogQHBhcmFtIHs/fSB2YWxpZGF0aW9uRnVuY3Rpb25cclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGFkZFJvbGUobmFtZSwgdmFsaWRhdGlvbkZ1bmN0aW9uKSB7XHJcbiAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgICAgIGNvbnN0IHJvbGVzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5yb2xlc1NvdXJjZS52YWx1ZSwgeyBbbmFtZV06IHsgbmFtZSwgdmFsaWRhdGlvbkZ1bmN0aW9uIH0gfSk7XHJcbiAgICAgICAgdGhpcy5yb2xlc1NvdXJjZS5uZXh0KHJvbGVzKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHs/fSByb2xlc09ialxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgYWRkUm9sZXMocm9sZXNPYmopIHtcclxuICAgICAgICBPYmplY3Qua2V5cyhyb2xlc09iaikuZm9yRWFjaCgoLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHs/fSBrZXlcclxuICAgICAgICAgKiBAcGFyYW0gez99IGluZGV4XHJcbiAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgKi9cclxuICAgICAgICAoa2V5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFJvbGUoa2V5LCByb2xlc09ialtrZXldKTtcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGZsdXNoUm9sZXMoKSB7XHJcbiAgICAgICAgdGhpcy5yb2xlc1NvdXJjZS5uZXh0KHt9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHs/fSByb2xlTmFtZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgcmVtb3ZlUm9sZShyb2xlTmFtZSkge1xyXG4gICAgICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgICAgICBsZXQgcm9sZXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnJvbGVzU291cmNlLnZhbHVlKTtcclxuICAgICAgICBkZWxldGUgcm9sZXNbcm9sZU5hbWVdO1xyXG4gICAgICAgIHRoaXMucm9sZXNTb3VyY2UubmV4dChyb2xlcyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGdldFJvbGVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvbGVzU291cmNlLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gez99IG5hbWVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGdldFJvbGUobmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvbGVzU291cmNlLnZhbHVlW25hbWVdO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gez99IG5hbWVzXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBoYXNPbmx5Um9sZXMobmFtZXMpIHtcclxuICAgICAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICAgICAgY29uc3QgaXNOYW1lc0VtcHR5ID0gIW5hbWVzIHx8IChBcnJheS5pc0FycmF5KG5hbWVzKSAmJiBuYW1lcy5sZW5ndGggPT09IDApO1xyXG4gICAgICAgIGlmIChpc05hbWVzRW1wdHkpXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgbmFtZXMgPSB0cmFuc2Zvcm1TdHJpbmdUb0FycmF5KG5hbWVzKTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3RoaXMuaGFzUm9sZUtleShuYW1lcyksIHRoaXMuaGFzUm9sZVBlcm1pc3Npb24odGhpcy5yb2xlc1NvdXJjZS52YWx1ZSwgbmFtZXMpXSlcclxuICAgICAgICAgICAgLnRoZW4oKC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7P30gX18wXHJcbiAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgKi9cclxuICAgICAgICAoW2hhc1JvbGVzLCBoYXNQZXJtaXNzaW9uc10pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGhhc1JvbGVzIHx8IGhhc1Blcm1pc3Npb25zO1xyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gcm9sZU5hbWVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGhhc1JvbGVLZXkocm9sZU5hbWUpIHtcclxuICAgICAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSByb2xlTmFtZS5tYXAoKC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7P30ga2V5XHJcbiAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgKi9cclxuICAgICAgICAoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgICAgICAgICAgY29uc3QgaGFzVmFsaWRhdGlvbkZ1bmN0aW9uID0gISF0aGlzLnJvbGVzU291cmNlLnZhbHVlW2tleV0gJiZcclxuICAgICAgICAgICAgICAgICEhdGhpcy5yb2xlc1NvdXJjZS52YWx1ZVtrZXldLnZhbGlkYXRpb25GdW5jdGlvbiAmJlxyXG4gICAgICAgICAgICAgICAgaXNGdW5jdGlvbih0aGlzLnJvbGVzU291cmNlLnZhbHVlW2tleV0udmFsaWRhdGlvbkZ1bmN0aW9uKTtcclxuICAgICAgICAgICAgaWYgKGhhc1ZhbGlkYXRpb25GdW5jdGlvbiAmJiAhaXNQcm9taXNlKHRoaXMucm9sZXNTb3VyY2UudmFsdWVba2V5XS52YWxpZGF0aW9uRnVuY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uRnVuY3Rpb24gPSAoLyoqIEB0eXBlIHs/fSAqLyAodGhpcy5yb2xlc1NvdXJjZS52YWx1ZVtrZXldLnZhbGlkYXRpb25GdW5jdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKG51bGwpLnBpcGUobWFwKCgvKipcclxuICAgICAgICAgICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICgpID0+IHZhbGlkYXRpb25GdW5jdGlvbigpKSksIHN3aXRjaE1hcCgoLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0gez99IHByb21pc2VcclxuICAgICAgICAgICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIChwcm9taXNlKSA9PiBpc0Jvb2xlYW4ocHJvbWlzZSkgP1xyXG4gICAgICAgICAgICAgICAgICAgIG9mKCgvKiogQHR5cGUgez99ICovIChwcm9taXNlKSkpIDogKC8qKiBAdHlwZSB7P30gKi8gKHByb21pc2UpKSkpLCBjYXRjaEVycm9yKCgvKipcclxuICAgICAgICAgICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICgpID0+IG9mKGZhbHNlKSkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gb2YoZmFsc2UpO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICByZXR1cm4gZnJvbShwcm9taXNlcykucGlwZShtZXJnZUFsbCgpLCBmaXJzdCgoLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHs/fSBkYXRhXHJcbiAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgKi9cclxuICAgICAgICAoZGF0YSkgPT4gZGF0YSAhPT0gZmFsc2UpLCBmYWxzZSksIG1hcCgoLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHs/fSBkYXRhXHJcbiAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgKi9cclxuICAgICAgICAoZGF0YSkgPT4gZGF0YSAhPT0gZmFsc2UpKSkudG9Qcm9taXNlKCkudGhlbigoLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHs/fSBkYXRhXHJcbiAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgKi9cclxuICAgICAgICAoZGF0YSkgPT4gZGF0YSkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSByb2xlc1xyXG4gICAgICogQHBhcmFtIHs/fSByb2xlTmFtZXNcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGhhc1JvbGVQZXJtaXNzaW9uKHJvbGVzLCByb2xlTmFtZXMpIHtcclxuICAgICAgICByZXR1cm4gZnJvbShyb2xlTmFtZXMpLnBpcGUobWVyZ2VNYXAoKC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7P30ga2V5XHJcbiAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgKi9cclxuICAgICAgICAoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyb2xlc1trZXldICYmIEFycmF5LmlzQXJyYXkocm9sZXNba2V5XS52YWxpZGF0aW9uRnVuY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJvbSgoLyoqIEB0eXBlIHs/fSAqLyAocm9sZXNba2V5XS52YWxpZGF0aW9uRnVuY3Rpb24pKSkucGlwZShtZXJnZU1hcCgoLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0gez99IHBlcm1pc3Npb25cclxuICAgICAgICAgICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIChwZXJtaXNzaW9uKSA9PiB0aGlzLnBlcm1pc3Npb25zU2VydmljZS5oYXNQZXJtaXNzaW9uKHBlcm1pc3Npb24pKSksIGV2ZXJ5KCgvKipcclxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7P30gaGFzUGVybWlzc2lvbnNcclxuICAgICAgICAgICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIChoYXNQZXJtaXNzaW9ucykgPT4gaGFzUGVybWlzc2lvbnMgPT09IHRydWUpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG9mKGZhbHNlKTtcclxuICAgICAgICB9KSksIGZpcnN0KCgvKipcclxuICAgICAgICAgKiBAcGFyYW0gez99IGhhc1Blcm1pc3Npb25cclxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIChoYXNQZXJtaXNzaW9uKSA9PiBoYXNQZXJtaXNzaW9uID09PSB0cnVlKSwgZmFsc2UpKS50b1Byb21pc2UoKTtcclxuICAgIH1cclxufVxyXG5OZ3hSb2xlc1NlcnZpY2UuZGVjb3JhdG9ycyA9IFtcclxuICAgIHsgdHlwZTogSW5qZWN0YWJsZSB9XHJcbl07XHJcbi8qKiBAbm9jb2xsYXBzZSAqL1xyXG5OZ3hSb2xlc1NlcnZpY2UuY3RvclBhcmFtZXRlcnMgPSAoKSA9PiBbXHJcbiAgICB7IHR5cGU6IEJvb2xlYW4sIGRlY29yYXRvcnM6IFt7IHR5cGU6IEluamVjdCwgYXJnczogW1VTRV9ST0xFU19TVE9SRSxdIH1dIH0sXHJcbiAgICB7IHR5cGU6IE5neFJvbGVzU3RvcmUgfSxcclxuICAgIHsgdHlwZTogTmd4UGVybWlzc2lvbnNTZXJ2aWNlIH1cclxuXTtcclxuaWYgKGZhbHNlKSB7XHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHs/fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgTmd4Um9sZXNTZXJ2aWNlLnByb3RvdHlwZS5yb2xlc1NvdXJjZTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFJvbGVzU2VydmljZS5wcm90b3R5cGUucm9sZXMkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7P31cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIE5neFJvbGVzU2VydmljZS5wcm90b3R5cGUuaXNvbGF0ZTtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgez99XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBOZ3hSb2xlc1NlcnZpY2UucHJvdG90eXBlLnJvbGVzU3RvcmU7XHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHs/fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgTmd4Um9sZXNTZXJ2aWNlLnByb3RvdHlwZS5wZXJtaXNzaW9uc1NlcnZpY2U7XHJcbn1cciJdfQ==