import { Inject, Injectable, InjectionToken } from '@angular/core';

import { BehaviorSubject, from, merge, Observable, of } from 'rxjs';
import { catchError, every, first, map, mergeAll, mergeMap } from 'rxjs/operators';

import { NgxRole } from '../model/role.model';
import { NgxRolesStore } from '../store/roles.store';
import { isFunction, isPromise, transformStringToArray } from '../utils/utils';
import { NgxPermissionsService } from './permissions.service';

export const USE_ROLES_STORE = new InjectionToken('USE_ROLES_STORE');

export type NgxRolesObject = { [ name: string ]: NgxRole };

@Injectable()
export class NgxRolesService {

    private rolesSource: BehaviorSubject<NgxRolesObject>;

    public roles$: Observable<NgxRolesObject>;

    constructor(@Inject(USE_ROLES_STORE) private isolate: boolean = false,
                private rolesStore: NgxRolesStore,
                private permissionsService: NgxPermissionsService) {
        this.rolesSource = this.isolate ? new BehaviorSubject<NgxRolesObject>({}) : this.rolesStore.rolesSource;
        this.roles$ = this.rolesSource.asObservable();
    }

    public addRole(name: string, validationFunction: Function | string[]) {
        const roles = {
            ...this.rolesSource.value,
            [ name ]: {name, validationFunction}
        };
        this.rolesSource.next(roles);
    }

    public addRoles(rolesObj: { [ name: string ]: Function | string[] }) {
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
        if (!names || (Array.isArray(names) && names.length === 0)) {
            return Promise.resolve(true);
        }

        names = transformStringToArray(names);

        return Promise.all([this.hasRoleKey(names), this.hasRolePermission(this.rolesSource.value, names)])
            .then(([hasRoles, hasPermissions]: [boolean, boolean]) => {
                return hasRoles || hasPermissions;
            });
    }

    private hasRoleKey(roleName: string[]): Promise<boolean> {
        let promises: any[] = [];
        roleName.forEach((key) => {
            if (!!this.rolesSource.value[key] && !!this.rolesSource.value[key].validationFunction && isFunction(this.rolesSource.value[key].validationFunction) && !isPromise(this.rolesSource.value[key].validationFunction)) {
                return promises.push(from(Promise.resolve((<Function>this.rolesSource.value[key].validationFunction)())).pipe(
                    catchError(() => {
                        return of(false);
                    })
                ));
            }

            promises.push(of(false));
        });

        return merge(promises)
            .pipe(
                mergeAll(),
                first((data: any) => data !== false, false),
                map((data) => data !== false)
            )
            .toPromise().then((data: any) => {
                return data;
            });

    }


    private hasRolePermission(roles: NgxRolesObject, roleNames: string[]): Promise<boolean> {
        return from(roleNames)
            .pipe(mergeMap((key) => {
                    if (roles[key] && Array.isArray(roles[key].validationFunction)) {
                        return from(<string[]>roles[key].validationFunction)
                            .pipe(mergeMap((permission) => {
                                    return this.permissionsService.hasPermission(permission);
                                }),
                                every((hasPermissions) => {
                                    return hasPermissions === true;
                                }))

                    }
                    return of(false);
                }),
                first((hasPermission) => {
                    return hasPermission === true;
                }, false),
                map((data) => data !== false)
            )


            .toPromise()
    }
}
