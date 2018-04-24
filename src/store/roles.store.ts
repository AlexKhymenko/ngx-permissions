import { BehaviorSubject } from 'rxjs';

export class NgxRolesStore {

    public rolesSource = new BehaviorSubject({});

    public roles$ = this.rolesSource.asObservable();

}
