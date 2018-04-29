import { Directive, EventEmitter, Input, OnInit, Output, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[ngxPermissionsOnly],[ngxPermissionsExcept]'
})
export class NgxPermissionsRestrictStubDirective implements OnInit {

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


    constructor(private viewContainer: ViewContainerRef) {}


    ngOnInit(): void {
        this.viewContainer.clear();
        if (this.getUnAuthorizedTemplate()) {
            this.viewContainer.createEmbeddedView(this.getUnAuthorizedTemplate());
        }
        this.permissionsUnauthorized.emit();
    }


    private getUnAuthorizedTemplate() {
        return this.ngxPermissionsOnlyElse ||
            this.ngxPermissionsExceptElse ||
            this.ngxPermissionsElse;
    }

}
