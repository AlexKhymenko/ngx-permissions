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
export class NgxPermissionsModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
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
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    static forChild(config = {}) {
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
    }
}
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
    }], null, null);
NgxPermissionsModule.ngInjectorDef = ɵngcc0.ɵɵdefineInjector({ factory: function NgxPermissionsModule_Factory(t) { return new (t || NgxPermissionsModule)(); }, imports: [[]] });
export class NgxPermissionsAllowStubModule {
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
    }], null, null);
NgxPermissionsAllowStubModule.ngInjectorDef = ɵngcc0.ɵɵdefineInjector({ factory: function NgxPermissionsAllowStubModule_Factory(t) { return new (t || NgxPermissionsAllowStubModule)(); }, imports: [[]] });
export class NgxPermissionsRestrictStubModule {
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
    }], null, null);
NgxPermissionsRestrictStubModule.ngInjectorDef = ɵngcc0.ɵɵdefineInjector({ factory: function NgxPermissionsRestrictStubModule_Factory(t) { return new (t || NgxPermissionsRestrictStubModule)(); }, imports: [[]] });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL09sZWtzYW5kci5LaHltZW5rby9XZWJzdG9ybVByb2plY3RzL25neC1wZXJtaXNzaW9ucy9kaXN0L25neC1wZXJtaXNzaW9ucy9lc20yMDE1L2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7OztBQWVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQWlFQyxnTEFXQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FFRCwyTUFXQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FFRCxvTkFXQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3IGFkZGVkIGJ5IHRzaWNrbGVcclxuICogQHN1cHByZXNzIHtjaGVja1R5cGVzLGV4dHJhUmVxdWlyZSxtaXNzaW5nT3ZlcnJpZGUsbWlzc2luZ1JldHVybix1bnVzZWRQcml2YXRlTWVtYmVycyx1c2VsZXNzQ29kZX0gY2hlY2tlZCBieSB0c2NcclxuICovXHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5neFBlcm1pc3Npb25zRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvcGVybWlzc2lvbnMuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTmd4UGVybWlzc2lvbnNTZXJ2aWNlLCBVU0VfUEVSTUlTU0lPTlNfU1RPUkUgfSBmcm9tICcuL3NlcnZpY2UvcGVybWlzc2lvbnMuc2VydmljZSc7XHJcbmltcG9ydCB7IE5neFBlcm1pc3Npb25zR3VhcmQgfSBmcm9tICcuL3JvdXRlci9wZXJtaXNzaW9ucy1ndWFyZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd4Um9sZXNTZXJ2aWNlLCBVU0VfUk9MRVNfU1RPUkUgfSBmcm9tICcuL3NlcnZpY2Uvcm9sZXMuc2VydmljZSc7XHJcbmltcG9ydCB7IE5neFBlcm1pc3Npb25zU3RvcmUgfSBmcm9tICcuL3N0b3JlL3Blcm1pc3Npb25zLnN0b3JlJztcclxuaW1wb3J0IHsgTmd4Um9sZXNTdG9yZSB9IGZyb20gJy4vc3RvcmUvcm9sZXMuc3RvcmUnO1xyXG5pbXBvcnQgeyBOZ3hQZXJtaXNzaW9uc0FsbG93U3R1YkRpcmVjdGl2ZSB9IGZyb20gJy4vdGVzdGluZy9wZXJtaXNzaW9ucy1hbGxvdy5kaXJlY3RpdmUuc3R1Yic7XHJcbmltcG9ydCB7IE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlIH0gZnJvbSAnLi90ZXN0aW5nL3Blcm1pc3Npb25zLXJlc3RyaWN0LmRpcmVjdGl2ZS5zdHViJztcclxuaW1wb3J0IHsgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU2VydmljZSwgVVNFX0NPTkZJR1VSQVRJT05fU1RPUkUgfSBmcm9tICcuL3NlcnZpY2UvY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU3RvcmUgfSBmcm9tICcuL3N0b3JlL2NvbmZpZ3VyYXRpb24uc3RvcmUnO1xyXG5leHBvcnQgeyBOZ3hSb2xlc1N0b3JlIH0gZnJvbSAnLi9zdG9yZS9yb2xlcy5zdG9yZSc7XHJcbmV4cG9ydCB7IE5neFBlcm1pc3Npb25zU3RvcmUgfSBmcm9tICcuL3N0b3JlL3Blcm1pc3Npb25zLnN0b3JlJztcclxuZXhwb3J0IHsgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU3RvcmUgfSBmcm9tICcuL3N0b3JlL2NvbmZpZ3VyYXRpb24uc3RvcmUnO1xyXG5leHBvcnQgeyBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL3Blcm1pc3Npb25zLmRpcmVjdGl2ZSc7XHJcbmV4cG9ydCB7IFVTRV9QRVJNSVNTSU9OU19TVE9SRSwgTmd4UGVybWlzc2lvbnNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL3Blcm1pc3Npb25zLnNlcnZpY2UnO1xyXG5leHBvcnQgeyBVU0VfUk9MRVNfU1RPUkUsIE5neFJvbGVzU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9yb2xlcy5zZXJ2aWNlJztcclxuZXhwb3J0IHsgVVNFX0NPTkZJR1VSQVRJT05fU1RPUkUsIE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcclxuZXhwb3J0IHsgTmd4UGVybWlzc2lvbnNHdWFyZCB9IGZyb20gJy4vcm91dGVyL3Blcm1pc3Npb25zLWd1YXJkLnNlcnZpY2UnO1xyXG5leHBvcnQge30gZnJvbSAnLi9tb2RlbC9wZXJtaXNzaW9ucy1yb3V0ZXItZGF0YS5tb2RlbCc7XHJcbmV4cG9ydCB7IE5neFJvbGUgfSBmcm9tICcuL21vZGVsL3JvbGUubW9kZWwnO1xyXG5leHBvcnQgeyBOZ3hQZXJtaXNzaW9uc0FsbG93U3R1YkRpcmVjdGl2ZSB9IGZyb20gJy4vdGVzdGluZy9wZXJtaXNzaW9ucy1hbGxvdy5kaXJlY3RpdmUuc3R1Yic7XHJcbmV4cG9ydCB7IE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlIH0gZnJvbSAnLi90ZXN0aW5nL3Blcm1pc3Npb25zLXJlc3RyaWN0LmRpcmVjdGl2ZS5zdHViJztcclxuZXhwb3J0IHsgTmd4UGVybWlzc2lvbnNQcmVkZWZpbmVkU3RyYXRlZ2llcyB9IGZyb20gJy4vZW51bXMvcHJlZGVmaW5lZC1zdHJhdGVnaWVzLmVudW0nO1xyXG4vKipcclxuICogQHJlY29yZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIE5neFBlcm1pc3Npb25zTW9kdWxlQ29uZmlnKCkgeyB9XHJcbmlmIChmYWxzZSkge1xyXG4gICAgLyoqIEB0eXBlIHs/fHVuZGVmaW5lZH0gKi9cclxuICAgIE5neFBlcm1pc3Npb25zTW9kdWxlQ29uZmlnLnByb3RvdHlwZS5yb2xlc0lzb2xhdGU7XHJcbiAgICAvKiogQHR5cGUgez98dW5kZWZpbmVkfSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNNb2R1bGVDb25maWcucHJvdG90eXBlLnBlcm1pc3Npb25zSXNvbGF0ZTtcclxuICAgIC8qKiBAdHlwZSB7P3x1bmRlZmluZWR9ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc01vZHVsZUNvbmZpZy5wcm90b3R5cGUuY29uZmlndXJhdGlvbklzb2xhdGU7XHJcbn1cclxuZXhwb3J0IGNsYXNzIE5neFBlcm1pc3Npb25zTW9kdWxlIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHs/PX0gY29uZmlnXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZm9yUm9vdChjb25maWcgPSB7fSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBOZ3hQZXJtaXNzaW9uc01vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgICAgICAgICBOZ3hQZXJtaXNzaW9uc1N0b3JlLFxyXG4gICAgICAgICAgICAgICAgTmd4Um9sZXNTdG9yZSxcclxuICAgICAgICAgICAgICAgIE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblN0b3JlLFxyXG4gICAgICAgICAgICAgICAgTmd4UGVybWlzc2lvbnNTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgTmd4UGVybWlzc2lvbnNHdWFyZCxcclxuICAgICAgICAgICAgICAgIE5neFJvbGVzU2VydmljZSxcclxuICAgICAgICAgICAgICAgIE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IFVTRV9QRVJNSVNTSU9OU19TVE9SRSwgdXNlVmFsdWU6IGNvbmZpZy5wZXJtaXNzaW9uc0lzb2xhdGUgfSxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogVVNFX1JPTEVTX1NUT1JFLCB1c2VWYWx1ZTogY29uZmlnLnJvbGVzSXNvbGF0ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBVU0VfQ09ORklHVVJBVElPTl9TVE9SRSwgdXNlVmFsdWU6IGNvbmZpZy5jb25maWd1cmF0aW9uSXNvbGF0ZSB9LFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHs/PX0gY29uZmlnXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZm9yQ2hpbGQoY29uZmlnID0ge30pIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogTmd4UGVybWlzc2lvbnNNb2R1bGUsXHJcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBVU0VfUEVSTUlTU0lPTlNfU1RPUkUsIHVzZVZhbHVlOiBjb25maWcucGVybWlzc2lvbnNJc29sYXRlIH0sXHJcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IFVTRV9ST0xFU19TVE9SRSwgdXNlVmFsdWU6IGNvbmZpZy5yb2xlc0lzb2xhdGUgfSxcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogVVNFX0NPTkZJR1VSQVRJT05fU1RPUkUsIHVzZVZhbHVlOiBjb25maWcuY29uZmlndXJhdGlvbklzb2xhdGUgfSxcclxuICAgICAgICAgICAgICAgIE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBOZ3hQZXJtaXNzaW9uc1NlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBOZ3hSb2xlc1NlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBOZ3hQZXJtaXNzaW9uc0d1YXJkXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbk5neFBlcm1pc3Npb25zTW9kdWxlLmRlY29yYXRvcnMgPSBbXHJcbiAgICB7IHR5cGU6IE5nTW9kdWxlLCBhcmdzOiBbe1xyXG4gICAgICAgICAgICAgICAgaW1wb3J0czogW10sXHJcbiAgICAgICAgICAgICAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGV4cG9ydHM6IFtcclxuICAgICAgICAgICAgICAgICAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LF0gfVxyXG5dO1xyXG5leHBvcnQgY2xhc3MgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJNb2R1bGUge1xyXG59XHJcbk5neFBlcm1pc3Npb25zQWxsb3dTdHViTW9kdWxlLmRlY29yYXRvcnMgPSBbXHJcbiAgICB7IHR5cGU6IE5nTW9kdWxlLCBhcmdzOiBbe1xyXG4gICAgICAgICAgICAgICAgaW1wb3J0czogW10sXHJcbiAgICAgICAgICAgICAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICBOZ3hQZXJtaXNzaW9uc0FsbG93U3R1YkRpcmVjdGl2ZVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGV4cG9ydHM6IFtcclxuICAgICAgICAgICAgICAgICAgICBOZ3hQZXJtaXNzaW9uc0FsbG93U3R1YkRpcmVjdGl2ZVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LF0gfVxyXG5dO1xyXG5leHBvcnQgY2xhc3MgTmd4UGVybWlzc2lvbnNSZXN0cmljdFN0dWJNb2R1bGUge1xyXG59XHJcbk5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViTW9kdWxlLmRlY29yYXRvcnMgPSBbXHJcbiAgICB7IHR5cGU6IE5nTW9kdWxlLCBhcmdzOiBbe1xyXG4gICAgICAgICAgICAgICAgaW1wb3J0czogW10sXHJcbiAgICAgICAgICAgICAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1YkRpcmVjdGl2ZVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGV4cG9ydHM6IFtcclxuICAgICAgICAgICAgICAgICAgICBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1YkRpcmVjdGl2ZVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LF0gfVxyXG5dO1xyIl19