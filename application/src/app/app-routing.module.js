"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var home_component_1 = require("./home/home.component");
var ngx_permissions_1 = require("ngx-permissions");
function testPermissions(route, state) {
    if (route.params['id'] === 42) {
        return ['MANAGER', "UTILS"];
    }
    else {
        return 'ADMIN';
    }
}
exports.testPermissions = testPermissions;
var appRoutes = [
    { path: 'home',
        component: home_component_1.HomeComponent,
        canActivate: [ngx_permissions_1.NgxPermissionsGuard],
        data: {
            permissions: {
                only: 'ADMIN',
                redirectTo: '/except-should'
            }
        }
    },
    { path: 'home3',
        component: home_component_1.HomeComponent,
        canActivate: [ngx_permissions_1.NgxPermissionsGuard],
        data: {
            permissions: {
                except: 'ADMIN',
                redirectTo: '/except-should'
            }
        }
    },
    { path: 'dynamic/:id',
        component: home_component_1.HomeComponent,
        canActivate: [ngx_permissions_1.NgxPermissionsGuard],
        data: {
            permissions: {
                only: testPermissions
            }
        }
    },
    { path: 'home4',
        component: home_component_1.HomeComponent,
        canActivate: [ngx_permissions_1.NgxPermissionsGuard],
        data: {
            permissions: {
                except: 'ADMINNN',
                redirectTo: '/except-should'
            }
        }
    },
    { path: 'home1',
        component: home_component_1.HomeComponent,
        canActivate: [ngx_permissions_1.NgxPermissionsGuard],
        data: {
            permissions: {
                only: 'ADMIN1',
                redirectTo: '/except-should'
            }
        }
    },
    {
        path: 'except-should',
        component: home_component_1.HomeComponent,
        canActivate: [ngx_permissions_1.NgxPermissionsGuard],
        data: {
            permissions: {
                except: 'ADDDMIN'
            }
        }
    },
    {
        path: 'except-should-not',
        component: home_component_1.HomeComponent,
        canActivate: [ngx_permissions_1.NgxPermissionsGuard],
        data: {
            permissions: {
                except: 'ADMIN'
            }
        }
    },
    {
        path: 'only-should-not',
        component: home_component_1.HomeComponent,
        canActivate: [ngx_permissions_1.NgxPermissionsGuard],
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
                component: home_component_1.HomeComponent,
                canActivate: [ngx_permissions_1.NgxPermissionsGuard],
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
                        component: home_component_1.HomeComponent
                    },
                    {
                        path: 'report-lines',
                        component: home_component_1.HomeComponent
                    },
                ]
            },
        ]
    },
    {
        path: '403',
        component: home_component_1.HomeComponent
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(appRoutes)
            ],
            exports: [
                router_1.RouterModule
            ],
            providers: []
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
