import { Inject, Injectable, InjectionToken } from '@angular/core';

import { BehaviorSubject, from, Observable, ObservableInput, of } from 'rxjs';
import { catchError, every, first, map, mergeAll, mergeMap, switchMap } from 'rxjs/operators';

import { NgxRole } from '../model/role.model';
import { NgxRolesStore } from '../store/roles.store';
import { isBoolean, isFunction, isPromise, transformStringToArray } from '../utils/utils';
import { NgxPermissionsService } from './permissions.service';

export const USE_ROLES_STORE = new InjectionToken('USE_ROLES_STORE');

export type NgxRolesObject = { [name: string]: NgxRole };

@Injectable()
export class NgxRolesService {

    private rolesSource: BehaviorSubject<NgxRolesObject>;

    public roles$: Observable<NgxRolesObject>;

    constructor(
        @Inject(USE_ROLES_STORE) private isolate: boolean = false,
        private rolesStore: NgxRolesStore,
        private permissionsService: NgxPermissionsService
    ) {
        this.rolesSource = this.isolate ? new BehaviorSubject<NgxRolesObject>({}) : this.rolesStore.rolesSource;
        this.roles$ = this.rolesSource.asObservable();
    }

    public addRole(name: string, validationFunction: Function | string[]) {
        const roles = {
            ...this.rolesSource.value,
            [name]: {name, validationFunction}
        };
        this.rolesSource.next(roles);
    }

    public addRoles(rolesObj: { [name: string]: Function | string[] }) {
        Object.keys(rolesObj).forEach((key, index) => {
            this.addRole(key, rolesObj[key]);
        });
    }

    public flushRoles() {
        this.rolesSource.next({});
    }

    public removeRole(roleName: string) {
        let roles = {
            ...this.rolesSource.value
        };
        delete roles[roleName];
        this.rolesSource.next(roles);
    }

    public getRoles() {
        return this.rolesSource.value;
    }

    public getRole(name: string) {
        return this.rolesSource.value[name];
    }

    public hasOnlyRoles(names: string | string[]): Promise<boolean> {
        const isNamesEmpty = !names || (Array.isArray(names) && names.length === 0);

        if (isNamesEmpty) return Promise.resolve(true);

        names = transformStringToArray(names);

        return Promise.all([this.hasRoleKey(names), this.hasRolePermission(this.rolesSource.value, names)])
            .then(([hasRoles, hasPermissions]: [boolean, boolean]) => {
                return hasRoles || hasPermissions;
            });
    }

    private hasRoleKey(roleName: string[]): Promise<boolean> {
        const promises: Observable<boolean>[] = roleName.map((key) => {
            const hasValidationFunction = !!this.rolesSource.value[key] &&
                                          !!this.rolesSource.value[key].validationFunction &&
                                          isFunction(this.rolesSource.value[key].validationFunction);

            if (hasValidationFunction && !isPromise(this.rolesSource.value[key].validationFunction)) {
                const validationFunction: Function = <Function>this.rolesSource.value[key].validationFunction;
                const immutableValue = {...this.rolesSource.value};

                return of(null).pipe(
                    map(() => validationFunction(key, immutableValue)),
                    switchMap((promise: Promise<boolean> | boolean): ObservableInput<boolean> => isBoolean(promise) ?
                        of(promise as boolean) : promise as Promise<boolean>),
                    catchError(() => of(false))
                );
            }

            return of(false);
        });

        return from(promises).pipe(
            mergeAll(),
            first((data: any) => data !== false, false),
            map((data) => data !== false)
        ).toPromise().then((data: any) => data);
    }

    private hasRolePermission(roles: NgxRolesObject, roleNames: string[]): Promise<boolean> {
        return from(roleNames).pipe(
            mergeMap((key) => {
                if (roles[key] && Array.isArray(roles[key].validationFunction)) {
                    return from(<string[]>roles[key].validationFunction).pipe(
                        mergeMap((permission) => this.permissionsService.hasPermission(permission)),
                        every((hasPermissions) => hasPermissions === true)
                    );
                }

                return of(false);
            }),
            first((hasPermission) => hasPermission === true, false)
        ).toPromise();
    }

}
