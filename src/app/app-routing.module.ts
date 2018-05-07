import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NgxPermissionsGuard } from 'ngx-permissions';


export function testPermissions(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  if (route.params['id'] === 42) {
    return ['MANAGER', 'UTILS'];
  } else {
    return 'ADMIN';
  }
}
const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'ADMIN',
        redirectTo: '/except-should'
      }
    }
  },

  {
    path: 'home3',
    component: HomeComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        except: 'ADMIN',
        redirectTo: '/except-should'
      }
    }
  },
  {
    path: 'dynamic/:id',
    component: HomeComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: testPermissions
      }
    }
  },
  {
    path: 'home4',
    component: HomeComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        except: 'ADMINNN',
        redirectTo: '/except-should'
      }
    }
  },
  {
    path: 'home1',
    component: HomeComponent,
    canActivate: [NgxPermissionsGuard],
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
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        except: 'ADDDMIN'
      }
    }
  },
  {
    path: 'except-should-not',
    component: HomeComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        except: 'ADMIN'
      }
    }
  },
  {
    path: 'only-should-not',
    component: HomeComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        except: 'ADMIN'
      }
    }
  },
  {
    path: 'lazy',
    data: {
      permissions: {
        except: 'ADDDMIN',
      }
    },
    canLoad: [NgxPermissionsGuard],
    loadChildren: 'app/lazy-module/lazy-module.module#LazyModule'
  },
  { path: 'lazy-isolate', loadChildren: './lazy-isolate/lazy-isolate.module#LazyIsolateModule' },
  { path: 'lazy-roles-isolate', loadChildren: './lazy-role-isolate/lazy-role-isolate.module#LazyRoleIsolateModule' },
  {
    path: 'lazy-roles-async-isolate',
    loadChildren: './lazy-roles-async-isolate/lazy-roles-async-isolate.module#LazyRolesAsyncIsolateModule'
  },


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
        canActivate: [NgxPermissionsGuard],
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
export class AppRoutingModule { }
