import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { LazyRolesAsyncTestComponent } from './lazy-roles-async-test/lazy-roles-async-test.component';

const appRoutes: Routes = [
  { path: '',
    component: LazyRolesAsyncTestComponent,
  },
  {
    path: 'except-should',
    component: LazyRolesAsyncTestComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        except: 'ADDDMIN'
      }
    }
  },
  {
    path: 'only-should',
    component: LazyRolesAsyncTestComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'ADMIN'
      }
    }
  },
  {
    path: 'except-should-not',
    component: LazyRolesAsyncTestComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        except: 'ADMIN'
      }
    }
  },
  {
    path: 'only-should-not',
    component: LazyRolesAsyncTestComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'GG'
      }
    }
  },
  {
    path: 'only-permissions-should',
    component: LazyRolesAsyncTestComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'NICE'
      }
    }
  },
  {
    path: 'except-permissions-should-not',
    component: LazyRolesAsyncTestComponent,
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
export class LazyIsolateAsyncRolesRoutingModule {}
