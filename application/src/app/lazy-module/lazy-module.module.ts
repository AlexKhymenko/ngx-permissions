import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyRoutingModule } from './lazy-routing.module';
import { LazyComponentComponent } from './lazy-component/lazy-component.component';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    CommonModule,
    LazyRoutingModule,
    NgxPermissionsModule.forChild()

  ],
  declarations: [LazyComponentComponent]
})
export class LazyModule { }
