import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Role } from './model/role.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/onErrorResumeNext';
import 'rxjs/add/observable/onErrorResumeNext';
import { Inject, Injectable, OpaqueToken } from '@angular/core';
import { RolesStore } from './store/roles.store';

export const USE_ROLES_STORE = new OpaqueToken('USE_ROLES_STORE');

export type RolesObject = {[name: string] : Role}

@Injectable()
export class RolesService {
    private rolesSource: BehaviorSubject<RolesObject>;

    public roles$: Observable<RolesObject>;

    constructor(@Inject(USE_ROLES_STORE) private isolate: boolean = false,
                private rolesStore: RolesStore) {
        this.rolesSource = this.isolate ? new BehaviorSubject<RolesObject>({}) : this.rolesStore.rolesSource;
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
        return Promise.all([this.hasRoleKey(names), this.hasRolePermission(this.rolesSource.value, names)]).then(([roles, permissions]) => {
            if (roles || permissions) {
                return true;
            } else {
                return false;
            }
        });
    }

    private hasRoleKey(roleName: string | string[]): Promise<boolean> {
        if (Array.isArray(roleName)) {
            let promises = [];
            Object.keys(this.rolesSource.value).forEach((key) => {
                if (!!this.rolesSource.value[key] && !!this.rolesSource.value[key].validationFunction && this.isFunction(this.rolesSource.value[key].validationFunction) && !this.isPromise(this.rolesSource.value[key].validationFunction)) {
                    return promises.push(Observable.from(Promise.resolve((<Function>this.rolesSource.value[key].validationFunction)())).catch(() => {
                        return Observable.of(false);
                    }) );
                }

                promises.push(Observable.of(roleName.includes(key)));
            });

            return Observable.merge(promises).mergeAll().first((data) => {
                return data !== false;
            }, () => true, false).toPromise().then((data) => {
                return data;
            });

            // return Promise.resolve(Object.keys(this.rolesSource.value).some((key) => {
            //     return roleName.includes(key)
            // }));
        } else {
            if (!!this.rolesSource.value[roleName] && !!this.rolesSource.value[roleName].validationFunction && this.isFunction(this.rolesSource.value[roleName].validationFunction)) {
                return Promise.resolve(((<Function>this.rolesSource.value[roleName].validationFunction)()));
            }

            return Promise.resolve(!!this.rolesSource.value[roleName])
        }
    }

    private hasRolePermission(roles: RolesObject, roleName: string | string[]): Promise<boolean> {
        return Promise.resolve(Object.keys(roles).some((key) => {
            if (Array.isArray(roles[key].validationFunction)) {
                if (this.isString(roleName)) {
                    return (<string[]>roles[key].validationFunction).includes(<string>roleName);
                }

                if (Array.isArray(roleName)) {
                    return (<string[]>roles[key].validationFunction).some((v: any) => {
                        return roleName.includes(v);
                    });
                }
            }

            if (this.isFunction(roles[key].validationFunction)) {
                return false;
            }

            return true;
        }));
    }

    private isString(variable: any) {
        return typeof variable === 'string' || variable instanceof String
    }

    private isFunction(functionToCheck: any) {
        let getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }

    private isPromise(promise: any) {
        return Object.prototype.toString.call(promise) === "[object Promise]"
    }
}