/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
export class NgxPermissionsConfigurationStore {
    constructor() {
        this.strategiesSource = new BehaviorSubject({});
        this.strategies$ = this.strategiesSource.asObservable();
    }
}
NgxPermissionsConfigurationStore.ngInjectableDef = ɵngcc0.ɵɵdefineInjectable({ token: NgxPermissionsConfigurationStore, factory: function NgxPermissionsConfigurationStore_Factory(t) { return new (t || NgxPermissionsConfigurationStore)(); }, providedIn: null });
/*@__PURE__*/ ɵngcc0.ɵsetClassMetadata(NgxPermissionsConfigurationStore, [{
        type: Injectable
    }], function () { return []; }, { constructor: [], strategiesSource: [], strategies$: [] });
/** @nocollapse */
NgxPermissionsConfigurationStore.ctorParameters = () => [];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL09sZWtzYW5kci5LaHltZW5rby9XZWJzdG9ybVByb2plY3RzL25neC1wZXJtaXNzaW9ucy9kaXN0L25neC1wZXJtaXNzaW9ucy9lc20yMDE1L2xpYi9zdG9yZS9jb25maWd1cmF0aW9uLnN0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBTUE7Ozs7Ozs7OztDQUtDLCtGQUdDIiwiZmlsZSI6ImNvbmZpZ3VyYXRpb24uc3RvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGVvdmVydmlldyBhZGRlZCBieSB0c2lja2xlXHJcbiAqIEBzdXBwcmVzcyB7Y2hlY2tUeXBlcyxleHRyYVJlcXVpcmUsbWlzc2luZ092ZXJyaWRlLG1pc3NpbmdSZXR1cm4sdW51c2VkUHJpdmF0ZU1lbWJlcnMsdXNlbGVzc0NvZGV9IGNoZWNrZWQgYnkgdHNjXHJcbiAqL1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5leHBvcnQgY2xhc3MgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU3RvcmUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zdHJhdGVnaWVzU291cmNlID0gbmV3IEJlaGF2aW9yU3ViamVjdCh7fSk7XHJcbiAgICAgICAgdGhpcy5zdHJhdGVnaWVzJCA9IHRoaXMuc3RyYXRlZ2llc1NvdXJjZS5hc09ic2VydmFibGUoKTtcclxuICAgIH1cclxufVxyXG5OZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TdG9yZS5kZWNvcmF0b3JzID0gW1xyXG4gICAgeyB0eXBlOiBJbmplY3RhYmxlIH1cclxuXTtcclxuLyoqIEBub2NvbGxhcHNlICovXHJcbk5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblN0b3JlLmN0b3JQYXJhbWV0ZXJzID0gKCkgPT4gW107XHJcbmlmIChmYWxzZSkge1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU3RvcmUucHJvdG90eXBlLnN0cmF0ZWdpZXNTb3VyY2U7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TdG9yZS5wcm90b3R5cGUuc3RyYXRlZ2llcyQ7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TdG9yZS5wcm90b3R5cGUub25BdXRob3Jpc2VkRGVmYXVsdFN0cmF0ZWd5O1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU3RvcmUucHJvdG90eXBlLm9uVW5BdXRob3Jpc2VkRGVmYXVsdFN0cmF0ZWd5O1xyXG59XHIiXX0=