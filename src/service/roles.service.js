"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/first");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/mergeAll");
require("rxjs/add/observable/merge");
require("rxjs/add/observable/from");
var core_1 = require("@angular/core");
var utils_1 = require("../utils/utils");
//TODO: Change on Injection token when angular removes opaque token
exports.USE_ROLES_STORE = new core_1.OpaqueToken('USE_ROLES_STORE');
var NgxRolesService = /** @class */ (function () {
    function NgxRolesService(isolate, rolesStore) {
        if (isolate === void 0) { isolate = false; }
        this.isolate = isolate;
        this.rolesStore = rolesStore;
        this.rolesSource = this.isolate ? new BehaviorSubject_1.BehaviorSubject({}) : this.rolesStore.rolesSource;
        this.roles$ = this.rolesSource.asObservable();
    }
    NgxRolesService.prototype.addRole = function (name, validationFunction) {
        var roles = __assign({}, this.rolesSource.value, (_a = {}, _a[name] = { name: name, validationFunction: validationFunction }, _a));
        this.rolesSource.next(roles);
        var _a;
    };
    NgxRolesService.prototype.addRoles = function (rolesObj) {
        var _this = this;
        Object.keys(rolesObj).forEach(function (key, index) {
            _this.addRole(key, rolesObj[key]);
        });
    };
    NgxRolesService.prototype.flushRoles = function () {
        this.rolesSource.next({});
    };
    NgxRolesService.prototype.removeRole = function (roleName) {
        var roles = __assign({}, this.rolesSource.value);
        delete roles[roleName];
        this.rolesSource.next(roles);
    };
    NgxRolesService.prototype.getRoles = function () {
        return this.rolesSource.value;
    };
    NgxRolesService.prototype.getRole = function (name) {
        return this.rolesSource.value[name];
    };
    NgxRolesService.prototype.hasOnlyRoles = function (names) {
        if (!names)
            Promise.resolve(true);
        return Promise.all([this.hasRoleKey(names), this.hasRolePermission(this.rolesSource.value, names)])
            .then(function (_a) {
            var hasRoles = _a[0], hasPermissions = _a[1];
            return hasRoles || hasPermissions;
        });
    };
    NgxRolesService.prototype.hasRoleKey = function (roleName) {
        var _this = this;
        if (Array.isArray(roleName)) {
            var promises_1 = [];
            roleName.forEach(function (key) {
                if (!!_this.rolesSource.value[key] && !!_this.rolesSource.value[key].validationFunction && utils_1.isFunction(_this.rolesSource.value[key].validationFunction) && !utils_1.isPromise(_this.rolesSource.value[key].validationFunction)) {
                    return promises_1.push(Observable_1.Observable.from(Promise.resolve(_this.rolesSource.value[key].validationFunction()))["catch"](function () {
                        return Observable_1.Observable.of(false);
                    }));
                }
                promises_1.push(Observable_1.Observable.of(!!_this.rolesSource.value[key]));
            });
            return Observable_1.Observable.merge(promises_1).mergeAll().first(function (data) {
                return data !== false;
            }, function () { return true; }, false).toPromise().then(function (data) {
                return data;
            });
            // return Promise.resolve(Object.keys(this.rolesSource.value).some((key) => {
            //     return roleName.includes(key)
            // }));
        }
        else {
            if (!!this.rolesSource.value[roleName] && !!this.rolesSource.value[roleName].validationFunction && utils_1.isFunction(this.rolesSource.value[roleName].validationFunction)) {
                return Promise.resolve((this.rolesSource.value[roleName].validationFunction())).then(function (data) {
                    if (data !== false) {
                        return true;
                    }
                    else {
                        return data;
                    }
                });
            }
            return Promise.resolve(!!this.rolesSource.value[roleName]);
        }
    };
    NgxRolesService.prototype.hasRolePermission = function (roles, roleName) {
        return Promise.resolve(Object.keys(roles).some(function (key) {
            if (Array.isArray(roles[key].validationFunction)) {
                if (utils_1.isString(roleName)) {
                    return roles[key].validationFunction.includes(roleName);
                }
                if (Array.isArray(roleName)) {
                    return roles[key].validationFunction.some(function (v) {
                        return roleName.includes(v);
                    });
                }
            }
            //Should not validate if role declaration is function if will check in previous method
            if (utils_1.isFunction(roles[key].validationFunction)) {
                return false;
            }
            return true;
        }));
    };
    NgxRolesService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(exports.USE_ROLES_STORE))
    ], NgxRolesService);
    return NgxRolesService;
}());
exports.NgxRolesService = NgxRolesService;
