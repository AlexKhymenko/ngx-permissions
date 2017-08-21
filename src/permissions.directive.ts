import {
    Directive, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef,
    ViewContainerRef
} from "@angular/core";
import { PermissionsService } from "./permissions.service";
import { Subscription } from "rxjs/Subscription";
import { RolesService } from './roles.service';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';

@Directive({
    selector: '[permissions],[permissionsOnly],[permissionsExcept]'
})
export class PermissionsDirective implements OnInit, OnDestroy {

    @Input() permissionsOnly: any;

    @Input() permissionsExcept: any;

    @Output() permissionsAuthorized = new EventEmitter();
    @Output() permissionsUnauthorized = new EventEmitter();

    private initPermissionSubscription: Subscription;

    private firstRun = false;

    constructor(private permissionsService: PermissionsService,
                private rolesService: RolesService,
                private viewContainer: ViewContainerRef,
                private templateRef: TemplateRef<EvryIfPermissionContext>) {}

    ngOnInit(): void {
        this.initPermissionSubscription = Observable.merge(this.permissionsService.permissions$, this.rolesService.roles$).subscribe((permissions) => {
            //it will run always 2 times so we can ignore the first time;
            if (!this.firstRun) {
                this.firstRun = true;
                return;
            }
            if (!!this.permissionsOnly) {
                Promise.all([this.permissionsService.hasPermission(this.permissionsOnly), this.rolesService.hasOnlyRoles(this.permissionsOnly)])
                    .then(([permissionPr,  roles]) => {
                    if (permissionPr || roles) {
                        this.permissionsAuthorized.emit();
                        this.viewContainer.clear();
                        this.viewContainer.createEmbeddedView(this.templateRef);
                    } else {
                        this.permissionsUnauthorized.emit();
                        this.viewContainer.clear();
                    }
                }).catch(() => {
                    this.permissionsUnauthorized.emit();
                    this.viewContainer.clear();
                })
            }

            if (!!this.permissionsExcept) {
                Promise.all([this.permissionsService.hasPermission(this.permissionsExcept), this.rolesService.hasOnlyRoles(this.permissionsExcept)])
                    .then(([permissionsPr, roles]) => {
                    if (permissionsPr || roles) {
                        this.permissionsUnauthorized.emit();
                        this.viewContainer.clear();
                    } else {
                        this.permissionsAuthorized.emit();
                        this.viewContainer.clear();
                        this.viewContainer.createEmbeddedView(this.templateRef);
                    }
                }).catch(() => {
                    this.permissionsUnauthorized.emit();
                    this.viewContainer.clear();
                })
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
