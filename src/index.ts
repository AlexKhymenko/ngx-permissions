import { NgModule, ModuleWithProviders } from '@angular/core';
import { PermissionsDirective } from './permissions.directive';
import { PermissionsService } from './permissions.service';

export * from './permissions.directive';
export * from './permissions.service';


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
        PermissionsService
      ]
    };
  }
}