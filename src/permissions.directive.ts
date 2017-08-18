import {
    Directive, Input, OnInit, ElementRef, OnChanges, SimpleChanges, OnDestroy,
    ViewContainerRef, TemplateRef
} from "@angular/core";
import { PermissionsService } from "./permissions.service";
import { Subscription } from "rxjs/Subscription";
import { RolesService } from './roles.service';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';

@Directive({
    selector: '[permissions]'
})
export class PermissionsDirective implements OnInit, OnDestroy {

    @Input() permissionsOnly: any;

    @Input() permissionsExcept: any;

    private initPermissionSubscription: Subscription;

    constructor(private permissionsService: PermissionsService,
                private rolesService: RolesService,
                private viewContainer: ViewContainerRef,
                private templateRef: TemplateRef<EvryIfPermissionContext>) {}

    ngOnInit(): void {
        this.initPermissionSubscription = Observable.merge(this.permissionsService.permissions$, this.rolesService.roles$).subscribe((permissions) => {
            if (!!this.permissionsOnly) {
                if (this.permissionsService.hasPermission(this.permissionsOnly) || this.rolesService.hasOnlyRoles(this.permissionsOnly)) {
                    this.viewContainer.clear();
                    this.viewContainer.createEmbeddedView(this.templateRef);
                } else {
                    this.viewContainer.clear();
                }
            }

            if (!!this.permissionsExcept) {
                if (this.permissionsService.hasPermission(this.permissionsExcept) || this.rolesService.hasOnlyRoles(this.permissionsExcept)) {
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
