import { BehaviorSubject, Observable } from 'rxjs';
import { Strategy } from '../service/configuration.service';
import * as ɵngcc0 from '@angular/core';
export declare class NgxPermissionsConfigurationStore {
    strategiesSource: BehaviorSubject<Strategy>;
    strategies$: Observable<Strategy>;
    onAuthorisedDefaultStrategy: string | undefined;
    onUnAuthorisedDefaultStrategy: string | undefined;
    constructor();
    static ngInjectableDef: ɵngcc0.ɵɵInjectableDef<NgxPermissionsConfigurationStore>;
}

//# sourceMappingURL=configuration.store.d.ts.map