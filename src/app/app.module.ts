import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { InitialLoadComponent } from './initial-load/initial-load.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InitialLoadComponent
  ],
  imports: [
    BrowserModule,
    NgxPermissionsModule.forRoot(),
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
