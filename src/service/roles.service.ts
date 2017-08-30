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
import { Inject, Injectable, OpaqueToken } from '@angular/core';
import { NgxRolesStore } from '../store/roles.store';
import { isFunction, isPromise, isString } from '../utils/utils';


//TODO: Change on Injection token when angular removes opaque token
export const USE_ROLES_STORE = new OpaqueToken('USE_ROLES_STORE');

export type NgxRolesObject = {[name: string] : NgxRole}

@Injectable()
export class NgxRolesService {
    private rolesSource: BehaviorSubject<NgxRolesObject>;

    public roles$: Observable<NgxRolesObject>;

    constructor(@Inject(USE_ROLES_STORE) private isolate: boolean = false,
                private rolesStore: NgxRolesStore) {
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
        if (!names) { return Promise.resolve(true)}

        return Promise.all([this.hasRoleKey(names), this.hasRolePermission(this.rolesSource.value, names)])
            .then(([hasRoles, hasPermissions]: [boolean, boolean]) => {
            return hasRoles || hasPermissions;
        });
    }

    private hasRoleKey(roleName: string | string[]): Promise<boolean> {
        if (Array.isArray(roleName)) {
            let promises:any[] = [];
            roleName.forEach((key) => {
                if (!!this.rolesSource.value[key] && !!this.rolesSource.value[key].validationFunction && isFunction(this.rolesSource.value[key].validationFunction) && !isPromise(this.rolesSource.value[key].validationFunction)) {
                    return promises.push(Observable.from(Promise.resolve((<Function>this.rolesSource.value[key].validationFunction)())).catch(() => {
                        return Observable.of(false);
                    }) );
                }

                promises.push(Observable.of(!!this.rolesSource.value[key]));
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

    private hasRolePermission(roles: NgxRolesObject, roleName: string | string[]): Promise<boolean> {
        return Promise.resolve(Object.keys(roles).some((key) => {
            if (Array.isArray(roles[key].validationFunction)) {
                if (isString(roleName)) {
                    return (<string[]>roles[key].validationFunction).includes(<string>roleName);
                }

                if (Array.isArray(roleName)) {
                    return (<string[]>roles[key].validationFunction).some((v: any) => {
                        return roleName.includes(v);
                    });
                }
            }

            return false;
        }));
    }
}