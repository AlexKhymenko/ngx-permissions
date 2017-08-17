import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PermissionsService {

    public permissionsSource =  new BehaviorSubject<any[]>([]);
    public permissions$ = this.permissionsSource.asObservable();

    constructor() { }

    public flushPermissions() {
        this.permissionsSource.next([]);
    }

    public hasPermission(permission: string | string[]) {
        if (!permission) {
            return true;
        }
        if (Array.isArray(permission)) {
          return this.permissionsSource.value.some(v => {
            return permission.includes(v);
          });
        }


        return this.permissionsSource.value.includes(permission);
    }

    public loadPermissions(permissions: string[]) {
      this.permissionsSource.next(permissions);
    }

    public addPermission(permission: string | string[]) {
        if (Array.isArray(permission)) {
            const permissions = [
                ...this.permissionsSource.value,
                ...permission
            ];
            this.permissionsSource.next(permissions)

        } else {
            const permissions = [
                ...this.permissionsSource.value,
                permission
            ];
            this.permissionsSource.next(permissions)
        }

    }
    public removePermission(permission: string) {
        const permissions = this.permissionsSource.value.filter((value) => {
            return value != permission;
        });
        this.permissionsSource.next(permissions);
    }

    public getPermissions() {
        return this.permissionsSource.value;
    }
}
