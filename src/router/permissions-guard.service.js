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
exports.__esModule = true;
var core_1 = require("@angular/core");
var utils_1 = require("../utils/utils");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/forkJoin");
require("rxjs/add/observable/from");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var NgxPermissionsGuard = /** @class */ (function () {
    function NgxPermissionsGuard(permissionsService, rolesService, router) {
        this.permissionsService = permissionsService;
        this.rolesService = rolesService;
        this.router = router;
    }
    NgxPermissionsGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        var purePermissions = route.data['permissions'];
        var permissions = __assign({}, purePermissions);
        if (utils_1.isFunction(permissions.except)) {
            permissions.except = purePermissions.except(route, state);
        }
        if (utils_1.isFunction(permissions.only)) {
            permissions.only = purePermissions.only(route, state);
        }
        if (utils_1.isString(permissions.except)) {
            permissions.except = [permissions.except];
        }
        if (utils_1.isString(permissions.only)) {
            permissions.only = [permissions.only];
        }
        if (!!permissions.except) {
            if (!!permissions.redirectTo && ((utils_1.isFunction(permissions.redirectTo)) || (utils_1.isPlainObject(permissions.redirectTo) && !this.isRedirectionWithParameters(permissions.redirectTo)))) {
                if (Array.isArray(permissions.except)) {
                    var failedPermission_1 = '';
                    return Observable_1.Observable.from(permissions.except)
                        .mergeMap(function (data) {
                        return Observable_1.Observable.forkJoin([_this.permissionsService.hasPermission(data), _this.rolesService.hasOnlyRoles(data)])["do"](function (hasPerm) {
                            var dontHavePermissions = hasPerm.every(function (data) {
                                return data === false;
                            });
                            if (!dontHavePermissions) {
                                failedPermission_1 = data;
                            }
                        });
                    }).first(function (data) {
                        return data.some(function (data) {
                            return data === true;
                        });
                    }, function () { return true; }, false).mergeMap(function (isAllFalse) {
                        if (!!failedPermission_1) {
                            _this.handleRedirectOfFailedPermission(permissions, failedPermission_1, route, state);
                            return Observable_1.Observable.of(false);
                        }
                        if (!isAllFalse && permissions.only) {
                            return _this.onlyRedirectCheck(permissions, route, state);
                        }
                        return Observable_1.Observable.of(!isAllFalse);
                    }).toPromise();
                }
            }
            return Promise.all([this.permissionsService.hasPermission(permissions.except), this.rolesService.hasOnlyRoles(permissions.except)])
                .then(function (_a) {
                var permissionsPr = _a[0], roles = _a[1];
                if (permissionsPr || roles) {
                    if (permissions.redirectTo) {
                        _this.redirectToAnotherRoute(permissions.redirectTo, route, state);
                        return false;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    if (permissions.only) {
                        return _this.checkOnlyPermissions(permissions, route, state);
                    }
                    return true;
                }
            });
        }
        if (permissions.only) {
            if (!!permissions.only && (utils_1.isFunction(permissions.redirectTo) || utils_1.isPlainObject(permissions.redirectTo) && !this.isRedirectionWithParameters(permissions.redirectTo))) {
                return this.onlyRedirectCheck(permissions, route, state);
            }
            return this.checkOnlyPermissions(permissions, route, state);
        }
        return true;
    };
    NgxPermissionsGuard.prototype.checkOnlyPermissions = function (purePermissions, route, state) {
        var _this = this;
        var permissions = __assign({}, purePermissions);
        return Promise.all([this.permissionsService.hasPermission(permissions.only), this.rolesService.hasOnlyRoles(permissions.only)])
            .then(function (_a) {
            var permissionsPr = _a[0], roles = _a[1];
            if (permissionsPr || roles) {
                return true;
            }
            else {
                if (permissions.redirectTo) {
                    _this.redirectToAnotherRoute(permissions.redirectTo, route, state);
                    return false;
                }
                else {
                    return false;
                }
            }
        });
    };
    NgxPermissionsGuard.prototype.redirectToAnotherRoute = function (redirectTo, route, state, failedPermissionName) {
        if (utils_1.isFunction(redirectTo)) {
            redirectTo = redirectTo(failedPermissionName, route, state);
        }
        if (this.isRedirectionWithParameters(redirectTo)) {
            if (this.hasNavigationExtrasAsFunction(redirectTo)) {
                redirectTo.navigationExtras = redirectTo.navigationExtras(route, state);
            }
            if (this.hasNavigationCommandsAsFunction(redirectTo)) {
                redirectTo.navigationCommands = redirectTo.navigationCommands(route, state);
            }
            this.router.navigate(redirectTo.navigationCommands, redirectTo.navigationExtras);
            return;
        }
        if (Array.isArray(redirectTo)) {
            this.router.navigate(redirectTo);
        }
        else {
            this.router.navigate([redirectTo]);
        }
    };
    NgxPermissionsGuard.prototype.isRedirectionWithParameters = function (object) {
        return utils_1.isPlainObject(object) && (!!object.navigationCommands || !!object.navigationExtras);
    };
    NgxPermissionsGuard.prototype.hasNavigationExtrasAsFunction = function (redirectTo) {
        return !!redirectTo.navigationExtras && utils_1.isFunction(redirectTo.navigationExtras);
    };
    NgxPermissionsGuard.prototype.hasNavigationCommandsAsFunction = function (redirectTo) {
        return !!redirectTo.navigationCommands && utils_1.isFunction(redirectTo.navigationCommands);
    };
    NgxPermissionsGuard.prototype.onlyRedirectCheck = function (permissions, route, state) {
        var _this = this;
        var failedPermission = '';
        return Observable_1.Observable.from(permissions.only)
            .mergeMap(function (data) {
            return Observable_1.Observable.forkJoin([_this.permissionsService.hasPermission(data), _this.rolesService.hasOnlyRoles(data)])["do"](function (hasPerm) {
                var failed = hasPerm.every(function (data) {
                    return data === false;
                });
                if (failed) {
                    failedPermission = data;
                }
            });
        })
            .first(function (data) {
            return data.every(function (data) {
                return data === false;
            });
        }, function () { return true; }, false)
            .mergeMap(function (isAllFalse) {
            if (!!failedPermission) {
                _this.handleRedirectOfFailedPermission(permissions, failedPermission, route, state);
            }
            return Observable_1.Observable.of(!isAllFalse);
        }).toPromise();
    };
    NgxPermissionsGuard.prototype.handleRedirectOfFailedPermission = function (permissions, failedPermission, route, state) {
        if (this.isFailedPermissionPropertyOfRedirectTo(permissions, failedPermission)) {
            this.redirectToAnotherRoute(permissions.redirectTo[failedPermission], route, state, failedPermission);
        }
        else {
            if (utils_1.isFunction(permissions.redirectTo)) {
                this.redirectToAnotherRoute(permissions.redirectTo, route, state, failedPermission);
            }
            else {
                this.redirectToAnotherRoute(permissions.redirectTo['default'], route, state, failedPermission);
            }
        }
    };
    NgxPermissionsGuard.prototype.isFailedPermissionPropertyOfRedirectTo = function (permissions, failedPermission) {
        return !!permissions.redirectTo && permissions.redirectTo[failedPermission];
    };
    NgxPermissionsGuard = __decorate([
        core_1.Injectable()
    ], NgxPermissionsGuard);
    return NgxPermissionsGuard;
}());
exports.NgxPermissionsGuard = NgxPermissionsGuard;
