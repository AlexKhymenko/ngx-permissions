import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable} from 'rxjs/Observable';

export class RolesStore {

    public rolesSource = new BehaviorSubject({});

    public roles$ = this.rolesSource.asObservable();
}