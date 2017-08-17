import {
    Directive, Input, OnInit, ElementRef, OnChanges, SimpleChanges, OnDestroy,
    ViewContainerRef, TemplateRef
} from "@angular/core";
import { PermissionsService } from "./permissions.service";
import { Subscription } from "rxjs/Subscription";

@Directive({
    selector: '[permissions]'
})
export class PermissionsDirective implements OnInit, OnDestroy {

    @Input() permissionsOnly: any;

    @Input() permissionsExcept: any;

    private initPermissionSubscription: Subscription;

    constructor(private permissionsService: PermissionsService,
                private viewContainer: ViewContainerRef,
                private templateRef: TemplateRef<EvryIfPermissionContext>) {}

    ngOnInit(): void {
        this.initPermissionSubscription = this.permissionsService.permissions$.subscribe((permissions) => {
            if (!!this.permissionsOnly) {
                if (!this.permissionsService.hasPermission(this.permissionsOnly)) {
                    this.viewContainer.clear();
                } else {
                    this.viewContainer.clear();
                    this.viewContainer.createEmbeddedView(this.templateRef);
                }
            }

            if (!!this.permissionsExcept) {
                if (this.permissionsService.hasPermission(this.permissionsExcept)) {
                    this.viewContainer.clear();
                } else {
                    this.viewContainer.clear();
                    this.viewContainer.createEmbeddedView(this.templateRef);
                }
            }

        });
    }

    ngOnDestroy(): void {
        if (!!this.initPermissionSubscription) {
            this.initPermissionSubscription.unsubscribe();
        }
    }
}

export class EvryIfPermissionContext {
    public $implicit: any = null;
    public permissions: any = null;
}
