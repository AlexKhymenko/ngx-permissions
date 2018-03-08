import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPermissionsModule } from 'ngx-permissions';

import { LazyIsolateRolesRoutingModule } from './lazy-isolate-role-routing.module';
import { LazyRoleIsolateTestComponent } from './lazy-role-isolate-test/lazy-role-isolate-test.component';

@NgModule({
  imports: [
    CommonModule,
    LazyIsolateRolesRoutingModule,
    NgxPermissionsModule.forChild({
      permissionsIsolate: true,
      rolesIsolate: true,
      configurationIsolate: true
    })
  ],
  declarations: [
  LazyRoleIsolateTestComponent
  ]
})
export class LazyRoleIsolateModule { }
