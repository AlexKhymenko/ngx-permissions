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
var ngx_permissions_1 = require("ngx-permissions");
var lazy_roles_async_test_component_1 = require("./lazy-roles-async-test/lazy-roles-async-test.component");
var appRoutes = [
    { path: '',
        component: lazy_roles_async_test_component_1.LazyRolesAsyncTestComponent
    },
    {
        path: 'except-should',
        component: lazy_roles_async_test_component_1.LazyRolesAsyncTestComponent,
        canActivate: [ngx_permissions_1.NgxPermissionsGuard],
        data: {
            permissions: {
                except: 'ADDDMIN'
            }
        }
    },
    {
        path: 'only-should',
        component: lazy_roles_async_test_component_1.LazyRolesAsyncTestComponent,
        canActivate: [ngx_permissions_1.NgxPermissionsGuard],
        data: {
            permissions: {
                only: 'ADMIN'
            }
        }
    },
    {
        path: 'except-should-not',
        component: lazy_roles_async_test_component_1.LazyRolesAsyncTestComponent,
        canActivate: [ngx_permissions_1.NgxPermissionsGuard],
        data: {
            permissions: {
                except: 'ADMIN'
            }
        }
    },
    {
        path: 'only-should-not',
        component: lazy_roles_async_test_component_1.LazyRolesAsyncTestComponent,
        canActivate: [ngx_permissions_1.NgxPermissionsGuard],
        data: {
            permissions: {
                only: 'GG'
            }
        }
    },
    {
        path: 'only-permissions-should',
        component: lazy_roles_async_test_component_1.LazyRolesAsyncTestComponent,
        canActivate: [ngx_permissions_1.NgxPermissionsGuard],
        data: {
            permissions: {
                only: 'NICE'
            }
        }
    },
    {
        path: 'except-permissions-should-not',
        component: lazy_roles_async_test_component_1.LazyRolesAsyncTestComponent,
        canActivate: [ngx_permissions_1.NgxPermissionsGuard],
        data: {
            permissions: {
                except: 'NICE'
            }
        }
    }
];
var LazyIsolateAsyncRolesRoutingModule = /** @class */ (function () {
    function LazyIsolateAsyncRolesRoutingModule() {
    }
    LazyIsolateAsyncRolesRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(appRoutes),
            ],
            exports: [
                router_1.RouterModule
            ],
            providers: []
        })
    ], LazyIsolateAsyncRolesRoutingModule);
    return LazyIsolateAsyncRolesRoutingModule;
}());
exports.LazyIsolateAsyncRolesRoutingModule = LazyIsolateAsyncRolesRoutingModule;
