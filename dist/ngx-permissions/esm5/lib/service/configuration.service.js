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
export var USE_CONFIGURATION_STORE = new InjectionToken('USE_CONFIGURATION_STORE');
var NgxPermissionsConfigurationService = /** @class */ (function () {
    function NgxPermissionsConfigurationService(isolate, configurationStore) {
        if (isolate === void 0) { isolate = false; }
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
    NgxPermissionsConfigurationService.prototype.setDefaultOnAuthorizedStrategy = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (this.isolate) {
            this.onAuthorisedDefaultStrategy = this.getDefinedStrategy(name);
        }
        else {
            this.configurationStore.onAuthorisedDefaultStrategy = this.getDefinedStrategy(name);
            this.onAuthorisedDefaultStrategy = this.configurationStore.onAuthorisedDefaultStrategy;
        }
    };
    /**
     * @param {?} name
     * @return {?}
     */
    NgxPermissionsConfigurationService.prototype.setDefaultOnUnauthorizedStrategy = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (this.isolate) {
            this.onUnAuthorisedDefaultStrategy = this.getDefinedStrategy(name);
        }
        else {
            this.configurationStore.onUnAuthorisedDefaultStrategy = this.getDefinedStrategy(name);
            this.onUnAuthorisedDefaultStrategy = this.configurationStore.onUnAuthorisedDefaultStrategy;
        }
    };
    /**
     * @param {?} key
     * @param {?} func
     * @return {?}
     */
    NgxPermissionsConfigurationService.prototype.addPermissionStrategy = /**
     * @param {?} key
     * @param {?} func
     * @return {?}
     */
    function (key, func) {
        this.strategiesSource.value[key] = func;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    NgxPermissionsConfigurationService.prototype.getStrategy = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.strategiesSource.value[key];
    };
    /**
     * @return {?}
     */
    NgxPermissionsConfigurationService.prototype.getAllStrategies = /**
     * @return {?}
     */
    function () {
        return this.strategiesSource.value;
    };
    /**
     * @private
     * @param {?} name
     * @return {?}
     */
    NgxPermissionsConfigurationService.prototype.getDefinedStrategy = /**
     * @private
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (this.strategiesSource.value[name] || this.isPredefinedStrategy(name)) {
            return name;
        }
        else {
            throw new Error("No ' " + name + " ' strategy is found please define one");
        }
    };
    /**
     * @private
     * @param {?} strategy
     * @return {?}
     */
    NgxPermissionsConfigurationService.prototype.isPredefinedStrategy = /**
     * @private
     * @param {?} strategy
     * @return {?}
     */
    function (strategy) {
        return strategy === NgxPermissionsPredefinedStrategies.SHOW || strategy === NgxPermissionsPredefinedStrategies.REMOVE;
    };
    /** @nocollapse */
    NgxPermissionsConfigurationService.ctorParameters = function () { return [
        { type: Boolean, decorators: [{ type: Inject, args: [USE_CONFIGURATION_STORE,] }] },
        { type: NgxPermissionsConfigurationStore }
    ]; };
NgxPermissionsConfigurationService.ngInjectableDef = ɵngcc0.ɵɵdefineInjectable({ token: NgxPermissionsConfigurationService, factory: function NgxPermissionsConfigurationService_Factory(t) { return new (t || NgxPermissionsConfigurationService)(ɵngcc0.ɵɵinject(USE_CONFIGURATION_STORE), ɵngcc0.ɵɵinject(NgxPermissionsConfigurationStore)); }, providedIn: null });
/*@__PURE__*/ ɵngcc0.ɵsetClassMetadata(NgxPermissionsConfigurationService, [{
        type: Injectable
    }], function () { return [{ type: Boolean, decorators: [{
                type: Inject,
                args: [USE_CONFIGURATION_STORE]
            }] }, { type: NgxPermissionsConfigurationStore }]; }, { isolate: [], configurationStore: [], strategiesSource: [], strategies$: [], onAuthorisedDefaultStrategy: [], onUnAuthorisedDefaultStrategy: [], setDefaultOnAuthorizedStrategy: [], setDefaultOnUnauthorizedStrategy: [], addPermissionStrategy: [], getStrategy: [], getAllStrategies: [], getDefinedStrategy: [], isPredefinedStrategy: [] });
    return NgxPermissionsConfigurationService;
}());
export { NgxPermissionsConfigurationService };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL09sZWtzYW5kci5LaHltZW5rby9XZWJzdG9ybVByb2plY3RzL25neC1wZXJtaXNzaW9ucy9hcHBsaWNhdGlvbi9kaXN0L25neC1wZXJtaXNzaW9ucy9lc201L2xpYi9zZXJ2aWNlL2NvbmZpZ3VyYXRpb24uc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUE0R00sQUFHQTs7Ozs7Ozs7Ozs7O29aQUtHIiwiZmlsZSI6ImNvbmZpZ3VyYXRpb24uc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3IGFkZGVkIGJ5IHRzaWNrbGVcclxuICogQHN1cHByZXNzIHtjaGVja1R5cGVzLGV4dHJhUmVxdWlyZSxtaXNzaW5nT3ZlcnJpZGUsbWlzc2luZ1JldHVybix1bnVzZWRQcml2YXRlTWVtYmVycyx1c2VsZXNzQ29kZX0gY2hlY2tlZCBieSB0c2NcclxuICovXHJcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE5neFBlcm1pc3Npb25zUHJlZGVmaW5lZFN0cmF0ZWdpZXMgfSBmcm9tICcuLi9lbnVtcy9wcmVkZWZpbmVkLXN0cmF0ZWdpZXMuZW51bSc7XHJcbmltcG9ydCB7IE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblN0b3JlIH0gZnJvbSAnLi4vc3RvcmUvY29uZmlndXJhdGlvbi5zdG9yZSc7XHJcbi8qKiBAdHlwZSB7P30gKi9cclxuZXhwb3J0IHZhciBVU0VfQ09ORklHVVJBVElPTl9TVE9SRSA9IG5ldyBJbmplY3Rpb25Ub2tlbignVVNFX0NPTkZJR1VSQVRJT05fU1RPUkUnKTtcclxudmFyIE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblNlcnZpY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TZXJ2aWNlKGlzb2xhdGUsIGNvbmZpZ3VyYXRpb25TdG9yZSkge1xyXG4gICAgICAgIGlmIChpc29sYXRlID09PSB2b2lkIDApIHsgaXNvbGF0ZSA9IGZhbHNlOyB9XHJcbiAgICAgICAgdGhpcy5pc29sYXRlID0gaXNvbGF0ZTtcclxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb25TdG9yZSA9IGNvbmZpZ3VyYXRpb25TdG9yZTtcclxuICAgICAgICB0aGlzLnN0cmF0ZWdpZXNTb3VyY2UgPSB0aGlzLmlzb2xhdGUgPyBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9KSA6IHRoaXMuY29uZmlndXJhdGlvblN0b3JlLnN0cmF0ZWdpZXNTb3VyY2U7XHJcbiAgICAgICAgdGhpcy5zdHJhdGVnaWVzJCA9IHRoaXMuc3RyYXRlZ2llc1NvdXJjZS5hc09ic2VydmFibGUoKTtcclxuICAgICAgICB0aGlzLm9uQXV0aG9yaXNlZERlZmF1bHRTdHJhdGVneSA9IHRoaXMuaXNvbGF0ZSA/IHVuZGVmaW5lZCA6IHRoaXMuY29uZmlndXJhdGlvblN0b3JlLm9uQXV0aG9yaXNlZERlZmF1bHRTdHJhdGVneTtcclxuICAgICAgICB0aGlzLm9uVW5BdXRob3Jpc2VkRGVmYXVsdFN0cmF0ZWd5ID0gdGhpcy5pc29sYXRlID8gdW5kZWZpbmVkIDogdGhpcy5jb25maWd1cmF0aW9uU3RvcmUub25VbkF1dGhvcmlzZWREZWZhdWx0U3RyYXRlZ3k7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7P30gbmFtZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU2VydmljZS5wcm90b3R5cGUuc2V0RGVmYXVsdE9uQXV0aG9yaXplZFN0cmF0ZWd5ID0gLyoqXHJcbiAgICAgKiBAcGFyYW0gez99IG5hbWVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNvbGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9uQXV0aG9yaXNlZERlZmF1bHRTdHJhdGVneSA9IHRoaXMuZ2V0RGVmaW5lZFN0cmF0ZWd5KG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uU3RvcmUub25BdXRob3Jpc2VkRGVmYXVsdFN0cmF0ZWd5ID0gdGhpcy5nZXREZWZpbmVkU3RyYXRlZ3kobmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMub25BdXRob3Jpc2VkRGVmYXVsdFN0cmF0ZWd5ID0gdGhpcy5jb25maWd1cmF0aW9uU3RvcmUub25BdXRob3Jpc2VkRGVmYXVsdFN0cmF0ZWd5O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7P30gbmFtZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU2VydmljZS5wcm90b3R5cGUuc2V0RGVmYXVsdE9uVW5hdXRob3JpemVkU3RyYXRlZ3kgPSAvKipcclxuICAgICAqIEBwYXJhbSB7P30gbmFtZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5pc29sYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25VbkF1dGhvcmlzZWREZWZhdWx0U3RyYXRlZ3kgPSB0aGlzLmdldERlZmluZWRTdHJhdGVneShuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvblN0b3JlLm9uVW5BdXRob3Jpc2VkRGVmYXVsdFN0cmF0ZWd5ID0gdGhpcy5nZXREZWZpbmVkU3RyYXRlZ3kobmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMub25VbkF1dGhvcmlzZWREZWZhdWx0U3RyYXRlZ3kgPSB0aGlzLmNvbmZpZ3VyYXRpb25TdG9yZS5vblVuQXV0aG9yaXNlZERlZmF1bHRTdHJhdGVneTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gez99IGtleVxyXG4gICAgICogQHBhcmFtIHs/fSBmdW5jXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TZXJ2aWNlLnByb3RvdHlwZS5hZGRQZXJtaXNzaW9uU3RyYXRlZ3kgPSAvKipcclxuICAgICAqIEBwYXJhbSB7P30ga2V5XHJcbiAgICAgKiBAcGFyYW0gez99IGZ1bmNcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIChrZXksIGZ1bmMpIHtcclxuICAgICAgICB0aGlzLnN0cmF0ZWdpZXNTb3VyY2UudmFsdWVba2V5XSA9IGZ1bmM7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gez99IGtleVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU2VydmljZS5wcm90b3R5cGUuZ2V0U3RyYXRlZ3kgPSAvKipcclxuICAgICAqIEBwYXJhbSB7P30ga2V5XHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyYXRlZ2llc1NvdXJjZS52YWx1ZVtrZXldO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU2VydmljZS5wcm90b3R5cGUuZ2V0QWxsU3RyYXRlZ2llcyA9IC8qKlxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0cmF0ZWdpZXNTb3VyY2UudmFsdWU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSBuYW1lXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TZXJ2aWNlLnByb3RvdHlwZS5nZXREZWZpbmVkU3RyYXRlZ3kgPSAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IG5hbWVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RyYXRlZ2llc1NvdXJjZS52YWx1ZVtuYW1lXSB8fCB0aGlzLmlzUHJlZGVmaW5lZFN0cmF0ZWd5KG5hbWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gJyBcIiArIG5hbWUgKyBcIiAnIHN0cmF0ZWd5IGlzIGZvdW5kIHBsZWFzZSBkZWZpbmUgb25lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHN0cmF0ZWd5XHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TZXJ2aWNlLnByb3RvdHlwZS5pc1ByZWRlZmluZWRTdHJhdGVneSA9IC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gc3RyYXRlZ3lcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIChzdHJhdGVneSkge1xyXG4gICAgICAgIHJldHVybiBzdHJhdGVneSA9PT0gTmd4UGVybWlzc2lvbnNQcmVkZWZpbmVkU3RyYXRlZ2llcy5TSE9XIHx8IHN0cmF0ZWd5ID09PSBOZ3hQZXJtaXNzaW9uc1ByZWRlZmluZWRTdHJhdGVnaWVzLlJFTU9WRTtcclxuICAgIH07XHJcbiAgICBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TZXJ2aWNlLmRlY29yYXRvcnMgPSBbXHJcbiAgICAgICAgeyB0eXBlOiBJbmplY3RhYmxlIH1cclxuICAgIF07XHJcbiAgICAvKiogQG5vY29sbGFwc2UgKi9cclxuICAgIE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblNlcnZpY2UuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXHJcbiAgICAgICAgeyB0eXBlOiBCb29sZWFuLCBkZWNvcmF0b3JzOiBbeyB0eXBlOiBJbmplY3QsIGFyZ3M6IFtVU0VfQ09ORklHVVJBVElPTl9TVE9SRSxdIH1dIH0sXHJcbiAgICAgICAgeyB0eXBlOiBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TdG9yZSB9XHJcbiAgICBdOyB9O1xyXG4gICAgcmV0dXJuIE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblNlcnZpY2U7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblNlcnZpY2UgfTtcclxuaWYgKGZhbHNlKSB7XHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHs/fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU2VydmljZS5wcm90b3R5cGUuc3RyYXRlZ2llc1NvdXJjZTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblNlcnZpY2UucHJvdG90eXBlLnN0cmF0ZWdpZXMkO1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU2VydmljZS5wcm90b3R5cGUub25BdXRob3Jpc2VkRGVmYXVsdFN0cmF0ZWd5O1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU2VydmljZS5wcm90b3R5cGUub25VbkF1dGhvcmlzZWREZWZhdWx0U3RyYXRlZ3k7XHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHs/fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU2VydmljZS5wcm90b3R5cGUuaXNvbGF0ZTtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgez99XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TZXJ2aWNlLnByb3RvdHlwZS5jb25maWd1cmF0aW9uU3RvcmU7XHJcbn1cciJdfQ==