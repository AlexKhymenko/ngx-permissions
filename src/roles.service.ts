

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Role } from './model/role.model';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';


export class RolesService {
    private rolesSource = new BehaviorSubject<{[name: string] : Role}>({});

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

    // public checkOnlyRoles(names: string | string[]) {
    //     if (Array.isArray(names)) {
    //         const rolesValidations = this.checkValidationFunctions();
    //     } else {
    //
    //     }
    // }
    //
    //
    // private checkValidationFunctions(roles) {
    // }
}