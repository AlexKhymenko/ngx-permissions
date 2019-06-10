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
export class NgxPermissionsAllowStubModule {
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
export class NgxPermissionsRestrictStubModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtcGVybWlzc2lvbnMvIiwic291cmNlcyI6WyJsaWIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzlHLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRS9FLDhCQUFjLHFCQUFxQixDQUFBO0FBQ25DLG9DQUFjLDJCQUEyQixDQUFBO0FBQ3pDLGlEQUFjLDZCQUE2QixDQUFBO0FBRTNDLHdDQUFjLG1DQUFtQyxDQUFDO0FBRWxELDZEQUFjLCtCQUErQixDQUFDO0FBQzlDLGlEQUFjLHlCQUF5QixDQUFDO0FBQ3hDLDRFQUFjLGlDQUFpQyxDQUFDO0FBRWhELG9DQUFjLG9DQUFvQyxDQUFDO0FBRW5ELGVBQWMsdUNBQXVDLENBQUE7QUFDckQsd0JBQWMsb0JBQW9CLENBQUE7QUFFbEMsaURBQWMsNENBQTRDLENBQUE7QUFDMUQsb0RBQWMsK0NBQStDLENBQUE7QUFFN0QsbURBQWMsb0NBQW9DLENBQUE7Ozs7QUFFbEQsZ0RBS0M7OztJQUhHLGtEQUF1Qjs7SUFDdkIsd0RBQTZCOztJQUM3QiwwREFBOEI7O0FBYWxDLE1BQU0sT0FBTyxvQkFBb0I7Ozs7O0lBQzdCLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBcUMsRUFBRTtRQUNsRCxPQUFPO1lBQ0gsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixTQUFTLEVBQUU7Z0JBQ1AsbUJBQW1CO2dCQUNuQixhQUFhO2dCQUNiLGdDQUFnQztnQkFDaEMscUJBQXFCO2dCQUNyQixtQkFBbUI7Z0JBQ25CLGVBQWU7Z0JBQ2Ysa0NBQWtDO2dCQUNsQyxFQUFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLGtCQUFrQixFQUFDO2dCQUNyRSxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxZQUFZLEVBQUM7Z0JBQ3pELEVBQUMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsb0JBQW9CLEVBQUM7YUFDNUU7U0FDSixDQUFDO0lBQ04sQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQXFDLEVBQUU7UUFDbkQsT0FBTztZQUNILFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsU0FBUyxFQUFFO2dCQUNQLEVBQUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsa0JBQWtCLEVBQUM7Z0JBQ3JFLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFlBQVksRUFBQztnQkFDekQsRUFBQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxvQkFBb0IsRUFBQztnQkFDekUsa0NBQWtDO2dCQUNsQyxxQkFBcUI7Z0JBQ3JCLGVBQWU7Z0JBQ2YsbUJBQW1CO2FBQ3RCO1NBQ0osQ0FBQztJQUNOLENBQUM7OztZQXpDSixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsWUFBWSxFQUFFO29CQUNWLHVCQUF1QjtpQkFDMUI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLHVCQUF1QjtpQkFDMUI7YUFDSjs7QUE2Q0QsTUFBTSxPQUFPLDZCQUE2Qjs7O1lBVHpDLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsRUFBRTtnQkFDWCxZQUFZLEVBQUU7b0JBQ1YsZ0NBQWdDO2lCQUNuQztnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsZ0NBQWdDO2lCQUNuQzthQUNKOztBQWNELE1BQU0sT0FBTyxnQ0FBZ0M7OztZQVQ1QyxRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsWUFBWSxFQUFFO29CQUNWLG1DQUFtQztpQkFDdEM7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLG1DQUFtQztpQkFDdEM7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5neFBlcm1pc3Npb25zRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvcGVybWlzc2lvbnMuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTmd4UGVybWlzc2lvbnNTZXJ2aWNlLCBVU0VfUEVSTUlTU0lPTlNfU1RPUkUgfSBmcm9tICcuL3NlcnZpY2UvcGVybWlzc2lvbnMuc2VydmljZSc7XHJcbmltcG9ydCB7IE5neFBlcm1pc3Npb25zR3VhcmQgfSBmcm9tICcuL3JvdXRlci9wZXJtaXNzaW9ucy1ndWFyZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd4Um9sZXNTZXJ2aWNlLCBVU0VfUk9MRVNfU1RPUkUgfSBmcm9tICcuL3NlcnZpY2Uvcm9sZXMuc2VydmljZSc7XHJcbmltcG9ydCB7IE5neFBlcm1pc3Npb25zU3RvcmUgfSBmcm9tICcuL3N0b3JlL3Blcm1pc3Npb25zLnN0b3JlJztcclxuaW1wb3J0IHsgTmd4Um9sZXNTdG9yZSB9IGZyb20gJy4vc3RvcmUvcm9sZXMuc3RvcmUnO1xyXG5pbXBvcnQgeyBOZ3hQZXJtaXNzaW9uc0FsbG93U3R1YkRpcmVjdGl2ZSB9IGZyb20gJy4vdGVzdGluZy9wZXJtaXNzaW9ucy1hbGxvdy5kaXJlY3RpdmUuc3R1Yic7XHJcbmltcG9ydCB7IE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlIH0gZnJvbSAnLi90ZXN0aW5nL3Blcm1pc3Npb25zLXJlc3RyaWN0LmRpcmVjdGl2ZS5zdHViJztcclxuaW1wb3J0IHsgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU2VydmljZSwgVVNFX0NPTkZJR1VSQVRJT05fU1RPUkUgfSBmcm9tICcuL3NlcnZpY2UvY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU3RvcmUgfSBmcm9tICcuL3N0b3JlL2NvbmZpZ3VyYXRpb24uc3RvcmUnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9zdG9yZS9yb2xlcy5zdG9yZSdcclxuZXhwb3J0ICogZnJvbSAnLi9zdG9yZS9wZXJtaXNzaW9ucy5zdG9yZSdcclxuZXhwb3J0ICogZnJvbSAnLi9zdG9yZS9jb25maWd1cmF0aW9uLnN0b3JlJ1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9kaXJlY3RpdmUvcGVybWlzc2lvbnMuZGlyZWN0aXZlJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZS9wZXJtaXNzaW9ucy5zZXJ2aWNlJztcclxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlL3JvbGVzLnNlcnZpY2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2UvY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vcm91dGVyL3Blcm1pc3Npb25zLWd1YXJkLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9tb2RlbC9wZXJtaXNzaW9ucy1yb3V0ZXItZGF0YS5tb2RlbCdcclxuZXhwb3J0ICogZnJvbSAnLi9tb2RlbC9yb2xlLm1vZGVsJ1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi90ZXN0aW5nL3Blcm1pc3Npb25zLWFsbG93LmRpcmVjdGl2ZS5zdHViJ1xyXG5leHBvcnQgKiBmcm9tICcuL3Rlc3RpbmcvcGVybWlzc2lvbnMtcmVzdHJpY3QuZGlyZWN0aXZlLnN0dWInXHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2VudW1zL3ByZWRlZmluZWQtc3RyYXRlZ2llcy5lbnVtJ1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBOZ3hQZXJtaXNzaW9uc01vZHVsZUNvbmZpZyB7XHJcbiAgICAvLyBpc29sYXRlIHRoZSBzZXJ2aWNlIGluc3RhbmNlLCBvbmx5IHdvcmtzIGZvciBsYXp5IGxvYWRlZCBtb2R1bGVzIG9yIGNvbXBvbmVudHMgd2l0aCB0aGUgXCJwcm92aWRlcnNcIiBwcm9wZXJ0eVxyXG4gICAgcm9sZXNJc29sYXRlPzogYm9vbGVhbjtcclxuICAgIHBlcm1pc3Npb25zSXNvbGF0ZT86IGJvb2xlYW47XHJcbiAgICBjb25maWd1cmF0aW9uSXNvbGF0ZT86IGJvb2xlYW5cclxufVxyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlXHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hQZXJtaXNzaW9uc01vZHVsZSB7XHJcbiAgICBzdGF0aWMgZm9yUm9vdChjb25maWc6IE5neFBlcm1pc3Npb25zTW9kdWxlQ29uZmlnID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogTmd4UGVybWlzc2lvbnNNb2R1bGUsXHJcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgICAgICAgICAgTmd4UGVybWlzc2lvbnNTdG9yZSxcclxuICAgICAgICAgICAgICAgIE5neFJvbGVzU3RvcmUsXHJcbiAgICAgICAgICAgICAgICBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TdG9yZSxcclxuICAgICAgICAgICAgICAgIE5neFBlcm1pc3Npb25zU2VydmljZSxcclxuICAgICAgICAgICAgICAgIE5neFBlcm1pc3Npb25zR3VhcmQsXHJcbiAgICAgICAgICAgICAgICBOZ3hSb2xlc1NlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAge3Byb3ZpZGU6IFVTRV9QRVJNSVNTSU9OU19TVE9SRSwgdXNlVmFsdWU6IGNvbmZpZy5wZXJtaXNzaW9uc0lzb2xhdGV9LFxyXG4gICAgICAgICAgICAgICAge3Byb3ZpZGU6IFVTRV9ST0xFU19TVE9SRSwgdXNlVmFsdWU6IGNvbmZpZy5yb2xlc0lzb2xhdGV9LFxyXG4gICAgICAgICAgICAgICAge3Byb3ZpZGU6IFVTRV9DT05GSUdVUkFUSU9OX1NUT1JFLCB1c2VWYWx1ZTogY29uZmlnLmNvbmZpZ3VyYXRpb25Jc29sYXRlfSxcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGZvckNoaWxkKGNvbmZpZzogTmd4UGVybWlzc2lvbnNNb2R1bGVDb25maWcgPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBOZ3hQZXJtaXNzaW9uc01vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgICAgICAgICB7cHJvdmlkZTogVVNFX1BFUk1JU1NJT05TX1NUT1JFLCB1c2VWYWx1ZTogY29uZmlnLnBlcm1pc3Npb25zSXNvbGF0ZX0sXHJcbiAgICAgICAgICAgICAgICB7cHJvdmlkZTogVVNFX1JPTEVTX1NUT1JFLCB1c2VWYWx1ZTogY29uZmlnLnJvbGVzSXNvbGF0ZX0sXHJcbiAgICAgICAgICAgICAgICB7cHJvdmlkZTogVVNFX0NPTkZJR1VSQVRJT05fU1RPUkUsIHVzZVZhbHVlOiBjb25maWcuY29uZmlndXJhdGlvbklzb2xhdGV9LFxyXG4gICAgICAgICAgICAgICAgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU2VydmljZSxcclxuICAgICAgICAgICAgICAgIE5neFBlcm1pc3Npb25zU2VydmljZSxcclxuICAgICAgICAgICAgICAgIE5neFJvbGVzU2VydmljZSxcclxuICAgICAgICAgICAgICAgIE5neFBlcm1pc3Npb25zR3VhcmRcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIE5neFBlcm1pc3Npb25zQWxsb3dTdHViRGlyZWN0aXZlXHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIE5neFBlcm1pc3Npb25zQWxsb3dTdHViRGlyZWN0aXZlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hQZXJtaXNzaW9uc0FsbG93U3R1Yk1vZHVsZSB7XHJcbn1cclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW10sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1YkRpcmVjdGl2ZVxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1YkRpcmVjdGl2ZVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4UGVybWlzc2lvbnNSZXN0cmljdFN0dWJNb2R1bGUge1xyXG59XHJcblxyXG5cclxuIl19