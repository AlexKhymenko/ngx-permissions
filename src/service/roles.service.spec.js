"use strict";
exports.__esModule = true;
var roles_service_1 = require("./roles.service");
var testing_1 = require("@angular/core/testing");
var index_1 = require("../index");
var RoleNamesEnum;
(function (RoleNamesEnum) {
    RoleNamesEnum[RoleNamesEnum["ADMIN"] = 'ADMIN'] = "ADMIN";
    RoleNamesEnum[RoleNamesEnum["GUEST"] = 'GUEST'] = "GUEST";
})(RoleNamesEnum || (RoleNamesEnum = {}));
describe('Roles Service', function () {
    var localService;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(testing_1.inject([roles_service_1.NgxRolesService], function (service) {
        localService = service;
    }));
    it('should create an instance', function () {
        expect(localService).toBeTruthy();
    });
    it('should add role to role object', function () {
        expect(localService.getRoles()[RoleNamesEnum.ADMIN]).toBeFalsy();
        localService.addRole(RoleNamesEnum.ADMIN, ['edit', 'remove']);
        expect(localService.getRoles()[RoleNamesEnum.ADMIN]).toBeTruthy();
        expect(localService.getRoles()).toEqual({ ADMIN: { name: 'ADMIN', validationFunction: ['edit', 'remove'] } });
    });
    it('should remove role from role object', function () {
        expect(localService.getRoles()[RoleNamesEnum.ADMIN]).toBeFalsy();
        localService.addRole(RoleNamesEnum.ADMIN, ['edit', 'remove']);
        expect(localService.getRoles()[RoleNamesEnum.ADMIN]).toBeTruthy();
        localService.removeRole(RoleNamesEnum.ADMIN);
        expect(localService.getRoles()[RoleNamesEnum.ADMIN]).toBeFalsy();
    });
    it('should remove all roles from object', function () {
        expect(Object.keys(localService.getRoles()).length).toEqual(0);
        localService.addRole(RoleNamesEnum.ADMIN, ['edit', 'remove']);
        localService.addRole(RoleNamesEnum.GUEST, ['edit', 'remove']);
        expect(Object.keys(localService.getRoles()).length).toEqual(2);
        localService.flushRoles();
        expect(Object.keys(localService.getRoles()).length).toEqual(0);
    });
    it('should add multiple roles', function () {
        expect(Object.keys(localService.getRoles()).length).toEqual(0);
        localService.addRoles({
            ADMIN: ['Nice'],
            GUEST: ["Awesome"]
        });
        expect(Object.keys(localService.getRoles()).length).toEqual(2);
        expect(localService.getRoles()).toEqual({
            ADMIN: { name: "ADMIN", validationFunction: ['Nice'] },
            GUEST: { name: "GUEST", validationFunction: ['Awesome'] }
        });
    });
    it('return true when role name is present in Roles object', testing_1.fakeAsync(function () {
        expect(Object.keys(localService.getRoles()).length).toEqual(0);
        localService.addRoles({
            ADMIN: ['Nice'],
            GUEST: ["Awesome"]
        });
        expect(Object.keys(localService.getRoles()).length).toEqual(2);
        localService.hasOnlyRoles('ADMIN').then(function (data) {
            expect(data).toEqual(true);
        });
        localService.hasOnlyRoles('SHOULDNOTHAVEROLE').then(function (data) {
            expect(data).toEqual(false);
        });
        localService.hasOnlyRoles(['ADMIN']).then(function (data) {
            expect(data).toEqual(true);
        });
        localService.hasOnlyRoles(['ADMIN', 'IRIISISTABLE']).then(function (data) {
            expect(data).toEqual(true);
        });
    }));
    it('return true when role permission name is present in Roles object', testing_1.fakeAsync(function () {
        expect(Object.keys(localService.getRoles()).length).toEqual(0);
        localService.addRoles({
            ADMIN: ['Nice'],
            GUEST: ["Awesome"]
        });
        expect(Object.keys(localService.getRoles()).length).toEqual(2);
        localService.hasOnlyRoles('Nice').then(function (data) {
            expect(data).toEqual(true);
        });
        localService.hasOnlyRoles(['Nice']).then(function (data) {
            expect(data).toEqual(true);
        });
        localService.hasOnlyRoles(['Nice', 'IRRISISTABLE']).then(function (data) {
            expect(data).toEqual(true);
        });
        localService.hasOnlyRoles('SHOULDNOTHAVEROLE').then(function (data) {
            expect(data).toEqual(false);
        });
        localService.hasOnlyRoles(['SHOULDNOTHAVEROLE']).then(function (data) {
            expect(data).toEqual(false);
        });
    }));
});
