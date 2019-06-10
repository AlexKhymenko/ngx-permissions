/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Directive, EventEmitter, Input, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { merge, from } from 'rxjs';
import { skip, take, mergeAll, first, map } from 'rxjs/operators';
import { NgxPermissionsPredefinedStrategies } from '../enums/predefined-strategies.enum';
import { NgxPermissionsConfigurationService } from '../service/configuration.service';
import { NgxPermissionsService } from '../service/permissions.service';
import { NgxRolesService } from '../service/roles.service';
import { isBoolean, isFunction, isString, notEmptyValue, transformStringToArray } from '../utils/utils';
import { isArray } from 'util';
import * as ɵngcc0 from '@angular/core';
var NgxPermissionsDirective = /** @class */ (function () {
    function NgxPermissionsDirective(permissionsService, configurationService, rolesService, viewContainer, changeDetector, templateRef) {
        this.permissionsService = permissionsService;
        this.configurationService = configurationService;
        this.rolesService = rolesService;
        this.viewContainer = viewContainer;
        this.changeDetector = changeDetector;
        this.templateRef = templateRef;
        this.permissionsAuthorized = new EventEmitter();
        this.permissionsUnauthorized = new EventEmitter();
        // skip first run cause merge will fire twice
        this.firstMergeUnusedRun = 1;
        this.permissionsState = {};
    }
    /**
     * @return {?}
     */
    NgxPermissionsDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.viewContainer.clear();
        this.initPermissionSubscription = this.validateExceptOnlyPermissions();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxPermissionsDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        /** @type {?} */
        var onlyChanges = changes['ngxPermissionsOnly'];
        /** @type {?} */
        var exceptChanges = changes['ngxPermissionsExcept'];
        if (onlyChanges || exceptChanges) {
            // Due to bug when you pass empty array
            if (onlyChanges && onlyChanges.firstChange)
                return;
            if (exceptChanges && exceptChanges.firstChange)
                return;
            merge(this.permissionsService.permissions$, this.rolesService.roles$)
                .pipe(skip(this.firstMergeUnusedRun), take(1))
                .subscribe((/**
             * @return {?}
             */
            function () {
                if (notEmptyValue(_this.ngxPermissionsExcept)) {
                    _this.validateExceptAndOnlyPermissions();
                    return;
                }
                if (notEmptyValue(_this.ngxPermissionsOnly)) {
                    _this.validateOnlyPermissions();
                    return;
                }
                _this.handleAuthorisedPermission(_this.getAuthorisedTemplates());
            }));
        }
    };
    /**
     * @return {?}
     */
    NgxPermissionsDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.initPermissionSubscription) {
            this.initPermissionSubscription.unsubscribe();
        }
    };
    /**
     * @private
     * @return {?}
     */
    NgxPermissionsDirective.prototype.validateExceptOnlyPermissions = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return merge(this.permissionsService.permissions$, this.rolesService.roles$)
            .pipe(skip(this.firstMergeUnusedRun))
            .subscribe((/**
         * @return {?}
         */
        function () {
            if (notEmptyValue(_this.ngxPermissionsExcept)) {
                _this.validateExceptAndOnlyPermissions();
                return;
            }
            if (notEmptyValue(_this.ngxPermissionsOnly)) {
                _this.validateOnlyPermissions();
                return;
            }
            _this.handleAuthorisedPermission(_this.getAuthorisedTemplates());
        }));
    };
    /**
     * @private
     * @return {?}
     */
    NgxPermissionsDirective.prototype.validateExceptAndOnlyPermissions = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.getPermissions(this.ngxPermissionsExcept)
            .then((/**
         * @param {?} hasPermission
         * @return {?}
         */
        function (hasPermission) {
            if (hasPermission) {
                _this.handleUnauthorisedPermission(_this.ngxPermissionsExceptElse || _this.ngxPermissionsElse);
                return;
            }
            if (!!_this.ngxPermissionsOnly)
                throw false;
            _this.handleAuthorisedPermission(_this.ngxPermissionsExceptThen || _this.ngxPermissionsThen || _this.templateRef);
        }))
            .catch((/**
         * @return {?}
         */
        function () {
            if (!!_this.ngxPermissionsOnly) {
                _this.validateOnlyPermissions();
            }
            else {
                _this.handleAuthorisedPermission(_this.ngxPermissionsExceptThen || _this.ngxPermissionsThen || _this.templateRef);
            }
        }));
    };
    /**
     * @private
     * @return {?}
     */
    NgxPermissionsDirective.prototype.validateOnlyPermissions = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        // Validate permissions & store permission state
        this.getPermissions(this.ngxPermissionsOnly)
            .then((/**
         * @param {?} hasPermission
         * @return {?}
         */
        function (hasPermission) {
            if (hasPermission) {
                _this.handleAuthorisedPermission(_this.ngxPermissionsOnlyThen || _this.ngxPermissionsThen || _this.templateRef);
            }
            else {
                _this.handleUnauthorisedPermission(_this.ngxPermissionsOnlyElse || _this.ngxPermissionsElse);
            }
        }))
            .catch((/**
         * @return {?}
         */
        function () {
            _this.handleUnauthorisedPermission(_this.ngxPermissionsOnlyElse || _this.ngxPermissionsElse);
        }));
    };
    /**
     * @private
     * @param {?} template
     * @return {?}
     */
    NgxPermissionsDirective.prototype.handleUnauthorisedPermission = /**
     * @private
     * @param {?} template
     * @return {?}
     */
    function (template) {
        if (isBoolean(this.currentAuthorizedState) && !this.currentAuthorizedState)
            return;
        this.currentAuthorizedState = false;
        this.permissionsUnauthorized.emit(this.permissionsState);
        if (this.getUnAuthorizedStrategyInput()) {
            this.applyStrategyAccordingToStrategyType(this.getUnAuthorizedStrategyInput());
            return;
        }
        if (this.configurationService.onUnAuthorisedDefaultStrategy && !this.elseBlockDefined()) {
            this.applyStrategy(this.configurationService.onUnAuthorisedDefaultStrategy);
        }
        else {
            this.showTemplateBlockInView(template);
        }
    };
    /**
     * @private
     * @param {?} template
     * @return {?}
     */
    NgxPermissionsDirective.prototype.handleAuthorisedPermission = /**
     * @private
     * @param {?} template
     * @return {?}
     */
    function (template) {
        if (isBoolean(this.currentAuthorizedState) && this.currentAuthorizedState)
            return;
        this.currentAuthorizedState = true;
        this.permissionsAuthorized.emit(this.permissionsState);
        if (this.getAuthorizedStrategyInput()) {
            this.applyStrategyAccordingToStrategyType(this.getAuthorizedStrategyInput());
            return;
        }
        if (this.configurationService.onAuthorisedDefaultStrategy && !this.thenBlockDefined()) {
            this.applyStrategy(this.configurationService.onAuthorisedDefaultStrategy);
        }
        else {
            this.showTemplateBlockInView(template);
        }
    };
    /**
     * @private
     * @param {?} strategy
     * @return {?}
     */
    NgxPermissionsDirective.prototype.applyStrategyAccordingToStrategyType = /**
     * @private
     * @param {?} strategy
     * @return {?}
     */
    function (strategy) {
        if (isString(strategy)) {
            this.applyStrategy(strategy);
            return;
        }
        if (isFunction(strategy)) {
            this.showTemplateBlockInView(this.templateRef);
            ((/** @type {?} */ (strategy)))(this.templateRef, this.permissionsState);
            return;
        }
    };
    /**
     * @private
     * @param {?} template
     * @return {?}
     */
    NgxPermissionsDirective.prototype.showTemplateBlockInView = /**
     * @private
     * @param {?} template
     * @return {?}
     */
    function (template) {
        this.viewContainer.clear();
        if (!template) {
            return;
        }
        this.viewContainer.createEmbeddedView(template);
        this.changeDetector.markForCheck();
    };
    /**
     * @private
     * @return {?}
     */
    NgxPermissionsDirective.prototype.getAuthorisedTemplates = /**
     * @private
     * @return {?}
     */
    function () {
        return this.ngxPermissionsOnlyThen
            || this.ngxPermissionsExceptThen
            || this.ngxPermissionsThen
            || this.templateRef;
    };
    /**
     * @private
     * @return {?}
     */
    NgxPermissionsDirective.prototype.elseBlockDefined = /**
     * @private
     * @return {?}
     */
    function () {
        return !!this.ngxPermissionsExceptElse || !!this.ngxPermissionsElse;
    };
    /**
     * @private
     * @return {?}
     */
    NgxPermissionsDirective.prototype.thenBlockDefined = /**
     * @private
     * @return {?}
     */
    function () {
        return !!this.ngxPermissionsExceptThen || !!this.ngxPermissionsThen;
    };
    /**
     * @private
     * @return {?}
     */
    NgxPermissionsDirective.prototype.getAuthorizedStrategyInput = /**
     * @private
     * @return {?}
     */
    function () {
        return this.ngxPermissionsOnlyAuthorisedStrategy ||
            this.ngxPermissionsExceptAuthorisedStrategy ||
            this.ngxPermissionsAuthorisedStrategy;
    };
    /**
     * @private
     * @return {?}
     */
    NgxPermissionsDirective.prototype.getUnAuthorizedStrategyInput = /**
     * @private
     * @return {?}
     */
    function () {
        return this.ngxPermissionsOnlyUnauthorisedStrategy ||
            this.ngxPermissionsExceptUnauthorisedStrategy ||
            this.ngxPermissionsUnauthorisedStrategy;
    };
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    NgxPermissionsDirective.prototype.applyStrategy = /**
     * @private
     * @param {?} str
     * @return {?}
     */
    function (str) {
        if (str === NgxPermissionsPredefinedStrategies.SHOW) {
            this.showTemplateBlockInView(this.templateRef);
            return;
        }
        if (str === NgxPermissionsPredefinedStrategies.REMOVE) {
            this.viewContainer.clear();
            return;
        }
        /** @type {?} */
        var strategy = this.configurationService.getStrategy(str);
        this.showTemplateBlockInView(this.templateRef);
        strategy(this.templateRef, this.permissionsState);
    };
    /**
     * Check permission service against parameter "neddedPermissions"
     * then update this class property "permissionsState"
     *
     * @param neddedPermissions Sets the permissions/roles to check (i.e ngxPermissionsOnly)
     */
    /**
     * Check permission service against parameter "neddedPermissions"
     * then update this class property "permissionsState"
     *
     * @private
     * @param {?} neddedPermissions Sets the permissions/roles to check (i.e ngxPermissionsOnly)
     * @return {?}
     */
    NgxPermissionsDirective.prototype.getPermissions = /**
     * Check permission service against parameter "neddedPermissions"
     * then update this class property "permissionsState"
     *
     * @private
     * @param {?} neddedPermissions Sets the permissions/roles to check (i.e ngxPermissionsOnly)
     * @return {?}
     */
    function (neddedPermissions) {
        var _this = this;
        // Ensure we work with array
        /** @type {?} */
        var requestedPermissions = transformStringToArray(neddedPermissions)
        // Array of promises that request permission and roles service with "permission"
        ;
        // Array of promises that request permission and roles service with "permission"
        /** @type {?} */
        var promises = []
        // Reset "permissions state" directive class property
        ;
        // Reset "permissions state" directive class property
        this.permissionsState = {};
        if (isArray(requestedPermissions)) {
            requestedPermissions.forEach((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                _this.permissionsState[value] = { hasPermission: false, hasRole: false };
                // Check if has "Permission"
                promises.push(_this.permissionsService.hasPermission(value)
                    .then((/**
                 * @param {?} hasPermission
                 * @return {?}
                 */
                function (hasPermission) {
                    _this.permissionsState[value].hasPermission = hasPermission;
                    return hasPermission;
                }))
                    .catch((/**
                 * @return {?}
                 */
                function () { return false; })));
                // Check if has "Role"
                promises.push(_this.rolesService.hasOnlyRoles(value)
                    .then((/**
                 * @param {?} hasPermission
                 * @return {?}
                 */
                function (hasPermission) {
                    _this.permissionsState[value].hasRole = hasPermission;
                    return hasPermission;
                }))
                    .catch((/**
                 * @return {?}
                 */
                function () { return false; })));
            }));
        }
        /**
         * Return result :
         * true : At least one of neededPermission exists in permission or role service (@see this.permissionsState to get a full detail on wich permission is true/false)
         * false : none of neededPermission exists in  permission or role service
        */
        return from(promises).pipe(mergeAll(), first((/**
         * @param {?} hasPermission
         * @return {?}
         */
        function (hasPermission) {
            return hasPermission === true;
        }), false), map((/**
         * @param {?} hasPermission
         * @return {?}
         */
        function (hasPermission) {
            return hasPermission;
        }))).toPromise().then((/**
         * @param {?} hasPermission
         * @return {?}
         */
        function (hasPermission) {
            return hasPermission;
        }));
    };
    /** @nocollapse */
    NgxPermissionsDirective.ctorParameters = function () { return [
        { type: NgxPermissionsService },
        { type: NgxPermissionsConfigurationService },
        { type: NgxRolesService },
        { type: ViewContainerRef },
        { type: ChangeDetectorRef },
        { type: TemplateRef }
    ]; };
    NgxPermissionsDirective.propDecorators = {
        ngxPermissionsOnly: [{ type: Input }],
        ngxPermissionsOnlyThen: [{ type: Input }],
        ngxPermissionsOnlyElse: [{ type: Input }],
        ngxPermissionsExcept: [{ type: Input }],
        ngxPermissionsExceptElse: [{ type: Input }],
        ngxPermissionsExceptThen: [{ type: Input }],
        ngxPermissionsThen: [{ type: Input }],
        ngxPermissionsElse: [{ type: Input }],
        ngxPermissionsOnlyAuthorisedStrategy: [{ type: Input }],
        ngxPermissionsOnlyUnauthorisedStrategy: [{ type: Input }],
        ngxPermissionsExceptUnauthorisedStrategy: [{ type: Input }],
        ngxPermissionsExceptAuthorisedStrategy: [{ type: Input }],
        ngxPermissionsUnauthorisedStrategy: [{ type: Input }],
        ngxPermissionsAuthorisedStrategy: [{ type: Input }],
        permissionsAuthorized: [{ type: Output }],
        permissionsUnauthorized: [{ type: Output }]
    };
