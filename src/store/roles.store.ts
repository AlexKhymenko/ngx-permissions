import { BehaviorSubject, Observable } from 'rxjs';

export class NgxRolesStore {

    public rolesSource = new BehaviorSubject<{}>({});

    public roles$: Observable<{}> = this.rolesSource.asObservable();

}
