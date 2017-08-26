import { Inject, Injectable, OpaqueToken } from '@angular/core';
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
import { isFunction } from '../utils/utils';


export type NgxPermissionsObject = {[name: string] : NgxPermission}

export const USE_PERMISSIONS_STORE = new OpaqueToken('USE_PERMISSIONS_STORE');


@Injectable()
export class NgxPermissionsService {

    private permissionsSource: any;
    public permissions$: Observable<any>;

    constructor(@Inject(USE_PERMISSIONS_STORE) private isolate: boolean = false,
                private permissionsStore: NgxPermissionsStore) {
        this.permissionsSource = this.isolate ? new BehaviorSubject<NgxPermissionsObject>({}) : this.permissionsStore.permissionsSource;
        this.permissions$ = this.permissionsSource.asObservable();
    }

    public flushPermissions() {
        this.permissionsSource.next({});
    }

    public hasPermission(permission: string | string[]): Promise<boolean> {
        if (!permission) {
            return Promise.resolve(true)
        }
        if (Array.isArray(permission)) {
            let promises:any[] = [];
            permission.forEach((key) => {
                if (!!this.permissionsSource.value[key] && !!this.permissionsSource.value[key].validationFunction && isFunction(this.permissionsSource.value[key].validationFunction)) {
                    let imutableValue = {...this.permissionsSource.value};
                    return promises.push(Observable.from(Promise.resolve((<Function>this.permissionsSource.value[key].validationFunction)(key, imutableValue))).catch(() => {
                        return Observable.of(false);
                    }) );
                } else {
                    promises.push(Observable.of(!!this.permissionsSource.value[key]));
                }

            });
            return Observable.merge(promises).mergeAll().first((data: any) => {
                return data !== false;
            }, () => true, false).toPromise().then((data: any) => {
                return data;
            });
        }
        if (!!this.permissionsSource.value[permission] && !!this.permissionsSource.value[permission].validationFunction && isFunction(this.permissionsSource.value[permission].validationFunction)) {
            let imutableValue = {...this.permissionsSource.value};

            return Promise.resolve(((<Function>this.permissionsSource.value[permission].validationFunction)(permission, imutableValue))).then((data) => {
                if (data !== false) {
                    return true;
                } else {
                    return data;
                }
            });
        }

        return Promise.resolve(!!this.permissionsSource.value[permission]);
    }

    public loadPermissions(permissions: string[], validationFunction?: Function) {
        permissions.forEach((p) => {
            this.addPermissionToBehaviorSubject(p, validationFunction);
        })
    }

    public addPermission(permission: string | string[], validationFunction?: Function) {
        if (Array.isArray(permission)) {
            permission.forEach((p) => {
                this.addPermissionToBehaviorSubject(p, validationFunction);
            })

        } else {
            this.addPermissionToBehaviorSubject(permission, validationFunction);

        }
    }
    public removePermission(permissionName: string) {
        let permissions = {
            ...this.permissionsSource.value
        };
        delete permissions[permissionName];
        this.permissionsSource.next(permissions);
    }

    public getPermission(name: string) {
        return this.permissionsSource.value[name];
    }

    public getPermissions() {
        return this.permissionsSource.value;
    }

    private addPermissionToBehaviorSubject(name: string, validationFunction?: Function) {
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
}
