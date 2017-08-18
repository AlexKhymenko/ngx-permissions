import { NgModule, ModuleWithProviders } from '@angular/core';
import { PermissionsDirective } from './permissions.directive';
import { PermissionsService } from './permissions.service';
import { PermissionsGuard } from './router/permissions-guard.service';
import { RolesService } from './roles.service';

export * from './permissions.directive';
export * from './permissions.service';
export * from './router/permissions-guard.service';


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
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxPermissionsModule,
      providers: [
        PermissionsService,
        PermissionsGuard,
        RolesService
      ]
    };
  }
}