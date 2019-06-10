import { Directive, EventEmitter, Input, OnInit, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { StrategyFunction } from '../service/configuration.service';

@Directive({
    selector: '[ngxPermissionsOnly],[ngxPermissionsExcept]'
})
export class NgxPermissionsAllowStubDirective implements OnInit {

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


    constructor(private viewContainer: ViewContainerRef,
                private templateRef: TemplateRef<any>) {}


    ngOnInit(): void {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.getAuthorizedTemplate());
        this.permissionsUnauthorized.emit();
    }


    private getAuthorizedTemplate() {
        return this.ngxPermissionsOnlyThen ||
            this.ngxPermissionsExceptThen ||
            this.ngxPermissionsThen ||
            this.templateRef;
    }

}
