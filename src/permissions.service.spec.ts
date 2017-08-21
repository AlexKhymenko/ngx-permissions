

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
    // it ('should remove role from role object', () => {
    //     expect(localService.getRoles()[PermissionsNamesEnum.ADMIN]).toBeFalsy();
    //     localService.addRole(<any>PermissionsNamesEnum.ADMIN, ['edit', 'remove']);
    //     expect(localService.getRoles()[PermissionsNamesEnum.ADMIN]).toBeTruthy();
    //     localService.removeRole(<any>PermissionsNamesEnum.ADMIN);
    //     expect(localService.getRoles()[PermissionsNamesEnum.ADMIN]).toBeFalsy();
    // });
    //
    // it ('should remove all roles from object', () => {
    //     expect(Object.keys(localService.getRoles()).length).toEqual(0);
    //     localService.addRole(<any>PermissionsNamesEnum.ADMIN, ['edit', 'remove']);
    //     localService.addRole(<any>PermissionsNamesEnum.GUEST, ['edit', 'remove']);
    //     expect(Object.keys(localService.getRoles()).length).toEqual(2);
    //     localService.flushRoles();
    //     expect(Object.keys(localService.getRoles()).length).toEqual(0);
    // });
    //
    // it ('should add multiple roles', () => {
    //     expect(Object.keys(localService.getRoles()).length).toEqual(0);
    //     localService.addRoles({
    //         ADMIN: ['Nice'],
    //         GUEST: ["Awesome"]
    //     });
    //
    //     expect(Object.keys(localService.getRoles()).length).toEqual(2);
    //     expect(localService.getRoles()).toEqual(
    //         {
    //             ADMIN: {name: "ADMIN", validationFunction: ['Nice']},
    //             GUEST: {name: "GUEST", validationFunction: ['Awesome']}})
    // });
    //
    // it ('return true when role name is present in Roles object', fakeAsync(() => {
    //     expect(Object.keys(localService.getRoles()).length).toEqual(0);
    //     localService.addRoles({
    //         ADMIN: ['Nice'],
    //         GUEST: ["Awesome"]
    //     });
    //
    //     expect(Object.keys(localService.getRoles()).length).toEqual(2);
    //     localService.hasOnlyRoles('ADMIN').then((data) => {
    //         expect(data).toEqual(true);
    //     });
    //
    //     localService.hasOnlyRoles('SHOULDNOTHAVEROLE').then(data => {
    //         expect(data).toEqual(false);
    //     });
    //
    //     localService.hasOnlyRoles(['ADMIN']).then((data) => {
    //         expect(data).toEqual(true);
    //     });
    //     localService.hasOnlyRoles(['ADMIN', 'IRIISISTABLE']).then((data) => {
    //         expect(data).toEqual(true);
    //     });
    // }));
    //
    // it ('return true when role permission name is present in Roles object', fakeAsync(() => {
    //     expect(Object.keys(localService.getRoles()).length).toEqual(0);
    //     localService.addRoles({
    //         ADMIN: ['Nice'],
    //         GUEST: ["Awesome"]
    //     });
    //
    //
    //
    //     expect(Object.keys(localService.getRoles()).length).toEqual(2);
    //     localService.hasOnlyRoles('Nice').then((data) => {
    //         expect(data).toEqual(true);
    //     });
    //     localService.hasOnlyRoles(['Nice']).then((data) => {
    //         expect(data).toEqual(true);
    //     });
    //     localService.hasOnlyRoles(['Nice', 'IRRISISTABLE']).then((data) => {
    //         expect(data).toEqual(true);
    //     });
    //     localService.hasOnlyRoles('SHOULDNOTHAVEROLE').then((data) => {
    //         expect(data).toEqual(false);
    //     });
    //     localService.hasOnlyRoles(['SHOULDNOTHAVEROLE']).then((data) => {
    //         expect(data).toEqual(false);
    //     });
    //
    // }));
});
