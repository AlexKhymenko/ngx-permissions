import { Directive, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription, merge } from 'rxjs';
import { skip } from 'rxjs/operators';
import { NgxPermissionsPredefinedStrategies } from '../enums/predefined-strategies.enum';
import { NgxPermissionsConfigurationService, StrategyFunction } from '../service/configuration.service';
import { NgxPermissionsService } from '../service/permissions.service';
import { NgxRolesService } from '../service/roles.service';
import { isBoolean, isFunction, isString, notEmptyValue } from '../utils/utils';

@Directive({
    selector: '[ngxPermissionsOnly],[ngxPermissionsExcept]'
})
export class NgxPermissionsDirective implements OnInit, OnDestroy {

    @Input() ngxPermissionsOnly: string | string[];
    @Input() ngxPermissionsOnlyThen: TemplateRef<any>;
    @Input() ngxPermissionsOnlyElse: TemplateRef<any>;

    @Input() ngxPermissionsExcept: string | string[];
    @Input() ngxPermissionsExceptElse: TemplateRef<any>;
    @Input() ngxPermissionsExceptThen: TemplateRef<any>;

    @Input() ngxPermissionsThen: TemplateRef<any>;
    @Input() ngxPermissionsElse: TemplateRef<any>;

    @Input() ngxPermissionsOnlyAuthorisedStrategy: string | StrategyFunction;
    @Input() ngxPermissionsOnlyUnauthorisedStrategy: string | StrategyFunction;

    @Input() ngxPermissionsExceptUnauthorisedStrategy: string | StrategyFunction;
    @Input() ngxPermissionsExceptAuthorisedStrategy: string | StrategyFunction;

    @Input() ngxPermissionsUnauthorisedStrategy: string | StrategyFunction;
    @Input() ngxPermissionsAuthorisedStrategy: string | StrategyFunction;

    @Output() permissionsAuthorized = new EventEmitter();
    @Output() permissionsUnauthorized = new EventEmitter();

    private initPermissionSubscription: Subscription;
    // skip first run cause merge will fire twice
    private firstMergeUnusedRun = 1;
    private currentAuthorizedState: boolean;

    constructor(
        private permissionsService: NgxPermissionsService,
        private configurationService: NgxPermissionsConfigurationService,
        private rolesService: NgxRolesService,
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>
    ) {
    }

    ngOnInit(): void {
        this.viewContainer.clear();
        this.initPermissionSubscription = this.validateExceptOnlyPermissions();
    }

    ngOnDestroy(): void {
        if (this.initPermissionSubscription) {
            this.initPermissionSubscription.unsubscribe();
        }
    }

    private validateExceptOnlyPermissions(): Subscription {
        return merge(this.permissionsService.permissions$, this.rolesService.roles$)
            .pipe(skip(this.firstMergeUnusedRun))
            .subscribe(() => {
                if (notEmptyValue(this.ngxPermissionsExcept)) {
                    return this.validateExceptAndOnlyPermissions();
                }

                if (notEmptyValue(this.ngxPermissionsOnly)) {
                    return this.validateOnlyPermissions();
                }

                this.handleAuthorisedPermission(this.getAuthorisedTemplates());
            });
    }

    private validateExceptAndOnlyPermissions(): void {
        Promise.all([ this.permissionsService.hasPermission(this.ngxPermissionsExcept), this.rolesService.hasOnlyRoles(this.ngxPermissionsExcept) ])
               .then(([ hasPermission, hasRole ]) => {
                   if (hasPermission || hasRole) {
                       this.handleUnauthorisedPermission(this.ngxPermissionsExceptElse || this.ngxPermissionsElse);
                   } else {
                       if (!!this.ngxPermissionsOnly) {
                           throw false;
                       } else {
                           this.handleAuthorisedPermission(this.ngxPermissionsExceptThen || this.ngxPermissionsThen || this.templateRef);
                       }
                   }
               }).catch(() => {
            if (!!this.ngxPermissionsOnly) {
                this.validateOnlyPermissions();
            } else {
                this.handleAuthorisedPermission(this.ngxPermissionsExceptThen || this.ngxPermissionsThen || this.templateRef);
            }
        });
    }

