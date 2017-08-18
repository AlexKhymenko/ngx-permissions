

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Role } from './model/role.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

type RolesObject = {[name: string] : Role}
export class RolesService {
    private rolesSource = new BehaviorSubject<RolesObject>({});

    public roles$ = this.rolesSource.asObservable();

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


    public hasOnlyRoles(names: string | string[]) {
        if (this.hasRoleKey(names) || this.hasRolePermission(this.rolesSource.value, names)) {
            return true
        } else {
            return false;
        }

    }

    private hasRoleKey(roleName: string | string[]): boolean {
        if (Array.isArray(roleName)) {
            return Object.keys(this.rolesSource.value).some((key) => {
                return roleName.includes(key)
            });
        } else {
            return !!this.rolesSource.value[roleName];
        }
    }

    private hasRolePermission(roles: RolesObject, roleName: string | string[]) {
        return Object.keys(roles).some((key) => {
            if (Array.isArray(roles[key].validationFunction)) {
                if (this.isString(roleName)) {
                    return roles[key].validationFunction['includes'](roleName);
                }

                if (Array.isArray(roleName)) {
                    return roles[key].validationFunction['some'](v => {
                        return roleName.includes(v);
                    });
                }
            }

            return true;
        })
    }

    private isString(variable: any) {
        return typeof variable === 'string' || variable instanceof String
    }
}