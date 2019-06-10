import { ModuleWithProviders } from '@angular/core';
export * from './store/roles.store';
export * from './store/permissions.store';
export * from './store/configuration.store';
export * from './directive/permissions.directive';
export * from './service/permissions.service';
export * from './service/roles.service';
export * from './service/configuration.service';
export * from './router/permissions-guard.service';
export * from './model/permissions-router-data.model';
export * from './model/role.model';
export * from './testing/permissions-allow.directive.stub';
export * from './testing/permissions-restrict.directive.stub';
export * from './enums/predefined-strategies.enum';
export interface NgxPermissionsModuleConfig {
    rolesIsolate?: boolean;
    permissionsIsolate?: boolean;
    configurationIsolate?: boolean;
}
export declare class NgxPermissionsModule {
    static forRoot(config?: NgxPermissionsModuleConfig): ModuleWithProviders;
    static forChild(config?: NgxPermissionsModuleConfig): ModuleWithProviders;
}
export declare class NgxPermissionsAllowStubModule {
}
export declare class NgxPermissionsRestrictStubModule {
}
