import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyRolesAsyncTestComponent } from './lazy-roles-async-test/lazy-roles-async-test.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AsyncTestService } from './async-test.service';
import { LazyIsolateAsyncRolesRoutingModule } from './lazy-isolate-role-async-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NgxPermissionsModule.forChild({
      permissionsIsolate: true,
      rolesIsolate: true
    }),
    LazyIsolateAsyncRolesRoutingModule
  ],
  providers: [
    AsyncTestService
  ],
  declarations: [LazyRolesAsyncTestComponent]
})
export class LazyRolesAsyncIsolateModule { }
