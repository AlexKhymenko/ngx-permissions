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
export class NgxPermissionsDirective {
    /**
     * @param {?} permissionsService
     * @param {?} configurationService
     * @param {?} rolesService
     * @param {?} viewContainer
     * @param {?} changeDetector
     * @param {?} templateRef
     */
    constructor(permissionsService, configurationService, rolesService, viewContainer, changeDetector, templateRef) {
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
    ngOnInit() {
        this.viewContainer.clear();
        this.initPermissionSubscription = this.validateExceptOnlyPermissions();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const onlyChanges = changes['ngxPermissionsOnly'];
        /** @type {?} */
        const exceptChanges = changes['ngxPermissionsExcept'];
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
            () => {
                if (notEmptyValue(this.ngxPermissionsExcept)) {
                    this.validateExceptAndOnlyPermissions();
                    return;
                }
                if (notEmptyValue(this.ngxPermissionsOnly)) {
                    this.validateOnlyPermissions();
                    return;
                }
                this.handleAuthorisedPermission(this.getAuthorisedTemplates());
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.initPermissionSubscription) {
            this.initPermissionSubscription.unsubscribe();
        }
    }
    /**
     * @private
     * @return {?}
     */
    validateExceptOnlyPermissions() {
        return merge(this.permissionsService.permissions$, this.rolesService.roles$)
            .pipe(skip(this.firstMergeUnusedRun))
            .subscribe((/**
         * @return {?}
         */
        () => {
            if (notEmptyValue(this.ngxPermissionsExcept)) {
                this.validateExceptAndOnlyPermissions();
                return;
            }
            if (notEmptyValue(this.ngxPermissionsOnly)) {
                this.validateOnlyPermissions();
                return;
            }
            this.handleAuthorisedPermission(this.getAuthorisedTemplates());
        }));
    }
    /**
     * @private
     * @return {?}
     */
    validateExceptAndOnlyPermissions() {
        this.getPermissions(this.ngxPermissionsExcept)
            .then((/**
         * @param {?} hasPermission
         * @return {?}
         */
        (hasPermission) => {
            if (hasPermission) {
                this.handleUnauthorisedPermission(this.ngxPermissionsExceptElse || this.ngxPermissionsElse);
                return;
            }
            if (!!this.ngxPermissionsOnly)
                throw false;
            this.handleAuthorisedPermission(this.ngxPermissionsExceptThen || this.ngxPermissionsThen || this.templateRef);
        }))
            .catch((/**
         * @return {?}
         */
        () => {
            if (!!this.ngxPermissionsOnly) {
                this.validateOnlyPermissions();
            }
            else {
                this.handleAuthorisedPermission(this.ngxPermissionsExceptThen || this.ngxPermissionsThen || this.templateRef);
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    validateOnlyPermissions() {
        // Validate permissions & store permission state
        this.getPermissions(this.ngxPermissionsOnly)
            .then((/**
         * @param {?} hasPermission
         * @return {?}
         */
        (hasPermission) => {
            if (hasPermission) {
                this.handleAuthorisedPermission(this.ngxPermissionsOnlyThen || this.ngxPermissionsThen || this.templateRef);
            }
            else {
                this.handleUnauthorisedPermission(this.ngxPermissionsOnlyElse || this.ngxPermissionsElse);
            }
        }))
            .catch((/**
         * @return {?}
         */
        () => {
            this.handleUnauthorisedPermission(this.ngxPermissionsOnlyElse || this.ngxPermissionsElse);
        }));
    }
    /**
     * @private
     * @param {?} template
     * @return {?}
     */
    handleUnauthorisedPermission(template) {
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
    }
    /**
     * @private
     * @param {?} template
     * @return {?}
     */
    handleAuthorisedPermission(template) {
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
    }
    /**
     * @private
     * @param {?} strategy
     * @return {?}
     */
    applyStrategyAccordingToStrategyType(strategy) {
        if (isString(strategy)) {
            this.applyStrategy(strategy);
            return;
        }
        if (isFunction(strategy)) {
            this.showTemplateBlockInView(this.templateRef);
            ((/** @type {?} */ (strategy)))(this.templateRef, this.permissionsState);
            return;
        }
    }
    /**
     * @private
     * @param {?} template
     * @return {?}
     */
    showTemplateBlockInView(template) {
        this.viewContainer.clear();
        if (!template) {
            return;
        }
        this.viewContainer.createEmbeddedView(template);
        this.changeDetector.markForCheck();
    }
    /**
     * @private
     * @return {?}
     */
    getAuthorisedTemplates() {
        return this.ngxPermissionsOnlyThen
            || this.ngxPermissionsExceptThen
            || this.ngxPermissionsThen
            || this.templateRef;
    }
    /**
     * @private
     * @return {?}
     */
    elseBlockDefined() {
        return !!this.ngxPermissionsExceptElse || !!this.ngxPermissionsElse;
    }
    /**
     * @private
     * @return {?}
     */
    thenBlockDefined() {
        return !!this.ngxPermissionsExceptThen || !!this.ngxPermissionsThen;
    }
    /**
     * @private
     * @return {?}
     */
    getAuthorizedStrategyInput() {
        return this.ngxPermissionsOnlyAuthorisedStrategy ||
            this.ngxPermissionsExceptAuthorisedStrategy ||
            this.ngxPermissionsAuthorisedStrategy;
    }
    /**
     * @private
     * @return {?}
     */
    getUnAuthorizedStrategyInput() {
        return this.ngxPermissionsOnlyUnauthorisedStrategy ||
            this.ngxPermissionsExceptUnauthorisedStrategy ||
            this.ngxPermissionsUnauthorisedStrategy;
    }
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    applyStrategy(str) {
        if (str === NgxPermissionsPredefinedStrategies.SHOW) {
            this.showTemplateBlockInView(this.templateRef);
            return;
        }
        if (str === NgxPermissionsPredefinedStrategies.REMOVE) {
            this.viewContainer.clear();
            return;
        }
        /** @type {?} */
        const strategy = this.configurationService.getStrategy(str);
        this.showTemplateBlockInView(this.templateRef);
        strategy(this.templateRef, this.permissionsState);
    }
    /**
     * Check permission service against parameter "neddedPermissions"
     * then update this class property "permissionsState"
     *
     * @private
     * @param {?} neddedPermissions Sets the permissions/roles to check (i.e ngxPermissionsOnly)
     * @return {?}
     */
    getPermissions(neddedPermissions) {
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
            (value) => {
                this.permissionsState[value] = { hasPermission: false, hasRole: false };
                // Check if has "Permission"
                promises.push(this.permissionsService.hasPermission(value)
                    .then((/**
                 * @param {?} hasPermission
                 * @return {?}
                 */
                (hasPermission) => {
                    this.permissionsState[value].hasPermission = hasPermission;
                    return hasPermission;
                }))
                    .catch((/**
                 * @return {?}
                 */
                () => false)));
                // Check if has "Role"
                promises.push(this.rolesService.hasOnlyRoles(value)
                    .then((/**
                 * @param {?} hasPermission
                 * @return {?}
                 */
                (hasPermission) => {
                    this.permissionsState[value].hasRole = hasPermission;
                    return hasPermission;
                }))
                    .catch((/**
                 * @return {?}
                 */
                () => false)));
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
        (hasPermission) => {
            return hasPermission === true;
        }), false), map((/**
         * @param {?} hasPermission
         * @return {?}
         */
        (hasPermission) => {
            return hasPermission;
        }))).toPromise().then((/**
         * @param {?} hasPermission
         * @return {?}
         */
        (hasPermission) => {
            return hasPermission;
        }));
    }
}
NgxPermissionsDirective.ngDirectiveDef = ɵngcc0.ɵɵdefineDirective({ type: NgxPermissionsDirective, selectors: [["", "ngxPermissionsOnly", ""], ["", "ngxPermissionsExcept", ""]], factory: function NgxPermissionsDirective_Factory(t) { return new (t || NgxPermissionsDirective)(ɵngcc0.ɵɵdirectiveInject(NgxPermissionsService), ɵngcc0.ɵɵdirectiveInject(NgxPermissionsConfigurationService), ɵngcc0.ɵɵdirectiveInject(NgxRolesService), ɵngcc0.ɵɵdirectiveInject(ViewContainerRef), ɵngcc0.ɵɵdirectiveInject(ChangeDetectorRef), ɵngcc0.ɵɵdirectiveInject(TemplateRef)); }, inputs: { ngxPermissionsOnly: "ngxPermissionsOnly", ngxPermissionsOnlyThen: "ngxPermissionsOnlyThen", ngxPermissionsOnlyElse: "ngxPermissionsOnlyElse", ngxPermissionsExcept: "ngxPermissionsExcept", ngxPermissionsExceptElse: "ngxPermissionsExceptElse", ngxPermissionsExceptThen: "ngxPermissionsExceptThen", ngxPermissionsThen: "ngxPermissionsThen", ngxPermissionsElse: "ngxPermissionsElse", ngxPermissionsOnlyAuthorisedStrategy: "ngxPermissionsOnlyAuthorisedStrategy", ngxPermissionsOnlyUnauthorisedStrategy: "ngxPermissionsOnlyUnauthorisedStrategy", ngxPermissionsExceptUnauthorisedStrategy: "ngxPermissionsExceptUnauthorisedStrategy", ngxPermissionsExceptAuthorisedStrategy: "ngxPermissionsExceptAuthorisedStrategy", ngxPermissionsUnauthorisedStrategy: "ngxPermissionsUnauthorisedStrategy", ngxPermissionsAuthorisedStrategy: "ngxPermissionsAuthorisedStrategy" }, outputs: { permissionsAuthorized: "permissionsAuthorized", permissionsUnauthorized: "permissionsUnauthorized" }, features: [ɵngcc0.ɵɵNgOnChangesFeature()] });
/*@__PURE__*/ ɵngcc0.ɵsetClassMetadata(NgxPermissionsDirective, [{
        type: Directive,
        args: [{
                selector: '[ngxPermissionsOnly],[ngxPermissionsExcept]'
            }]
    }], function () { return [{ type: NgxPermissionsService }, { type: NgxPermissionsConfigurationService }, { type: NgxRolesService }, { type: ViewContainerRef }, { type: ChangeDetectorRef }, { type: TemplateRef }]; }, { constructor: [], permissionsService: [], configurationService: [], rolesService: [], viewContainer: [], changeDetector: [], templateRef: [], permissionsAuthorized: [{
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
/** @nocollapse */
NgxPermissionsDirective.ctorParameters = () => [
    { type: NgxPermissionsService },
    { type: NgxPermissionsConfigurationService },
    { type: NgxRolesService },
    { type: ViewContainerRef },
    { type: ChangeDetectorRef },
    { type: TemplateRef }
];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL09sZWtzYW5kci5LaHltZW5rby9XZWJzdG9ybVByb2plY3RzL25neC1wZXJtaXNzaW9ucy9kaXN0L25neC1wZXJtaXNzaW9ucy9lc20yMDE1L2xpYi9kaXJlY3RpdmUvcGVybWlzc2lvbnMuZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztBQWFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBNFdDLGFBS0MiLCJmaWxlIjoicGVybWlzc2lvbnMuZGlyZWN0aXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcgYWRkZWQgYnkgdHNpY2tsZVxyXG4gKiBAc3VwcHJlc3Mge2NoZWNrVHlwZXMsZXh0cmFSZXF1aXJlLG1pc3NpbmdPdmVycmlkZSxtaXNzaW5nUmV0dXJuLHVudXNlZFByaXZhdGVNZW1iZXJzLHVzZWxlc3NDb2RlfSBjaGVja2VkIGJ5IHRzY1xyXG4gKi9cclxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBtZXJnZSwgZnJvbSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBza2lwLCB0YWtlLCBtZXJnZUFsbCwgZmlyc3QsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTmd4UGVybWlzc2lvbnNQcmVkZWZpbmVkU3RyYXRlZ2llcyB9IGZyb20gJy4uL2VudW1zL3ByZWRlZmluZWQtc3RyYXRlZ2llcy5lbnVtJztcclxuaW1wb3J0IHsgTmd4UGVybWlzc2lvbnNDb25maWd1cmF0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UvY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd4UGVybWlzc2lvbnNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9wZXJtaXNzaW9ucy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd4Um9sZXNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9yb2xlcy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgaXNCb29sZWFuLCBpc0Z1bmN0aW9uLCBpc1N0cmluZywgbm90RW1wdHlWYWx1ZSwgdHJhbnNmb3JtU3RyaW5nVG9BcnJheSB9IGZyb20gJy4uL3V0aWxzL3V0aWxzJztcclxuaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJ3V0aWwnO1xyXG5leHBvcnQgY2xhc3MgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gez99IHBlcm1pc3Npb25zU2VydmljZVxyXG4gICAgICogQHBhcmFtIHs/fSBjb25maWd1cmF0aW9uU2VydmljZVxyXG4gICAgICogQHBhcmFtIHs/fSByb2xlc1NlcnZpY2VcclxuICAgICAqIEBwYXJhbSB7P30gdmlld0NvbnRhaW5lclxyXG4gICAgICogQHBhcmFtIHs/fSBjaGFuZ2VEZXRlY3RvclxyXG4gICAgICogQHBhcmFtIHs/fSB0ZW1wbGF0ZVJlZlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihwZXJtaXNzaW9uc1NlcnZpY2UsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlLCByb2xlc1NlcnZpY2UsIHZpZXdDb250YWluZXIsIGNoYW5nZURldGVjdG9yLCB0ZW1wbGF0ZVJlZikge1xyXG4gICAgICAgIHRoaXMucGVybWlzc2lvbnNTZXJ2aWNlID0gcGVybWlzc2lvbnNTZXJ2aWNlO1xyXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvblNlcnZpY2UgPSBjb25maWd1cmF0aW9uU2VydmljZTtcclxuICAgICAgICB0aGlzLnJvbGVzU2VydmljZSA9IHJvbGVzU2VydmljZTtcclxuICAgICAgICB0aGlzLnZpZXdDb250YWluZXIgPSB2aWV3Q29udGFpbmVyO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IgPSBjaGFuZ2VEZXRlY3RvcjtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlUmVmID0gdGVtcGxhdGVSZWY7XHJcbiAgICAgICAgdGhpcy5wZXJtaXNzaW9uc0F1dGhvcml6ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICAgICAgdGhpcy5wZXJtaXNzaW9uc1VuYXV0aG9yaXplZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgICAgICAvLyBza2lwIGZpcnN0IHJ1biBjYXVzZSBtZXJnZSB3aWxsIGZpcmUgdHdpY2VcclxuICAgICAgICB0aGlzLmZpcnN0TWVyZ2VVbnVzZWRSdW4gPSAxO1xyXG4gICAgICAgIHRoaXMucGVybWlzc2lvbnNTdGF0ZSA9IHt9O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnZpZXdDb250YWluZXIuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmluaXRQZXJtaXNzaW9uU3Vic2NyaXB0aW9uID0gdGhpcy52YWxpZGF0ZUV4Y2VwdE9ubHlQZXJtaXNzaW9ucygpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gez99IGNoYW5nZXNcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXMpIHtcclxuICAgICAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICAgICAgY29uc3Qgb25seUNoYW5nZXMgPSBjaGFuZ2VzWyduZ3hQZXJtaXNzaW9uc09ubHknXTtcclxuICAgICAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICAgICAgY29uc3QgZXhjZXB0Q2hhbmdlcyA9IGNoYW5nZXNbJ25neFBlcm1pc3Npb25zRXhjZXB0J107XHJcbiAgICAgICAgaWYgKG9ubHlDaGFuZ2VzIHx8IGV4Y2VwdENoYW5nZXMpIHtcclxuICAgICAgICAgICAgLy8gRHVlIHRvIGJ1ZyB3aGVuIHlvdSBwYXNzIGVtcHR5IGFycmF5XHJcbiAgICAgICAgICAgIGlmIChvbmx5Q2hhbmdlcyAmJiBvbmx5Q2hhbmdlcy5maXJzdENoYW5nZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKGV4Y2VwdENoYW5nZXMgJiYgZXhjZXB0Q2hhbmdlcy5maXJzdENoYW5nZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgbWVyZ2UodGhpcy5wZXJtaXNzaW9uc1NlcnZpY2UucGVybWlzc2lvbnMkLCB0aGlzLnJvbGVzU2VydmljZS5yb2xlcyQpXHJcbiAgICAgICAgICAgICAgICAucGlwZShza2lwKHRoaXMuZmlyc3RNZXJnZVVudXNlZFJ1biksIHRha2UoMSkpXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgvKipcclxuICAgICAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChub3RFbXB0eVZhbHVlKHRoaXMubmd4UGVybWlzc2lvbnNFeGNlcHQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUV4Y2VwdEFuZE9ubHlQZXJtaXNzaW9ucygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChub3RFbXB0eVZhbHVlKHRoaXMubmd4UGVybWlzc2lvbnNPbmx5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVPbmx5UGVybWlzc2lvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUF1dGhvcmlzZWRQZXJtaXNzaW9uKHRoaXMuZ2V0QXV0aG9yaXNlZFRlbXBsYXRlcygpKTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5pdFBlcm1pc3Npb25TdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0UGVybWlzc2lvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIHZhbGlkYXRlRXhjZXB0T25seVBlcm1pc3Npb25zKCkge1xyXG4gICAgICAgIHJldHVybiBtZXJnZSh0aGlzLnBlcm1pc3Npb25zU2VydmljZS5wZXJtaXNzaW9ucyQsIHRoaXMucm9sZXNTZXJ2aWNlLnJvbGVzJClcclxuICAgICAgICAgICAgLnBpcGUoc2tpcCh0aGlzLmZpcnN0TWVyZ2VVbnVzZWRSdW4pKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgvKipcclxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKG5vdEVtcHR5VmFsdWUodGhpcy5uZ3hQZXJtaXNzaW9uc0V4Y2VwdCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVFeGNlcHRBbmRPbmx5UGVybWlzc2lvbnMoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobm90RW1wdHlWYWx1ZSh0aGlzLm5neFBlcm1pc3Npb25zT25seSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVPbmx5UGVybWlzc2lvbnMoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUF1dGhvcmlzZWRQZXJtaXNzaW9uKHRoaXMuZ2V0QXV0aG9yaXNlZFRlbXBsYXRlcygpKTtcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICB2YWxpZGF0ZUV4Y2VwdEFuZE9ubHlQZXJtaXNzaW9ucygpIHtcclxuICAgICAgICB0aGlzLmdldFBlcm1pc3Npb25zKHRoaXMubmd4UGVybWlzc2lvbnNFeGNlcHQpXHJcbiAgICAgICAgICAgIC50aGVuKCgvKipcclxuICAgICAgICAgKiBAcGFyYW0gez99IGhhc1Blcm1pc3Npb25cclxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIChoYXNQZXJtaXNzaW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChoYXNQZXJtaXNzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVVuYXV0aG9yaXNlZFBlcm1pc3Npb24odGhpcy5uZ3hQZXJtaXNzaW9uc0V4Y2VwdEVsc2UgfHwgdGhpcy5uZ3hQZXJtaXNzaW9uc0Vsc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghIXRoaXMubmd4UGVybWlzc2lvbnNPbmx5KVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQXV0aG9yaXNlZFBlcm1pc3Npb24odGhpcy5uZ3hQZXJtaXNzaW9uc0V4Y2VwdFRoZW4gfHwgdGhpcy5uZ3hQZXJtaXNzaW9uc1RoZW4gfHwgdGhpcy50ZW1wbGF0ZVJlZik7XHJcbiAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoLyoqXHJcbiAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgKi9cclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghIXRoaXMubmd4UGVybWlzc2lvbnNPbmx5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlT25seVBlcm1pc3Npb25zKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUF1dGhvcmlzZWRQZXJtaXNzaW9uKHRoaXMubmd4UGVybWlzc2lvbnNFeGNlcHRUaGVuIHx8IHRoaXMubmd4UGVybWlzc2lvbnNUaGVuIHx8IHRoaXMudGVtcGxhdGVSZWYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgdmFsaWRhdGVPbmx5UGVybWlzc2lvbnMoKSB7XHJcbiAgICAgICAgLy8gVmFsaWRhdGUgcGVybWlzc2lvbnMgJiBzdG9yZSBwZXJtaXNzaW9uIHN0YXRlXHJcbiAgICAgICAgdGhpcy5nZXRQZXJtaXNzaW9ucyh0aGlzLm5neFBlcm1pc3Npb25zT25seSlcclxuICAgICAgICAgICAgLnRoZW4oKC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7P30gaGFzUGVybWlzc2lvblxyXG4gICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgKGhhc1Blcm1pc3Npb24pID0+IHtcclxuICAgICAgICAgICAgaWYgKGhhc1Blcm1pc3Npb24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQXV0aG9yaXNlZFBlcm1pc3Npb24odGhpcy5uZ3hQZXJtaXNzaW9uc09ubHlUaGVuIHx8IHRoaXMubmd4UGVybWlzc2lvbnNUaGVuIHx8IHRoaXMudGVtcGxhdGVSZWYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVVbmF1dGhvcmlzZWRQZXJtaXNzaW9uKHRoaXMubmd4UGVybWlzc2lvbnNPbmx5RWxzZSB8fCB0aGlzLm5neFBlcm1pc3Npb25zRWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSlcclxuICAgICAgICAgICAgLmNhdGNoKCgvKipcclxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVVbmF1dGhvcmlzZWRQZXJtaXNzaW9uKHRoaXMubmd4UGVybWlzc2lvbnNPbmx5RWxzZSB8fCB0aGlzLm5neFBlcm1pc3Npb25zRWxzZSk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSB0ZW1wbGF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgaGFuZGxlVW5hdXRob3Jpc2VkUGVybWlzc2lvbih0ZW1wbGF0ZSkge1xyXG4gICAgICAgIGlmIChpc0Jvb2xlYW4odGhpcy5jdXJyZW50QXV0aG9yaXplZFN0YXRlKSAmJiAhdGhpcy5jdXJyZW50QXV0aG9yaXplZFN0YXRlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QXV0aG9yaXplZFN0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wZXJtaXNzaW9uc1VuYXV0aG9yaXplZC5lbWl0KHRoaXMucGVybWlzc2lvbnNTdGF0ZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0VW5BdXRob3JpemVkU3RyYXRlZ3lJbnB1dCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlTdHJhdGVneUFjY29yZGluZ1RvU3RyYXRlZ3lUeXBlKHRoaXMuZ2V0VW5BdXRob3JpemVkU3RyYXRlZ3lJbnB1dCgpKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uU2VydmljZS5vblVuQXV0aG9yaXNlZERlZmF1bHRTdHJhdGVneSAmJiAhdGhpcy5lbHNlQmxvY2tEZWZpbmVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseVN0cmF0ZWd5KHRoaXMuY29uZmlndXJhdGlvblNlcnZpY2Uub25VbkF1dGhvcmlzZWREZWZhdWx0U3RyYXRlZ3kpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93VGVtcGxhdGVCbG9ja0luVmlldyh0ZW1wbGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSB0ZW1wbGF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgaGFuZGxlQXV0aG9yaXNlZFBlcm1pc3Npb24odGVtcGxhdGUpIHtcclxuICAgICAgICBpZiAoaXNCb29sZWFuKHRoaXMuY3VycmVudEF1dGhvcml6ZWRTdGF0ZSkgJiYgdGhpcy5jdXJyZW50QXV0aG9yaXplZFN0YXRlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jdXJyZW50QXV0aG9yaXplZFN0YXRlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnBlcm1pc3Npb25zQXV0aG9yaXplZC5lbWl0KHRoaXMucGVybWlzc2lvbnNTdGF0ZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXV0aG9yaXplZFN0cmF0ZWd5SW5wdXQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFwcGx5U3RyYXRlZ3lBY2NvcmRpbmdUb1N0cmF0ZWd5VHlwZSh0aGlzLmdldEF1dGhvcml6ZWRTdHJhdGVneUlucHV0KCkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb25TZXJ2aWNlLm9uQXV0aG9yaXNlZERlZmF1bHRTdHJhdGVneSAmJiAhdGhpcy50aGVuQmxvY2tEZWZpbmVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseVN0cmF0ZWd5KHRoaXMuY29uZmlndXJhdGlvblNlcnZpY2Uub25BdXRob3Jpc2VkRGVmYXVsdFN0cmF0ZWd5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1RlbXBsYXRlQmxvY2tJblZpZXcodGVtcGxhdGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gc3RyYXRlZ3lcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGFwcGx5U3RyYXRlZ3lBY2NvcmRpbmdUb1N0cmF0ZWd5VHlwZShzdHJhdGVneSkge1xyXG4gICAgICAgIGlmIChpc1N0cmluZyhzdHJhdGVneSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseVN0cmF0ZWd5KHN0cmF0ZWd5KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNGdW5jdGlvbihzdHJhdGVneSkpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93VGVtcGxhdGVCbG9ja0luVmlldyh0aGlzLnRlbXBsYXRlUmVmKTtcclxuICAgICAgICAgICAgKCgvKiogQHR5cGUgez99ICovIChzdHJhdGVneSkpKSh0aGlzLnRlbXBsYXRlUmVmLCB0aGlzLnBlcm1pc3Npb25zU3RhdGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSB0ZW1wbGF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgc2hvd1RlbXBsYXRlQmxvY2tJblZpZXcodGVtcGxhdGUpIHtcclxuICAgICAgICB0aGlzLnZpZXdDb250YWluZXIuY2xlYXIoKTtcclxuICAgICAgICBpZiAoIXRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0ZW1wbGF0ZSk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGdldEF1dGhvcmlzZWRUZW1wbGF0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmd4UGVybWlzc2lvbnNPbmx5VGhlblxyXG4gICAgICAgICAgICB8fCB0aGlzLm5neFBlcm1pc3Npb25zRXhjZXB0VGhlblxyXG4gICAgICAgICAgICB8fCB0aGlzLm5neFBlcm1pc3Npb25zVGhlblxyXG4gICAgICAgICAgICB8fCB0aGlzLnRlbXBsYXRlUmVmO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZWxzZUJsb2NrRGVmaW5lZCgpIHtcclxuICAgICAgICByZXR1cm4gISF0aGlzLm5neFBlcm1pc3Npb25zRXhjZXB0RWxzZSB8fCAhIXRoaXMubmd4UGVybWlzc2lvbnNFbHNlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgdGhlbkJsb2NrRGVmaW5lZCgpIHtcclxuICAgICAgICByZXR1cm4gISF0aGlzLm5neFBlcm1pc3Npb25zRXhjZXB0VGhlbiB8fCAhIXRoaXMubmd4UGVybWlzc2lvbnNUaGVuO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZ2V0QXV0aG9yaXplZFN0cmF0ZWd5SW5wdXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmd4UGVybWlzc2lvbnNPbmx5QXV0aG9yaXNlZFN0cmF0ZWd5IHx8XHJcbiAgICAgICAgICAgIHRoaXMubmd4UGVybWlzc2lvbnNFeGNlcHRBdXRob3Jpc2VkU3RyYXRlZ3kgfHxcclxuICAgICAgICAgICAgdGhpcy5uZ3hQZXJtaXNzaW9uc0F1dGhvcmlzZWRTdHJhdGVneTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGdldFVuQXV0aG9yaXplZFN0cmF0ZWd5SW5wdXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmd4UGVybWlzc2lvbnNPbmx5VW5hdXRob3Jpc2VkU3RyYXRlZ3kgfHxcclxuICAgICAgICAgICAgdGhpcy5uZ3hQZXJtaXNzaW9uc0V4Y2VwdFVuYXV0aG9yaXNlZFN0cmF0ZWd5IHx8XHJcbiAgICAgICAgICAgIHRoaXMubmd4UGVybWlzc2lvbnNVbmF1dGhvcmlzZWRTdHJhdGVneTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7P30gc3RyXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBhcHBseVN0cmF0ZWd5KHN0cikge1xyXG4gICAgICAgIGlmIChzdHIgPT09IE5neFBlcm1pc3Npb25zUHJlZGVmaW5lZFN0cmF0ZWdpZXMuU0hPVykge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dUZW1wbGF0ZUJsb2NrSW5WaWV3KHRoaXMudGVtcGxhdGVSZWYpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdHIgPT09IE5neFBlcm1pc3Npb25zUHJlZGVmaW5lZFN0cmF0ZWdpZXMuUkVNT1ZFKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgICAgICBjb25zdCBzdHJhdGVneSA9IHRoaXMuY29uZmlndXJhdGlvblNlcnZpY2UuZ2V0U3RyYXRlZ3koc3RyKTtcclxuICAgICAgICB0aGlzLnNob3dUZW1wbGF0ZUJsb2NrSW5WaWV3KHRoaXMudGVtcGxhdGVSZWYpO1xyXG4gICAgICAgIHN0cmF0ZWd5KHRoaXMudGVtcGxhdGVSZWYsIHRoaXMucGVybWlzc2lvbnNTdGF0ZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIHBlcm1pc3Npb24gc2VydmljZSBhZ2FpbnN0IHBhcmFtZXRlciBcIm5lZGRlZFBlcm1pc3Npb25zXCJcclxuICAgICAqIHRoZW4gdXBkYXRlIHRoaXMgY2xhc3MgcHJvcGVydHkgXCJwZXJtaXNzaW9uc1N0YXRlXCJcclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHs/fSBuZWRkZWRQZXJtaXNzaW9ucyBTZXRzIHRoZSBwZXJtaXNzaW9ucy9yb2xlcyB0byBjaGVjayAoaS5lIG5neFBlcm1pc3Npb25zT25seSlcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGdldFBlcm1pc3Npb25zKG5lZGRlZFBlcm1pc3Npb25zKSB7XHJcbiAgICAgICAgLy8gRW5zdXJlIHdlIHdvcmsgd2l0aCBhcnJheVxyXG4gICAgICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgICAgICB2YXIgcmVxdWVzdGVkUGVybWlzc2lvbnMgPSB0cmFuc2Zvcm1TdHJpbmdUb0FycmF5KG5lZGRlZFBlcm1pc3Npb25zKVxyXG4gICAgICAgIC8vIEFycmF5IG9mIHByb21pc2VzIHRoYXQgcmVxdWVzdCBwZXJtaXNzaW9uIGFuZCByb2xlcyBzZXJ2aWNlIHdpdGggXCJwZXJtaXNzaW9uXCJcclxuICAgICAgICA7XHJcbiAgICAgICAgLy8gQXJyYXkgb2YgcHJvbWlzZXMgdGhhdCByZXF1ZXN0IHBlcm1pc3Npb24gYW5kIHJvbGVzIHNlcnZpY2Ugd2l0aCBcInBlcm1pc3Npb25cIlxyXG4gICAgICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgICAgICB2YXIgcHJvbWlzZXMgPSBbXVxyXG4gICAgICAgIC8vIFJlc2V0IFwicGVybWlzc2lvbnMgc3RhdGVcIiBkaXJlY3RpdmUgY2xhc3MgcHJvcGVydHlcclxuICAgICAgICA7XHJcbiAgICAgICAgLy8gUmVzZXQgXCJwZXJtaXNzaW9ucyBzdGF0ZVwiIGRpcmVjdGl2ZSBjbGFzcyBwcm9wZXJ0eVxyXG4gICAgICAgIHRoaXMucGVybWlzc2lvbnNTdGF0ZSA9IHt9O1xyXG4gICAgICAgIGlmIChpc0FycmF5KHJlcXVlc3RlZFBlcm1pc3Npb25zKSkge1xyXG4gICAgICAgICAgICByZXF1ZXN0ZWRQZXJtaXNzaW9ucy5mb3JFYWNoKCgvKipcclxuICAgICAgICAgICAgICogQHBhcmFtIHs/fSB2YWx1ZVxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlcm1pc3Npb25zU3RhdGVbdmFsdWVdID0geyBoYXNQZXJtaXNzaW9uOiBmYWxzZSwgaGFzUm9sZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGhhcyBcIlBlcm1pc3Npb25cIlxyXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLnBlcm1pc3Npb25zU2VydmljZS5oYXNQZXJtaXNzaW9uKHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgvKipcclxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7P30gaGFzUGVybWlzc2lvblxyXG4gICAgICAgICAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgKGhhc1Blcm1pc3Npb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcm1pc3Npb25zU3RhdGVbdmFsdWVdLmhhc1Blcm1pc3Npb24gPSBoYXNQZXJtaXNzaW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNQZXJtaXNzaW9uO1xyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKCgvKipcclxuICAgICAgICAgICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICgpID0+IGZhbHNlKSkpO1xyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgaGFzIFwiUm9sZVwiXHJcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMucm9sZXNTZXJ2aWNlLmhhc09ubHlSb2xlcyh2YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0gez99IGhhc1Blcm1pc3Npb25cclxuICAgICAgICAgICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIChoYXNQZXJtaXNzaW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXJtaXNzaW9uc1N0YXRlW3ZhbHVlXS5oYXNSb2xlID0gaGFzUGVybWlzc2lvbjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzUGVybWlzc2lvbjtcclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAoKSA9PiBmYWxzZSkpKTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm4gcmVzdWx0IDpcclxuICAgICAgICAgKiB0cnVlIDogQXQgbGVhc3Qgb25lIG9mIG5lZWRlZFBlcm1pc3Npb24gZXhpc3RzIGluIHBlcm1pc3Npb24gb3Igcm9sZSBzZXJ2aWNlIChAc2VlIHRoaXMucGVybWlzc2lvbnNTdGF0ZSB0byBnZXQgYSBmdWxsIGRldGFpbCBvbiB3aWNoIHBlcm1pc3Npb24gaXMgdHJ1ZS9mYWxzZSlcclxuICAgICAgICAgKiBmYWxzZSA6IG5vbmUgb2YgbmVlZGVkUGVybWlzc2lvbiBleGlzdHMgaW4gIHBlcm1pc3Npb24gb3Igcm9sZSBzZXJ2aWNlXHJcbiAgICAgICAgKi9cclxuICAgICAgICByZXR1cm4gZnJvbShwcm9taXNlcykucGlwZShtZXJnZUFsbCgpLCBmaXJzdCgoLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHs/fSBoYXNQZXJtaXNzaW9uXHJcbiAgICAgICAgICogQHJldHVybiB7P31cclxuICAgICAgICAgKi9cclxuICAgICAgICAoaGFzUGVybWlzc2lvbikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gaGFzUGVybWlzc2lvbiA9PT0gdHJ1ZTtcclxuICAgICAgICB9KSwgZmFsc2UpLCBtYXAoKC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7P30gaGFzUGVybWlzc2lvblxyXG4gICAgICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgKGhhc1Blcm1pc3Npb24pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGhhc1Blcm1pc3Npb247XHJcbiAgICAgICAgfSkpKS50b1Byb21pc2UoKS50aGVuKCgvKipcclxuICAgICAgICAgKiBAcGFyYW0gez99IGhhc1Blcm1pc3Npb25cclxuICAgICAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIChoYXNQZXJtaXNzaW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBoYXNQZXJtaXNzaW9uO1xyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxufVxyXG5OZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5kZWNvcmF0b3JzID0gW1xyXG4gICAgeyB0eXBlOiBEaXJlY3RpdmUsIGFyZ3M6IFt7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ1tuZ3hQZXJtaXNzaW9uc09ubHldLFtuZ3hQZXJtaXNzaW9uc0V4Y2VwdF0nXHJcbiAgICAgICAgICAgIH0sXSB9XHJcbl07XHJcbi8qKiBAbm9jb2xsYXBzZSAqL1xyXG5OZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5jdG9yUGFyYW1ldGVycyA9ICgpID0+IFtcclxuICAgIHsgdHlwZTogTmd4UGVybWlzc2lvbnNTZXJ2aWNlIH0sXHJcbiAgICB7IHR5cGU6IE5neFBlcm1pc3Npb25zQ29uZmlndXJhdGlvblNlcnZpY2UgfSxcclxuICAgIHsgdHlwZTogTmd4Um9sZXNTZXJ2aWNlIH0sXHJcbiAgICB7IHR5cGU6IFZpZXdDb250YWluZXJSZWYgfSxcclxuICAgIHsgdHlwZTogQ2hhbmdlRGV0ZWN0b3JSZWYgfSxcclxuICAgIHsgdHlwZTogVGVtcGxhdGVSZWYgfVxyXG5dO1xyXG5OZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm9wRGVjb3JhdG9ycyA9IHtcclxuICAgIG5neFBlcm1pc3Npb25zT25seTogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICBuZ3hQZXJtaXNzaW9uc09ubHlUaGVuOiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgIG5neFBlcm1pc3Npb25zT25seUVsc2U6IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgbmd4UGVybWlzc2lvbnNFeGNlcHQ6IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgbmd4UGVybWlzc2lvbnNFeGNlcHRFbHNlOiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgIG5neFBlcm1pc3Npb25zRXhjZXB0VGhlbjogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICBuZ3hQZXJtaXNzaW9uc1RoZW46IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgbmd4UGVybWlzc2lvbnNFbHNlOiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgIG5neFBlcm1pc3Npb25zT25seUF1dGhvcmlzZWRTdHJhdGVneTogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICBuZ3hQZXJtaXNzaW9uc09ubHlVbmF1dGhvcmlzZWRTdHJhdGVneTogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICBuZ3hQZXJtaXNzaW9uc0V4Y2VwdFVuYXV0aG9yaXNlZFN0cmF0ZWd5OiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgIG5neFBlcm1pc3Npb25zRXhjZXB0QXV0aG9yaXNlZFN0cmF0ZWd5OiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgIG5neFBlcm1pc3Npb25zVW5hdXRob3Jpc2VkU3RyYXRlZ3k6IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgbmd4UGVybWlzc2lvbnNBdXRob3Jpc2VkU3RyYXRlZ3k6IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgcGVybWlzc2lvbnNBdXRob3JpemVkOiBbeyB0eXBlOiBPdXRwdXQgfV0sXHJcbiAgICBwZXJtaXNzaW9uc1VuYXV0aG9yaXplZDogW3sgdHlwZTogT3V0cHV0IH1dXHJcbn07XHJcbmlmIChmYWxzZSkge1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zT25seTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc09ubHlUaGVuO1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zT25seUVsc2U7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNFeGNlcHQ7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNFeGNlcHRFbHNlO1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zRXhjZXB0VGhlbjtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc1RoZW47XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNFbHNlO1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zT25seUF1dGhvcmlzZWRTdHJhdGVneTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc09ubHlVbmF1dGhvcmlzZWRTdHJhdGVneTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc0V4Y2VwdFVuYXV0aG9yaXNlZFN0cmF0ZWd5O1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zRXhjZXB0QXV0aG9yaXNlZFN0cmF0ZWd5O1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zVW5hdXRob3Jpc2VkU3RyYXRlZ3k7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNBdXRob3Jpc2VkU3RyYXRlZ3k7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUucGVybWlzc2lvbnNBdXRob3JpemVkO1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNEaXJlY3RpdmUucHJvdG90eXBlLnBlcm1pc3Npb25zVW5hdXRob3JpemVkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7P31cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLnByb3RvdHlwZS5pbml0UGVybWlzc2lvblN1YnNjcmlwdGlvbjtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgez99XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUuZmlyc3RNZXJnZVVudXNlZFJ1bjtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgez99XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUuY3VycmVudEF1dGhvcml6ZWRTdGF0ZTtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgez99XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUucGVybWlzc2lvbnNTdGF0ZTtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgez99XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUucGVybWlzc2lvbnNTZXJ2aWNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7P31cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLnByb3RvdHlwZS5jb25maWd1cmF0aW9uU2VydmljZTtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgez99XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUucm9sZXNTZXJ2aWNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7P31cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLnByb3RvdHlwZS52aWV3Q29udGFpbmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7P31cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zRGlyZWN0aXZlLnByb3RvdHlwZS5jaGFuZ2VEZXRlY3RvcjtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgez99XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0RpcmVjdGl2ZS5wcm90b3R5cGUudGVtcGxhdGVSZWY7XHJcbn1cciJdfQ==