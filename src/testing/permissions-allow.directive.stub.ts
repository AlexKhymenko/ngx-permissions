import { Directive, EventEmitter, Input, Output, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[ngxPermissionsOnly],[ngxPermissionsExcept]',

})
export class NgxPermissionsAllowStubDirective {

    @Input() ngxPermissionsOnly: string | string[];
    @Input() ngxPermissionsOnlyThen: TemplateRef<any>;
    @Input() ngxPermissionsOnlyElse: TemplateRef<any>;

    @Input() ngxPermissionsExcept: string | string[];
    @Input() ngxPermissionsExceptElse: TemplateRef<any>;
    @Input() ngxPermissionsExceptThen: TemplateRef<any>;

    @Input() ngxPermissionsThen: TemplateRef<any>;
    @Input() ngxPermissionsElse: TemplateRef<any>;

    @Output() permissionsAuthorized = new EventEmitter();
    @Output() permissionsUnauthorized = new EventEmitter();


    constructor(private viewContainer: ViewContainerRef,
                private templateRef: TemplateRef<any>) {}


    ngOnInit(): void {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.getAuthorizedTemplate());
    }


    private getAuthorizedTemplate() {
        return this.ngxPermissionsOnlyThen ||
            this.ngxPermissionsExceptThen ||
            this.ngxPermissionsThen ||
            this.templateRef
    }
}