import { ModuleWithProviders } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from './directive/permissions.directive';
import * as ɵngcc2 from './testing/permissions-allow.directive.stub';
import * as ɵngcc3 from './testing/permissions-restrict.directive.stub';
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
    static forRoot(config?: NgxPermissionsModuleConfig): ModuleWithProviders<NgxPermissionsModule>;
    static forChild(config?: NgxPermissionsModuleConfig): ModuleWithProviders<NgxPermissionsModule>;
    static ngModuleDef: ɵngcc0.ɵɵNgModuleDefWithMeta<NgxPermissionsModule, [typeof ɵngcc1.NgxPermissionsDirective], never, [typeof ɵngcc1.NgxPermissionsDirective]>;
    static ngInjectorDef: ɵngcc0.ɵɵInjectorDef<NgxPermissionsModule>;
}
export declare class NgxPermissionsAllowStubModule {
    static ngModuleDef: ɵngcc0.ɵɵNgModuleDefWithMeta<NgxPermissionsAllowStubModule, [typeof ɵngcc2.NgxPermissionsAllowStubDirective], never, [typeof ɵngcc2.NgxPermissionsAllowStubDirective]>;
    static ngInjectorDef: ɵngcc0.ɵɵInjectorDef<NgxPermissionsAllowStubModule>;
}
export declare class NgxPermissionsRestrictStubModule {
    static ngModuleDef: ɵngcc0.ɵɵNgModuleDefWithMeta<NgxPermissionsRestrictStubModule, [typeof ɵngcc3.NgxPermissionsRestrictStubDirective], never, [typeof ɵngcc3.NgxPermissionsRestrictStubDirective]>;
    static ngInjectorDef: ɵngcc0.ɵɵInjectorDef<NgxPermissionsRestrictStubModule>;
}

//# sourceMappingURL=index.d.ts.map