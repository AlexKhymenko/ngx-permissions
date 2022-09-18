import { inject, TestBed } from '@angular/core/testing';
import { NgxPermissionsModule } from '../index';
import { NgxPermissionsConfigurationService } from './configuration.service';
import { NgxPermissionsConfigurationStore } from '../store/configuration.store';

describe('Configuration Service', () => {
    let localService: NgxPermissionsConfigurationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxPermissionsModule.forRoot()]
        });
    });

    beforeEach(inject([NgxPermissionsConfigurationService], (service: NgxPermissionsConfigurationService) => {
        localService = service;
    }));

    it('should create an instance', () => {
        expect(localService).toBeTruthy();
    });

    it ('should add configuration function', () => {
        expect(localService.getAllStrategies()['FUNCTION']).toBeFalsy();
        localService.addPermissionStrategy('FUNCTION', () => {});
        expect(localService.getAllStrategies()['FUNCTION']).toBeTruthy();
    });

    it ('should retrieve strategy function', () => {
        expect(localService.getStrategy('FUNCTION')).toBeFalsy();
        localService.addPermissionStrategy('FUNCTION', () => {});
        expect(localService.getStrategy('FUNCTION')).toBeTruthy();
    });

    it ('should throw an error when strategy is not defined but user tries to set it as default on authorised method', () => {
        expect(() => localService.setDefaultOnAuthorizedStrategy('FUNCTION')).toThrow();
    });


    it ('should throw an error when strategy is not defined but user tries to set it as default on unauthorised method', () => {
        expect(() => localService.setDefaultOnUnauthorizedStrategy('FUNCTION')).toThrow();
    });

    it ('should set default unauthorised method with string', () => {
        localService.addPermissionStrategy('FUNCTION', () => {});
        localService.setDefaultOnUnauthorizedStrategy('FUNCTION');
        expect(localService.onUnAuthorisedDefaultStrategy).toBeTruthy();
        expect(localService.onUnAuthorisedDefaultStrategy).toEqual('FUNCTION');
    });

    it ('should set default authorised method with string', () => {
        localService.addPermissionStrategy('FUNCTION', () => {});
        localService.setDefaultOnAuthorizedStrategy('FUNCTION');
        expect(localService.onAuthorisedDefaultStrategy).toBeTruthy();
        expect(localService.onAuthorisedDefaultStrategy).toEqual('FUNCTION');
    });
});


describe('Isolated configuration service', () => {
    let localService: NgxPermissionsConfigurationService;
    let localStore: NgxPermissionsConfigurationStore;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxPermissionsModule.forRoot({configurationIsolate: true})]
        });
    });

    beforeEach(inject([NgxPermissionsConfigurationService, NgxPermissionsConfigurationStore],
      (service: NgxPermissionsConfigurationService,
       store: NgxPermissionsConfigurationStore) => {
        localService = service;
        localStore = store;
        localStore.onAuthorisedDefaultStrategy = 'FUNCTION';
        localStore.onUnAuthorisedDefaultStrategy = 'FUNCTION';
    }));


    it('should create an instance', () => {
        expect(localService).toBeTruthy();
    });

    it ('should set onAuthrisedDefaultStrategy to undefined', () => {
        expect(localService.onAuthorisedDefaultStrategy).toBeFalsy();
    });

    it ('should set onUnAuthorisedDefault strategy to undefined', () => {
        expect(localService.onAuthorisedDefaultStrategy).toBeFalsy();
    });
});
