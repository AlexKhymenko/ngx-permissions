import { NgModule, ModuleWithProviders } from '@angular/core';
import { PermissionsDirective } from './permissions.directive';
import { PermissionsService, USE_PERMISSIONS_STORE } from './permissions.service';
import { PermissionsGuard } from './router/permissions-guard.service';
import { RolesService, USE_ROLES_STORE } from './roles.service';
import { PermissionsStore } from './store/permissions.store';
import { RolesStore } from './store/roles.store';

export * from './permissions.directive';
export * from './permissions.service';
export * from './roles.service';
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
    PermissionsDirective
  ],
  exports: [
    PermissionsDirective
  ]
})
export class NgxPermissionsModule {
  static forRoot(config: NgxPermissionsModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: NgxPermissionsModule,
      providers: [
        PermissionsService,
        PermissionsGuard,
        RolesService,
        PermissionsStore,
        RolesStore,
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
                PermissionsService,
                RolesService,
                PermissionsGuard
            ]
        };
    }
}