import {
    Directive, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef,
    ViewContainerRef
} from "@angular/core";
import { NgxPermissionsService } from "../service/permissions.service";
import { Subscription } from "rxjs/Subscription";
import { NgxRolesService } from '../service/roles.service';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/skip';
import { Observable } from 'rxjs/Observable';
import { notEmptyValue, isBoolean } from '../utils/utils';

@Directive({
    selector: '[ngxPermissionsOnly],[ngxPermissionsExcept]'
})
export class NgxPermissionsDirective implements OnInit, OnDestroy {

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

    private initPermissionSubscription: Subscription;
    //skip first run cause merge will fire twice
    private firstMergeUnusedRun = 1;
    private currentAuthorizedState: boolean;

    constructor(
        private permissionsService: NgxPermissionsService,
        private rolesService: NgxRolesService,
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>
    ) {
    }

    ngOnInit(): void {
        this.viewContainer.clear();
        this.initPermissionSubscription = this.validateExceptOnlyPermissions();
    }

    ngOnDestroy(): void {
        if (this.initPermissionSubscription) {
            this.initPermissionSubscription.unsubscribe();
        }
    }

    private validateExceptOnlyPermissions(): Subscription {
        return this.permissionsService.permissions$
                         .merge(this.rolesService.roles$)
                         .skip(this.firstMergeUnusedRun)
                         .subscribe(() => {
                             if (notEmptyValue(this.ngxPermissionsExcept)) {
                                 this.validateExceptAndOnlyPermissions();
                                 return;
                             }

                             if (notEmptyValue(this.ngxPermissionsOnly)) {
                                 this.validateOnlyPermissions();
                                 return;
                             }

                             this.handleAuthorisedPermission(this.getAuthorisedTemplates());
                         });
    }

    private validateExceptAndOnlyPermissions(): void {
        Promise.all([ this.permissionsService.hasPermission(this.ngxPermissionsExcept), this.rolesService.hasOnlyRoles(this.ngxPermissionsExcept) ])
               .then(([ hasPermission, hasRole ]) => {
                   if (hasPermission || hasRole) {
                       this.handleUnauthorisedPermission(this.ngxPermissionsExceptElse || this.ngxPermissionsElse);
                   } else {
                       if (!!this.ngxPermissionsOnly) {
                           throw false;
                       } else {
                           this.handleAuthorisedPermission(this.ngxPermissionsExceptThen || this.ngxPermissionsThen || this.templateRef);
                       }
                   }
               }).catch(() => {
            if (!!this.ngxPermissionsOnly) {
                this.validateOnlyPermissions();
            } else {
                this.handleAuthorisedPermission(this.ngxPermissionsExceptThen || this.ngxPermissionsThen || this.templateRef);
            }
        });
    }

    private validateOnlyPermissions(): void {
        Promise.all([ this.permissionsService.hasPermission(this.ngxPermissionsOnly), this.rolesService.hasOnlyRoles(this.ngxPermissionsOnly) ])
               .then(([ permissionPr, roles ]) => {
                   if (permissionPr || roles) {
                       this.handleAuthorisedPermission(this.ngxPermissionsOnlyThen || this.ngxPermissionsThen || this.templateRef);
                   } else {
                       this.handleUnauthorisedPermission(this.ngxPermissionsOnlyElse || this.ngxPermissionsElse);
                   }
               }).catch(() => {
            this.handleUnauthorisedPermission(this.ngxPermissionsOnlyElse || this.ngxPermissionsElse);
        });
    }

    private handleUnauthorisedPermission(template: TemplateRef<any>): void {
        if (!isBoolean(this.currentAuthorizedState) || this.currentAuthorizedState) {
            this.currentAuthorizedState = false;
            this.permissionsUnauthorized.emit();
            this.showTemplateBlockInView(template);
        }
    }

    private handleAuthorisedPermission(template: TemplateRef<any>): void {
        if (!isBoolean(this.currentAuthorizedState) || !this.currentAuthorizedState) {
            this.currentAuthorizedState = true;
            this.permissionsAuthorized.emit();
            this.showTemplateBlockInView(template);
        }
    }

    private showTemplateBlockInView(template: TemplateRef<any>): void {
        this.viewContainer.clear();
        if (!template) {
            return;
        }
        this.viewContainer.createEmbeddedView(template);
    }

    private getAuthorisedTemplates(): TemplateRef<any> {
        return this.ngxPermissionsOnlyThen
            || this.ngxPermissionsExceptThen
            || this.ngxPermissionsThen
            || this.templateRef
    }
}
