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

  { path: 'home3',
    component: HomeComponent,
    canActivate: [PermissionsGuard],
    data: {
      permissions: {
        except: 'ADMIN',
        redirectTo: '/except-should'
      }
    }
  },
  { path: 'home4',
    component: HomeComponent,
    canActivate: [PermissionsGuard],
    data: {
      permissions: {
        except: 'ADMINNN',
        redirectTo: '/except-should'
      }
    }
  },
  { path: 'home1',
    component: HomeComponent,
    canActivate: [PermissionsGuard],
    data: {
      permissions: {
        only: 'ADMIN1',
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


  {
    path: 'test',
    canActivate: [],
    children: [
      {
        path: '',
        redirectTo: 'reports',
        pathMatch: 'full'

      },
      {
        path: 'reports',
        component: HomeComponent,
        canActivate: [PermissionsGuard],
        data: {
          permissions: {
            only: 'ADMsIN',
            redirectTo: '/403'
          }
        },
        children: [
          {
            path: '',
            redirectTo: 'report-lines',
            pathMatch: 'full'
          },
          {
            path: 'reports-list',
            component: HomeComponent
          },
          {
            path: 'report-lines',
            component: HomeComponent
          },

        ]
      },
    ]
  },

  {
    path: '403',
    component: HomeComponent
  },
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
