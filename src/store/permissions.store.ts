import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NgxPermissionsStore {

    public permissionsSource = new BehaviorSubject({});
    public permissions$ = this.permissionsSource.asObservable();

    constructor() {}

}
