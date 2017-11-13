import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NgxRole } from '../model/role.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/every';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { NgxRolesStore } from '../store/roles.store';
import { isFunction, isPromise, isString, transformStringToArray } from '../utils/utils';
import { NgxPermissionsService } from './permissions.service';


export const USE_ROLES_STORE = new InjectionToken('USE_ROLES_STORE');

export type NgxRolesObject = {[name: string] : NgxRole}

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
            [name]: {name, validationFunction}
        };
        this.rolesSource.next(roles);
    }

    public addRoles(rolesObj: { [name: string]: Function | string[]}) {
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
        if (!names || (Array.isArray(names) && names.length === 0)) { return Promise.resolve(true)}

        names = transformStringToArray(names);

        return Promise.all([this.hasRoleKey(names), this.hasRolePermission(this.rolesSource.value, names)])
            .then(([hasRoles, hasPermissions]: [boolean, boolean]) => {
            return hasRoles || hasPermissions;
        });
    }

    private hasRoleKey(roleName: string[]): Promise<boolean> {
        if (Array.isArray(roleName)) {
            let promises:any[] = [];
            roleName.forEach((key) => {
                if (!!this.rolesSource.value[key] && !!this.rolesSource.value[key].validationFunction && isFunction(this.rolesSource.value[key].validationFunction) && !isPromise(this.rolesSource.value[key].validationFunction)) {
                    return promises.push(Observable.from(Promise.resolve((<Function>this.rolesSource.value[key].validationFunction)())).catch(() => {
                        return Observable.of(false);
                    }) );
                }

                promises.push(Observable.of(false));
            });

            return Observable.merge(promises).mergeAll().first((data: any) => {
                return data !== false;
            }, () => true, false).toPromise().then((data: any) => {
                return data;
            });

            // return Promise.resolve(Object.keys(this.rolesSource.value).some((key) => {
            //     return roleName.includes(key)
            // }));
        } else {
            if (!!this.rolesSource.value[roleName] && !!this.rolesSource.value[roleName].validationFunction && isFunction(this.rolesSource.value[roleName].validationFunction)) {
                return Promise.resolve(((<Function>this.rolesSource.value[roleName].validationFunction)())).then((data) => {
                    if (data !== false) {
                        return true;
                    } else {
                        return data;
                    }
                });
            }

            return Promise.resolve(!!this.rolesSource.value[roleName])
        }
    }

    private hasRolePermission(roles: NgxRolesObject, roleNames: string[]): Promise<boolean> {
        return Observable.from(roleNames)
            .mergeMap((key) => {
                if (roles[key] && Array.isArray(roles[key].validationFunction)) {
                    return Observable.from(<string[]>roles[key].validationFunction)
                        .mergeMap((role) => {
                            return this.permissionsService.hasPermission(role);
                        })
                        .every((hasPermissions) => {
                            return hasPermissions === true;
                        });
                }
                return Observable.of(false);
            })
            .first((hasPermission) => {
                return hasPermission === true;
            }, () => true, false)
            .toPromise()
    }
}