/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
var NgxPermissionsConfigurationStore = /** @class */ (function () {
    function NgxPermissionsConfigurationStore() {
        this.strategiesSource = new BehaviorSubject({});
        this.strategies$ = this.strategiesSource.asObservable();
    }
    /** @nocollapse */
    NgxPermissionsConfigurationStore.ctorParameters = function () { return []; };
NgxPermissionsConfigurationStore.ngInjectableDef = ɵngcc0.ɵɵdefineInjectable({ token: NgxPermissionsConfigurationStore, factory: function NgxPermissionsConfigurationStore_Factory(t) { return new (t || NgxPermissionsConfigurationStore)(); }, providedIn: null });
/*@__PURE__*/ ɵngcc0.ɵsetClassMetadata(NgxPermissionsConfigurationStore, [{
        type: Injectable
    }], function () { return []; }, { strategiesSource: [], strategies$: [] });
    return NgxPermissionsConfigurationStore;
}());
export { NgxPermissionsConfigurationStore };
if (false) {
    /** @type {?} */
    NgxPermissionsConfigurationStore.prototype.strategiesSource;
    /** @type {?} */
    NgxPermissionsConfigurationStore.prototype.strategies$;
    /** @type {?} */
    NgxPermissionsConfigurationStore.prototype.onAuthorisedDefaultStrategy;
    /** @type {?} */
    NgxPermissionsConfigurationStore.prototype.onUnAuthorisedDefaultStrategy;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL09sZWtzYW5kci5LaHltZW5rby9XZWJzdG9ybVByb2plY3RzL25neC1wZXJtaXNzaW9ucy9hcHBsaWNhdGlvbi9kaXN0L25neC1wZXJtaXNzaW9ucy9lc201L2xpYi9zdG9yZS9jb25maWd1cmF0aW9uLnN0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBTUE7Ozs7S0FJSyxBQUdDOzs7Ozs7K0VBRTJFIiwiZmlsZSI6ImNvbmZpZ3VyYXRpb24uc3RvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGVvdmVydmlldyBhZGRlZCBieSB0c2lja2xlXHJcbiAqIEBzdXBwcmVzcyB7Y2hlY2tUeXBlcyxleHRyYVJlcXVpcmUsbWlzc2luZ092ZXJyaWRlLG1pc3NpbmdSZXR1cm4sdW51c2VkUHJpdmF0ZU1lbWJlcnMsdXNlbGVzc0NvZGV9IGNoZWNrZWQgYnkgdHNjXHJcbiAqL1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG52YXIgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU3RvcmUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TdG9yZSgpIHtcclxuICAgICAgICB0aGlzLnN0cmF0ZWdpZXNTb3VyY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9KTtcclxuICAgICAgICB0aGlzLnN0cmF0ZWdpZXMkID0gdGhpcy5zdHJhdGVnaWVzU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgfVxyXG4gICAgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU3RvcmUuZGVjb3JhdG9ycyA9IFtcclxuICAgICAgICB7IHR5cGU6IEluamVjdGFibGUgfVxyXG4gICAgXTtcclxuICAgIC8qKiBAbm9jb2xsYXBzZSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU3RvcmUuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXTsgfTtcclxuICAgIHJldHVybiBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TdG9yZTtcclxufSgpKTtcclxuZXhwb3J0IHsgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU3RvcmUgfTtcclxuaWYgKGZhbHNlKSB7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TdG9yZS5wcm90b3R5cGUuc3RyYXRlZ2llc1NvdXJjZTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblN0b3JlLnByb3RvdHlwZS5zdHJhdGVnaWVzJDtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblN0b3JlLnByb3RvdHlwZS5vbkF1dGhvcmlzZWREZWZhdWx0U3RyYXRlZ3k7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TdG9yZS5wcm90b3R5cGUub25VbkF1dGhvcmlzZWREZWZhdWx0U3RyYXRlZ3k7XHJcbn1cciJdfQ==