NgxPermissionsDirective.ngDirectiveDef = ɵngcc0.ɵɵdefineDirective({ type: NgxPermissionsDirective, selectors: [["", "ngxPermissionsOnly", ""], ["", "ngxPermissionsExcept", ""]], factory: function NgxPermissionsDirective_Factory(t) { return new (t || NgxPermissionsDirective)(ɵngcc0.ɵɵdirectiveInject(NgxPermissionsService), ɵngcc0.ɵɵdirectiveInject(NgxPermissionsConfigurationService), ɵngcc0.ɵɵdirectiveInject(NgxRolesService), ɵngcc0.ɵɵdirectiveInject(ViewContainerRef), ɵngcc0.ɵɵdirectiveInject(ChangeDetectorRef), ɵngcc0.ɵɵdirectiveInject(TemplateRef)); }, inputs: { ngxPermissionsOnly: "ngxPermissionsOnly", ngxPermissionsOnlyThen: "ngxPermissionsOnlyThen", ngxPermissionsOnlyElse: "ngxPermissionsOnlyElse", ngxPermissionsExcept: "ngxPermissionsExcept", ngxPermissionsExceptElse: "ngxPermissionsExceptElse", ngxPermissionsExceptThen: "ngxPermissionsExceptThen", ngxPermissionsThen: "ngxPermissionsThen", ngxPermissionsElse: "ngxPermissionsElse", ngxPermissionsOnlyAuthorisedStrategy: "ngxPermissionsOnlyAuthorisedStrategy", ngxPermissionsOnlyUnauthorisedStrategy: "ngxPermissionsOnlyUnauthorisedStrategy", ngxPermissionsExceptUnauthorisedStrategy: "ngxPermissionsExceptUnauthorisedStrategy", ngxPermissionsExceptAuthorisedStrategy: "ngxPermissionsExceptAuthorisedStrategy", ngxPermissionsUnauthorisedStrategy: "ngxPermissionsUnauthorisedStrategy", ngxPermissionsAuthorisedStrategy: "ngxPermissionsAuthorisedStrategy" }, outputs: { permissionsAuthorized: "permissionsAuthorized", permissionsUnauthorized: "permissionsUnauthorized" }, features: [ɵngcc0.ɵɵNgOnChangesFeature()] });
/*@__PURE__*/ ɵngcc0.ɵsetClassMetadata(NgxPermissionsDirective, [{
        type: Directive,
        args: [{
                selector: '[ngxPermissionsOnly],[ngxPermissionsExcept]'
            }]
    }], function () { return [{ type: NgxPermissionsService }, { type: NgxPermissionsConfigurationService }, { type: NgxRolesService }, { type: ViewContainerRef }, { type: ChangeDetectorRef }, { type: TemplateRef }]; }, { permissionsService: [], configurationService: [], rolesService: [], viewContainer: [], changeDetector: [], templateRef: [], permissionsAuthorized: [{
            type: Output
        }], permissionsUnauthorized: [{
            type: Output
        }], firstMergeUnusedRun: [], permissionsState: [], ngOnInit: [], initPermissionSubscription: [], ngOnChanges: [], ngOnDestroy: [], validateExceptOnlyPermissions: [], validateExceptAndOnlyPermissions: [], validateOnlyPermissions: [], handleUnauthorisedPermission: [], currentAuthorizedState: [], handleAuthorisedPermission: [], applyStrategyAccordingToStrategyType: [], showTemplateBlockInView: [], getAuthorisedTemplates: [], elseBlockDefined: [], thenBlockDefined: [], getAuthorizedStrategyInput: [], getUnAuthorizedStrategyInput: [], applyStrategy: [], getPermissions: [], ngxPermissionsOnly: [{
            type: Input
        }], ngxPermissionsOnlyThen: [{
            type: Input
        }], ngxPermissionsOnlyElse: [{
            type: Input
        }], ngxPermissionsExcept: [{
            type: Input
        }], ngxPermissionsExceptElse: [{
            type: Input
        }], ngxPermissionsExceptThen: [{
            type: Input
        }], ngxPermissionsThen: [{
            type: Input
        }], ngxPermissionsElse: [{
            type: Input
        }], ngxPermissionsOnlyAuthorisedStrategy: [{
            type: Input
        }], ngxPermissionsOnlyUnauthorisedStrategy: [{
            type: Input
        }], ngxPermissionsExceptUnauthorisedStrategy: [{
            type: Input
        }], ngxPermissionsExceptAuthorisedStrategy: [{
            type: Input
        }], ngxPermissionsUnauthorisedStrategy: [{
            type: Input
        }], ngxPermissionsAuthorisedStrategy: [{
            type: Input
        }] });
    return NgxPermissionsDirective;
}());
export { NgxPermissionsDirective };
if (false) {
    /** @type {?} */
    NgxPermissionsDirective.prototype.ngxPermissionsOnly;
    /** @type {?} */
    NgxPermissionsDirective.prototype.ngxPermissionsOnlyThen;
    /** @type {?} */
    NgxPermissionsDirective.prototype.ngxPermissionsOnlyElse;
    /** @type {?} */
    NgxPermissionsDirective.prototype.ngxPermissionsExcept;
    /** @type {?} */
    NgxPermissionsDirective.prototype.ngxPermissionsExceptElse;
    /** @type {?} */
    NgxPermissionsDirective.prototype.ngxPermissionsExceptThen;
    /** @type {?} */
    NgxPermissionsDirective.prototype.ngxPermissionsThen;
    /** @type {?} */
    NgxPermissionsDirective.prototype.ngxPermissionsElse;
    /** @type {?} */
    NgxPermissionsDirective.prototype.ngxPermissionsOnlyAuthorisedStrategy;
    /** @type {?} */
    NgxPermissionsDirective.prototype.ngxPermissionsOnlyUnauthorisedStrategy;
    /** @type {?} */
    NgxPermissionsDirective.prototype.ngxPermissionsExceptUnauthorisedStrategy;
    /** @type {?} */
    NgxPermissionsDirective.prototype.ngxPermissionsExceptAuthorisedStrategy;
    /** @type {?} */
    NgxPermissionsDirective.prototype.ngxPermissionsUnauthorisedStrategy;
    /** @type {?} */
    NgxPermissionsDirective.prototype.ngxPermissionsAuthorisedStrategy;
    /** @type {?} */
    NgxPermissionsDirective.prototype.permissionsAuthorized;
    /** @type {?} */
    NgxPermissionsDirective.prototype.permissionsUnauthorized;
    /**
     * @type {?}
     * @private
     */
    NgxPermissionsDirective.prototype.initPermissionSubscription;
    /**
     * @type {?}
     * @private
     */
    NgxPermissionsDirective.prototype.firstMergeUnusedRun;
    /**
     * @type {?}
     * @private
     */
    NgxPermissionsDirective.prototype.currentAuthorizedState;
    /**
     * @type {?}
     * @private
     */
    NgxPermissionsDirective.prototype.permissionsState;
    /**
     * @type {?}
     * @private
     */
    NgxPermissionsDirective.prototype.permissionsService;
    /**
     * @type {?}
     * @private
     */
    NgxPermissionsDirective.prototype.configurationService;
    /**
     * @type {?}
     * @private
     */
    NgxPermissionsDirective.prototype.rolesService;
    /**
     * @type {?}
     * @private
     */
    NgxPermissionsDirective.prototype.viewContainer;
    /**
     * @type {?}
     * @private
     */
    NgxPermissionsDirective.prototype.changeDetector;
    /**
     * @type {?}
     * @private
     */
    NgxPermissionsDirective.prototype.templateRef;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL09sZWtzYW5kci5LaHltZW5rby9XZWJzdG9ybVByb2plY3RzL25neC1wZXJtaXNzaW9ucy9kaXN0L25neC1wZXJtaXNzaW9ucy9lc201L2xpYi9kaXJlY3RpdmUvcGVybWlzc2lvbnMuZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztBQWFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUF5Yk0sQUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2NBMkJBIiwiZmlsZSI6InBlcm1pc3Npb25zLmRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3IGFkZGVkIGJ5IHRzaWNrbGVcclxuICogQHN1cHByZXNzIHtjaGVja1R5cGVzLGV4dHJhUmVxdWlyZSxtaXNzaW5nT3ZlcnJpZGUsbWlzc2luZ1JldHVybix1bnVzZWRQcml2YXRlTWVtYmVycyx1c2VsZXNzQ29kZX0gY2hlY2tlZCBieSB0c2NcclxuICovXHJcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbWVyZ2UsIGZyb20gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgc2tpcCwgdGFrZSwgbWVyZ2VBbGwsIGZpcnN0LCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE5neFBlcm1pc3Npb25zUHJlZGVmaW5lZFN0cmF0ZWdpZXMgfSBmcm9tICcuLi9lbnVtcy9wcmVkZWZpbmVkLXN0cmF0ZWdpZXMuZW51bSc7XHJcbmltcG9ydCB7IE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2NvbmZpZ3VyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IE5neFBlcm1pc3Npb25zU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UvcGVybWlzc2lvbnMuc2VydmljZSc7XHJcbmltcG9ydCB7IE5neFJvbGVzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2Uvcm9sZXMuc2VydmljZSc7XHJcbmltcG9ydCB7IGlzQm9vbGVhbiwgaXNGdW5jdGlvbiwgaXNTdHJpbmcsIG5vdEVtcHR5VmFsdWUsIHRyYW5zZm9ybVN0cmluZ1RvQXJyYXkgfSBmcm9tICcuLi91dGlscy91dGlscyc7XHJcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICd1dGlsJztcclxudmFyIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUocGVybWlzc2lvbnNTZXJ2aWNlLCBjb25maWd1cmF0aW9uU2VydmljZSwgcm9sZXNTZXJ2aWNlLCB2aWV3Q29udGFpbmVyLCBjaGFuZ2VEZXRlY3RvciwgdGVtcGxhdGVSZWYpIHtcclxuICAgICAgICB0aGlzLnBlcm1pc3Npb25zU2VydmljZSA9IHBlcm1pc3Npb25zU2VydmljZTtcclxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb25TZXJ2aWNlID0gY29uZmlndXJhdGlvblNlcnZpY2U7XHJcbiAgICAgICAgdGhpcy5yb2xlc1NlcnZpY2UgPSByb2xlc1NlcnZpY2U7XHJcbiAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyID0gdmlld0NvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yID0gY2hhbmdlRGV0ZWN0b3I7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVJlZiA9IHRlbXBsYXRlUmVmO1xyXG4gICAgICAgIHRoaXMucGVybWlzc2lvbnNBdXRob3JpemVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgICAgIHRoaXMucGVybWlzc2lvbnNVbmF1dGhvcml6ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICAgICAgLy8gc2tpcCBmaXJzdCBydW4gY2F1c2UgbWVyZ2Ugd2lsbCBmaXJlIHR3aWNlXHJcbiAgICAgICAgdGhpcy5maXJzdE1lcmdlVW51c2VkUnVuID0gMTtcclxuICAgICAgICB0aGlzLnBlcm1pc3Npb25zU3RhdGUgPSB7fTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvdG90eXBlLm5nT25Jbml0ID0gLyoqXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5pbml0UGVybWlzc2lvblN1YnNjcmlwdGlvbiA9IHRoaXMudmFsaWRhdGVFeGNlcHRPbmx5UGVybWlzc2lvbnMoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7P30gY2hhbmdlc1xyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvdG90eXBlLm5nT25DaGFuZ2VzID0gLyoqXHJcbiAgICAgKiBAcGFyYW0gez99IGNoYW5nZXNcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIChjaGFuZ2VzKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICAgICAgdmFyIG9ubHlDaGFuZ2VzID0gY2hhbmdlc1snbmd4UGVybWlzc2lvbnNPbmx5J107XHJcbiAgICAgICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgICAgIHZhciBleGNlcHRDaGFuZ2VzID0gY2hhbmdlc1snbmd4UGVybWlzc2lvbnNFeGNlcHQnXTtcclxuICAgICAgICBpZiAob25seUNoYW5nZXMgfHwgZXhjZXB0Q2hhbmdlcykge1xyXG4gICAgICAgICAgICAvLyBEdWUgdG8gYnVnIHdoZW4geW91IHBhc3MgZW1wdHkgYXJyYXlcclxuICAgICAgICAgICAgaWYgKG9ubHlDaGFuZ2VzICYmIG9ubHlDaGFuZ2VzLmZpcnN0Q2hhbmdlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoZXhjZXB0Q2hhbmdlcyAmJiBleGNlcHRDaGFuZ2VzLmZpcnN0Q2hhbmdlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBtZXJnZSh0aGlzLnBlcm1pc3Npb25zU2VydmljZS5wZXJtaXNzaW9ucyQsIHRoaXMucm9sZXNTZXJ2aWNlLnJvbGVzJClcclxuICAgICAgICAgICAgICAgIC5waXBlKHNraXAodGhpcy5maXJzdE1lcmdlVW51c2VkUnVuKSwgdGFrZSgxKSlcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKC8qKlxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vdEVtcHR5VmFsdWUoX3RoaXMubmd4UGVybWlzc2lvbnNFeGNlcHQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudmFsaWRhdGVFeGNlcHRBbmRPbmx5UGVybWlzc2lvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobm90RW1wdHlWYWx1ZShfdGhpcy5uZ3hQZXJtaXNzaW9uc09ubHkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudmFsaWRhdGVPbmx5UGVybWlzc2lvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5oYW5kbGVBdXRob3Jpc2VkUGVybWlzc2lvbihfdGhpcy5nZXRBdXRob3Jpc2VkVGVtcGxhdGVzKCkpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvdG90eXBlLm5nT25EZXN0cm95ID0gLyoqXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5pdFBlcm1pc3Npb25TdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0UGVybWlzc2lvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUudmFsaWRhdGVFeGNlcHRPbmx5UGVybWlzc2lvbnMgPSAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbWVyZ2UodGhpcy5wZXJtaXNzaW9uc1NlcnZpY2UucGVybWlzc2lvbnMkLCB0aGlzLnJvbGVzU2VydmljZS5yb2xlcyQpXHJcbiAgICAgICAgICAgIC5waXBlKHNraXAodGhpcy5maXJzdE1lcmdlVW51c2VkUnVuKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoLyoqXHJcbiAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChub3RFbXB0eVZhbHVlKF90aGlzLm5neFBlcm1pc3Npb25zRXhjZXB0KSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMudmFsaWRhdGVFeGNlcHRBbmRPbmx5UGVybWlzc2lvbnMoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobm90RW1wdHlWYWx1ZShfdGhpcy5uZ3hQZXJtaXNzaW9uc09ubHkpKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy52YWxpZGF0ZU9ubHlQZXJtaXNzaW9ucygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF90aGlzLmhhbmRsZUF1dGhvcmlzZWRQZXJtaXNzaW9uKF90aGlzLmdldEF1dGhvcmlzZWRUZW1wbGF0ZXMoKSk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLnByb3RvdHlwZS52YWxpZGF0ZUV4Y2VwdEFuZE9ubHlQZXJtaXNzaW9ucyA9IC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZ2V0UGVybWlzc2lvbnModGhpcy5uZ3hQZXJtaXNzaW9uc0V4Y2VwdClcclxuICAgICAgICAgICAgLnRoZW4oKC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7P30gaGFzUGVybWlzc2lvblxyXG4gICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gKGhhc1Blcm1pc3Npb24pIHtcclxuICAgICAgICAgICAgaWYgKGhhc1Blcm1pc3Npb24pIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmhhbmRsZVVuYXV0aG9yaXNlZFBlcm1pc3Npb24oX3RoaXMubmd4UGVybWlzc2lvbnNFeGNlcHRFbHNlIHx8IF90aGlzLm5neFBlcm1pc3Npb25zRWxzZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCEhX3RoaXMubmd4UGVybWlzc2lvbnNPbmx5KVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgZmFsc2U7XHJcbiAgICAgICAgICAgIF90aGlzLmhhbmRsZUF1dGhvcmlzZWRQZXJtaXNzaW9uKF90aGlzLm5neFBlcm1pc3Npb25zRXhjZXB0VGhlbiB8fCBfdGhpcy5uZ3hQZXJtaXNzaW9uc1RoZW4gfHwgX3RoaXMudGVtcGxhdGVSZWYpO1xyXG4gICAgICAgIH0pKVxyXG4gICAgICAgICAgICAuY2F0Y2goKC8qKlxyXG4gICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoISFfdGhpcy5uZ3hQZXJtaXNzaW9uc09ubHkpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnZhbGlkYXRlT25seVBlcm1pc3Npb25zKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5oYW5kbGVBdXRob3Jpc2VkUGVybWlzc2lvbihfdGhpcy5uZ3hQZXJtaXNzaW9uc0V4Y2VwdFRoZW4gfHwgX3RoaXMubmd4UGVybWlzc2lvbnNUaGVuIHx8IF90aGlzLnRlbXBsYXRlUmVmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUudmFsaWRhdGVPbmx5UGVybWlzc2lvbnMgPSAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAvLyBWYWxpZGF0ZSBwZXJtaXNzaW9ucyAmIHN0b3JlIHBlcm1pc3Npb24gc3RhdGVcclxuICAgICAgICB0aGlzLmdldFBlcm1pc3Npb25zKHRoaXMubmd4UGVybWlzc2lvbnNPbmx5KVxyXG4gICAgICAgICAgICAudGhlbigoLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHs/fSBoYXNQZXJtaXNzaW9uXHJcbiAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiAoaGFzUGVybWlzc2lvbikge1xyXG4gICAgICAgICAgICBpZiAoaGFzUGVybWlzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuaGFuZGxlQXV0aG9yaXNlZFBlcm1pc3Npb24oX3RoaXMubmd4UGVybWlzc2lvbnNPbmx5VGhlbiB8fCBfdGhpcy5uZ3hQZXJtaXNzaW9uc1RoZW4gfHwgX3RoaXMudGVtcGxhdGVSZWYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuaGFuZGxlVW5hdXRob3Jpc2VkUGVybWlzc2lvbihfdGhpcy5uZ3hQZXJtaXNzaW9uc09ubHlFbHNlIHx8IF90aGlzLm5neFBlcm1pc3Npb25zRWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSlcclxuICAgICAgICAgICAgLmNhdGNoKCgvKipcclxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMuaGFuZGxlVW5hdXRob3Jpc2VkUGVybWlzc2lvbihfdGhpcy5uZ3hQZXJtaXNzaW9uc09ubHlFbHNlIHx8IF90aGlzLm5neFBlcm1pc3Npb25zRWxzZSk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gdGVtcGxhdGVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLnByb3RvdHlwZS5oYW5kbGVVbmF1dGhvcmlzZWRQZXJtaXNzaW9uID0gLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSB0ZW1wbGF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gKHRlbXBsYXRlKSB7XHJcbiAgICAgICAgaWYgKGlzQm9vbGVhbih0aGlzLmN1cnJlbnRBdXRob3JpemVkU3RhdGUpICYmICF0aGlzLmN1cnJlbnRBdXRob3JpemVkU3RhdGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmN1cnJlbnRBdXRob3JpemVkU3RhdGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBlcm1pc3Npb25zVW5hdXRob3JpemVkLmVtaXQodGhpcy5wZXJtaXNzaW9uc1N0YXRlKTtcclxuICAgICAgICBpZiAodGhpcy5nZXRVbkF1dGhvcml6ZWRTdHJhdGVneUlucHV0KCkpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseVN0cmF0ZWd5QWNjb3JkaW5nVG9TdHJhdGVneVR5cGUodGhpcy5nZXRVbkF1dGhvcml6ZWRTdHJhdGVneUlucHV0KCkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb25TZXJ2aWNlLm9uVW5BdXRob3Jpc2VkRGVmYXVsdFN0cmF0ZWd5ICYmICF0aGlzLmVsc2VCbG9ja0RlZmluZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFwcGx5U3RyYXRlZ3kodGhpcy5jb25maWd1cmF0aW9uU2VydmljZS5vblVuQXV0aG9yaXNlZERlZmF1bHRTdHJhdGVneSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dUZW1wbGF0ZUJsb2NrSW5WaWV3KHRlbXBsYXRlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSB0ZW1wbGF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvdG90eXBlLmhhbmRsZUF1dGhvcmlzZWRQZXJtaXNzaW9uID0gLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSB0ZW1wbGF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gKHRlbXBsYXRlKSB7XHJcbiAgICAgICAgaWYgKGlzQm9vbGVhbih0aGlzLmN1cnJlbnRBdXRob3JpemVkU3RhdGUpICYmIHRoaXMuY3VycmVudEF1dGhvcml6ZWRTdGF0ZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEF1dGhvcml6ZWRTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5wZXJtaXNzaW9uc0F1dGhvcml6ZWQuZW1pdCh0aGlzLnBlcm1pc3Npb25zU3RhdGUpO1xyXG4gICAgICAgIGlmICh0aGlzLmdldEF1dGhvcml6ZWRTdHJhdGVneUlucHV0KCkpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseVN0cmF0ZWd5QWNjb3JkaW5nVG9TdHJhdGVneVR5cGUodGhpcy5nZXRBdXRob3JpemVkU3RyYXRlZ3lJbnB1dCgpKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uU2VydmljZS5vbkF1dGhvcmlzZWREZWZhdWx0U3RyYXRlZ3kgJiYgIXRoaXMudGhlbkJsb2NrRGVmaW5lZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlTdHJhdGVneSh0aGlzLmNvbmZpZ3VyYXRpb25TZXJ2aWNlLm9uQXV0aG9yaXNlZERlZmF1bHRTdHJhdGVneSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dUZW1wbGF0ZUJsb2NrSW5WaWV3KHRlbXBsYXRlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSBzdHJhdGVneVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvdG90eXBlLmFwcGx5U3RyYXRlZ3lBY2NvcmRpbmdUb1N0cmF0ZWd5VHlwZSA9IC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gc3RyYXRlZ3lcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIChzdHJhdGVneSkge1xyXG4gICAgICAgIGlmIChpc1N0cmluZyhzdHJhdGVneSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseVN0cmF0ZWd5KHN0cmF0ZWd5KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNGdW5jdGlvbihzdHJhdGVneSkpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93VGVtcGxhdGVCbG9ja0luVmlldyh0aGlzLnRlbXBsYXRlUmVmKTtcclxuICAgICAgICAgICAgKCgvKiogQHR5cGUgez99ICovIChzdHJhdGVneSkpKSh0aGlzLnRlbXBsYXRlUmVmLCB0aGlzLnBlcm1pc3Npb25zU3RhdGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gdGVtcGxhdGVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLnByb3RvdHlwZS5zaG93VGVtcGxhdGVCbG9ja0luVmlldyA9IC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gdGVtcGxhdGVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uICh0ZW1wbGF0ZSkge1xyXG4gICAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xyXG4gICAgICAgIGlmICghdGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRlbXBsYXRlKTtcclxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLnByb3RvdHlwZS5nZXRBdXRob3Jpc2VkVGVtcGxhdGVzID0gLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5neFBlcm1pc3Npb25zT25seVRoZW5cclxuICAgICAgICAgICAgfHwgdGhpcy5uZ3hQZXJtaXNzaW9uc0V4Y2VwdFRoZW5cclxuICAgICAgICAgICAgfHwgdGhpcy5uZ3hQZXJtaXNzaW9uc1RoZW5cclxuICAgICAgICAgICAgfHwgdGhpcy50ZW1wbGF0ZVJlZjtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUuZWxzZUJsb2NrRGVmaW5lZCA9IC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gISF0aGlzLm5neFBlcm1pc3Npb25zRXhjZXB0RWxzZSB8fCAhIXRoaXMubmd4UGVybWlzc2lvbnNFbHNlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLnByb3RvdHlwZS50aGVuQmxvY2tEZWZpbmVkID0gLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMubmd4UGVybWlzc2lvbnNFeGNlcHRUaGVuIHx8ICEhdGhpcy5uZ3hQZXJtaXNzaW9uc1RoZW47XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvdG90eXBlLmdldEF1dGhvcml6ZWRTdHJhdGVneUlucHV0ID0gLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5neFBlcm1pc3Npb25zT25seUF1dGhvcmlzZWRTdHJhdGVneSB8fFxyXG4gICAgICAgICAgICB0aGlzLm5neFBlcm1pc3Npb25zRXhjZXB0QXV0aG9yaXNlZFN0cmF0ZWd5IHx8XHJcbiAgICAgICAgICAgIHRoaXMubmd4UGVybWlzc2lvbnNBdXRob3Jpc2VkU3RyYXRlZ3k7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvdG90eXBlLmdldFVuQXV0aG9yaXplZFN0cmF0ZWd5SW5wdXQgPSAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmd4UGVybWlzc2lvbnNPbmx5VW5hdXRob3Jpc2VkU3RyYXRlZ3kgfHxcclxuICAgICAgICAgICAgdGhpcy5uZ3hQZXJtaXNzaW9uc0V4Y2VwdFVuYXV0aG9yaXNlZFN0cmF0ZWd5IHx8XHJcbiAgICAgICAgICAgIHRoaXMubmd4UGVybWlzc2lvbnNVbmF1dGhvcmlzZWRTdHJhdGVneTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHN0clxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvdG90eXBlLmFwcGx5U3RyYXRlZ3kgPSAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0gez99IHN0clxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgIGlmIChzdHIgPT09IE5neFBlcm1pc3Npb25zUHJlZGVmaW5lZFN0cmF0ZWdpZXMuU0hPVykge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dUZW1wbGF0ZUJsb2NrSW5WaWV3KHRoaXMudGVtcGxhdGVSZWYpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdHIgPT09IE5neFBlcm1pc3Npb25zUHJlZGVmaW5lZFN0cmF0ZWdpZXMuUkVNT1ZFKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgICAgICB2YXIgc3RyYXRlZ3kgPSB0aGlzLmNvbmZpZ3VyYXRpb25TZXJ2aWNlLmdldFN0cmF0ZWd5KHN0cik7XHJcbiAgICAgICAgdGhpcy5zaG93VGVtcGxhdGVCbG9ja0luVmlldyh0aGlzLnRlbXBsYXRlUmVmKTtcclxuICAgICAgICBzdHJhdGVneSh0aGlzLnRlbXBsYXRlUmVmLCB0aGlzLnBlcm1pc3Npb25zU3RhdGUpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgcGVybWlzc2lvbiBzZXJ2aWNlIGFnYWluc3QgcGFyYW1ldGVyIFwibmVkZGVkUGVybWlzc2lvbnNcIlxyXG4gICAgICogdGhlbiB1cGRhdGUgdGhpcyBjbGFzcyBwcm9wZXJ0eSBcInBlcm1pc3Npb25zU3RhdGVcIlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBuZWRkZWRQZXJtaXNzaW9ucyBTZXRzIHRoZSBwZXJtaXNzaW9ucy9yb2xlcyB0byBjaGVjayAoaS5lIG5neFBlcm1pc3Npb25zT25seSlcclxuICAgICAqL1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBwZXJtaXNzaW9uIHNlcnZpY2UgYWdhaW5zdCBwYXJhbWV0ZXIgXCJuZWRkZWRQZXJtaXNzaW9uc1wiXHJcbiAgICAgKiB0aGVuIHVwZGF0ZSB0aGlzIGNsYXNzIHByb3BlcnR5IFwicGVybWlzc2lvbnNTdGF0ZVwiXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gbmVkZGVkUGVybWlzc2lvbnMgU2V0cyB0aGUgcGVybWlzc2lvbnMvcm9sZXMgdG8gY2hlY2sgKGkuZSBuZ3hQZXJtaXNzaW9uc09ubHkpXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUuZ2V0UGVybWlzc2lvbnMgPSAvKipcclxuICAgICAqIENoZWNrIHBlcm1pc3Npb24gc2VydmljZSBhZ2FpbnN0IHBhcmFtZXRlciBcIm5lZGRlZFBlcm1pc3Npb25zXCJcclxuICAgICAqIHRoZW4gdXBkYXRlIHRoaXMgY2xhc3MgcHJvcGVydHkgXCJwZXJtaXNzaW9uc1N0YXRlXCJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSBuZWRkZWRQZXJtaXNzaW9ucyBTZXRzIHRoZSBwZXJtaXNzaW9ucy9yb2xlcyB0byBjaGVjayAoaS5lIG5neFBlcm1pc3Npb25zT25seSlcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIChuZWRkZWRQZXJtaXNzaW9ucykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgLy8gRW5zdXJlIHdlIHdvcmsgd2l0aCBhcnJheVxyXG4gICAgICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgICAgICB2YXIgcmVxdWVzdGVkUGVybWlzc2lvbnMgPSB0cmFuc2Zvcm1TdHJpbmdUb0FycmF5KG5lZGRlZFBlcm1pc3Npb25zKVxyXG4gICAgICAgIC8vIEFycmF5IG9mIHByb21pc2VzIHRoYXQgcmVxdWVzdCBwZXJtaXNzaW9uIGFuZCByb2xlcyBzZXJ2aWNlIHdpdGggXCJwZXJtaXNzaW9uXCJcclxuICAgICAgICA7XHJcbiAgICAgICAgLy8gQXJyYXkgb2YgcHJvbWlzZXMgdGhhdCByZXF1ZXN0IHBlcm1pc3Npb24gYW5kIHJvbGVzIHNlcnZpY2Ugd2l0aCBcInBlcm1pc3Npb25cIlxyXG4gICAgICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgICAgICB2YXIgcHJvbWlzZXMgPSBbXVxyXG4gICAgICAgIC8vIFJlc2V0IFwicGVybWlzc2lvbnMgc3RhdGVcIiBkaXJlY3RpdmUgY2xhc3MgcHJvcGVydHlcclxuICAgICAgICA7XHJcbiAgICAgICAgLy8gUmVzZXQgXCJwZXJtaXNzaW9ucyBzdGF0ZVwiIGRpcmVjdGl2ZSBjbGFzcyBwcm9wZXJ0eVxyXG4gICAgICAgIHRoaXMucGVybWlzc2lvbnNTdGF0ZSA9IHt9O1xyXG4gICAgICAgIGlmIChpc0FycmF5KHJlcXVlc3RlZFBlcm1pc3Npb25zKSkge1xyXG4gICAgICAgICAgICByZXF1ZXN0ZWRQZXJtaXNzaW9ucy5mb3JFYWNoKCgvKipcclxuICAgICAgICAgICAgICogQHBhcmFtIHs/fSB2YWx1ZVxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5wZXJtaXNzaW9uc1N0YXRlW3ZhbHVlXSA9IHsgaGFzUGVybWlzc2lvbjogZmFsc2UsIGhhc1JvbGU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBoYXMgXCJQZXJtaXNzaW9uXCJcclxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goX3RoaXMucGVybWlzc2lvbnNTZXJ2aWNlLmhhc1Blcm1pc3Npb24odmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKC8qKlxyXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHs/fSBoYXNQZXJtaXNzaW9uXHJcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoaGFzUGVybWlzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnBlcm1pc3Npb25zU3RhdGVbdmFsdWVdLmhhc1Blcm1pc3Npb24gPSBoYXNQZXJtaXNzaW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNQZXJtaXNzaW9uO1xyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKCgvKipcclxuICAgICAgICAgICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9KSkpO1xyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgaGFzIFwiUm9sZVwiXHJcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKF90aGlzLnJvbGVzU2VydmljZS5oYXNPbmx5Um9sZXModmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKC8qKlxyXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHs/fSBoYXNQZXJtaXNzaW9uXHJcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoaGFzUGVybWlzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnBlcm1pc3Npb25zU3RhdGVbdmFsdWVdLmhhc1JvbGUgPSBoYXNQZXJtaXNzaW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNQZXJtaXNzaW9uO1xyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKCgvKipcclxuICAgICAgICAgICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9KSkpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHVybiByZXN1bHQgOlxyXG4gICAgICAgICAqIHRydWUgOiBBdCBsZWFzdCBvbmUgb2YgbmVlZGVkUGVybWlzc2lvbiBleGlzdHMgaW4gcGVybWlzc2lvbiBvciByb2xlIHNlcnZpY2UgKEBzZWUgdGhpcy5wZXJtaXNzaW9uc1N0YXRlIHRvIGdldCBhIGZ1bGwgZGV0YWlsIG9uIHdpY2ggcGVybWlzc2lvbiBpcyB0cnVlL2ZhbHNlKVxyXG4gICAgICAgICAqIGZhbHNlIDogbm9uZSBvZiBuZWVkZWRQZXJtaXNzaW9uIGV4aXN0cyBpbiAgcGVybWlzc2lvbiBvciByb2xlIHNlcnZpY2VcclxuICAgICAgICAqL1xyXG4gICAgICAgIHJldHVybiBmcm9tKHByb21pc2VzKS5waXBlKG1lcmdlQWxsKCksIGZpcnN0KCgvKipcclxuICAgICAgICAgKiBAcGFyYW0gez99IGhhc1Blcm1pc3Npb25cclxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIChoYXNQZXJtaXNzaW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBoYXNQZXJtaXNzaW9uID09PSB0cnVlO1xyXG4gICAgICAgIH0pLCBmYWxzZSksIG1hcCgoLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHs/fSBoYXNQZXJtaXNzaW9uXHJcbiAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiAoaGFzUGVybWlzc2lvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gaGFzUGVybWlzc2lvbjtcclxuICAgICAgICB9KSkpLnRvUHJvbWlzZSgpLnRoZW4oKC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7P30gaGFzUGVybWlzc2lvblxyXG4gICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gKGhhc1Blcm1pc3Npb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGhhc1Blcm1pc3Npb247XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLmRlY29yYXRvcnMgPSBbXHJcbiAgICAgICAgeyB0eXBlOiBEaXJlY3RpdmUsIGFyZ3M6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdbbmd4UGVybWlzc2lvbnNPbmx5XSxbbmd4UGVybWlzc2lvbnNFeGNlcHRdJ1xyXG4gICAgICAgICAgICAgICAgfSxdIH1cclxuICAgIF07XHJcbiAgICAvKiogQG5vY29sbGFwc2UgKi9cclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xyXG4gICAgICAgIHsgdHlwZTogTmd4UGVybWlzc2lvbnNTZXJ2aWNlIH0sXHJcbiAgICAgICAgeyB0eXBlOiBOZ3hQZXJtaXNzaW9uc0NvbmZpZ3VyYXRpb25TZXJ2aWNlIH0sXHJcbiAgICAgICAgeyB0eXBlOiBOZ3hSb2xlc1NlcnZpY2UgfSxcclxuICAgICAgICB7IHR5cGU6IFZpZXdDb250YWluZXJSZWYgfSxcclxuICAgICAgICB7IHR5cGU6IENoYW5nZURldGVjdG9yUmVmIH0sXHJcbiAgICAgICAgeyB0eXBlOiBUZW1wbGF0ZVJlZiB9XHJcbiAgICBdOyB9O1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvcERlY29yYXRvcnMgPSB7XHJcbiAgICAgICAgbmd4UGVybWlzc2lvbnNPbmx5OiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgICAgICBuZ3hQZXJtaXNzaW9uc09ubHlUaGVuOiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgICAgICBuZ3hQZXJtaXNzaW9uc09ubHlFbHNlOiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgICAgICBuZ3hQZXJtaXNzaW9uc0V4Y2VwdDogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICAgICAgbmd4UGVybWlzc2lvbnNFeGNlcHRFbHNlOiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgICAgICBuZ3hQZXJtaXNzaW9uc0V4Y2VwdFRoZW46IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgICAgIG5neFBlcm1pc3Npb25zVGhlbjogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICAgICAgbmd4UGVybWlzc2lvbnNFbHNlOiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgICAgICBuZ3hQZXJtaXNzaW9uc09ubHlBdXRob3Jpc2VkU3RyYXRlZ3k6IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgICAgIG5neFBlcm1pc3Npb25zT25seVVuYXV0aG9yaXNlZFN0cmF0ZWd5OiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgICAgICBuZ3hQZXJtaXNzaW9uc0V4Y2VwdFVuYXV0aG9yaXNlZFN0cmF0ZWd5OiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgICAgICBuZ3hQZXJtaXNzaW9uc0V4Y2VwdEF1dGhvcmlzZWRTdHJhdGVneTogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICAgICAgbmd4UGVybWlzc2lvbnNVbmF1dGhvcmlzZWRTdHJhdGVneTogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICAgICAgbmd4UGVybWlzc2lvbnNBdXRob3Jpc2VkU3RyYXRlZ3k6IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgICAgIHBlcm1pc3Npb25zQXV0aG9yaXplZDogW3sgdHlwZTogT3V0cHV0IH1dLFxyXG4gICAgICAgIHBlcm1pc3Npb25zVW5hdXRob3JpemVkOiBbeyB0eXBlOiBPdXRwdXQgfV1cclxuICAgIH07XHJcbiAgICByZXR1cm4gTmd4UGVybWlzc2lvbnNEaXJlY3RpdmU7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IE5neFBlcm1pc3Npb25zRGlyZWN0aXZlIH07XHJcbmlmIChmYWxzZSkge1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zT25seTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc09ubHlUaGVuO1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zT25seUVsc2U7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNFeGNlcHQ7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNFeGNlcHRFbHNlO1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zRXhjZXB0VGhlbjtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc1RoZW47XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNFbHNlO1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zT25seUF1dGhvcmlzZWRTdHJhdGVneTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc09ubHlVbmF1dGhvcmlzZWRTdHJhdGVneTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc0V4Y2VwdFVuYXV0aG9yaXNlZFN0cmF0ZWd5O1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zRXhjZXB0QXV0aG9yaXNlZFN0cmF0ZWd5O1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zVW5hdXRob3Jpc2VkU3RyYXRlZ3k7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNBdXRob3Jpc2VkU3RyYXRlZ3k7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUucGVybWlzc2lvbnNBdXRob3JpemVkO1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvdG90eXBlLnBlcm1pc3Npb25zVW5hdXRob3JpemVkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7P31cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLnByb3RvdHlwZS5pbml0UGVybWlzc2lvblN1YnNjcmlwdGlvbjtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgez99XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUuZmlyc3RNZXJnZVVudXNlZFJ1bjtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgez99XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUuY3VycmVudEF1dGhvcml6ZWRTdGF0ZTtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgez99XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUucGVybWlzc2lvbnNTdGF0ZTtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgez99XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUucGVybWlzc2lvbnNTZXJ2aWNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7P31cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLnByb3RvdHlwZS5jb25maWd1cmF0aW9uU2VydmljZTtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgez99XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUucm9sZXNTZXJ2aWNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7P31cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLnByb3RvdHlwZS52aWV3Q29udGFpbmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7P31cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLnByb3RvdHlwZS5jaGFuZ2VEZXRlY3RvcjtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgez99XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUudGVtcGxhdGVSZWY7XHJcbn1cciJdfQ==