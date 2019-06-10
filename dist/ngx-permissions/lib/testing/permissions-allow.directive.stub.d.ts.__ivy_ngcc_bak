import { EventEmitter, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { StrategyFunction } from '../service/configuration.service';
export declare class NgxPermissionsAllowStubDirective implements OnInit {
    private viewContainer;
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
    permissionsAuthorized: EventEmitter<{}>;
    permissionsUnauthorized: EventEmitter<{}>;
    constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<any>);
    ngOnInit(): void;
    private getAuthorizedTemplate;
}
