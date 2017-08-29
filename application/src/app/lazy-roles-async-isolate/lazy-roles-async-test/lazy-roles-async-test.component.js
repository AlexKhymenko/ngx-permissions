"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var LazyRolesAsyncTestComponent = /** @class */ (function () {
    function LazyRolesAsyncTestComponent(rolesServices, asyncTest) {
        this.rolesServices = rolesServices;
        this.asyncTest = asyncTest;
    }
    LazyRolesAsyncTestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.rolesServices.addRole("ADMIN_TRUE", function () {
            return true;
        });
        this.rolesServices.addRole("ADMIN_FALSE", function () {
            return false;
        });
        this.rolesServices.addRole("ADMIN_RESOLVE_TRUE", function () {
            return _this.asyncTest.promiseResolveTrue();
        });
        this.rolesServices.addRole("ADMIN_RESOLVE_FALSE", function () {
            return _this.asyncTest.promiseResolveFalse();
        });
        this.rolesServices.addRole("ADMIN_REJECT", function () {
            return _this.asyncTest.promiseReject();
        });
        console.log(this.rolesServices.getRoles());
    };
    LazyRolesAsyncTestComponent = __decorate([
        core_1.Component({
            selector: 'app-lazy-roles-async-test',
            templateUrl: './lazy-roles-async-test.component.html',
            styleUrls: ['./lazy-roles-async-test.component.css']
        })
    ], LazyRolesAsyncTestComponent);
    return LazyRolesAsyncTestComponent;
}());
exports.LazyRolesAsyncTestComponent = LazyRolesAsyncTestComponent;