    private validateOnlyPermissions(): void {
        Promise.all([ this.permissionsService.hasPermission(this.ngxPermissionsOnly), this.rolesService.hasOnlyRoles(this.ngxPermissionsOnly) ])
               .then(([ permissionPr, roles ]) => {
                   if (permissionPr || roles) {
                       this.handleAuthorisedPermission(this.ngxPermissionsOnlyThen || this.ngxPermissionsThen || this.templateRef);
                   } else {
                       this.handleUnauthorisedPermission(this.ngxPermissionsOnlyElse || this.ngxPermissionsElse);
                   }
               }).catch(() => {
            this.handleUnauthorisedPermission(this.ngxPermissionsOnlyElse || this.ngxPermissionsElse);
        });
    }

    private handleUnauthorisedPermission(template: TemplateRef<any>): void {

        if (!isBoolean(this.currentAuthorizedState) || this.currentAuthorizedState) {
            this.currentAuthorizedState = false;
            this.permissionsUnauthorized.emit();

            if (this.unauthorisedStrategyDefined()) {
                if (isString(this.unauthorisedStrategyDefined())) {
                    this.applyStrategy(this.unauthorisedStrategyDefined());
                } else if (isFunction(this.unauthorisedStrategyDefined())) {
                    this.showTemplateBlockInView(this.templateRef);
                    (this.unauthorisedStrategyDefined() as Function)(this.templateRef);
                }
                return;
            }

            if (this.configurationService.onUnAuthorisedDefaultStrategy && this.noElseBlockDefined()) {
                this.applyStrategy(this.configurationService.onUnAuthorisedDefaultStrategy);
            } else {
                this.showTemplateBlockInView(template);
            }

        }
    }

    private handleAuthorisedPermission(template: TemplateRef<any>): void {
        if (!isBoolean(this.currentAuthorizedState) || !this.currentAuthorizedState) {
            this.currentAuthorizedState = true;
            this.permissionsAuthorized.emit();

            if (this.onlyAuthorisedStrategyDefined()) {
                if (isString(this.onlyAuthorisedStrategyDefined())) {
                    this.applyStrategy(this.onlyAuthorisedStrategyDefined());
                } else if (isFunction(this.onlyAuthorisedStrategyDefined())) {
                    this.showTemplateBlockInView(this.templateRef);
                    (this.onlyAuthorisedStrategyDefined() as Function)(this.templateRef);
                }
                return;
            }

            if (this.configurationService.onAuthorisedDefaultStrategy && this.noThenBlockDefined()) {
                this.applyStrategy(this.configurationService.onAuthorisedDefaultStrategy);
            } else {
                this.showTemplateBlockInView(template);
            }
        }
    }

    private showTemplateBlockInView(template: TemplateRef<any>): void {
        this.viewContainer.clear();
        if (!template) {
            return;
        }

        this.viewContainer.createEmbeddedView(template);
    }

    private getAuthorisedTemplates(): TemplateRef<any> {
        return this.ngxPermissionsOnlyThen
            || this.ngxPermissionsExceptThen
            || this.ngxPermissionsThen
            || this.templateRef;
    }

    private noElseBlockDefined(): boolean {
        return !this.ngxPermissionsExceptElse || !this.ngxPermissionsElse;
    }

    private noThenBlockDefined() {
        return !this.ngxPermissionsExceptThen || !this.ngxPermissionsThen;
    }

    private onlyAuthorisedStrategyDefined() {
        return this.ngxPermissionsOnlyAuthorisedStrategy ||
            this.ngxPermissionsExceptAuthorisedStrategy ||
            this.ngxPermissionsAuthorisedStrategy;
    }

    private unauthorisedStrategyDefined() {
        return this.ngxPermissionsOnlyUnauthorisedStrategy ||
            this.ngxPermissionsExceptUnauthorisedStrategy ||
            this.ngxPermissionsUnauthorisedStrategy;
    }

    private applyStrategy(str: any) {
        if (str === NgxPermissionsPredefinedStrategies.SHOW) {
            this.showTemplateBlockInView(this.templateRef);
            return;
        }

        if (str === NgxPermissionsPredefinedStrategies.REMOVE) {
            this.viewContainer.clear();
            return;
        }
        const strategy = this.configurationService.getStrategy(str);
        this.showTemplateBlockInView(this.templateRef);
        strategy(this.templateRef);
    }

}
