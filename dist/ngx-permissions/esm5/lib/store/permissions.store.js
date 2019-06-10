/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
var NgxPermissionsStore = /** @class */ (function () {
    function NgxPermissionsStore() {
        this.permissionsSource = new BehaviorSubject({});
        this.permissions$ = this.permissionsSource.asObservable();
    }
    /** @nocollapse */
    NgxPermissionsStore.ctorParameters = function () { return []; };
NgxPermissionsStore.ngInjectableDef = ɵngcc0.ɵɵdefineInjectable({ token: NgxPermissionsStore, factory: function NgxPermissionsStore_Factory(t) { return new (t || NgxPermissionsStore)(); }, providedIn: null });
/*@__PURE__*/ ɵngcc0.ɵsetClassMetadata(NgxPermissionsStore, [{
        type: Injectable
    }], function () { return []; }, { permissionsSource: [], permissions$: [] });
    return NgxPermissionsStore;
}());
export { NgxPermissionsStore };
if (false) {
    /** @type {?} */
    NgxPermissionsStore.prototype.permissionsSource;
    /** @type {?} */
    NgxPermissionsStore.prototype.permissions$;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL09sZWtzYW5kci5LaHltZW5rby9XZWJzdG9ybVByb2plY3RzL25neC1wZXJtaXNzaW9ucy9hcHBsaWNhdGlvbi9kaXN0L25neC1wZXJtaXNzaW9ucy9lc201L2xpYi9zdG9yZS9wZXJtaXNzaW9ucy5zdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQU1BOzs7O0tBSUssQUFHQzs7Ozs7O2lGQUU4RCIsImZpbGUiOiJwZXJtaXNzaW9ucy5zdG9yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3IGFkZGVkIGJ5IHRzaWNrbGVcclxuICogQHN1cHByZXNzIHtjaGVja1R5cGVzLGV4dHJhUmVxdWlyZSxtaXNzaW5nT3ZlcnJpZGUsbWlzc2luZ1JldHVybix1bnVzZWRQcml2YXRlTWVtYmVycyx1c2VsZXNzQ29kZX0gY2hlY2tlZCBieSB0c2NcclxuICovXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbnZhciBOZ3hQZXJtaXNzaW9uc1N0b3JlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTmd4UGVybWlzc2lvbnNTdG9yZSgpIHtcclxuICAgICAgICB0aGlzLnBlcm1pc3Npb25zU291cmNlID0gbmV3IEJlaGF2aW9yU3ViamVjdCh7fSk7XHJcbiAgICAgICAgdGhpcy5wZXJtaXNzaW9ucyQgPSB0aGlzLnBlcm1pc3Npb25zU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgfVxyXG4gICAgTmd4UGVybWlzc2lvbnNTdG9yZS5kZWNvcmF0b3JzID0gW1xyXG4gICAgICAgIHsgdHlwZTogSW5qZWN0YWJsZSB9XHJcbiAgICBdO1xyXG4gICAgLyoqIEBub2NvbGxhcHNlICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc1N0b3JlLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW107IH07XHJcbiAgICByZXR1cm4gTmd4UGVybWlzc2lvbnNTdG9yZTtcclxufSgpKTtcclxuZXhwb3J0IHsgTmd4UGVybWlzc2lvbnNTdG9yZSB9O1xyXG5pZiAoZmFsc2UpIHtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zU3RvcmUucHJvdG90eXBlLnBlcm1pc3Npb25zU291cmNlO1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNTdG9yZS5wcm90b3R5cGUucGVybWlzc2lvbnMkO1xyXG59XHIiXX0=