/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgxPermissionsPredefinedStrategies } from '../enums/predefined-strategies.enum';
import { NgxPermissionsConfigurationStore } from '../store/configuration.store';
/** @type {?} */
import * as ɵngcc0 from '@angular/core';
export const USE_CONFIGURATION_STORE = new InjectionToken('USE_CONFIGURATION_STORE');
export class NgxPermissionsConfigurationService {
    /**
     * @param {?=} isolate
     * @param {?=} configurationStore
     */
    constructor(isolate = false, configurationStore) {
        this.isolate = isolate;
        this.configurationStore = configurationStore;
        this.strategiesSource = this.isolate ? new BehaviorSubject({}) : this.configurationStore.strategiesSource;
        this.strategies$ = this.strategiesSource.asObservable();
        this.onAuthorisedDefaultStrategy = this.isolate ? undefined : this.configurationStore.onAuthorisedDefaultStrategy;
        this.onUnAuthorisedDefaultStrategy = this.isolate ? undefined : this.configurationStore.onUnAuthorisedDefaultStrategy;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    setDefaultOnAuthorizedStrategy(name) {
        if (this.isolate) {
            this.onAuthorisedDefaultStrategy = this.getDefinedStrategy(name);
        }
        else {
            this.configurationStore.onAuthorisedDefaultStrategy = this.getDefinedStrategy(name);
            this.onAuthorisedDefaultStrategy = this.configurationStore.onAuthorisedDefaultStrategy;
        }
    }
    /**
     * @param {?} name
     * @return {?}
     */
    setDefaultOnUnauthorizedStrategy(name) {
        if (this.isolate) {
            this.onUnAuthorisedDefaultStrategy = this.getDefinedStrategy(name);
        }
        else {
            this.configurationStore.onUnAuthorisedDefaultStrategy = this.getDefinedStrategy(name);
            this.onUnAuthorisedDefaultStrategy = this.configurationStore.onUnAuthorisedDefaultStrategy;
        }
    }
    /**
     * @param {?} key
     * @param {?} func
     * @return {?}
     */
    addPermissionStrategy(key, func) {
        this.strategiesSource.value[key] = func;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getStrategy(key) {
        return this.strategiesSource.value[key];
    }
    /**
     * @return {?}
     */
    getAllStrategies() {
        return this.strategiesSource.value;
    }
    /**
     * @private
     * @param {?} name
     * @return {?}
     */
    getDefinedStrategy(name) {
        if (this.strategiesSource.value[name] || this.isPredefinedStrategy(name)) {
            return name;
        }
        else {
            throw new Error(`No ' ${name} ' strategy is found please define one`);
        }
    }
    /**
     * @private
     * @param {?} strategy
     * @return {?}
     */
    isPredefinedStrategy(strategy) {
        return strategy === NgxPermissionsPredefinedStrategies.SHOW || strategy === NgxPermissionsPredefinedStrategies.REMOVE;
    }
}
NgxPermissionsConfigurationService.ngInjectableDef = ɵngcc0.ɵɵdefineInjectable({ token: NgxPermissionsConfigurationService, factory: function NgxPermissionsConfigurationService_Factory(t) { return new (t || NgxPermissionsConfigurationService)(ɵngcc0.ɵɵinject(USE_CONFIGURATION_STORE), ɵngcc0.ɵɵinject(NgxPermissionsConfigurationStore)); }, providedIn: null });
/*@__PURE__*/ ɵngcc0.ɵsetClassMetadata(NgxPermissionsConfigurationService, [{
        type: Injectable
    }], function () { return [{ type: Boolean, decorators: [{
                type: Inject,
                args: [USE_CONFIGURATION_STORE]
            }] }, { type: NgxPermissionsConfigurationStore }]; }, { constructor: [], isolate: [], configurationStore: [], strategiesSource: [], strategies$: [], onAuthorisedDefaultStrategy: [], onUnAuthorisedDefaultStrategy: [], setDefaultOnAuthorizedStrategy: [], setDefaultOnUnauthorizedStrategy: [], addPermissionStrategy: [], getStrategy: [], getAllStrategies: [], getDefinedStrategy: [], isPredefinedStrategy: [] });
/** @nocollapse */
NgxPermissionsConfigurationService.ctorParameters = () => [
    { type: Boolean, decorators: [{ type: Inject, args: [USE_CONFIGURATION_STORE,] }] },
    { type: NgxPermissionsConfigurationStore }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxPermissionsConfigurationService.prototype.strategiesSource;
    /** @type {?} */
    NgxPermissionsConfigurationService.prototype.strategies$;
    /** @type {?} */
    NgxPermissionsConfigurationService.prototype.onAuthorisedDefaultStrategy;
    /** @type {?} */
    NgxPermissionsConfigurationService.prototype.onUnAuthorisedDefaultStrategy;
    /**
     * @type {?}
     * @private
     */
    NgxPermissionsConfigurationService.prototype.isolate;
    /**
     * @type {?}
     * @private
     */
    NgxPermissionsConfigurationService.prototype.configurationStore;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL09sZWtzYW5kci5LaHltZW5rby9XZWJzdG9ybVByb2plY3RzL25neC1wZXJtaXNzaW9ucy9kaXN0L25neC1wZXJtaXNzaW9ucy9lc20yMDE1L2xpYi9zZXJ2aWNlL2NvbmZpZ3VyYXRpb24uc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQWtGQyxvYUFHQyIsImZpbGUiOiJjb25maWd1cmF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGVvdmVydmlldyBhZGRlZCBieSB0c2lja2xlXHJcbiAqIEBzdXBwcmVzcyB7Y2hlY2tUeXBlcyxleHRyYVJlcXVpcmUsbWlzc2luZ092ZXJyaWRlLG1pc3NpbmdSZXR1cm4sdW51c2VkUHJpdmF0ZU1lbWJlcnMsdXNlbGVzc0NvZGV9IGNoZWNrZWQgYnkgdHNjXHJcbiAqL1xyXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBOZ3hQZXJtaXNzaW9uc1ByZWRlZmluZWRTdHJhdGVnaWVzIH0gZnJvbSAnLi4vZW51bXMvcHJlZGVmaW5lZC1zdHJhdGVnaWVzLmVudW0nO1xyXG5pbXBvcnQgeyBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TdG9yZSB9IGZyb20gJy4uL3N0b3JlL2NvbmZpZ3VyYXRpb24uc3RvcmUnO1xyXG4vKiogQHR5cGUgez99ICovXHJcbmV4cG9ydCBjb25zdCBVU0VfQ09ORklHVVJBVElPTl9TVE9SRSA9IG5ldyBJbmplY3Rpb25Ub2tlbignVVNFX0NPTkZJR1VSQVRJT05fU1RPUkUnKTtcclxuZXhwb3J0IGNsYXNzIE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblNlcnZpY2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gez89fSBpc29sYXRlXHJcbiAgICAgKiBAcGFyYW0gez89fSBjb25maWd1cmF0aW9uU3RvcmVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaXNvbGF0ZSA9IGZhbHNlLCBjb25maWd1cmF0aW9uU3RvcmUpIHtcclxuICAgICAgICB0aGlzLmlzb2xhdGUgPSBpc29sYXRlO1xyXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvblN0b3JlID0gY29uZmlndXJhdGlvblN0b3JlO1xyXG4gICAgICAgIHRoaXMuc3RyYXRlZ2llc1NvdXJjZSA9IHRoaXMuaXNvbGF0ZSA/IG5ldyBCZWhhdmlvclN1YmplY3Qoe30pIDogdGhpcy5jb25maWd1cmF0aW9uU3RvcmUuc3RyYXRlZ2llc1NvdXJjZTtcclxuICAgICAgICB0aGlzLnN0cmF0ZWdpZXMkID0gdGhpcy5zdHJhdGVnaWVzU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgICAgIHRoaXMub25BdXRob3Jpc2VkRGVmYXVsdFN0cmF0ZWd5ID0gdGhpcy5pc29sYXRlID8gdW5kZWZpbmVkIDogdGhpcy5jb25maWd1cmF0aW9uU3RvcmUub25BdXRob3Jpc2VkRGVmYXVsdFN0cmF0ZWd5O1xyXG4gICAgICAgIHRoaXMub25VbkF1dGhvcmlzZWREZWZhdWx0U3RyYXRlZ3kgPSB0aGlzLmlzb2xhdGUgPyB1bmRlZmluZWQgOiB0aGlzLmNvbmZpZ3VyYXRpb25TdG9yZS5vblVuQXV0aG9yaXNlZERlZmF1bHRTdHJhdGVneTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHs/fSBuYW1lXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBzZXREZWZhdWx0T25BdXRob3JpemVkU3RyYXRlZ3kobmFtZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzb2xhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkF1dGhvcmlzZWREZWZhdWx0U3RyYXRlZ3kgPSB0aGlzLmdldERlZmluZWRTdHJhdGVneShuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvblN0b3JlLm9uQXV0aG9yaXNlZERlZmF1bHRTdHJhdGVneSA9IHRoaXMuZ2V0RGVmaW5lZFN0cmF0ZWd5KG5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLm9uQXV0aG9yaXNlZERlZmF1bHRTdHJhdGVneSA9IHRoaXMuY29uZmlndXJhdGlvblN0b3JlLm9uQXV0aG9yaXNlZERlZmF1bHRTdHJhdGVneTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7P30gbmFtZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgc2V0RGVmYXVsdE9uVW5hdXRob3JpemVkU3RyYXRlZ3kobmFtZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzb2xhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5vblVuQXV0aG9yaXNlZERlZmF1bHRTdHJhdGVneSA9IHRoaXMuZ2V0RGVmaW5lZFN0cmF0ZWd5KG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uU3RvcmUub25VbkF1dGhvcmlzZWREZWZhdWx0U3RyYXRlZ3kgPSB0aGlzLmdldERlZmluZWRTdHJhdGVneShuYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5vblVuQXV0aG9yaXNlZERlZmF1bHRTdHJhdGVneSA9IHRoaXMuY29uZmlndXJhdGlvblN0b3JlLm9uVW5BdXRob3Jpc2VkRGVmYXVsdFN0cmF0ZWd5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHs/fSBrZXlcclxuICAgICAqIEBwYXJhbSB7P30gZnVuY1xyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgYWRkUGVybWlzc2lvblN0cmF0ZWd5KGtleSwgZnVuYykge1xyXG4gICAgICAgIHRoaXMuc3RyYXRlZ2llc1NvdXJjZS52YWx1ZVtrZXldID0gZnVuYztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHs/fSBrZXlcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGdldFN0cmF0ZWd5KGtleSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0cmF0ZWdpZXNTb3VyY2UudmFsdWVba2V5XTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZ2V0QWxsU3RyYXRlZ2llcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdHJhdGVnaWVzU291cmNlLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSBuYW1lXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBnZXREZWZpbmVkU3RyYXRlZ3kobmFtZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0cmF0ZWdpZXNTb3VyY2UudmFsdWVbbmFtZV0gfHwgdGhpcy5pc1ByZWRlZmluZWRTdHJhdGVneShuYW1lKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gJyAke25hbWV9ICcgc3RyYXRlZ3kgaXMgZm91bmQgcGxlYXNlIGRlZmluZSBvbmVgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHN0cmF0ZWd5XHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBpc1ByZWRlZmluZWRTdHJhdGVneShzdHJhdGVneSkge1xyXG4gICAgICAgIHJldHVybiBzdHJhdGVneSA9PT0gTmd4UGVybWlzc2lvbnNQcmVkZWZpbmVkU3RyYXRlZ2llcy5TSE9XIHx8IHN0cmF0ZWd5ID09PSBOZ3hQZXJtaXNzaW9uc1ByZWRlZmluZWRTdHJhdGVnaWVzLlJFTU9WRTtcclxuICAgIH1cclxufVxyXG5OZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TZXJ2aWNlLmRlY29yYXRvcnMgPSBbXHJcbiAgICB7IHR5cGU6IEluamVjdGFibGUgfVxyXG5dO1xyXG4vKiogQG5vY29sbGFwc2UgKi9cclxuTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU2VydmljZS5jdG9yUGFyYW1ldGVycyA9ICgpID0+IFtcclxuICAgIHsgdHlwZTogQm9vbGVhbiwgZGVjb3JhdG9yczogW3sgdHlwZTogSW5qZWN0LCBhcmdzOiBbVVNFX0NPTkZJR1VSQVRJT05fU1RPUkUsXSB9XSB9LFxyXG4gICAgeyB0eXBlOiBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TdG9yZSB9XHJcbl07XHJcbmlmIChmYWxzZSkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7P31cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblNlcnZpY2UucHJvdG90eXBlLnN0cmF0ZWdpZXNTb3VyY2U7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TZXJ2aWNlLnByb3RvdHlwZS5zdHJhdGVnaWVzJDtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblNlcnZpY2UucHJvdG90eXBlLm9uQXV0aG9yaXNlZERlZmF1bHRTdHJhdGVneTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblNlcnZpY2UucHJvdG90eXBlLm9uVW5BdXRob3Jpc2VkRGVmYXVsdFN0cmF0ZWd5O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7P31cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblNlcnZpY2UucHJvdG90eXBlLmlzb2xhdGU7XHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHs/fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU2VydmljZS5wcm90b3R5cGUuY29uZmlndXJhdGlvblN0b3JlO1xyXG59XHIiXX0=