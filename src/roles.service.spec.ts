import { RolesService } from './roles.service';
import { inject, TestBed } from '@angular/core/testing';

enum RoleNamesEnum {
    ADMIN = <any>'ADMIN',
    GUEST = <any>'GUEST'
}

describe('Roles Service', () => {
    let localService: RolesService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RolesService]
        });
    });

    beforeEach(inject([RolesService], (service: RolesService) => {
        localService = service;
    }));

    it('should create an instance', () => {
        expect(localService).toBeTruthy();
    });

    it ('should add role to role object', () => {
        expect(localService.getRoles()[RoleNamesEnum.ADMIN]).toBeFalsy();
        localService.addRole(<any>RoleNamesEnum.ADMIN, ['edit', 'remove']);
        expect(localService.getRoles()[RoleNamesEnum.ADMIN]).toBeTruthy();
        expect(localService.getRoles()).toEqual(
            {ADMIN: {name: 'ADMIN', validationFunction: ['edit', 'remove']}}
            )
    })

    it ('should remove role from role object', () => {
        expect(localService.getRoles()[RoleNamesEnum.ADMIN]).toBeFalsy();
        localService.addRole(<any>RoleNamesEnum.ADMIN, ['edit', 'remove']);
        expect(localService.getRoles()[RoleNamesEnum.ADMIN]).toBeTruthy();
        localService.removeRole(<any>RoleNamesEnum.ADMIN);
        expect(localService.getRoles()[RoleNamesEnum.ADMIN]).toBeFalsy();
    });

    it ('should remove all roles from object', () => {
        expect(Object.keys(localService.getRoles()).length).toEqual(0);
        localService.addRole(<any>RoleNamesEnum.ADMIN, ['edit', 'remove']);
        localService.addRole(<any>RoleNamesEnum.GUEST, ['edit', 'remove']);
        expect(Object.keys(localService.getRoles()).length).toEqual(2);
        localService.flushRoles();
        expect(Object.keys(localService.getRoles()).length).toEqual(0);
    });

    it ('should add multiple roles', () => {
        expect(Object.keys(localService.getRoles()).length).toEqual(0);
        localService.addRoles({
          ADMIN: ['Nice'],
          GUEST: ["Awesome"]
        });

        expect(Object.keys(localService.getRoles()).length).toEqual(2);
        expect(localService.getRoles()).toEqual(
            {
                ADMIN: {name: "ADMIN", validationFunction: ['Nice']},
                GUEST: {name: "GUEST", validationFunction: ['Awesome']}})
    });

    it ('return true when role name is present in Roles object', () => {
        expect(Object.keys(localService.getRoles()).length).toEqual(0);
        localService.addRoles({
            ADMIN: ['Nice'],
            GUEST: ["Awesome"]
        });

        expect(Object.keys(localService.getRoles()).length).toEqual(2);
        expect(localService.hasOnlyRoles('ADMIN')).toEqual(true);
        expect(localService.hasOnlyRoles('SHOULDNOTHAVEROLE')).toEqual(false);
        expect(localService.hasOnlyRoles(['ADMIN'])).toEqual(true);
        expect(localService.hasOnlyRoles(['ADMIN', 'IRIISISTABLE'])).toEqual(true);
    });

    it ('return true when role permission name is present in Roles object', () => {
        expect(Object.keys(localService.getRoles()).length).toEqual(0);
        localService.addRoles({
            ADMIN: ['Nice'],
            GUEST: ["Awesome"]
        });

        expect(Object.keys(localService.getRoles()).length).toEqual(2);
        expect(localService.hasOnlyRoles('Nice')).toEqual(true);
        expect(localService.hasOnlyRoles(['Nice'])).toEqual(true);
        expect(localService.hasOnlyRoles(['Nice', 'IRRISISTABLE'])).toEqual(true);
        expect(localService.hasOnlyRoles('SHOULDNOTHAVEROLE')).toEqual(false)
        expect(localService.hasOnlyRoles(['SHOULDNOTHAVEROLE'])).toEqual(false)
    });
});
