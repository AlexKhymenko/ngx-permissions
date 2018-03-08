import {
    Directive,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewContainerRef
} from "@angular/core";
import { NgxPermissionsService } from "../service/permissions.service";
import { Subscription } from "rxjs/Subscription";
import { NgxRolesService } from '../service/roles.service';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/skip';
import { isBoolean, isFunction, isString, notEmptyValue } from '../utils/utils';
import { NgxPermissionsConfigurationService, StrategyFunction } from '../service/configuration.service';
import { NgxPermissionsPredefinedStrategies } from '../enums/predefined-strategies.enum';

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
    //skip first run cause merge will fire twice
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
        return this.permissionsService.permissions$
                         .merge(this.rolesService.roles$)
                         .skip(this.firstMergeUnusedRun)
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
                    if (this.unauthorisedStrategyDefined() === NgxPermissionsPredefinedStrategies.SHOW) {
                        this.showTemplateBlockInView(this.templateRef);
                        return;
                    }

                    if (this.unauthorisedStrategyDefined() === NgxPermissionsPredefinedStrategies.REMOVE) {
                        this.viewContainer.clear();
                        return;
                    }
                    const strategy = this.configurationService.getStrategy(<string>this.unauthorisedStrategyDefined());
                    this.showTemplateBlockInView(this.templateRef);
                    strategy(this.templateRef);
                } else if (isFunction(this.unauthorisedStrategyDefined())) {
                    this.showTemplateBlockInView(this.templateRef);
                    (this.unauthorisedStrategyDefined() as Function)(this.templateRef)
                }
                return;
            }

            if (this.configurationService.onUnAuthorisedDefaultStrategy && this.noElseBlockDefined()) {
                if (this.configurationService.onUnAuthorisedDefaultStrategy === NgxPermissionsPredefinedStrategies.SHOW) {
                    this.showTemplateBlockInView(this.templateRef);
                    return;
                }

                if (this.configurationService.onUnAuthorisedDefaultStrategy === NgxPermissionsPredefinedStrategies.REMOVE) {
                    this.viewContainer.clear();
                    return;
                }
                const strategy = this.configurationService.getStrategy(this.configurationService.onUnAuthorisedDefaultStrategy);
                this.showTemplateBlockInView(this.templateRef);
                strategy(this.templateRef);
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
                    if (this.onlyAuthorisedStrategyDefined() === NgxPermissionsPredefinedStrategies.SHOW) {
                        this.showTemplateBlockInView(this.templateRef);
                        return;
                    }

                    if (this.onlyAuthorisedStrategyDefined() === NgxPermissionsPredefinedStrategies.REMOVE) {

                        this.viewContainer.clear();
                        return;
                    }
                    const strategy = this.configurationService.getStrategy(<string>this.onlyAuthorisedStrategyDefined());
                    this.showTemplateBlockInView(this.templateRef);
                    strategy(this.templateRef);
                } else if (isFunction(this.onlyAuthorisedStrategyDefined())) {
                    this.showTemplateBlockInView(this.templateRef);
                    (this.onlyAuthorisedStrategyDefined() as Function)(this.templateRef)
                }
                return;
            }

            if (this.configurationService.onAuthorisedDefaultStrategy && this.noThenBlockDefined()) {
                if (this.configurationService.onAuthorisedDefaultStrategy === NgxPermissionsPredefinedStrategies.SHOW) {
                    this.showTemplateBlockInView(this.templateRef);
                    return;
                }

                if (this.configurationService.onAuthorisedDefaultStrategy === NgxPermissionsPredefinedStrategies.REMOVE) {
                    this.viewContainer.clear();
                    return;
                }
                const strategy = this.configurationService.getStrategy(this.configurationService.onAuthorisedDefaultStrategy);
                this.showTemplateBlockInView(this.templateRef);
                strategy(this.templateRef);
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
            || this.templateRef
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
            this.ngxPermissionsAuthorisedStrategy
    }

    private unauthorisedStrategyDefined() {
        return this.ngxPermissionsOnlyUnauthorisedStrategy ||
            this.ngxPermissionsExceptUnauthorisedStrategy ||
            this.ngxPermissionsUnauthorisedStrategy
    }
}
