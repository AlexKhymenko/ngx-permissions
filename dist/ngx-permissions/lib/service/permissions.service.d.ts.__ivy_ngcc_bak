import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxPermission } from '../model/permission.model';
import { NgxPermissionsStore } from '../store/permissions.store';
export declare type NgxPermissionsObject = {
    [name: string]: NgxPermission;
};
export declare const USE_PERMISSIONS_STORE: InjectionToken<{}>;
export declare class NgxPermissionsService {
    private isolate;
    private permissionsStore;
    private permissionsSource;
    permissions$: Observable<NgxPermissionsObject>;
    constructor(isolate: boolean, permissionsStore: NgxPermissionsStore);
    /**
     * Remove all permissions from permissions source
     */
    flushPermissions(): void;
    hasPermission(permission: string | string[]): Promise<boolean>;
    loadPermissions(permissions: string[], validationFunction?: Function): void;
    addPermission(permission: string | string[], validationFunction?: Function): void;
    removePermission(permissionName: string): void;
    getPermission(name: string): NgxPermission;
    getPermissions(): NgxPermissionsObject;
    private reducePermission;
    private hasArrayPermission;
    private hasPermissionValidationFunction;
}
