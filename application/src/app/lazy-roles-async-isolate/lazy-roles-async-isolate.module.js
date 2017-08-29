"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var lazy_roles_async_test_component_1 = require("./lazy-roles-async-test/lazy-roles-async-test.component");
var ngx_permissions_1 = require("ngx-permissions");
var async_test_service_1 = require("./async-test.service");
var lazy_isolate_role_async_routing_module_1 = require("./lazy-isolate-role-async-routing.module");
var LazyRolesAsyncIsolateModule = /** @class */ (function () {
    function LazyRolesAsyncIsolateModule() {
    }
    LazyRolesAsyncIsolateModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                ngx_permissions_1.NgxPermissionsModule.forChild({
                    permissionsIsolate: true,
                    rolesIsolate: true
                }),
                lazy_isolate_role_async_routing_module_1.LazyIsolateAsyncRolesRoutingModule
            ],
            providers: [
                async_test_service_1.AsyncTestService
            ],
            declarations: [lazy_roles_async_test_component_1.LazyRolesAsyncTestComponent]
        })
    ], LazyRolesAsyncIsolateModule);
    return LazyRolesAsyncIsolateModule;
}());
exports.LazyRolesAsyncIsolateModule = LazyRolesAsyncIsolateModule;
