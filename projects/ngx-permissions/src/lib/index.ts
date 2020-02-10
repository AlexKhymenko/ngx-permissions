import { NgModule, ModuleWithProviders } from '@angular/core';
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
    // isolate the service instance, only works for lazy loaded modules or components with the "providers" property
    rolesIsolate?: boolean;
    permissionsIsolate?: boolean;
    configurationIsolate?: boolean;
}


@NgModule({
    imports: [],
    declarations: [
        NgxPermissionsDirective
    ],
    exports: [
        NgxPermissionsDirective
    ]
})
export class NgxPermissionsModule {
    static forRoot(config: NgxPermissionsModuleConfig = {}): ModuleWithProviders<NgxPermissionsModule> {
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
                {provide: USE_PERMISSIONS_STORE, useValue: config.permissionsIsolate},
                {provide: USE_ROLES_STORE, useValue: config.rolesIsolate},
                {provide: USE_CONFIGURATION_STORE, useValue: config.configurationIsolate},
            ]
        };
    }

    static forChild(config: NgxPermissionsModuleConfig = {}): ModuleWithProviders<NgxPermissionsModule> {
        return {
            ngModule: NgxPermissionsModule,
            providers: [
                {provide: USE_PERMISSIONS_STORE, useValue: config.permissionsIsolate},
                {provide: USE_ROLES_STORE, useValue: config.rolesIsolate},
                {provide: USE_CONFIGURATION_STORE, useValue: config.configurationIsolate},
                NgxPermissionsConfigurationService,
                NgxPermissionsService,
                NgxRolesService,
                NgxPermissionsGuard
            ]
        };
    }
}

@NgModule({
    imports: [],
    declarations: [
        NgxPermissionsAllowStubDirective
    ],
    exports: [
        NgxPermissionsAllowStubDirective
    ]
})
export class NgxPermissionsAllowStubModule {
}


@NgModule({
    imports: [],
    declarations: [
        NgxPermissionsRestrictStubDirective
    ],
    exports: [
        NgxPermissionsRestrictStubDirective
    ]
})
export class NgxPermissionsRestrictStubModule {
}


