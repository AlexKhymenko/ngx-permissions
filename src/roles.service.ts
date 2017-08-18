

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Role } from './model/role.model';

export class RolesService {
    private rolesSource = new BehaviorSubject<{[name: string] : Role}>({});

    public roles$ = this.rolesSource.asObservable();

    public addRole(role: Role) {
        const roles = {
            ...this.rolesSource.value,
            role
        };
        this.rolesSource.next(roles);
    }

    public addRoles(rolesObj: {Role}) {
        Object.keys(rolesObj).forEach((key, index) => {
            this.addRole(rolesObj[key])
        });
    }

    public flushRoles() {
        this.rolesSource.next({});
    }

    public getRoles() {
        return this.rolesSource.value;
    }

    public getRole(name: string) {
        return this.rolesSource.value[name];
    }
}