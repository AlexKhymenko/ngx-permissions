import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Strategy } from '../service/configuration.service';

@Injectable()
export class NgxPermissionsConfigurationStore {

    public strategiesSource = new BehaviorSubject<Strategy>({});
    public strategies$ = this.strategiesSource.asObservable();

    public onAuthorisedDefaultStrategy: string | undefined;
    public onUnAuthorisedDefaultStrategy: string | undefined;

    constructor() {}

}
