

import { PermissionsService } from './permissions.service';
import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { NgxPermissionsModule } from './index';

enum PermissionsNamesEnum {
    ADMIN = <any>'ADMIN',
    GUEST = <any>'GUEST'
}

describe('Permissions Service', () => {
    let localService: PermissionsService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxPermissionsModule.forRoot()]
        });
    });

    beforeEach(inject([PermissionsService], (service: PermissionsService) => {
        localService = service;
    }));

    it('should create an instance', () => {
        expect(localService).toBeTruthy();
    });

    it ('should add permission to permission object', () => {
        expect(localService.getPermission(<any>PermissionsNamesEnum.ADMIN)).toBeFalsy();
        localService.addPermission(<any>PermissionsNamesEnum.ADMIN);
        expect(localService.getPermission(<any>PermissionsNamesEnum.ADMIN)).toBeTruthy();
    })
    //
    it ('should remove permission from role object', () => {
        expect(localService.getPermissions()[PermissionsNamesEnum.ADMIN]).toBeFalsy();
        localService.addPermission(<any>PermissionsNamesEnum.ADMIN, );
        expect(localService.getPermissions()[PermissionsNamesEnum.ADMIN]).toBeTruthy();
        localService.removePermission(<any>PermissionsNamesEnum.ADMIN);
        expect(localService.getPermissions()[PermissionsNamesEnum.ADMIN]).toBeFalsy();
    });

    it ('should remove all permisssions from object', () => {
        expect(Object.keys(localService.getPermissions()).length).toEqual(0);
        localService.addPermission(<any>PermissionsNamesEnum.ADMIN, );
        localService.addPermission(<any>PermissionsNamesEnum.GUEST, );
        expect(Object.keys(localService.getPermissions()).length).toEqual(2);
        localService.flushPermissions();
        expect(Object.keys(localService.getPermissions()).length).toEqual(0);
    });

    it ('should add multiple permissions', () => {
        expect(Object.keys(localService.getPermissions()).length).toEqual(0);
        localService.addPermission([<any>PermissionsNamesEnum.ADMIN, PermissionsNamesEnum.GUEST]);

        expect(Object.keys(localService.getPermissions()).length).toEqual(2);
        expect(localService.getPermissions()).toEqual(
            {
                ADMIN: {name: "ADMIN"},
                GUEST: {name: "GUEST"}});
    });

    it ('return true when permission name is present in permissions object', fakeAsync(() => {
        expect(Object.keys(localService.getPermissions()).length).toEqual(0);
        localService.addPermission([<any>PermissionsNamesEnum.ADMIN, PermissionsNamesEnum.GUEST]);

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

    // it ('return true when role permission name is present in permission object', fakeAsync(() => {
    //     expect(Object.keys(localService.getPermissions()).length).toEqual(0);
    //     localService.addPermission([<any>PermissionsNamesEnum.ADMIN, PermissionsNamesEnum.GUEST]);
    //
    //     expect(Object.keys(localService.getPermissions()).length).toEqual(2);
    //     localService.hasPermission('Nice').then((data) => {
    //         expect(data).toEqual(true);
    //     });
    //     localService.hasPermission(['Nice']).then((data) => {
    //         expect(data).toEqual(true);
    //     });
    //     localService.hasPermission(['Nice', 'IRRISISTABLE']).then((data) => {
    //         expect(data).toEqual(true);
    //     });
    //     localService.hasPermission('SHOULDNOTHAVEROLE').then((data) => {
    //         expect(data).toEqual(false);
    //     });
    //     localService.hasPermission(['SHOULDNOTHAVEROLE']).then((data) => {
    //         expect(data).toEqual(false);
    //     });
    //
    // }));
});
