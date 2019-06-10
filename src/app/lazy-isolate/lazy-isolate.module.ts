import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsolateComponent } from './isolate/isolate.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { LazyIsolateRoutingModule } from './lazy-isolate-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LazyIsolateRoutingModule,
    NgxPermissionsModule.forChild({permissionsIsolate: true, rolesIsolate: true})
  ],
  declarations: [IsolateComponent]
})
export class LazyIsolateModule { }
