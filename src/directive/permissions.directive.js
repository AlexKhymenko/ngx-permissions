"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
require("rxjs/add/observable/merge");
require("rxjs/add/observable/combineLatest");
require("rxjs/add/operator/skip");
var Observable_1 = require("rxjs/Observable");
var NgxPermissionsDirective = /** @class */ (function () {
    function NgxPermissionsDirective(permissionsService, rolesService, viewContainer, templateRef) {
        this.permissionsService = permissionsService;
        this.rolesService = rolesService;
        this.viewContainer = viewContainer;
        this.templateRef = templateRef;
        this.permissionsAuthorized = new core_1.EventEmitter();
        this.permissionsUnauthorized = new core_1.EventEmitter();
        //skip first run cause merge will fire twice
        this.firstMergeUnusedRun = 1;
    }
    NgxPermissionsDirective.prototype.ngOnInit = function () {
        this.initPermissionSubscription = this.validateExceptOnlyPermissions();
    };
    NgxPermissionsDirective.prototype.ngOnDestroy = function () {
        if (!!this.initPermissionSubscription) {
            this.initPermissionSubscription.unsubscribe();
        }
    };
    NgxPermissionsDirective.prototype.validateExceptOnlyPermissions = function () {
        var _this = this;
        return Observable_1.Observable.merge(this.permissionsService.permissions$, this.rolesService.roles$)
            .skip(this.firstMergeUnusedRun)
            .subscribe(function () {
            if (!!_this.ngxPermissionsExcept) {
                _this.validateExceptAndOnlyPermissions();
                return;
            }
            if (!!_this.ngxPermissionsOnly) {
                _this.validateOnlyPermissions();
            }
            _this.handleAuthorisedPermission(_this.getAuthorisedTemplates());
        });
    };
    NgxPermissionsDirective.prototype.validateExceptAndOnlyPermissions = function () {
        var _this = this;
        Promise.all([this.permissionsService.hasPermission(this.ngxPermissionsExcept), this.rolesService.hasOnlyRoles(this.ngxPermissionsExcept)])
            .then(function (_a) {
            var hasPermission = _a[0], hasRole = _a[1];
            if (hasPermission || hasRole) {
                _this.handleUnauthorisedPermission(_this.ngxPermissionsExceptElse || _this.ngxPermissionsElse);
            }
            else {
                if (!!_this.ngxPermissionsOnly) {
                    throw false;
                }
                else {
                    _this.handleAuthorisedPermission(_this.ngxPermissionsExceptThen || _this.ngxPermissionsThen || _this.templateRef);
                }
            }
        })["catch"](function () {
            if (!!_this.ngxPermissionsOnly) {
                _this.validateOnlyPermissions();
            }
            else {
                _this.handleAuthorisedPermission(_this.ngxPermissionsExceptThen || _this.ngxPermissionsThen || _this.templateRef);
            }
        });
    };
    NgxPermissionsDirective.prototype.validateOnlyPermissions = function () {
        var _this = this;
        Promise.all([this.permissionsService.hasPermission(this.ngxPermissionsOnly), this.rolesService.hasOnlyRoles(this.ngxPermissionsOnly)])
            .then(function (_a) {
            var permissionPr = _a[0], roles = _a[1];
            if (permissionPr || roles) {
                _this.handleAuthorisedPermission(_this.ngxPermissionsOnlyThen || _this.ngxPermissionsThen || _this.templateRef);
            }
            else {
                _this.handleUnauthorisedPermission(_this.ngxPermissionsOnlyElse || _this.ngxPermissionsElse);
            }
        })["catch"](function () {
            _this.handleUnauthorisedPermission(_this.ngxPermissionsOnlyElse || _this.ngxPermissionsElse);
        });
    };
    NgxPermissionsDirective.prototype.handleUnauthorisedPermission = function (template) {
        this.permissionsUnauthorized.emit();
        this.viewContainer.clear();
        this.showTemplateBlockInView(template);
    };
    NgxPermissionsDirective.prototype.handleAuthorisedPermission = function (template) {
        this.permissionsAuthorized.emit();
        this.viewContainer.clear();
        this.showTemplateBlockInView(template);
    };
    NgxPermissionsDirective.prototype.showTemplateBlockInView = function (template) {
        if (!template)
            return;
        this.viewContainer.createEmbeddedView(template);
    };
    NgxPermissionsDirective.prototype.getAuthorisedTemplates = function () {
        return this.ngxPermissionsOnlyThen
            || this.ngxPermissionsExceptThen
            || this.ngxPermissionsThen
            || this.templateRef;
    };
    __decorate([
        core_1.Input()
    ], NgxPermissionsDirective.prototype, "ngxPermissionsOnly");
    __decorate([
        core_1.Input()
    ], NgxPermissionsDirective.prototype, "ngxPermissionsOnlyThen");
    __decorate([
        core_1.Input()
    ], NgxPermissionsDirective.prototype, "ngxPermissionsOnlyElse");
    __decorate([
        core_1.Input()
    ], NgxPermissionsDirective.prototype, "ngxPermissionsExcept");
    __decorate([
        core_1.Input()
    ], NgxPermissionsDirective.prototype, "ngxPermissionsExceptElse");
    __decorate([
        core_1.Input()
    ], NgxPermissionsDirective.prototype, "ngxPermissionsExceptThen");
    __decorate([
        core_1.Input()
    ], NgxPermissionsDirective.prototype, "ngxPermissionsThen");
    __decorate([
        core_1.Input()
    ], NgxPermissionsDirective.prototype, "ngxPermissionsElse");
    __decorate([
        core_1.Output()
    ], NgxPermissionsDirective.prototype, "permissionsAuthorized");
    __decorate([
        core_1.Output()
    ], NgxPermissionsDirective.prototype, "permissionsUnauthorized");
    NgxPermissionsDirective = __decorate([
        core_1.Directive({
            selector: '[ngxPermissionsOnly],[ngxPermissionsExcept]'
        })
    ], NgxPermissionsDirective);
    return NgxPermissionsDirective;
}());
exports.NgxPermissionsDirective = NgxPermissionsDirective;
var EvryIfPermissionContext = /** @class */ (function () {
    function EvryIfPermissionContext() {
        this.$implicit = null;
        this.permissions = null;
    }
    return EvryIfPermissionContext;
}());
exports.EvryIfPermissionContext = EvryIfPermissionContext;
