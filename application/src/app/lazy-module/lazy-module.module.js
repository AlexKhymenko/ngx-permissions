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
var lazy_routing_module_1 = require("./lazy-routing.module");
var lazy_component_component_1 = require("./lazy-component/lazy-component.component");
var ngx_permissions_1 = require("ngx-permissions");
var LazyModule = /** @class */ (function () {
    function LazyModule() {
    }
    LazyModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                lazy_routing_module_1.LazyRoutingModule,
                ngx_permissions_1.NgxPermissionsModule.forChild()
            ],
            declarations: [lazy_component_component_1.LazyComponentComponent]
        })
    ], LazyModule);
    return LazyModule;
}());
exports.LazyModule = LazyModule;
