import { TestBed, inject } from '@angular/core/testing';
import { NgxPermissionsModule } from '../index';
import { NgxPermissionsConfigurationService } from './configuration.service';

const StrategiesFunction = {
    FUNCTION: () => { },
};

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

    it('should add configuration function', () => {
        expect(localService.getAllStrategies()['FUNCTION']).toBeFalsy();
        localService.addPermissionStrategy('FUNCTION', () => { });
        expect(localService.getAllStrategies()['FUNCTION']).toBeTruthy();
    });

    it('should retrieve strategy function', () => {
        expect(localService.getStrategy('FUNCTION')).toBeFalsy();
        localService.addPermissionStrategy('FUNCTION', () => { });
        expect(localService.getStrategy('FUNCTION')).toBeTruthy();
    });

    it('should throw an error when strategy is not defined but user tries to set it as default on authorised method', () => {
        expect(function () { localService.setDefaultOnAuthorizedStrategy('FUNCTION'); }).toThrow();
    });


    it('should throw an error when strategy is not defined but user tries to set it as default on unauthorised method', () => {
        expect(function () { localService.setDefaultOnUnauthorizedStrategy('FUNCTION'); }).toThrow();
    });

    it('should set default unauthorised method with string', () => {
        localService.addPermissionStrategy('FUNCTION', () => { });
        localService.setDefaultOnUnauthorizedStrategy('FUNCTION');
        expect(localService.onUnAuthorisedDefaultStrategy).toBeTruthy();
        expect(localService.onUnAuthorisedDefaultStrategy).toEqual('FUNCTION');
    });

    it('should set default authorised method with string', () => {
        localService.addPermissionStrategy('FUNCTION', () => { });
        localService.setDefaultOnAuthorizedStrategy('FUNCTION');
        expect(localService.onAuthorisedDefaultStrategy).toBeTruthy();
        expect(localService.onAuthorisedDefaultStrategy).toEqual('FUNCTION');
    });
});
