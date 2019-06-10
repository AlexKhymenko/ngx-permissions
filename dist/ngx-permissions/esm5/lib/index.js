/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { NgxPermissionsDirective } from './directive/permissions.directive';
import { NgxPermissionsService, USE_PERMISSIONS_STORE } from './service/permissions.service';
import { NgxPermissionsGuard } from './router/permissions-guard.service';
import { NgxRolesService, USE_ROLES_STORE } from './service/roles.service';
import { NgxPermissionsStore } from './store/permissions.store';
import { NgxRolesStore } from './store/roles.store';
import { NgxPermissionsAllowStubDirective } from './testing/permissions-allow.directive.stub';
import { NgxPermissionsRestrictStubDirective } from './testing/permissions-restrict.directive.stub';
import { NgxPermissionsConfigurationService, USE_CONFIGURATION_STORE } from './service/configuration.service';
import { NgxPermissionsConfigurationStore } from './store/configuration.store';
import * as ɵngcc0 from '@angular/core';
export { NgxRolesStore } from './store/roles.store';
export { NgxPermissionsStore } from './store/permissions.store';
export { NgxPermissionsConfigurationStore } from './store/configuration.store';
export { NgxPermissionsDirective } from './directive/permissions.directive';
export { USE_PERMISSIONS_STORE, NgxPermissionsService } from './service/permissions.service';
export { USE_ROLES_STORE, NgxRolesService } from './service/roles.service';
export { USE_CONFIGURATION_STORE, NgxPermissionsConfigurationService } from './service/configuration.service';
export { NgxPermissionsGuard } from './router/permissions-guard.service';
export {} from './model/permissions-router-data.model';
export { NgxRole } from './model/role.model';
export { NgxPermissionsAllowStubDirective } from './testing/permissions-allow.directive.stub';
export { NgxPermissionsRestrictStubDirective } from './testing/permissions-restrict.directive.stub';
export { NgxPermissionsPredefinedStrategies } from './enums/predefined-strategies.enum';
/**
 * @record
 */
export function NgxPermissionsModuleConfig() { }
if (false) {
    /** @type {?|undefined} */
    NgxPermissionsModuleConfig.prototype.rolesIsolate;
    /** @type {?|undefined} */
    NgxPermissionsModuleConfig.prototype.permissionsIsolate;
    /** @type {?|undefined} */
    NgxPermissionsModuleConfig.prototype.configurationIsolate;
}
var NgxPermissionsModule = /** @class */ (function () {
    function NgxPermissionsModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    NgxPermissionsModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: NgxPermissionsModule,
            providers: [
                NgxPermissionsStore,
                NgxRolesStore,
                NgxPermissionsConfigurationStore,
                NgxPermissionsService,
                NgxPermissionsGuard,
                NgxRolesService,
                NgxPermissionsConfigurationService,
                { provide: USE_PERMISSIONS_STORE, useValue: config.permissionsIsolate },
                { provide: USE_ROLES_STORE, useValue: config.rolesIsolate },
                { provide: USE_CONFIGURATION_STORE, useValue: config.configurationIsolate },
            ]
        };
    };
    /**
     * @param {?=} config
     * @return {?}
     */
    NgxPermissionsModule.forChild = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: NgxPermissionsModule,
            providers: [
                { provide: USE_PERMISSIONS_STORE, useValue: config.permissionsIsolate },
                { provide: USE_ROLES_STORE, useValue: config.rolesIsolate },
                { provide: USE_CONFIGURATION_STORE, useValue: config.configurationIsolate },
                NgxPermissionsConfigurationService,
                NgxPermissionsService,
                NgxRolesService,
                NgxPermissionsGuard
            ]
        };
    };
NgxPermissionsModule.ngModuleDef = ɵngcc0.ɵɵdefineNgModule({ type: NgxPermissionsModule });
/*@__PURE__*/ ɵngcc0.ɵɵsetNgModuleScope(NgxPermissionsModule, { declarations: function () { return [NgxPermissionsDirective]; }, exports: function () { return [NgxPermissionsDirective]; } });
/*@__PURE__*/ ɵngcc0.ɵsetClassMetadata(NgxPermissionsModule, [{
        type: NgModule,
        args: [{
                imports: [],
                declarations: [
                    NgxPermissionsDirective
                ],
                exports: [
                    NgxPermissionsDirective
                ]
            }]
    }], function () { return []; }, null);
