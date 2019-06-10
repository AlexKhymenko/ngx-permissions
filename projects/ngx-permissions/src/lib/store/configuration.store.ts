import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Strategy } from '../service/configuration.service';

@Injectable()
export class NgxPermissionsConfigurationStore {

    public strategiesSource: BehaviorSubject<Strategy> = new BehaviorSubject<Strategy>({});
    public strategies$: Observable<Strategy> = this.strategiesSource.asObservable();

    public onAuthorisedDefaultStrategy: string | undefined;
    public onUnAuthorisedDefaultStrategy: string | undefined;

    constructor() {
    }

}
