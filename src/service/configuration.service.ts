import { Inject, Injectable, InjectionToken, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgxPermissionsPredefinedStrategies } from '../enums/predefined-strategies.enum';
import { NgxPermissionsConfigurationStore } from '../store/configuration.store';

export type StrategyFunction = (templateRef?: TemplateRef<any>) => void;

export type Strategy = {
    [ key: string ]: StrategyFunction
};

export const USE_CONFIGURATION_STORE = new InjectionToken('USE_CONFIGURATION_STORE');

@Injectable()
export class NgxPermissionsConfigurationService {

    private strategiesSource: BehaviorSubject<Strategy>;
    public strategies$: Observable<Strategy>;
    public onAuthorisedDefaultStrategy: string | undefined;
    public onUnAuthorisedDefaultStrategy: string | undefined;

    constructor(
        @Inject(USE_CONFIGURATION_STORE) private isolate: boolean = false,
        private configurationStore: NgxPermissionsConfigurationStore
    ) {
        this.strategiesSource = this.isolate ? new BehaviorSubject<Strategy>({}) : this.configurationStore.strategiesSource;
        this.strategies$ = this.strategiesSource.asObservable();

        this.onAuthorisedDefaultStrategy = this.isolate ? undefined : this.configurationStore.onAuthorisedDefaultStrategy;
        this.onUnAuthorisedDefaultStrategy = this.isolate ? undefined : this.configurationStore.onUnAuthorisedDefaultStrategy;

    }

    public setDefaultOnAuthorizedStrategy(name: string | 'remove' | 'show') {
        if (this.strategiesSource.value[ name ] || this.predefinedStrategy(name)) {
            this.onAuthorisedDefaultStrategy = name;
        } else {
            throw new Error(`No ${name} strategy is found please define one`);
        }
    }

    public setDefaultOnUnauthorizedStrategy(name: string | 'remove' | 'show') {
        if (this.strategiesSource.value[ name ] || this.predefinedStrategy(name)) {
            this.onUnAuthorisedDefaultStrategy = name;
        } else {
            throw new Error(`No ' ${name} ' strategy is found please define one`);
        }
    }

    public addPermissionStrategy(key: string, func: StrategyFunction): void {
        this.strategiesSource.value[ key ] = func;
    }

    public getStrategy(key: string) {
        return this.strategiesSource.value[ key ];
    }

    public getAllStrategies() {
        return this.strategiesSource.value;
    }

    private predefinedStrategy(strategy: string): boolean {
        return strategy === NgxPermissionsPredefinedStrategies.SHOW || strategy === NgxPermissionsPredefinedStrategies.REMOVE;
    }

}
