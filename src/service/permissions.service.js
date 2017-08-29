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
var core_1 = require("@angular/core");
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
var utils_1 = require("../utils/utils");
exports.USE_PERMISSIONS_STORE = new core_1.OpaqueToken('USE_PERMISSIONS_STORE');
var NgxPermissionsService = /** @class */ (function () {
    function NgxPermissionsService(isolate, permissionsStore) {
        if (isolate === void 0) { isolate = false; }
        this.isolate = isolate;
        this.permissionsStore = permissionsStore;
        this.permissionsSource = this.isolate ? new BehaviorSubject_1.BehaviorSubject({}) : this.permissionsStore.permissionsSource;
        this.permissions$ = this.permissionsSource.asObservable();
    }
    NgxPermissionsService.prototype.flushPermissions = function () {
        this.permissionsSource.next({});
    };
    NgxPermissionsService.prototype.hasPermission = function (permission) {
        if (!permission)
            Promise.resolve(true);
        if (Array.isArray(permission)) {
            return this.hasArrayPermission(permission);
        }
        else {
            if (utils_1.isString(permission)) {
                permission = [permission];
            }
            return this.hasArrayPermission(permission);
        }
    };
    NgxPermissionsService.prototype.loadPermissions = function (permissions, validationFunction) {
        var _this = this;
        permissions.forEach(function (p) {
            _this.addPermissionToBehaviorSubject(p, validationFunction);
        });
    };
    NgxPermissionsService.prototype.addPermission = function (permission, validationFunction) {
        var _this = this;
        if (Array.isArray(permission)) {
            permission.forEach(function (p) {
                _this.addPermissionToBehaviorSubject(p, validationFunction);
            });
        }
        else {
            this.addPermissionToBehaviorSubject(permission, validationFunction);
        }
    };
    NgxPermissionsService.prototype.removePermission = function (permissionName) {
        var permissions = __assign({}, this.permissionsSource.value);
        delete permissions[permissionName];
        this.permissionsSource.next(permissions);
    };
    NgxPermissionsService.prototype.getPermission = function (name) {
        return this.permissionsSource.value[name];
    };
    NgxPermissionsService.prototype.getPermissions = function () {
        return this.permissionsSource.value;
    };
    NgxPermissionsService.prototype.addPermissionToBehaviorSubject = function (name, validationFunction) {
        if (!!validationFunction && utils_1.isFunction(validationFunction)) {
            var roles = __assign({}, this.permissionsSource.value, (_a = {}, _a[name] = { name: name, validationFunction: validationFunction }, _a));
            this.permissionsSource.next(roles);
        }
        else {
            var roles = __assign({}, this.permissionsSource.value, (_b = {}, _b[name] = { name: name }, _b));
            this.permissionsSource.next(roles);
        }
        var _a, _b;
    };
    NgxPermissionsService.prototype.hasArrayPermission = function (permissions) {
        var _this = this;
        var promises = [];
        permissions.forEach(function (key) {
            if (_this.hasPermissionValidationFunction(key)) {
                var immutableValue = __assign({}, _this.permissionsSource.value);
                return promises.push(Observable_1.Observable.from(Promise.resolve(_this.permissionsSource.value[key].validationFunction(key, immutableValue)))["catch"](function () {
                    return Observable_1.Observable.of(false);
                }));
            }
            else {
                //check for name of the permission if there is no validation function
                promises.push(Observable_1.Observable.of(!!_this.permissionsSource.value[key]));
            }
        });
        return Observable_1.Observable.merge(promises)
            .mergeAll()
            .first(function (data) {
            return data !== false;
        }, function () { return true; }, false)
            .toPromise()
            .then(function (data) {
            return data;
        });
    };
    NgxPermissionsService.prototype.hasPermissionValidationFunction = function (key) {
        return !!this.permissionsSource.value[key] && !!this.permissionsSource.value[key].validationFunction && utils_1.isFunction(this.permissionsSource.value[key].validationFunction);
    };
    NgxPermissionsService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(exports.USE_PERMISSIONS_STORE))
    ], NgxPermissionsService);
    return NgxPermissionsService;
}());
exports.NgxPermissionsService = NgxPermissionsService;
