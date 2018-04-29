import { Inject, Injectable, InjectionToken } from '@angular/core';

import { BehaviorSubject, from, merge, Observable, of } from 'rxjs';
import { catchError, first, map, mergeAll } from 'rxjs/operators';

import { NgxPermission } from '../model/permission.model';
import { NgxPermissionsStore } from '../store/permissions.store';

import { isFunction, transformStringToArray } from '../utils/utils';

export type NgxPermissionsObject = { [ name: string ]: NgxPermission };

export const USE_PERMISSIONS_STORE = new InjectionToken('USE_PERMISSIONS_STORE');

@Injectable()
export class NgxPermissionsService {

    private permissionsSource: BehaviorSubject<NgxPermissionsObject>;
    public permissions$: Observable<NgxPermissionsObject>;

    constructor(
        @Inject(USE_PERMISSIONS_STORE) private isolate: boolean = false,
        private permissionsStore: NgxPermissionsStore
    ) {
        this.permissionsSource = isolate ? new BehaviorSubject<NgxPermissionsObject>({}) : permissionsStore.permissionsSource;
        this.permissions$ = this.permissionsSource.asObservable();
    }

    /**
     * Remove all permissions from permissions source
     */
    public flushPermissions(): void {
        this.permissionsSource.next({});
    }

    public hasPermission(permission: string | string[]): Promise<boolean> {
        if (!permission || (Array.isArray(permission) && permission.length === 0)) {
            return Promise.resolve(true);
        }

        permission = transformStringToArray(permission);
        return this.hasArrayPermission(permission);
    }

    public loadPermissions(permissions: string[], validationFunction?: Function): void {
        const newPermissions = permissions.reduce((source, p) =>
                this.reducePermission(source, p, validationFunction)
            , {});

        this.permissionsSource.next(newPermissions);
    }

    public addPermission(permission: string | string[], validationFunction?: Function): void {
        if (Array.isArray(permission)) {
            const permissions = permission.reduce((source, p) =>
                    this.reducePermission(source, p, validationFunction)
                , this.permissionsSource.value);

            this.permissionsSource.next(permissions);
        } else {
            const permissions = this.reducePermission(this.permissionsSource.value, permission, validationFunction);

            this.permissionsSource.next(permissions);
        }
    }

    public removePermission(permissionName: string): void {
        const permissions = {
            ...this.permissionsSource.value
        };
        delete permissions[ permissionName ];
        this.permissionsSource.next(permissions);
    }

    public getPermission(name: string): NgxPermission {
        return this.permissionsSource.value[ name ];
    }

    public getPermissions(): NgxPermissionsObject {
        return this.permissionsSource.value;
    }

    private reducePermission(
        source: NgxPermissionsObject,
        name: string,
        validationFunction?: Function
    ): NgxPermissionsObject {
        if (!!validationFunction && isFunction(validationFunction)) {
            return {
                ...source,
                [ name ]: { name, validationFunction }
            };
        } else {
            return {
                ...source,
                [ name ]: { name }
            };
        }
    }

    private hasArrayPermission(permissions: string[]): Promise<boolean> {
        const promises: any[] = [];
        permissions.forEach((key) => {
            if (this.hasPermissionValidationFunction(key)) {
                const immutableValue = { ...this.permissionsSource.value };
                return promises.push(from(Promise.resolve((<Function>this.permissionsSource.value[ key ].validationFunction)(
                    key,
                    immutableValue
                ))).pipe(catchError(() => {
                    return of(false);
                })));
            } else {
                //check for name of the permission if there is no validation function
                promises.push(of(!!this.permissionsSource.value[ key ]));
            }

        });
        return merge(promises)
            .pipe(
                    mergeAll(),
                    first((data) => data !== false, false),
                    map((data) => data !== false)
                ).toPromise().then((data: any) => data);

    }

    private hasPermissionValidationFunction(key: string): boolean {
        return !!this.permissionsSource.value[ key ] &&
            !!this.permissionsSource.value[ key ].validationFunction &&
            isFunction(this.permissionsSource.value[ key ].validationFunction);
    }

}
