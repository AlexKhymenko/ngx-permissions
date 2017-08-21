import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable} from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class PermissionsStore {

    public permissionsSource = new BehaviorSubject({});
    public permissions$ = this.permissionsSource.asObservable();


    constructor() {}
}