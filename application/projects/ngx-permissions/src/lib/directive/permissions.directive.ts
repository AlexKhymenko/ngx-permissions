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

import { merge, Subscription, from } from 'rxjs';
import { skip, take, mergeAll, first, map } from 'rxjs/operators';

import { NgxPermissionsPredefinedStrategies } from '../enums/predefined-strategies.enum';
import { NgxPermissionsConfigurationService, StrategyFunction } from '../service/configuration.service';
import { NgxPermissionsService } from '../service/permissions.service';
import { NgxRolesService } from '../service/roles.service';
import { isBoolean, isFunction, isString, notEmptyValue, transformStringToArray } from '../utils/utils';
import { isArray } from 'util';

// Struct. to keep directive track of permissions states
export type PermissionState = { [permission: string]: { hasPermission: boolean, hasRole: boolean } }

@Directive({
    selector: '[ngxPermissionsOnly],[ngxPermissionsExcept]'
})
export class NgxPermissionsDirective implements OnInit, OnDestroy, OnChanges {

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

    @Output() permissionsAuthorized = new EventEmitter<PermissionState>();
    @Output() permissionsUnauthorized = new EventEmitter<PermissionState>();

    private initPermissionSubscription: Subscription;
    // skip first run cause merge will fire twice
    private firstMergeUnusedRun = 1;
    private currentAuthorizedState: boolean;
    private permissionsState: PermissionState;

    constructor(
        private permissionsService: NgxPermissionsService,
        private configurationService: NgxPermissionsConfigurationService,
        private rolesService: NgxRolesService,
        private viewContainer: ViewContainerRef,
        private changeDetector: ChangeDetectorRef,
        private templateRef: TemplateRef<any>
    ) {
        this.permissionsState = {};
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
        this.getPermissions(this.ngxPermissionsExcept)
            .then((hasPermission: boolean) => {
                if (hasPermission) {
                    this.handleUnauthorisedPermission(this.ngxPermissionsExceptElse || this.ngxPermissionsElse);
                    return;
                }
                if (!!this.ngxPermissionsOnly) throw false;
                this.handleAuthorisedPermission(this.ngxPermissionsExceptThen || this.ngxPermissionsThen || this.templateRef);
            })
            .catch(() => {
                if (!!this.ngxPermissionsOnly) {
                    this.validateOnlyPermissions();
                } else {
                    this.handleAuthorisedPermission(this.ngxPermissionsExceptThen || this.ngxPermissionsThen || this.templateRef);
                }
            });
    }

    private validateOnlyPermissions(): void {
        // Validate permissions & store permission state
        this.getPermissions(this.ngxPermissionsOnly)
            .then((hasPermission: boolean) => {
                if (hasPermission) {
                    this.handleAuthorisedPermission(this.ngxPermissionsOnlyThen || this.ngxPermissionsThen || this.templateRef);
                } else {
                    this.handleUnauthorisedPermission(this.ngxPermissionsOnlyElse || this.ngxPermissionsElse);
                }
            })
            .catch(() => {
                this.handleUnauthorisedPermission(this.ngxPermissionsOnlyElse || this.ngxPermissionsElse);
            });
    }

    private handleUnauthorisedPermission(template: TemplateRef<any>): void {
        if (isBoolean(this.currentAuthorizedState) && !this.currentAuthorizedState) return;

        this.currentAuthorizedState = false;
        this.permissionsUnauthorized.emit(this.permissionsState);

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
        this.permissionsAuthorized.emit(this.permissionsState);

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

        strategy(this.templateRef, this.permissionsState);
    }

    /**
     * Check permission service against parameter "neddedPermissions"
     * then update this class property "permissionsState"
     * 
     * @param neddedPermissions Sets the permissions/roles to check (i.e ngxPermissionsOnly)
     */
    private getPermissions(neddedPermissions: string | string[]): Promise<boolean> {

        // Ensure we work with array
        var requestedPermissions: Array<string> = transformStringToArray(neddedPermissions)

        // Array of promises that request permission and roles service with "permission"
        var promises: Promise<boolean>[] = []

        // Reset "permissions state" directive class property
        this.permissionsState = {}

        if (isArray(requestedPermissions)) {
            requestedPermissions.forEach((value) => {
                this.permissionsState[value] = { hasPermission: false, hasRole: false }

                // Check if has "Permission"
                promises.push(
                    this.permissionsService.hasPermission(value)
                        .then((hasPermission) => {
                            this.permissionsState[value].hasPermission = hasPermission
                            return hasPermission;
                        })
                        .catch(() => false)
                )
                // Check if has "Role"
                promises.push(
                    this.rolesService.hasOnlyRoles(value)
                        .then((hasPermission) => {
                            this.permissionsState[value].hasRole = hasPermission
                            return hasPermission;
                        })
                        .catch(() => false)
                )
            })
        }

        /** 
         * Return result :
         * true : At least one of neededPermission exists in permission or role service (@see this.permissionsState to get a full detail on wich permission is true/false)
         * false : none of neededPermission exists in  permission or role service
        */
        return from(promises).pipe(
            mergeAll(),
            first((hasPermission: boolean) => {
                return hasPermission === true;
            }, false),
            map((hasPermission) => {
                return hasPermission;
            })
        ).toPromise().then((hasPermission: boolean) => {
            return hasPermission
        });
    }
}
