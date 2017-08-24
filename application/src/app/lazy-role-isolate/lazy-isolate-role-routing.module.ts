import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { LazyRoleIsolateTestComponent } from './lazy-role-isolate-test/lazy-role-isolate-test.component';

const appRoutes: Routes = [
  { path: '',
    component: LazyRoleIsolateTestComponent,
  },
  {
    path: 'except-should',
    component: LazyRoleIsolateTestComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        except: 'ADDDMIN'
      }
    }
  },
  {
    path: 'only-should',
    component: LazyRoleIsolateTestComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'ADMIN'
      }
    }
  },
  {
    path: 'except-should-not',
    component: LazyRoleIsolateTestComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        except: 'ADMIN'
      }
    }
  },
  {
    path: 'only-should-not',
    component: LazyRoleIsolateTestComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'GG'
      }
    }
  },
  {
    path: 'only-permissions-should',
    component: LazyRoleIsolateTestComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'NICE'
      }
    }
  },
  {
    path: 'except-permissions-should-not',
    component: LazyRoleIsolateTestComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        except: 'NICE'
      }
    }
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(appRoutes),
  ],
  exports: [
    RouterModule
  ],
  providers: [
    // CanDeactivateGuard
  ]
})
export class LazyIsolateRolesRoutingModule {}
