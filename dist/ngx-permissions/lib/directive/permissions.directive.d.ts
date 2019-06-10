import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgxPermissionsConfigurationService, StrategyFunction } from '../service/configuration.service';
import { NgxPermissionsService } from '../service/permissions.service';
import { NgxRolesService } from '../service/roles.service';
import * as ɵngcc0 from '@angular/core';
export declare type PermissionState = {
    [permission: string]: {
        hasPermission: boolean;
        hasRole: boolean;
    };
};
export declare class NgxPermissionsDirective implements OnInit, OnDestroy, OnChanges {
    private permissionsService;
    private configurationService;
    private rolesService;
    private viewContainer;
    private changeDetector;
    private templateRef;
    ngxPermissionsOnly: string | string[];
    ngxPermissionsOnlyThen: TemplateRef<any>;
    ngxPermissionsOnlyElse: TemplateRef<any>;
    ngxPermissionsExcept: string | string[];
    ngxPermissionsExceptElse: TemplateRef<any>;
    ngxPermissionsExceptThen: TemplateRef<any>;
    ngxPermissionsThen: TemplateRef<any>;
    ngxPermissionsElse: TemplateRef<any>;
    ngxPermissionsOnlyAuthorisedStrategy: string | StrategyFunction;
    ngxPermissionsOnlyUnauthorisedStrategy: string | StrategyFunction;
    ngxPermissionsExceptUnauthorisedStrategy: string | StrategyFunction;
    ngxPermissionsExceptAuthorisedStrategy: string | StrategyFunction;
    ngxPermissionsUnauthorisedStrategy: string | StrategyFunction;
    ngxPermissionsAuthorisedStrategy: string | StrategyFunction;
    permissionsAuthorized: EventEmitter<PermissionState>;
    permissionsUnauthorized: EventEmitter<PermissionState>;
    private initPermissionSubscription;
    private firstMergeUnusedRun;
    private currentAuthorizedState;
    private permissionsState;
    constructor(permissionsService: NgxPermissionsService, configurationService: NgxPermissionsConfigurationService, rolesService: NgxRolesService, viewContainer: ViewContainerRef, changeDetector: ChangeDetectorRef, templateRef: TemplateRef<any>);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private validateExceptOnlyPermissions;
    private validateExceptAndOnlyPermissions;
    private validateOnlyPermissions;
    private handleUnauthorisedPermission;
    private handleAuthorisedPermission;
    private applyStrategyAccordingToStrategyType;
    private showTemplateBlockInView;
    private getAuthorisedTemplates;
    private elseBlockDefined;
    private thenBlockDefined;
    private getAuthorizedStrategyInput;
    private getUnAuthorizedStrategyInput;
    private applyStrategy;
    /**
     * Check permission service against parameter "neddedPermissions"
     * then update this class property "permissionsState"
     *
     * @param neddedPermissions Sets the permissions/roles to check (i.e ngxPermissionsOnly)
     */
    private getPermissions;
    static ngDirectiveDef: ɵngcc0.ɵɵDirectiveDefWithMeta<NgxPermissionsDirective, "[ngxPermissionsOnly],[ngxPermissionsExcept]", never, { 'ngxPermissionsOnly': "ngxPermissionsOnly", 'ngxPermissionsOnlyThen': "ngxPermissionsOnlyThen", 'ngxPermissionsOnlyElse': "ngxPermissionsOnlyElse", 'ngxPermissionsExcept': "ngxPermissionsExcept", 'ngxPermissionsExceptElse': "ngxPermissionsExceptElse", 'ngxPermissionsExceptThen': "ngxPermissionsExceptThen", 'ngxPermissionsThen': "ngxPermissionsThen", 'ngxPermissionsElse': "ngxPermissionsElse", 'ngxPermissionsOnlyAuthorisedStrategy': "ngxPermissionsOnlyAuthorisedStrategy", 'ngxPermissionsOnlyUnauthorisedStrategy': "ngxPermissionsOnlyUnauthorisedStrategy", 'ngxPermissionsExceptUnauthorisedStrategy': "ngxPermissionsExceptUnauthorisedStrategy", 'ngxPermissionsExceptAuthorisedStrategy': "ngxPermissionsExceptAuthorisedStrategy", 'ngxPermissionsUnauthorisedStrategy': "ngxPermissionsUnauthorisedStrategy", 'ngxPermissionsAuthorisedStrategy': "ngxPermissionsAuthorisedStrategy" }, { 'permissionsAuthorized': "permissionsAuthorized", 'permissionsUnauthorized': "permissionsUnauthorized" }, never>;
}

//# sourceMappingURL=permissions.directive.d.ts.map