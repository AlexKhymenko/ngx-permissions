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
    NgxPermissionsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [
                        NgxPermissionsDirective
                    ],
                    exports: [
                        NgxPermissionsDirective
                    ]
                },] }
    ];
    return NgxPermissionsModule;
}());
export { NgxPermissionsModule };
var NgxPermissionsAllowStubModule = /** @class */ (function () {
    function NgxPermissionsAllowStubModule() {
    }
    NgxPermissionsAllowStubModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [
                        NgxPermissionsAllowStubDirective
                    ],
                    exports: [
                        NgxPermissionsAllowStubDirective
                    ]
                },] }
    ];
    return NgxPermissionsAllowStubModule;
}());
export { NgxPermissionsAllowStubModule };
var NgxPermissionsRestrictStubModule = /** @class */ (function () {
    function NgxPermissionsRestrictStubModule() {
    }
    NgxPermissionsRestrictStubModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [
                        NgxPermissionsRestrictStubDirective
                    ],
                    exports: [
                        NgxPermissionsRestrictStubDirective
                    ]
                },] }
    ];
    return NgxPermissionsRestrictStubModule;
}());
export { NgxPermissionsRestrictStubModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtcGVybWlzc2lvbnMvIiwic291cmNlcyI6WyJsaWIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzlHLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRS9FLDhCQUFjLHFCQUFxQixDQUFBO0FBQ25DLG9DQUFjLDJCQUEyQixDQUFBO0FBQ3pDLGlEQUFjLDZCQUE2QixDQUFBO0FBRTNDLHdDQUFjLG1DQUFtQyxDQUFDO0FBRWxELDZEQUFjLCtCQUErQixDQUFDO0FBQzlDLGlEQUFjLHlCQUF5QixDQUFDO0FBQ3hDLDRFQUFjLGlDQUFpQyxDQUFDO0FBRWhELG9DQUFjLG9DQUFvQyxDQUFDO0FBRW5ELGVBQWMsdUNBQXVDLENBQUE7QUFDckQsd0JBQWMsb0JBQW9CLENBQUE7QUFFbEMsaURBQWMsNENBQTRDLENBQUE7QUFDMUQsb0RBQWMsK0NBQStDLENBQUE7QUFFN0QsbURBQWMsb0NBQW9DLENBQUE7Ozs7QUFFbEQsZ0RBS0M7OztJQUhHLGtEQUF1Qjs7SUFDdkIsd0RBQTZCOztJQUM3QiwwREFBOEI7O0FBSWxDO0lBQUE7SUEwQ0EsQ0FBQzs7Ozs7SUFoQ1UsNEJBQU87Ozs7SUFBZCxVQUFlLE1BQXVDO1FBQXZDLHVCQUFBLEVBQUEsV0FBdUM7UUFDbEQsT0FBTztZQUNILFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsU0FBUyxFQUFFO2dCQUNQLG1CQUFtQjtnQkFDbkIsYUFBYTtnQkFDYixnQ0FBZ0M7Z0JBQ2hDLHFCQUFxQjtnQkFDckIsbUJBQW1CO2dCQUNuQixlQUFlO2dCQUNmLGtDQUFrQztnQkFDbEMsRUFBQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxrQkFBa0IsRUFBQztnQkFDckUsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsWUFBWSxFQUFDO2dCQUN6RCxFQUFDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLG9CQUFvQixFQUFDO2FBQzVFO1NBQ0osQ0FBQztJQUNOLENBQUM7Ozs7O0lBRU0sNkJBQVE7Ozs7SUFBZixVQUFnQixNQUF1QztRQUF2Qyx1QkFBQSxFQUFBLFdBQXVDO1FBQ25ELE9BQU87WUFDSCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFNBQVMsRUFBRTtnQkFDUCxFQUFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLGtCQUFrQixFQUFDO2dCQUNyRSxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxZQUFZLEVBQUM7Z0JBQ3pELEVBQUMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsb0JBQW9CLEVBQUM7Z0JBQ3pFLGtDQUFrQztnQkFDbEMscUJBQXFCO2dCQUNyQixlQUFlO2dCQUNmLG1CQUFtQjthQUN0QjtTQUNKLENBQUM7SUFDTixDQUFDOztnQkF6Q0osUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRSxFQUFFO29CQUNYLFlBQVksRUFBRTt3QkFDVix1QkFBdUI7cUJBQzFCO29CQUNELE9BQU8sRUFBRTt3QkFDTCx1QkFBdUI7cUJBQzFCO2lCQUNKOztJQWtDRCwyQkFBQztDQUFBLEFBMUNELElBMENDO1NBakNZLG9CQUFvQjtBQW1DakM7SUFBQTtJQVVBLENBQUM7O2dCQVZBLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUUsRUFBRTtvQkFDWCxZQUFZLEVBQUU7d0JBQ1YsZ0NBQWdDO3FCQUNuQztvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsZ0NBQWdDO3FCQUNuQztpQkFDSjs7SUFFRCxvQ0FBQztDQUFBLEFBVkQsSUFVQztTQURZLDZCQUE2QjtBQUkxQztJQUFBO0lBVUEsQ0FBQzs7Z0JBVkEsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRSxFQUFFO29CQUNYLFlBQVksRUFBRTt3QkFDVixtQ0FBbUM7cUJBQ3RDO29CQUNELE9BQU8sRUFBRTt3QkFDTCxtQ0FBbUM7cUJBQ3RDO2lCQUNKOztJQUVELHVDQUFDO0NBQUEsQUFWRCxJQVVDO1NBRFksZ0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9wZXJtaXNzaW9ucy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBOZ3hQZXJtaXNzaW9uc1NlcnZpY2UsIFVTRV9QRVJNSVNTSU9OU19TVE9SRSB9IGZyb20gJy4vc2VydmljZS9wZXJtaXNzaW9ucy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd4UGVybWlzc2lvbnNHdWFyZCB9IGZyb20gJy4vcm91dGVyL3Blcm1pc3Npb25zLWd1YXJkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZ3hSb2xlc1NlcnZpY2UsIFVTRV9ST0xFU19TVE9SRSB9IGZyb20gJy4vc2VydmljZS9yb2xlcy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd4UGVybWlzc2lvbnNTdG9yZSB9IGZyb20gJy4vc3RvcmUvcGVybWlzc2lvbnMuc3RvcmUnO1xyXG5pbXBvcnQgeyBOZ3hSb2xlc1N0b3JlIH0gZnJvbSAnLi9zdG9yZS9yb2xlcy5zdG9yZSc7XHJcbmltcG9ydCB7IE5neFBlcm1pc3Npb25zQWxsb3dTdHViRGlyZWN0aXZlIH0gZnJvbSAnLi90ZXN0aW5nL3Blcm1pc3Npb25zLWFsbG93LmRpcmVjdGl2ZS5zdHViJztcclxuaW1wb3J0IHsgTmd4UGVybWlzc2lvbnNSZXN0cmljdFN0dWJEaXJlY3RpdmUgfSBmcm9tICcuL3Rlc3RpbmcvcGVybWlzc2lvbnMtcmVzdHJpY3QuZGlyZWN0aXZlLnN0dWInO1xyXG5pbXBvcnQgeyBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TZXJ2aWNlLCBVU0VfQ09ORklHVVJBVElPTl9TVE9SRSB9IGZyb20gJy4vc2VydmljZS9jb25maWd1cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TdG9yZSB9IGZyb20gJy4vc3RvcmUvY29uZmlndXJhdGlvbi5zdG9yZSc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL3N0b3JlL3JvbGVzLnN0b3JlJ1xyXG5leHBvcnQgKiBmcm9tICcuL3N0b3JlL3Blcm1pc3Npb25zLnN0b3JlJ1xyXG5leHBvcnQgKiBmcm9tICcuL3N0b3JlL2NvbmZpZ3VyYXRpb24uc3RvcmUnXHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2RpcmVjdGl2ZS9wZXJtaXNzaW9ucy5kaXJlY3RpdmUnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlL3Blcm1pc3Npb25zLnNlcnZpY2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2Uvcm9sZXMuc2VydmljZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZS9jb25maWd1cmF0aW9uLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9yb3V0ZXIvcGVybWlzc2lvbnMtZ3VhcmQuc2VydmljZSc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL21vZGVsL3Blcm1pc3Npb25zLXJvdXRlci1kYXRhLm1vZGVsJ1xyXG5leHBvcnQgKiBmcm9tICcuL21vZGVsL3JvbGUubW9kZWwnXHJcblxyXG5leHBvcnQgKiBmcm9tICcuL3Rlc3RpbmcvcGVybWlzc2lvbnMtYWxsb3cuZGlyZWN0aXZlLnN0dWInXHJcbmV4cG9ydCAqIGZyb20gJy4vdGVzdGluZy9wZXJtaXNzaW9ucy1yZXN0cmljdC5kaXJlY3RpdmUuc3R1YidcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vZW51bXMvcHJlZGVmaW5lZC1zdHJhdGVnaWVzLmVudW0nXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE5neFBlcm1pc3Npb25zTW9kdWxlQ29uZmlnIHtcclxuICAgIC8vIGlzb2xhdGUgdGhlIHNlcnZpY2UgaW5zdGFuY2UsIG9ubHkgd29ya3MgZm9yIGxhenkgbG9hZGVkIG1vZHVsZXMgb3IgY29tcG9uZW50cyB3aXRoIHRoZSBcInByb3ZpZGVyc1wiIHByb3BlcnR5XHJcbiAgICByb2xlc0lzb2xhdGU/OiBib29sZWFuO1xyXG4gICAgcGVybWlzc2lvbnNJc29sYXRlPzogYm9vbGVhbjtcclxuICAgIGNvbmZpZ3VyYXRpb25Jc29sYXRlPzogYm9vbGVhblxyXG59XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmVcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmVcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5neFBlcm1pc3Npb25zTW9kdWxlIHtcclxuICAgIHN0YXRpYyBmb3JSb290KGNvbmZpZzogTmd4UGVybWlzc2lvbnNNb2R1bGVDb25maWcgPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBOZ3hQZXJtaXNzaW9uc01vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgICAgICAgICBOZ3hQZXJtaXNzaW9uc1N0b3JlLFxyXG4gICAgICAgICAgICAgICAgTmd4Um9sZXNTdG9yZSxcclxuICAgICAgICAgICAgICAgIE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblN0b3JlLFxyXG4gICAgICAgICAgICAgICAgTmd4UGVybWlzc2lvbnNTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgTmd4UGVybWlzc2lvbnNHdWFyZCxcclxuICAgICAgICAgICAgICAgIE5neFJvbGVzU2VydmljZSxcclxuICAgICAgICAgICAgICAgIE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICB7cHJvdmlkZTogVVNFX1BFUk1JU1NJT05TX1NUT1JFLCB1c2VWYWx1ZTogY29uZmlnLnBlcm1pc3Npb25zSXNvbGF0ZX0sXHJcbiAgICAgICAgICAgICAgICB7cHJvdmlkZTogVVNFX1JPTEVTX1NUT1JFLCB1c2VWYWx1ZTogY29uZmlnLnJvbGVzSXNvbGF0ZX0sXHJcbiAgICAgICAgICAgICAgICB7cHJvdmlkZTogVVNFX0NPTkZJR1VSQVRJT05fU1RPUkUsIHVzZVZhbHVlOiBjb25maWcuY29uZmlndXJhdGlvbklzb2xhdGV9LFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZm9yQ2hpbGQoY29uZmlnOiBOZ3hQZXJtaXNzaW9uc01vZHVsZUNvbmZpZyA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmdNb2R1bGU6IE5neFBlcm1pc3Npb25zTW9kdWxlLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICAgICAgICAgIHtwcm92aWRlOiBVU0VfUEVSTUlTU0lPTlNfU1RPUkUsIHVzZVZhbHVlOiBjb25maWcucGVybWlzc2lvbnNJc29sYXRlfSxcclxuICAgICAgICAgICAgICAgIHtwcm92aWRlOiBVU0VfUk9MRVNfU1RPUkUsIHVzZVZhbHVlOiBjb25maWcucm9sZXNJc29sYXRlfSxcclxuICAgICAgICAgICAgICAgIHtwcm92aWRlOiBVU0VfQ09ORklHVVJBVElPTl9TVE9SRSwgdXNlVmFsdWU6IGNvbmZpZy5jb25maWd1cmF0aW9uSXNvbGF0ZX0sXHJcbiAgICAgICAgICAgICAgICBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgTmd4UGVybWlzc2lvbnNTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgTmd4Um9sZXNTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgTmd4UGVybWlzc2lvbnNHdWFyZFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmVcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmVcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5neFBlcm1pc3Npb25zQWxsb3dTdHViTW9kdWxlIHtcclxufVxyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlXHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1Yk1vZHVsZSB7XHJcbn1cclxuXHJcblxyXG4iXX0=