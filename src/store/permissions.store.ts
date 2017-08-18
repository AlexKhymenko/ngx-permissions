import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable} from 'rxjs/Observable';

export class PermissionsStore {

    public permissionsSource = new BehaviorSubject([]);
    public permissions$ = this.permissionsSource.asObservable();
}