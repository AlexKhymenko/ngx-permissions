import { EventEmitter, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { StrategyFunction } from '../service/configuration.service';
import * as ɵngcc0 from '@angular/core';
export declare class NgxPermissionsRestrictStubDirective implements OnInit {
    private viewContainer;
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
    permissionsAuthorized: EventEmitter<{}>;
    permissionsUnauthorized: EventEmitter<{}>;
    constructor(viewContainer: ViewContainerRef);
    ngOnInit(): void;
    private getUnAuthorizedTemplate;
    static ngDirectiveDef: ɵngcc0.ɵɵDirectiveDefWithMeta<NgxPermissionsRestrictStubDirective, "[ngxPermissionsOnly],[ngxPermissionsExcept]", never, { 'ngxPermissionsOnly': "ngxPermissionsOnly", 'ngxPermissionsOnlyThen': "ngxPermissionsOnlyThen", 'ngxPermissionsOnlyElse': "ngxPermissionsOnlyElse", 'ngxPermissionsExcept': "ngxPermissionsExcept", 'ngxPermissionsExceptElse': "ngxPermissionsExceptElse", 'ngxPermissionsExceptThen': "ngxPermissionsExceptThen", 'ngxPermissionsThen': "ngxPermissionsThen", 'ngxPermissionsElse': "ngxPermissionsElse", 'ngxPermissionsOnlyAuthorisedStrategy': "ngxPermissionsOnlyAuthorisedStrategy", 'ngxPermissionsOnlyUnauthorisedStrategy': "ngxPermissionsOnlyUnauthorisedStrategy", 'ngxPermissionsExceptUnauthorisedStrategy': "ngxPermissionsExceptUnauthorisedStrategy", 'ngxPermissionsExceptAuthorisedStrategy': "ngxPermissionsExceptAuthorisedStrategy", 'ngxPermissionsUnauthorisedStrategy': "ngxPermissionsUnauthorisedStrategy", 'ngxPermissionsAuthorisedStrategy': "ngxPermissionsAuthorisedStrategy" }, { 'permissionsAuthorized': "permissionsAuthorized", 'permissionsUnauthorized': "permissionsUnauthorized" }, never>;
}

//# sourceMappingURL=permissions-restrict.directive.stub.d.ts.map