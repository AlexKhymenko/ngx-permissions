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

    public hasPermission(permission: string) {
        if (!permission) {
            return true;
        }
        if (Array.isArray(permission)) {
          return this.permissionsSource.value.some(v => {
            return permission.includes(v);
          });
        }


        return this.permissionsSource.value['includes'](permission);
    }

    public loadPermissions(permissions) {
      this.permissionsSource.next(permissions);
    }
}
