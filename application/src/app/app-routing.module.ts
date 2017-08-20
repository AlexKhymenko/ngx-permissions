import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { PermissionsGuard } from 'ngx-permissions';

const appRoutes: Routes = [
  { path: 'home',
    component: HomeComponent,
    canActivate: [PermissionsGuard],
    data: {
      permissions: {
        only: 'ADMIN',
        redirectTo: '/except-should'
      }
    }
  },
  {
    path: 'except-should',
    component: HomeComponent,
    canActivate: [PermissionsGuard],
    data: {
      permissions: {
        except: 'ADDDMIN'
      }
    }
  },
  {
    path: 'except-should-not',
    component: HomeComponent,
    canActivate: [PermissionsGuard],
    data: {
      permissions: {
        except: 'ADMIN'
      }
    }
  },
  {
    path: 'only-should-not',
    component: HomeComponent,
    canActivate: [PermissionsGuard],
    data: {
      permissions: {
        except: 'ADMIN'
      }
    }
  },
  { path: 'lazy', loadChildren: 'app/lazy-module/lazy-module.module#LazyModule' },
  { path: 'lazy-isolate', loadChildren: 'app/lazy-isolate/lazy-isolate.module#LazyIsolateModule' },
  { path: 'lazy-roles-isolate', loadChildren: 'app/lazy-role-isolate/lazy-role-isolate.module#LazyRoleIsolateModule' },
  { path: 'lazy-roles-async-isolate', loadChildren: 'app/lazy-roles-async-isolate/lazy-roles-async-isolate.module#LazyRolesAsyncIsolateModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    // CanDeactivateGuard
  ]
})
export class AppRoutingModule {}
