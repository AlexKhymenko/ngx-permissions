import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { NgxPermissionsStore } from '../store/permissions.store';
import { NgxPermission } from '../model/permission.model';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/from';
import { isFunction, transformStringToArray } from '../utils/utils';


export type NgxPermissionsObject = {[name: string] : NgxPermission}

export const USE_PERMISSIONS_STORE = new InjectionToken('USE_PERMISSIONS_STORE');


@Injectable()
export class NgxPermissionsService {

    private permissionsSource: BehaviorSubject<NgxPermissionsObject>;
    public permissions$: Observable<NgxPermissionsObject>;

    constructor(@Inject(USE_PERMISSIONS_STORE) private isolate: boolean = false,
                private permissionsStore: NgxPermissionsStore) {
        this.permissionsSource = this.isolate ? new BehaviorSubject<NgxPermissionsObject>({}) : this.permissionsStore.permissionsSource;
        this.permissions$ = this.permissionsSource.asObservable();
    }

    /**
     * Remove all permissions from permissions source
     */
    public flushPermissions(): void {
        this.permissionsSource.next({});
    }

    public hasPermission(permission: string | string[]): Promise<boolean> {
        if (!permission || (Array.isArray(permission) && permission.length === 0)) {return Promise.resolve(true)};
        permission = transformStringToArray(permission);
        return this.hasArrayPermission(permission);
    }

    public loadPermissions(permissions: string[], validationFunction?: Function): void {
        permissions.forEach((p) => {
            this.addPermissionToBehaviorSubject(p, validationFunction);
        })
    }

    public addPermission(permission: string | string[], validationFunction?: Function): void {
        if (Array.isArray(permission)) {
            permission.forEach((p) => {
                this.addPermissionToBehaviorSubject(p, validationFunction);
            })
        } else {
            this.addPermissionToBehaviorSubject(permission, validationFunction);
        }
    }

    /**
     * @param {string} permissionName
     * Removes permission from permissionsObject;
     */
    public removePermission(permissionName: string): void {
        let permissions = {
            ...this.permissionsSource.value
        };
        delete permissions[permissionName];
        this.permissionsSource.next(permissions);
    }

    public getPermission(name: string): NgxPermission {
        return this.permissionsSource.value[name];
    }

    public getPermissions(): NgxPermissionsObject {
        return this.permissionsSource.value;
    }

    private addPermissionToBehaviorSubject(name: string, validationFunction?: Function): void  {
        if (!!validationFunction && isFunction(validationFunction)) {
            const roles = {
                ...this.permissionsSource.value,
                [name]: {name, validationFunction}
            };
            this.permissionsSource.next(roles)
        } else {
            const roles = {
                ...this.permissionsSource.value,
                [name]: {name}
            };
            this.permissionsSource.next(roles)
        }
    }

    private hasArrayPermission(permissions: string[]): Promise<boolean> {
        let promises:any[] = [];
        permissions.forEach((key) => {
            if (this.hasPermissionValidationFunction(key)) {
                let immutableValue = {...this.permissionsSource.value};
                return promises.push(Observable.from(Promise.resolve((<Function>this.permissionsSource.value[key].validationFunction)(key, immutableValue))).catch(() => {
                    return Observable.of(false);
                }) );
            } else {
                //check for name of the permission if there is no validation function
                promises.push(Observable.of(!!this.permissionsSource.value[key]));
            }

        });
        return Observable.merge(promises)
            .mergeAll()
            .first((data: any) => {
                return data !== false;
            }, () => true, false)
            .toPromise()
            .then((data: any) => {
                return data;
            });
    }

    private hasPermissionValidationFunction(key: string): boolean {
        return !!this.permissionsSource.value[key] && !!this.permissionsSource.value[key].validationFunction && isFunction(this.permissionsSource.value[key].validationFunction);
    }
}
