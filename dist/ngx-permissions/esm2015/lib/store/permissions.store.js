/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
export class NgxPermissionsStore {
    constructor() {
        this.permissionsSource = new BehaviorSubject({});
        this.permissions$ = this.permissionsSource.asObservable();
    }
}
NgxPermissionsStore.ngInjectableDef = ɵngcc0.ɵɵdefineInjectable({ token: NgxPermissionsStore, factory: function NgxPermissionsStore_Factory(t) { return new (t || NgxPermissionsStore)(); }, providedIn: null });
/*@__PURE__*/ ɵngcc0.ɵsetClassMetadata(NgxPermissionsStore, [{
        type: Injectable
    }], function () { return []; }, { constructor: [], permissionsSource: [], permissions$: [] });
/** @nocollapse */
NgxPermissionsStore.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    NgxPermissionsStore.prototype.permissionsSource;
    /** @type {?} */
    NgxPermissionsStore.prototype.permissions$;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL09sZWtzYW5kci5LaHltZW5rby9XZWJzdG9ybVByb2plY3RzL25neC1wZXJtaXNzaW9ucy9kaXN0L25neC1wZXJtaXNzaW9ucy9lc20yMDE1L2xpYi9zdG9yZS9wZXJtaXNzaW9ucy5zdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQU1BOzs7Ozs7Ozs7Q0FLQyxpR0FHQyIsImZpbGUiOiJwZXJtaXNzaW9ucy5zdG9yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3IGFkZGVkIGJ5IHRzaWNrbGVcclxuICogQHN1cHByZXNzIHtjaGVja1R5cGVzLGV4dHJhUmVxdWlyZSxtaXNzaW5nT3ZlcnJpZGUsbWlzc2luZ1JldHVybix1bnVzZWRQcml2YXRlTWVtYmVycyx1c2VsZXNzQ29kZX0gY2hlY2tlZCBieSB0c2NcclxuICovXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmV4cG9ydCBjbGFzcyBOZ3hQZXJtaXNzaW9uc1N0b3JlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMucGVybWlzc2lvbnNTb3VyY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9KTtcclxuICAgICAgICB0aGlzLnBlcm1pc3Npb25zJCA9IHRoaXMucGVybWlzc2lvbnNTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9XHJcbn1cclxuTmd4UGVybWlzc2lvbnNTdG9yZS5kZWNvcmF0b3JzID0gW1xyXG4gICAgeyB0eXBlOiBJbmplY3RhYmxlIH1cclxuXTtcclxuLyoqIEBub2NvbGxhcHNlICovXHJcbk5neFBlcm1pc3Npb25zU3RvcmUuY3RvclBhcmFtZXRlcnMgPSAoKSA9PiBbXTtcclxuaWYgKGZhbHNlKSB7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc1N0b3JlLnByb3RvdHlwZS5wZXJtaXNzaW9uc1NvdXJjZTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zU3RvcmUucHJvdG90eXBlLnBlcm1pc3Npb25zJDtcclxufVxyIl19