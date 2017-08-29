"use strict";
exports.__esModule = true;
var permissions_service_1 = require("./permissions.service");
var testing_1 = require("@angular/core/testing");
var index_1 = require("../index");
var PermissionsNamesEnum;
(function (PermissionsNamesEnum) {
    PermissionsNamesEnum[PermissionsNamesEnum["ADMIN"] = 'ADMIN'] = "ADMIN";
    PermissionsNamesEnum[PermissionsNamesEnum["GUEST"] = 'GUEST'] = "GUEST";
})(PermissionsNamesEnum || (PermissionsNamesEnum = {}));
describe('Permissions Service', function () {
    var localService;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(testing_1.inject([permissions_service_1.NgxPermissionsService], function (service) {
        localService = service;
    }));
    it('should create an instance', function () {
        expect(localService).toBeTruthy();
    });
    it('should add permission to permission object', function () {
        expect(localService.getPermission(PermissionsNamesEnum.ADMIN)).toBeFalsy();
        localService.addPermission(PermissionsNamesEnum.ADMIN);
        expect(localService.getPermission(PermissionsNamesEnum.ADMIN)).toBeTruthy();
    });
    //
    it('should remove permission from role object', function () {
        expect(localService.getPermissions()[PermissionsNamesEnum.ADMIN]).toBeFalsy();
        localService.addPermission(PermissionsNamesEnum.ADMIN);
        expect(localService.getPermissions()[PermissionsNamesEnum.ADMIN]).toBeTruthy();
        localService.removePermission(PermissionsNamesEnum.ADMIN);
        expect(localService.getPermissions()[PermissionsNamesEnum.ADMIN]).toBeFalsy();
    });
    it('should remove all permisssions from object', function () {
        expect(Object.keys(localService.getPermissions()).length).toEqual(0);
        localService.addPermission(PermissionsNamesEnum.ADMIN);
        localService.addPermission(PermissionsNamesEnum.GUEST);
        expect(Object.keys(localService.getPermissions()).length).toEqual(2);
        localService.flushPermissions();
        expect(Object.keys(localService.getPermissions()).length).toEqual(0);
    });
    it('should add multiple permissions', function () {
        expect(Object.keys(localService.getPermissions()).length).toEqual(0);
        localService.addPermission([PermissionsNamesEnum.ADMIN, PermissionsNamesEnum.GUEST]);
        expect(Object.keys(localService.getPermissions()).length).toEqual(2);
        expect(localService.getPermissions()).toEqual({
            ADMIN: { name: "ADMIN" },
            GUEST: { name: "GUEST" }
        });
    });
    it('return true when permission name is present in permissions object', testing_1.fakeAsync(function () {
        expect(Object.keys(localService.getPermissions()).length).toEqual(0);
        localService.addPermission([PermissionsNamesEnum.ADMIN, PermissionsNamesEnum.GUEST]);
        expect(Object.keys(localService.getPermissions()).length).toEqual(2);
        localService.hasPermission('ADMIN').then(function (data) {
            expect(data).toEqual(true);
        });
        localService.hasPermission('SHOULDNOTHAVEROLE').then(function (data) {
            expect(data).toEqual(false);
        });
        localService.hasPermission(['ADMIN']).then(function (data) {
            expect(data).toEqual(true);
        });
        localService.hasPermission(['ADMIN', 'IRIISISTABLE']).then(function (data) {
            expect(data).toEqual(true);
        });
    }));
    it('return true when role permission function return true', testing_1.fakeAsync(function () {
        expect(Object.keys(localService.getPermissions()).length).toEqual(0);
        localService.addPermission(PermissionsNamesEnum.ADMIN, function () {
            return true;
        });
        expect(Object.keys(localService.getPermissions()).length).toEqual(1);
        localService.hasPermission('ADMIN').then(function (data) {
            expect(data).toEqual(true);
        });
        localService.addPermission(PermissionsNamesEnum.GUEST, function () {
            return false;
        });
        expect(Object.keys(localService.getPermissions()).length).toEqual(2);
        localService.hasPermission('GUEST').then(function (data) {
            expect(data).toEqual(false);
        });
        localService.addPermission('TEST1', function () {
            return Promise.resolve(true);
        });
        expect(Object.keys(localService.getPermissions()).length).toEqual(3);
        localService.hasPermission('TEST1').then(function (data) {
            expect(data).toEqual(true);
        });
        localService.addPermission('TEST2', function () {
            return Promise.resolve(false);
        });
        expect(Object.keys(localService.getPermissions()).length).toEqual(4);
        localService.hasPermission('TEST2').then(function (data) {
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
    it('return true when role permissions[array] function return true', testing_1.fakeAsync(function () {
        expect(Object.keys(localService.getPermissions()).length).toEqual(0);
        localService.addPermission([PermissionsNamesEnum.ADMIN], function () {
            return true;
        });
        expect(Object.keys(localService.getPermissions()).length).toEqual(1);
        localService.hasPermission('ADMIN').then(function (data) {
            expect(data).toEqual(true);
        });
        localService.addPermission([PermissionsNamesEnum.GUEST], function () {
            return false;
        });
        expect(Object.keys(localService.getPermissions()).length).toEqual(2);
        localService.hasPermission('GUEST').then(function (data) {
            expect(data).toEqual(false);
        });
        localService.addPermission(['TEST1'], function () {
            return Promise.resolve(true);
        });
        expect(Object.keys(localService.getPermissions()).length).toEqual(3);
        localService.hasPermission('TEST1').then(function (data) {
            expect(data).toEqual(true);
        });
        localService.addPermission(['TEST9'], function () {
            return Promise.resolve(false);
        });
        expect(Object.keys(localService.getPermissions()).length).toEqual(4);
        localService.hasPermission(['TEST9']).then(function (data) {
            expect(data).toEqual(false);
        });
        localService.addPermission(['TEST11'], function (name, store) {
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
    it('return call function with name and store in array', testing_1.fakeAsync(function () {
        localService.addPermission(['TEST11'], function (n, store) {
            expect(n).toEqual('TEST11');
            expect(n).toEqual('TEST11');
            expect(store['TEST11']).toBeTruthy();
            return Promise.resolve(n);
        });
        expect(Object.keys(localService.getPermissions()).length).toEqual(1);
        localService.hasPermission(['TEST11']).then(function (data) {
            expect(data).toEqual(true);
        });
    }));
    it('return call function with name and store in string', testing_1.fakeAsync(function () {
        localService.addPermission(['TEST11'], function (n, store) {
            expect(n).toEqual('TEST11');
            expect(n).toEqual('TEST11');
            expect(store['TEST11']).toBeTruthy();
            return Promise.resolve(true);
        });
        expect(Object.keys(localService.getPermissions()).length).toEqual(1);
        localService.hasPermission('TEST11').then(function (data) {
            expect(data).toEqual(true);
        });
    }));
});
