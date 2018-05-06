import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { IsolateComponent } from './isolate/isolate.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

const appRoutes: Routes = [
  { path: '',
    component: IsolateComponent,
    canActivateChild: [NgxPermissionsGuard],
    children: [
      {
        path: 'except-should',
        component: IsolateComponent,
        data: {
          permissions: {
            except: 'ADDDMIN'
          }
        }
      },
      {
        path: 'only-should',
        component: IsolateComponent,
        data: {
          permissions: {
            only: 'GUEST'
          }
        }
      },
      {
        path: 'except-should-not',
        component: IsolateComponent,
        data: {
          permissions: {
            except: 'GUEST'
          }
        }
      },
      {
        path: 'only-should-not',
        component: IsolateComponent,
        data: {
          permissions: {
            only: 'ADMIN'
          }
        }
      }
    ]
  },

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
export class LazyIsolateRoutingModule {}
