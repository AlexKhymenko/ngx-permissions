import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable} from 'rxjs/Observable';

export class NgxRolesStore {

    public rolesSource = new BehaviorSubject({});

    public roles$ = this.rolesSource.asObservable();
}