import {
    ChangeDetectorRef,
    Directive,
    EventEmitter,
    Input, OnChanges,
    OnDestroy,
    OnInit,
    Output, SimpleChanges,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';

import { merge, Subscription } from 'rxjs';
import { skip, take } from 'rxjs/operators';

import { NgxPermissionsPredefinedStrategies } from '../enums/predefined-strategies.enum';
import { NgxPermissionsConfigurationService, StrategyFunction } from '../service/configuration.service';
import { NgxPermissionsService } from '../service/permissions.service';
import { NgxRolesService } from '../service/roles.service';
import { isBoolean, isFunction, isString, notEmptyValue } from '../utils/utils';

@Directive({
    selector: '[ngxPermissionsOnly],[ngxPermissionsExcept]'
})
export class NgxPermissionsDirective implements OnInit, OnDestroy, OnChanges  {

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
        private changeDetector: ChangeDetectorRef,
        private templateRef: TemplateRef<any>
    ) {
    }

    ngOnInit(): void {
        this.viewContainer.clear();
        this.initPermissionSubscription = this.validateExceptOnlyPermissions();
    }


    ngOnChanges(changes: SimpleChanges): void {
        const onlyChanges = changes['ngxPermissionsOnly'];
        const exceptChanges = changes['ngxPermissionsExcept'];
        if (onlyChanges || exceptChanges) {
            // Due to bug when you pass empty array
            if (onlyChanges && onlyChanges.firstChange) return;
            if (exceptChanges && exceptChanges.firstChange) return;

            merge(this.permissionsService.permissions$, this.rolesService.roles$)
                .pipe(skip(this.firstMergeUnusedRun), take(1))
                .subscribe(() => {
                    if (notEmptyValue(this.ngxPermissionsExcept)) {
                        this.validateExceptAndOnlyPermissions();
                        return;
                    }

                    if (notEmptyValue(this.ngxPermissionsOnly)) {
                        this.validateOnlyPermissions();
                        return;
                    }

                    this.handleAuthorisedPermission(this.getAuthorisedTemplates());
                });
        }
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
                    this.validateExceptAndOnlyPermissions();
                    return;
                }

                if (notEmptyValue(this.ngxPermissionsOnly)) {
                    this.validateOnlyPermissions();
                    return;
                }
                this.handleAuthorisedPermission(this.getAuthorisedTemplates());
            });
    }

    private validateExceptAndOnlyPermissions(): void {
        Promise.all([this.permissionsService.hasPermission(this.ngxPermissionsExcept), this.rolesService.hasOnlyRoles(this.ngxPermissionsExcept)])
            .then(([hasPermission, hasRole]) => {
                if (hasPermission || hasRole) {
                    this.handleUnauthorisedPermission(this.ngxPermissionsExceptElse || this.ngxPermissionsElse);
                    return;
                }

                if (!!this.ngxPermissionsOnly)  throw false;

                this.handleAuthorisedPermission(this.ngxPermissionsExceptThen || this.ngxPermissionsThen || this.templateRef);

            }).catch(() => {
                if (!!this.ngxPermissionsOnly) {
                    this.validateOnlyPermissions();
                } else {
                    this.handleAuthorisedPermission(this.ngxPermissionsExceptThen || this.ngxPermissionsThen || this.templateRef);
                }
        });
    }

    private validateOnlyPermissions(): void {
        Promise.all([this.permissionsService.hasPermission(this.ngxPermissionsOnly), this.rolesService.hasOnlyRoles(this.ngxPermissionsOnly)])
            .then(([hasPermissions, hasRoles]) => {
                if (hasPermissions || hasRoles) {
                    this.handleAuthorisedPermission(this.ngxPermissionsOnlyThen || this.ngxPermissionsThen || this.templateRef);
                } else {
                    this.handleUnauthorisedPermission(this.ngxPermissionsOnlyElse || this.ngxPermissionsElse);
                }
            }).catch(() => {
                this.handleUnauthorisedPermission(this.ngxPermissionsOnlyElse || this.ngxPermissionsElse);
        });
    }

    private handleUnauthorisedPermission(template: TemplateRef<any>): void {
        if (isBoolean(this.currentAuthorizedState) && !this.currentAuthorizedState) return;

        this.currentAuthorizedState = false;
        this.permissionsUnauthorized.emit();

        if (this.getUnAuthorizedStrategyInput()) {
            this.applyStrategyAccordingToStrategyType(this.getUnAuthorizedStrategyInput());
            return;
        }

        if (this.configurationService.onUnAuthorisedDefaultStrategy && !this.elseBlockDefined()) {
            this.applyStrategy(this.configurationService.onUnAuthorisedDefaultStrategy);
        } else {
            this.showTemplateBlockInView(template);
        }

    }

    private handleAuthorisedPermission(template: TemplateRef<any>): void {
        if (isBoolean(this.currentAuthorizedState) && this.currentAuthorizedState) return;

        this.currentAuthorizedState = true;
        this.permissionsAuthorized.emit();

        if (this.getAuthorizedStrategyInput()) {
            this.applyStrategyAccordingToStrategyType(this.getAuthorizedStrategyInput());
            return;
        }

        if (this.configurationService.onAuthorisedDefaultStrategy && !this.thenBlockDefined()) {
            this.applyStrategy(this.configurationService.onAuthorisedDefaultStrategy);
        } else {
            this.showTemplateBlockInView(template);
        }
    }

    private applyStrategyAccordingToStrategyType(strategy: string | Function): void {
        if (isString(strategy)) {
            this.applyStrategy(strategy);
            return;
        }

        if (isFunction(strategy)) {
            this.showTemplateBlockInView(this.templateRef);
            (strategy as Function)(this.templateRef);
            return;
        }
    }

    private showTemplateBlockInView(template: TemplateRef<any>): void {
        this.viewContainer.clear();
        if (!template) {
            return;
        }

        this.viewContainer.createEmbeddedView(template);
        this.changeDetector.markForCheck();
    }

    private getAuthorisedTemplates(): TemplateRef<any> {
        return this.ngxPermissionsOnlyThen
            || this.ngxPermissionsExceptThen
            || this.ngxPermissionsThen
            || this.templateRef;
    }

    private elseBlockDefined(): boolean {
        return !!this.ngxPermissionsExceptElse || !!this.ngxPermissionsElse;
    }

    private thenBlockDefined() {
        return !!this.ngxPermissionsExceptThen || !!this.ngxPermissionsThen;
    }

    private getAuthorizedStrategyInput() {
        return this.ngxPermissionsOnlyAuthorisedStrategy ||
            this.ngxPermissionsExceptAuthorisedStrategy ||
            this.ngxPermissionsAuthorisedStrategy;
    }

    private getUnAuthorizedStrategyInput() {
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