NgxPermissionsModule.ngInjectorDef = ɵngcc0.ɵɵdefineInjector({ factory: function NgxPermissionsModule_Factory(t) { return new (t || NgxPermissionsModule)(); }, imports: [[]] });
    return NgxPermissionsModule;
}());
export { NgxPermissionsModule };
var NgxPermissionsAllowStubModule = /** @class */ (function () {
    function NgxPermissionsAllowStubModule() {
    }
NgxPermissionsAllowStubModule.ngModuleDef = ɵngcc0.ɵɵdefineNgModule({ type: NgxPermissionsAllowStubModule });
/*@__PURE__*/ ɵngcc0.ɵɵsetNgModuleScope(NgxPermissionsAllowStubModule, { declarations: function () { return [NgxPermissionsAllowStubDirective]; }, exports: function () { return [NgxPermissionsAllowStubDirective]; } });
/*@__PURE__*/ ɵngcc0.ɵsetClassMetadata(NgxPermissionsAllowStubModule, [{
        type: NgModule,
        args: [{
                imports: [],
                declarations: [
                    NgxPermissionsAllowStubDirective
                ],
                exports: [
                    NgxPermissionsAllowStubDirective
                ]
            }]
    }], function () { return []; }, null);
NgxPermissionsAllowStubModule.ngInjectorDef = ɵngcc0.ɵɵdefineInjector({ factory: function NgxPermissionsAllowStubModule_Factory(t) { return new (t || NgxPermissionsAllowStubModule)(); }, imports: [[]] });
    return NgxPermissionsAllowStubModule;
}());
export { NgxPermissionsAllowStubModule };
var NgxPermissionsRestrictStubModule = /** @class */ (function () {
    function NgxPermissionsRestrictStubModule() {
    }
NgxPermissionsRestrictStubModule.ngModuleDef = ɵngcc0.ɵɵdefineNgModule({ type: NgxPermissionsRestrictStubModule });
/*@__PURE__*/ ɵngcc0.ɵɵsetNgModuleScope(NgxPermissionsRestrictStubModule, { declarations: function () { return [NgxPermissionsRestrictStubDirective]; }, exports: function () { return [NgxPermissionsRestrictStubDirective]; } });
/*@__PURE__*/ ɵngcc0.ɵsetClassMetadata(NgxPermissionsRestrictStubModule, [{
        type: NgModule,
        args: [{
                imports: [],
                declarations: [
                    NgxPermissionsRestrictStubDirective
                ],
                exports: [
                    NgxPermissionsRestrictStubDirective
                ]
            }]
    }], function () { return []; }, null);
NgxPermissionsRestrictStubModule.ngInjectorDef = ɵngcc0.ɵɵdefineInjector({ factory: function NgxPermissionsRestrictStubModule_Factory(t) { return new (t || NgxPermissionsRestrictStubModule)(); }, imports: [[]] });
    return NgxPermissionsRestrictStubModule;
}());
export { NgxPermissionsRestrictStubModule };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL09sZWtzYW5kci5LaHltZW5rby9XZWJzdG9ybVByb2plY3RzL25neC1wZXJtaXNzaW9ucy9kaXN0L25neC1wZXJtaXNzaW9ucy9lc201L2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7OztBQWVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BNEVNOzs7Ozs7Ozs7Ozs7Ozs7aUxBV0E7Ozs7OztLQU1EOzs7Ozs7Ozs7Ozs7Ozs7NE1BV0M7Ozs7OztLQU1EOzs7Ozs7Ozs7Ozs7Ozs7cU5BV0MiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGVvdmVydmlldyBhZGRlZCBieSB0c2lja2xlXHJcbiAqIEBzdXBwcmVzcyB7Y2hlY2tUeXBlcyxleHRyYVJlcXVpcmUsbWlzc2luZ092ZXJyaWRlLG1pc3NpbmdSZXR1cm4sdW51c2VkUHJpdmF0ZU1lbWJlcnMsdXNlbGVzc0NvZGV9IGNoZWNrZWQgYnkgdHNjXHJcbiAqL1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL3Blcm1pc3Npb25zLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE5neFBlcm1pc3Npb25zU2VydmljZSwgVVNFX1BFUk1JU1NJT05TX1NUT1JFIH0gZnJvbSAnLi9zZXJ2aWNlL3Blcm1pc3Npb25zLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZ3hQZXJtaXNzaW9uc0d1YXJkIH0gZnJvbSAnLi9yb3V0ZXIvcGVybWlzc2lvbnMtZ3VhcmQuc2VydmljZSc7XHJcbmltcG9ydCB7IE5neFJvbGVzU2VydmljZSwgVVNFX1JPTEVTX1NUT1JFIH0gZnJvbSAnLi9zZXJ2aWNlL3JvbGVzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZ3hQZXJtaXNzaW9uc1N0b3JlIH0gZnJvbSAnLi9zdG9yZS9wZXJtaXNzaW9ucy5zdG9yZSc7XHJcbmltcG9ydCB7IE5neFJvbGVzU3RvcmUgfSBmcm9tICcuL3N0b3JlL3JvbGVzLnN0b3JlJztcclxuaW1wb3J0IHsgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmUgfSBmcm9tICcuL3Rlc3RpbmcvcGVybWlzc2lvbnMtYWxsb3cuZGlyZWN0aXZlLnN0dWInO1xyXG5pbXBvcnQgeyBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1YkRpcmVjdGl2ZSB9IGZyb20gJy4vdGVzdGluZy9wZXJtaXNzaW9ucy1yZXN0cmljdC5kaXJlY3RpdmUuc3R1Yic7XHJcbmltcG9ydCB7IE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblNlcnZpY2UsIFVTRV9DT05GSUdVUkFUSU9OX1NUT1JFIH0gZnJvbSAnLi9zZXJ2aWNlL2NvbmZpZ3VyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblN0b3JlIH0gZnJvbSAnLi9zdG9yZS9jb25maWd1cmF0aW9uLnN0b3JlJztcclxuZXhwb3J0IHsgTmd4Um9sZXNTdG9yZSB9IGZyb20gJy4vc3RvcmUvcm9sZXMuc3RvcmUnO1xyXG5leHBvcnQgeyBOZ3hQZXJtaXNzaW9uc1N0b3JlIH0gZnJvbSAnLi9zdG9yZS9wZXJtaXNzaW9ucy5zdG9yZSc7XHJcbmV4cG9ydCB7IE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblN0b3JlIH0gZnJvbSAnLi9zdG9yZS9jb25maWd1cmF0aW9uLnN0b3JlJztcclxuZXhwb3J0IHsgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9wZXJtaXNzaW9ucy5kaXJlY3RpdmUnO1xyXG5leHBvcnQgeyBVU0VfUEVSTUlTU0lPTlNfU1RPUkUsIE5neFBlcm1pc3Npb25zU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9wZXJtaXNzaW9ucy5zZXJ2aWNlJztcclxuZXhwb3J0IHsgVVNFX1JPTEVTX1NUT1JFLCBOZ3hSb2xlc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2Uvcm9sZXMuc2VydmljZSc7XHJcbmV4cG9ydCB7IFVTRV9DT05GSUdVUkFUSU9OX1NUT1JFLCBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2NvbmZpZ3VyYXRpb24uc2VydmljZSc7XHJcbmV4cG9ydCB7IE5neFBlcm1pc3Npb25zR3VhcmQgfSBmcm9tICcuL3JvdXRlci9wZXJtaXNzaW9ucy1ndWFyZC5zZXJ2aWNlJztcclxuZXhwb3J0IHt9IGZyb20gJy4vbW9kZWwvcGVybWlzc2lvbnMtcm91dGVyLWRhdGEubW9kZWwnO1xyXG5leHBvcnQgeyBOZ3hSb2xlIH0gZnJvbSAnLi9tb2RlbC9yb2xlLm1vZGVsJztcclxuZXhwb3J0IHsgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmUgfSBmcm9tICcuL3Rlc3RpbmcvcGVybWlzc2lvbnMtYWxsb3cuZGlyZWN0aXZlLnN0dWInO1xyXG5leHBvcnQgeyBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1YkRpcmVjdGl2ZSB9IGZyb20gJy4vdGVzdGluZy9wZXJtaXNzaW9ucy1yZXN0cmljdC5kaXJlY3RpdmUuc3R1Yic7XHJcbmV4cG9ydCB7IE5neFBlcm1pc3Npb25zUHJlZGVmaW5lZFN0cmF0ZWdpZXMgfSBmcm9tICcuL2VudW1zL3ByZWRlZmluZWQtc3RyYXRlZ2llcy5lbnVtJztcclxuLyoqXHJcbiAqIEByZWNvcmRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBOZ3hQZXJtaXNzaW9uc01vZHVsZUNvbmZpZygpIHsgfVxyXG5pZiAoZmFsc2UpIHtcclxuICAgIC8qKiBAdHlwZSB7P3x1bmRlZmluZWR9ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc01vZHVsZUNvbmZpZy5wcm90b3R5cGUucm9sZXNJc29sYXRlO1xyXG4gICAgLyoqIEB0eXBlIHs/fHVuZGVmaW5lZH0gKi9cclxuICAgIE5neFBlcm1pc3Npb25zTW9kdWxlQ29uZmlnLnByb3RvdHlwZS5wZXJtaXNzaW9uc0lzb2xhdGU7XHJcbiAgICAvKiogQHR5cGUgez98dW5kZWZpbmVkfSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNNb2R1bGVDb25maWcucHJvdG90eXBlLmNvbmZpZ3VyYXRpb25Jc29sYXRlO1xyXG59XHJcbnZhciBOZ3hQZXJtaXNzaW9uc01vZHVsZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE5neFBlcm1pc3Npb25zTW9kdWxlKCkge1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gez89fSBjb25maWdcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zTW9kdWxlLmZvclJvb3QgPSAvKipcclxuICAgICAqIEBwYXJhbSB7Pz19IGNvbmZpZ1xyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBOZ3hQZXJtaXNzaW9uc01vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgICAgICAgICBOZ3hQZXJtaXNzaW9uc1N0b3JlLFxyXG4gICAgICAgICAgICAgICAgTmd4Um9sZXNTdG9yZSxcclxuICAgICAgICAgICAgICAgIE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblN0b3JlLFxyXG4gICAgICAgICAgICAgICAgTmd4UGVybWlzc2lvbnNTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgTmd4UGVybWlzc2lvbnNHdWFyZCxcclxuICAgICAgICAgICAgICAgIE5neFJvbGVzU2VydmljZSxcclxuICAgICAgICAgICAgICAgIE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IFVTRV9QRVJNSVNTSU9OU19TVE9SRSwgdXNlVmFsdWU6IGNvbmZpZy5wZXJtaXNzaW9uc0lzb2xhdGUgfSxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogVVNFX1JPTEVTX1NUT1JFLCB1c2VWYWx1ZTogY29uZmlnLnJvbGVzSXNvbGF0ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBVU0VfQ09ORklHVVJBVElPTl9TVE9SRSwgdXNlVmFsdWU6IGNvbmZpZy5jb25maWd1cmF0aW9uSXNvbGF0ZSB9LFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7Pz19IGNvbmZpZ1xyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNNb2R1bGUuZm9yQ2hpbGQgPSAvKipcclxuICAgICAqIEBwYXJhbSB7Pz19IGNvbmZpZ1xyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7fTsgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBOZ3hQZXJtaXNzaW9uc01vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IFVTRV9QRVJNSVNTSU9OU19TVE9SRSwgdXNlVmFsdWU6IGNvbmZpZy5wZXJtaXNzaW9uc0lzb2xhdGUgfSxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogVVNFX1JPTEVTX1NUT1JFLCB1c2VWYWx1ZTogY29uZmlnLnJvbGVzSXNvbGF0ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBVU0VfQ09ORklHVVJBVElPTl9TVE9SRSwgdXNlVmFsdWU6IGNvbmZpZy5jb25maWd1cmF0aW9uSXNvbGF0ZSB9LFxyXG4gICAgICAgICAgICAgICAgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU2VydmljZSxcclxuICAgICAgICAgICAgICAgIE5neFBlcm1pc3Npb25zU2VydmljZSxcclxuICAgICAgICAgICAgICAgIE5neFJvbGVzU2VydmljZSxcclxuICAgICAgICAgICAgICAgIE5neFBlcm1pc3Npb25zR3VhcmRcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgTmd4UGVybWlzc2lvbnNNb2R1bGUuZGVjb3JhdG9ycyA9IFtcclxuICAgICAgICB7IHR5cGU6IE5nTW9kdWxlLCBhcmdzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydHM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgZXhwb3J0czogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXSB9XHJcbiAgICBdO1xyXG4gICAgcmV0dXJuIE5neFBlcm1pc3Npb25zTW9kdWxlO1xyXG59KCkpO1xyXG5leHBvcnQgeyBOZ3hQZXJtaXNzaW9uc01vZHVsZSB9O1xyXG52YXIgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJNb2R1bGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBOZ3hQZXJtaXNzaW9uc0FsbG93U3R1Yk1vZHVsZSgpIHtcclxuICAgIH1cclxuICAgIE5neFBlcm1pc3Npb25zQWxsb3dTdHViTW9kdWxlLmRlY29yYXRvcnMgPSBbXHJcbiAgICAgICAgeyB0eXBlOiBOZ01vZHVsZSwgYXJnczogW3tcclxuICAgICAgICAgICAgICAgICAgICBpbXBvcnRzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmVcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4cG9ydHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmVcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LF0gfVxyXG4gICAgXTtcclxuICAgIHJldHVybiBOZ3hQZXJtaXNzaW9uc0FsbG93U3R1Yk1vZHVsZTtcclxufSgpKTtcclxuZXhwb3J0IHsgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJNb2R1bGUgfTtcclxudmFyIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViTW9kdWxlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTmd4UGVybWlzc2lvbnNSZXN0cmljdFN0dWJNb2R1bGUoKSB7XHJcbiAgICB9XHJcbiAgICBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1Yk1vZHVsZS5kZWNvcmF0b3JzID0gW1xyXG4gICAgICAgIHsgdHlwZTogTmdNb2R1bGUsIGFyZ3M6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1wb3J0czogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxdIH1cclxuICAgIF07XHJcbiAgICByZXR1cm4gTmd4UGVybWlzc2lvbnNSZXN0cmljdFN0dWJNb2R1bGU7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViTW9kdWxlIH07XHIiXX0=