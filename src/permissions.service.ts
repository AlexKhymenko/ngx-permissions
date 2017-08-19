import { Inject, Injectable, OpaqueToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { PermissionsStore } from './store/permissions.store';

export const USE_PERMISSIONS_STORE = new OpaqueToken('USE_PERMISSIONS_STORE');


@Injectable()
export class PermissionsService {

    private permissionsSource: any;
    public permissions$: Observable<any>;

    constructor(@Inject(USE_PERMISSIONS_STORE) private isolate: boolean = false,
                private permissionsStore: PermissionsStore) {
        this.permissionsSource = this.isolate ? new BehaviorSubject<any[]>([]) : this.permissionsStore.permissionsSource;
        this.permissions$ = this.permissionsSource.asObservable();
    }

    public flushPermissions() {
        this.permissionsSource.next([]);
    }

    public hasPermission(permission: string | string[]) {
        if (!permission) {
            return true;
        }
        if (Array.isArray(permission)) {
          return this.permissionsSource.value.some((v: any) => {
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
        const permissions = this.permissionsSource.value.filter((value: any) => {
            return value != permission;
        });
        this.permissionsSource.next(permissions);
    }

    public getPermissions() {
        return this.permissionsSource.value;
    }
}
