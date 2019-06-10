import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxRole } from '../model/role.model';
import { NgxRolesStore } from '../store/roles.store';
import { NgxPermissionsService } from './permissions.service';
export declare const USE_ROLES_STORE: InjectionToken<{}>;
export declare type NgxRolesObject = {
    [name: string]: NgxRole;
};
export declare class NgxRolesService {
    private isolate;
    private rolesStore;
    private permissionsService;
    private rolesSource;
    roles$: Observable<NgxRolesObject>;
    constructor(isolate: boolean, rolesStore: NgxRolesStore, permissionsService: NgxPermissionsService);
    addRole(name: string, validationFunction: Function | string[]): void;
    addRoles(rolesObj: {
        [name: string]: Function | string[];
    }): void;
    flushRoles(): void;
    removeRole(roleName: string): void;
    getRoles(): NgxRolesObject;
    getRole(name: string): NgxRole;
    hasOnlyRoles(names: string | string[]): Promise<boolean>;
    private hasRoleKey;
    private hasRolePermission;
}
