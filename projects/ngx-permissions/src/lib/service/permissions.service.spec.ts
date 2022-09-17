import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { NgxPermissionsModule } from '../index';
import { NgxPermissionsService } from './permissions.service';

enum PermissionsNamesEnum {
    ADMIN = 'ADMIN' as any,
    GUEST = 'GUEST' as any
}

describe('Permissions Service', () => {
    let localService: NgxPermissionsService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxPermissionsModule.forRoot()]
        });
    });

    beforeEach(inject([NgxPermissionsService], (service: NgxPermissionsService) => {
        localService = service;
    }));

    it('should create an instance', () => {
        expect(localService).toBeTruthy();
    });

    it ('should add permission to permission object', () => {
        expect(localService.getPermission(PermissionsNamesEnum.ADMIN as any)).toBeFalsy();
        localService.addPermission(PermissionsNamesEnum.ADMIN as any);
        expect(localService.getPermission(PermissionsNamesEnum.ADMIN as any)).toBeTruthy();
    });
    //
    it ('should remove permission from role object', () => {
        expect(localService.getPermissions()[PermissionsNamesEnum.ADMIN]).toBeFalsy();
        localService.addPermission(PermissionsNamesEnum.ADMIN as any, );
        expect(localService.getPermissions()[PermissionsNamesEnum.ADMIN]).toBeTruthy();
        localService.removePermission(PermissionsNamesEnum.ADMIN as any);
        expect(localService.getPermissions()[PermissionsNamesEnum.ADMIN]).toBeFalsy();
    });

    it ('should remove all permissions from object', () => {
        expect(Object.keys(localService.getPermissions()).length).toEqual(0);
        localService.addPermission(PermissionsNamesEnum.ADMIN as any, );
        localService.addPermission(PermissionsNamesEnum.GUEST as any, );
        expect(Object.keys(localService.getPermissions()).length).toEqual(2);
        localService.flushPermissions();
        expect(Object.keys(localService.getPermissions()).length).toEqual(0);
    });

    it ('should add multiple permissions', () => {
        expect(Object.keys(localService.getPermissions()).length).toEqual(0);
        localService.addPermission([PermissionsNamesEnum.ADMIN as any, PermissionsNamesEnum.GUEST]);

        expect(Object.keys(localService.getPermissions()).length).toEqual(2);
        expect(localService.getPermissions()).toEqual(
            {
                ADMIN: {name: 'ADMIN'},
                GUEST: {name: 'GUEST'}});
    });

    it ('return true when permission name is present in permissions object', fakeAsync(() => {
        expect(Object.keys(localService.getPermissions()).length).toEqual(0);
        localService.addPermission([PermissionsNamesEnum.ADMIN as any, PermissionsNamesEnum.GUEST]);

        expect(Object.keys(localService.getPermissions()).length).toEqual(2);
        localService.hasPermission('ADMIN').then((data) => {
            expect(data).toEqual(true);
        });

        localService.hasPermission('SHOULDNOTHAVEROLE').then(data => {
            expect(data).toEqual(false);
        });

        localService.hasPermission(['ADMIN']).then((data) => {
            expect(data).toEqual(true);
        });
        localService.hasPermission(['ADMIN', 'IRIISISTABLE']).then((data) => {
            expect(data).toEqual(true);
        });
    }));

    it ('return true when role permission function return true', fakeAsync(() => {
        expect(Object.keys(localService.getPermissions()).length).toEqual(0);
        localService.addPermission(PermissionsNamesEnum.ADMIN as any, () => {
            return true;
        });
        expect(Object.keys(localService.getPermissions()).length).toEqual(1);
        localService.hasPermission('ADMIN').then((data) => {
            expect(data).toEqual(true);
        });

        localService.addPermission(PermissionsNamesEnum.GUEST as any, () => {
            return false;
        });
        expect(Object.keys(localService.getPermissions()).length).toEqual(2);
        localService.hasPermission('GUEST').then((data) => {
            expect(data).toEqual(false);
        });

        localService.addPermission('TEST1' as any, () => {
            return Promise.resolve(true);
        });
        expect(Object.keys(localService.getPermissions()).length).toEqual(3);
        localService.hasPermission('TEST1').then((data) => {
            expect(data).toEqual(true);
        });
        localService.addPermission('TEST2' as any, () => {
            return Promise.resolve(false);
        });
        expect(Object.keys(localService.getPermissions()).length).toEqual(4);
        localService.hasPermission('TEST2').then((data) => {
            expect(data).toEqual(false);
        });

        // localService.addPermission(<any>'TEST3', () => {
        //     return Promise.reject()
        // });
        // expect(Object.keys(localService.getPermissions()).length).toEqual(5);
        // localService.hasPermission('TEST3').then((data) => {
        //     expect(data).toEqual(false);
        // });
    }));

    it ('return true when role permissions[array] function return true', fakeAsync(() => {
        expect(Object.keys(localService.getPermissions()).length).toEqual(0);
        localService.addPermission([PermissionsNamesEnum.ADMIN] as any, () => {
            return true;
        });
        expect(Object.keys(localService.getPermissions()).length).toEqual(1);

        localService.hasPermission('ADMIN').then((data) => {
            expect(data).toEqual(true);
        });

        localService.addPermission([PermissionsNamesEnum.GUEST] as any, () => {
            return false;
        });
        expect(Object.keys(localService.getPermissions()).length).toEqual(2);
        localService.hasPermission('GUEST').then((data) => {
            expect(data).toEqual(false);
        });

        localService.addPermission(['TEST1'] as any, () => {
            return Promise.resolve(true);
        });
        expect(Object.keys(localService.getPermissions()).length).toEqual(3);
        localService.hasPermission('TEST1').then((data) => {
            expect(data).toEqual(true);
        });
        localService.addPermission(['TEST9'] as any, () => {
            return Promise.resolve(false);
        });
        expect(Object.keys(localService.getPermissions()).length).toEqual(4);
        localService.hasPermission(['TEST9']).then((data) => {
            expect(data).toEqual(false);
        });

        localService.addPermission(['TEST11'] as any, (name, store) => {
            return Promise.resolve(false);
        });


        // localService.addPermission(<any>['TEST3'], () => {
        //     return Promise.reject()
        // });
        // expect(Object.keys(localService.getPermissions()).length).toEqual(5);
        // localService.hasPermission('TEST3').then((data) => {
        //     expect(data).toEqual(false);
        // });
    }));

    it ('return call function with name and store in array', fakeAsync(() => {

        localService.addPermission(['TEST11'] as any, (n, store) => {
            expect(n).toEqual('TEST11');
            expect(n).toEqual('TEST11');
            expect(store.TEST11).toBeTruthy();
            return Promise.resolve(n);
        });
        expect(Object.keys(localService.getPermissions()).length).toEqual(1);
        localService.hasPermission(['TEST11']).then((data) => {
            expect(data).toEqual(true);
        });
    }));

    it ('return call function with name and store in string', fakeAsync(() => {
        localService.addPermission(['TEST11'] as any, (n, store) => {
            expect(n).toEqual('TEST11');
            expect(n).toEqual('TEST11');
            expect(store.TEST11).toBeTruthy();
            return Promise.resolve(true);
        });
        expect(Object.keys(localService.getPermissions()).length).toEqual(1);
        localService.hasPermission('TEST11').then((data) => {
            expect(data).toEqual(true);
        });
    }));

    it('should return true when called with empty parameters', fakeAsync(() => {
        localService.hasPermission('').then((data) => {
            expect(data).toEqual(true);
        });
    }));

    it('should return true when called with empty array', fakeAsync(() => {
        localService.hasPermission([]).then((data) => {
            expect(data).toEqual(true);
        });
    }));
});



describe('Permissions Service model', () => {
    it('should create permission model', () => {
        const permission = {name: 'permission', validationFunction: () => true};
        expect(permission.name).toBe('permission');
        expect(permission.validationFunction()).toBe(true);
    });
});
