import {
    Directive, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef,
    ViewContainerRef
} from "@angular/core";
import { NgxPermissionsService } from "../service/permissions.service";
import { Subscription } from "rxjs/Subscription";
import { NgxRolesService } from '../service/roles.service';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';

@Directive({
    selector: '[ngxPermissionsOnly],[ngxPermissionsExcept]'
})
export class NgxPermissionsDirective implements OnInit, OnDestroy {

    @Input() ngxPermissionsOnly: any;

    @Input() ngxPermissionsExcept: any;

    @Output() permissionsAuthorized = new EventEmitter();
    @Output() permissionsUnauthorized = new EventEmitter();

    private initPermissionSubscription: Subscription;

    private firstRun = false;

    constructor(private permissionsService: NgxPermissionsService,
                private rolesService: NgxRolesService,
                private viewContainer: ViewContainerRef,
                private templateRef: TemplateRef<EvryIfPermissionContext>) {}

    ngOnInit(): void {
        this.initPermissionSubscription = Observable.merge(this.permissionsService.permissions$, this.rolesService.roles$).subscribe((permissions) => {
            //it will run always 2 times so we can ignore the first time;
            if (!this.firstRun) {
                this.firstRun = true;
                return;
            }

            if (!!this.ngxPermissionsExcept) {
                 Promise.all([this.permissionsService.hasPermission(this.ngxPermissionsExcept), this.rolesService.hasOnlyRoles(this.ngxPermissionsExcept)])
                    .then(([permissionsPr, roles]) => {
                        if (permissionsPr || roles) {
                            this.permissionsUnauthorized.emit();
                            this.viewContainer.clear();
                        } else {
                            if (!!this.ngxPermissionsOnly) {
                                throw false;
                            } else {
                                this.permissionsAuthorized.emit();
                                this.viewContainer.clear();
                                this.viewContainer.createEmbeddedView(this.templateRef);
                            }


                        }
                    }).catch(() => {
                        if (!!this.ngxPermissionsOnly) {
                            this.checkIfPermissionsOnly();
                            return;
                        }

                        this.viewContainer.clear();
                        this.viewContainer.createEmbeddedView(this.templateRef);
                });
                return;
            }


            if (!!this.ngxPermissionsOnly) {
                this.checkIfPermissionsOnly();
            }
        });
    }

    ngOnDestroy(): void {
        if (!!this.initPermissionSubscription) {
            this.initPermissionSubscription.unsubscribe();
        }
    }

    private checkIfPermissionsOnly() {
        return Promise.all([this.permissionsService.hasPermission(this.ngxPermissionsOnly), this.rolesService.hasOnlyRoles(this.ngxPermissionsOnly)])
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
}

export class EvryIfPermissionContext {
    public $implicit: any = null;
    public permissions: any = null;
}
