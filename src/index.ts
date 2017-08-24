import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxPermissionsDirective } from './directive/permissions.directive';
import { NgxPermissionsService, USE_PERMISSIONS_STORE } from './service/permissions.service';
import { NgxPermissionsGuard } from './router/permissions-guard.service';
import { NgxRolesService, USE_ROLES_STORE } from './service/roles.service';
import { NgxPermissionsStore } from './store/permissions.store';
import { NgxRolesStore } from './store/roles.store';

export * from './store/roles.store'
export * from './store/permissions.store'
export * from './directive/permissions.directive';
export * from './service/permissions.service';
export * from './service/roles.service';
export * from './router/permissions-guard.service';
export * from './model/permissions-router-data.model'
export * from './model/role.model'

export interface NgxPermissionsModuleConfig {
    // isolate the service instance, only works for lazy loaded modules or components with the "providers" property
    rolesIsolate?: boolean;
    permissionsIsolate?: boolean;
}


@NgModule({
  imports: [
  ],
  declarations: [
    NgxPermissionsDirective
  ],
  exports: [
    NgxPermissionsDirective
  ]
})
export class NgxPermissionsModule {
  static forRoot(config: NgxPermissionsModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: NgxPermissionsModule,
      providers: [
            NgxPermissionsStore,
            NgxRolesStore,
            NgxPermissionsService,
            NgxPermissionsGuard,
            NgxRolesService,
            {provide: USE_PERMISSIONS_STORE, useValue: config.permissionsIsolate},
            {provide: USE_ROLES_STORE, useValue: config.rolesIsolate},
      ]
    };
  }

    static forChild(config: NgxPermissionsModuleConfig = {}): ModuleWithProviders {
        return {
            ngModule: NgxPermissionsModule,
            providers: [
                {provide: USE_PERMISSIONS_STORE, useValue: config.permissionsIsolate},
                {provide: USE_ROLES_STORE, useValue: config.rolesIsolate},
                NgxPermissionsService,
                NgxRolesService,
                NgxPermissionsGuard
            ]
        };
    }
}