"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var index_1 = require("../index");
var testing_1 = require("@angular/core/testing");
var permissions_service_1 = require("../service/permissions.service");
var roles_service_1 = require("../service/roles.service");
var PermissionsTestEnum;
(function (PermissionsTestEnum) {
    PermissionsTestEnum[PermissionsTestEnum["ADMIN"] = 'ADMIN'] = "ADMIN";
    PermissionsTestEnum[PermissionsTestEnum["GUEST"] = 'GUEST'] = "GUEST";
})(PermissionsTestEnum || (PermissionsTestEnum = {}));
describe('NgxPermissionsDirective', function () {
    it('should create an instance', function () {
        // const directive = new PermissionsDirective();
        expect(true).toBeTruthy();
    });
});
describe('Permission directive angular except', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "<ng-template permissions [ngxPermissionsExcept]=\"'ADMIN'\"><div>123</div></ng-template>" })
        ], TestComp);
        return TestComp;
    }());
    var permissionService;
    var permissions;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        permissionService = fixture.debugElement.injector.get(permissions_service_1.NgxPermissionsService);
    });
    it('Should not show component', testing_1.fakeAsync(function () {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        testing_1.tick();
        fixture.detectChanges();
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    }));
    it('Should  show the component', testing_1.fakeAsync(function () {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    }));
    it('Should show the component', testing_1.fakeAsync(function () {
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
    it('Should hide component when permission added', testing_1.fakeAsync(function () {
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');
        permissionService.addPermission(PermissionsTestEnum.ADMIN);
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    }));
    it('Should show component when permission removed', testing_1.fakeAsync(function () {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionService.removePermission(PermissionsTestEnum.ADMIN);
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');
    }));
});
describe('Permission directive angular only', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "<ng-template permissions [ngxPermissionsOnly]=\"'ADMIN'\"><div>123</div></ng-template>" })
        ], TestComp);
        return TestComp;
    }());
    var permissionService;
    var permissions;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        permissionService = fixture.debugElement.injector.get(permissions_service_1.NgxPermissionsService);
    });
    it('Should show the component', testing_1.fakeAsync(function () {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
    it('Should not show the component', testing_1.fakeAsync(function () {
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    }));
    it('Should show component when permission added', testing_1.fakeAsync(function () {
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionService.addPermission(PermissionsTestEnum.ADMIN);
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');
    }));
    it('Should hide component when permission removed', testing_1.fakeAsync(function () {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');
        permissionService.removePermission(PermissionsTestEnum.ADMIN);
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    }));
});
describe('Permission directive angular roles only', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "<ng-template permissions [ngxPermissionsOnly]=\"'ADMIN'\"><div>123</div></ng-template>" })
        ], TestComp);
        return TestComp;
    }());
    var rolesService;
    var permissions;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        rolesService = fixture.debugElement.injector.get(roles_service_1.NgxRolesService);
    });
    it('Should show the component when key of role is the same', testing_1.fakeAsync(function () {
        rolesService.addRole('ADMIN', ['Awsesome']);
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
    it('should show the component when permissions array is the same ', testing_1.fakeAsync(function () {
        rolesService.addRole('GG', ['ADMIN']);
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
    it('should hide the component when user deletes all roles', testing_1.fakeAsync(function () {
        rolesService.addRole('ADMIN', ['Awsesome']);
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
        rolesService.flushRoles();
        testing_1.tick();
        fixture.detectChanges();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
    it('should hide the component when user deletes one role', testing_1.fakeAsync(function () {
        rolesService.addRole('ADMIN', ['Awsesome']);
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
        rolesService.removeRole("ADMIN");
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
});
describe('Permission directive angular roles only array', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "<ng-template permissions [ngxPermissionsOnly]=\"['ADMIN', 'GUEST']\"><div>123</div></ng-template>" })
        ], TestComp);
        return TestComp;
    }());
    var rolesService;
    var permissions;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        rolesService = fixture.debugElement.injector.get(roles_service_1.NgxRolesService);
    });
    it('Should show the component when key of role is the same', testing_1.fakeAsync(function () {
        rolesService.addRole('ADMIN', ['Awsesome']);
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
    it('should show the component when permissions array is the same ', testing_1.fakeAsync(function () {
        rolesService.addRole('GG', ['ADMIN']);
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
    it('should hide the component when user deletes all roles', testing_1.fakeAsync(function () {
        rolesService.addRole('GG', ['ADMIN']);
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
        rolesService.flushRoles();
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
    it('should hide the component when user deletes one roles', testing_1.fakeAsync(function () {
        rolesService.addRole('GG', ['ADMIN']);
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
        rolesService.removeRole("GG");
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
});
describe('Permission directive angular roles except', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "<ng-template permissions [ngxPermissionsExcept]=\"'ADMIN'\"><div>123</div></ng-template>" })
        ], TestComp);
        return TestComp;
    }());
    var rolesService;
    var permissions;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        rolesService = fixture.debugElement.injector.get(roles_service_1.NgxRolesService);
    });
    it('Should hide the component when key of role is the same', testing_1.fakeAsync(function () {
        rolesService.addRole('ADMIN', ['Awsesome']);
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    }));
    it('should show the component when permissions array is the same ', testing_1.fakeAsync(function () {
        rolesService.addRole('GG', ['ADMIN']);
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    }));
    it('should show the component when user deletes all roles', testing_1.fakeAsync(function () {
        rolesService.addRole('ADMIN', ['Awsesome']);
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
        rolesService.flushRoles();
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
    it('should show the component when user deletes one role', testing_1.fakeAsync(function () {
        rolesService.addRole('ADMIN', ['Awsesome']);
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
        rolesService.removeRole("ADMIN");
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
});
describe('Permission directive angular roles except array', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "<ng-template permissions [ngxPermissionsExcept]=\"['ADMIN', 'GUEST']\"><div>123</div></ng-template>" })
        ], TestComp);
        return TestComp;
    }());
    var rolesService;
    var permissions;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        rolesService = fixture.debugElement.injector.get(roles_service_1.NgxRolesService);
    });
    it('Should show the component when key of role is the same', testing_1.fakeAsync(function () {
        rolesService.addRole('ADMIN', ['Awsesome']);
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    }));
    it('should show the component when permissions array is the same ', testing_1.fakeAsync(function () {
        rolesService.addRole('GG', ['ADMIN']);
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    }));
    it('should show the component when user deletes all roles', testing_1.fakeAsync(function () {
        rolesService.addRole('GG', ['ADMIN']);
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
        rolesService.flushRoles();
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
    it('should show the component when user deletes one roles', testing_1.fakeAsync(function () {
        rolesService.addRole('GG', ['ADMIN']);
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
        rolesService.removeRole("GG");
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
});
describe('Permission directive angular testing different selectors *permmisionsOnly', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "<div *ngxPermissionsOnly=\"['ADMIN']\"><div>123</div></div>" })
        ], TestComp);
        return TestComp;
    }());
    var rolesService;
    var permissions;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        rolesService = fixture.debugElement.injector.get(roles_service_1.NgxRolesService);
    });
    it('Should show the component when key of role is the same', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', ['Awsesome']);
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should hide the component when key of role is the same', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('GG', ['Awsesome']);
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
});
describe('Permission directive angular testing different selectors *permmisionsExcept', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "<div *ngxPermissionsExcept=\"['ADMIN']\"><div>123</div></div>" })
        ], TestComp);
        return TestComp;
    }());
    var rolesService;
    var permissions;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        rolesService = fixture.debugElement.injector.get(roles_service_1.NgxRolesService);
    });
    it('Should show the component when key of role is the same', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('Guest', ['Awsesome']);
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should hide the component when key of role is the same', testing_1.fakeAsync(function () {
        rolesService.addRole('ADMIN', ['Awsesome']);
        testing_1.tick();
        fixture.detectChanges();
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    }));
});
describe('Permission directive angular testing different async functions in roles', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "<div *ngxPermissionsOnly=\"'ADMIN'\"><div>123</div></div>" })
        ], TestComp);
        return TestComp;
    }());
    var rolesService;
    var permissions;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        rolesService = fixture.debugElement.injector.get(roles_service_1.NgxRolesService);
    });
    it('Should show the component when promise returns truthy value', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        // rolesService.addRole('ADMIN', () => {
        //     return Promise.resolve();
        // });
        rolesService.addRole('ADMIN', function () {
            return true;
        });
        detectChanges(fixture);
        testing_1.tick();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should not show the component when promise returns truthy value', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', function () {
            return false;
        });
        detectChanges(fixture);
        testing_1.tick();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
    it('Should show the component when promise returns truthy value', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', function () {
            return Promise.resolve(true);
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should not show the component when promise rejects', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', function () {
            return Promise.reject();
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
});
describe('Permission directive angular testing different async functions in roles via array', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "<div *ngxPermissionsOnly=\"['ADMIN','GUEST']\"><div>123</div></div>" })
        ], TestComp);
        return TestComp;
    }());
    var rolesService;
    var permissions;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        rolesService = fixture.debugElement.injector.get(roles_service_1.NgxRolesService);
    });
    it('Should show the component when promise returns truthy value', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        // rolesService.addRole('ADMIN', () => {
        //     return Promise.resolve();
        // });
        rolesService.addRole('ADMIN', function () {
            return true;
        });
        detectChanges(fixture);
        testing_1.tick();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should not show the component when promise returns false value', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', function () {
            return false;
        });
        detectChanges(fixture);
        testing_1.tick();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
    it('Should show the component when promise returns truthy value', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', function () {
            return Promise.resolve(true);
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should not show the component when promise rejects', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', function () {
            return Promise.reject();
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
    it('Should  show the component when one of the promises fulfills ', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', function () {
            return Promise.reject();
        });
        rolesService.addRole('GUEST', function () {
            return Promise.resolve(true);
        });
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        fixture.detectChanges();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should  show the component when one of the promises fulfills with 0 value', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', function () {
            return Promise.reject();
        });
        rolesService.addRole('GUEST', function () {
            return Promise.resolve();
        });
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        fixture.detectChanges();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should not show the component when all promises fails', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', function () {
            return Promise.reject();
        });
        rolesService.addRole('GUEST', function () {
            return Promise.reject();
        });
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        fixture.detectChanges();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
    it('Should show the component when one of promises returns true', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('GUEST', function () {
            return true;
        });
        rolesService.addRole('ADMIN', function () {
            return Promise.reject();
        });
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        fixture.detectChanges();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should not show the component when all promises fails', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', function () {
            return Promise.reject();
        });
        rolesService.addRole('GUEST', ['awesome']);
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        fixture.detectChanges();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should show the component when one rejects but another one fullfills', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', function () {
            return Promise.reject();
        });
        rolesService.addRole('awesome', ['GUEST']);
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        fixture.detectChanges();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
});
describe('Permission directive angular testing different async functions in permissions via array', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "<div *ngxPermissionsOnly=\"['ADMIN','GUEST']\"><div>123</div></div>" })
        ], TestComp);
        return TestComp;
    }());
    var permissionsService;
    var permissions;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        permissionsService = fixture.debugElement.injector.get(permissions_service_1.NgxPermissionsService);
    });
    it('Should show the component when promise returns truthy value', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        // rolesService.addRole('ADMIN', () => {
        //     return Promise.resolve();
        // });
        permissionsService.addPermission('ADMIN', function () {
            return true;
        });
        detectChanges(fixture);
        testing_1.tick();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should not show the component when promise returns false value', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', function () {
            return false;
        });
        detectChanges(fixture);
        testing_1.tick();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
    it('Should show the component when promise returns truthy value', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', function () {
            return Promise.resolve(true);
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should not show the component when promise rejects', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', function () {
            return Promise.reject();
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
    it('Should  show the component when one of the promises fulfills ', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', function () {
            return Promise.resolve();
        });
        permissionsService.addPermission('GUEST', function () {
            return Promise.reject();
        });
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        fixture.detectChanges();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should  show the component when one of the promises fulfills with 0 value', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', function () {
            return Promise.resolve();
        });
        permissionsService.addPermission('GUEST', function () {
            return Promise.resolve();
        });
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        fixture.detectChanges();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should not show the component when all promises fails', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', function () {
            return Promise.reject();
        });
        permissionsService.addPermission('GUEST', function () {
            return Promise.reject();
        });
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        fixture.detectChanges();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
    it('Should show the component when one of promises returns true', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('GUEST', function () {
            return true;
        });
        permissionsService.addPermission('ADMIN', function () {
            return Promise.reject();
        });
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        fixture.detectChanges();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should not show the component when all promises fails', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', function () {
            return Promise.reject();
        });
        permissionsService.addPermission('GUEST', function () {
            return Promise.resolve(true);
        });
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        fixture.detectChanges();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should show the component when one rejects but another one fullfills', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', function () {
            return Promise.reject();
        });
        permissionsService.addPermission('GUEST', function () {
            return true;
        });
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        fixture.detectChanges();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should show the component when one rejects but another one fullfills', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', function () {
            return true;
        });
        permissionsService.addPermission('GUEST', function () {
            return Promise.reject();
        });
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        fixture.detectChanges();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should show the component when functions with name and store fullfils', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', function (name, store) {
            expect(store[name].name).toBeTruthy();
            return name === 'ADMIN';
        });
        permissionsService.addPermission('GUEST', function () {
            return Promise.reject();
        });
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        fixture.detectChanges();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
});
describe('Permission directive angular testing different async functions in permissions via string', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "<div *ngxPermissionsOnly=\"'ADMIN'\"><div>123</div></div>" })
        ], TestComp);
        return TestComp;
    }());
    var permissionsService;
    var permissions;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        permissionsService = fixture.debugElement.injector.get(permissions_service_1.NgxPermissionsService);
    });
    it('Should show the component when promise returns truthy value', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        // rolesService.addRole('ADMIN', () => {
        //     return Promise.resolve();
        // });
        permissionsService.addPermission('ADMIN', function () {
            return true;
        });
        detectChanges(fixture);
        testing_1.tick();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should not show the component when promise returns false value', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', function () {
            return false;
        });
        detectChanges(fixture);
        testing_1.tick();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
    it('Should show the component when promise returns truthy value', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', function () {
            return Promise.resolve(true);
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should not show the component when promise rejects', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', function () {
            return Promise.reject();
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
    it('Should  show the component when one of the promises fulfills ', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', function () {
            return Promise.resolve();
        });
        permissionsService.addPermission('GUEST', function () {
            return Promise.resolve(true);
        });
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        fixture.detectChanges();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should  show the component when one of the promises fulfills with 0 value', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', function () {
            return Promise.resolve();
        });
        permissionsService.addPermission('GUEST', function () {
            return Promise.reject();
        });
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        fixture.detectChanges();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should not show the component when all promises fails', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', function () {
            return Promise.reject();
        });
        permissionsService.addPermission('GUEST', function () {
            return Promise.reject();
        });
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        fixture.detectChanges();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
    it('Should show the component when one of promises returns true', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('GUEST', function () {
            return Promise.reject();
        });
        permissionsService.addPermission('ADMIN', function () {
            return true;
        });
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        fixture.detectChanges();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should not show the component when all promises fails', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', function () {
            return Promise.resolve(true);
        });
        permissionsService.addPermission('GUEST', function () {
            return Promise.reject();
        });
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        fixture.detectChanges();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should show the component when one rejects but another one fullfills', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', function () {
            return true;
        });
        permissionsService.addPermission('GUEST', function () {
            return Promise.reject();
        });
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        fixture.detectChanges();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
    it('Should show the component when functions with name and store fullfils', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', function (name, store) {
            expect(store[name].name).toBeTruthy();
            return name === 'ADMIN';
        });
        permissionsService.addPermission('GUEST', function () {
            return Promise.reject();
        });
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        fixture.detectChanges();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
});
describe('Permission  directive angular testing  different only and accept together async functions in permissions via string', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "<ng-template ngxPermissionsOnly=\"ADMIN\" ngxPermissionsExcept=\"MANAGER\"><div>123</div></ng-template>" })
        ], TestComp);
        return TestComp;
    }());
    var permissionsService;
    var permissions;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        permissionsService = fixture.debugElement.injector.get(permissions_service_1.NgxPermissionsService);
    });
    it('Should show the component when permission except not available and only fullfills', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', function () {
            return true;
        });
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');
    }));
    it('Should NOT show the component when permission except fulfills', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('MANAGER', function () {
            return true;
        });
        permissionsService.addPermission('ADMIN', function () {
            return true;
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
    it('Should NOT show the component when permission except fulfills even when only also fullfills', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('MANAGER', function () {
            return true;
        });
        permissionsService.addPermission('ADMIN', function () {
            return true;
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
    it('Should show the component when permission except fulfills with function that returns false and only fullfiles', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('MANAGER', function () {
            return false;
        });
        permissionsService.addPermission('ADMIN', function () {
            return true;
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');
    }));
});
describe('Permission  directive angular testing  different only and accept together async functions in permissions via array', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "<ng-template [ngxPermissionsOnly]=\"['ADMIN', 'GUEST']\" [ngxPermissionsExcept]=\"['MANAGER']\"><div>123</div></ng-template>" })
        ], TestComp);
        return TestComp;
    }());
    var permissionsService;
    var permissions;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        permissionsService = fixture.debugElement.injector.get(permissions_service_1.NgxPermissionsService);
    });
    it('Should show the component when permission except not available and only fullfills', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', function () {
            return true;
        });
        detectChanges(fixture);
        testing_1.tick();
        testing_1.tick();
        testing_1.tick();
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');
    }));
    it('Should NOT show the component when permission except fulfills', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('MANAGER', function () {
            return true;
        });
        permissionsService.addPermission('ADMIN', function () {
            return true;
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
    it('Should NOT show the component when permission except fulfills even when only also fullfills', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('MANAGER', function () {
            return true;
        });
        permissionsService.addPermission('ADMIN', function () {
            return true;
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
    it('Should show the component when permission except fulfills with function that returns false and only fullfiles', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('MANAGER', function () {
            return false;
        });
        permissionsService.addPermission('ADMIN', function () {
            return true;
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');
    }));
});
describe('Permission  directive angular testing  different only and accept together async functions in roles via array', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "<ng-template [ngxPermissionsOnly]=\"['ADMIN', 'GUEST']\" [ngxPermissionsExcept]=\"['MANAGER']\"><div>123</div></ng-template>" })
        ], TestComp);
        return TestComp;
    }());
    var rolesService;
    var permissions;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        rolesService = fixture.debugElement.injector.get(roles_service_1.NgxRolesService);
    });
    it('Should show the component when role except not available and only fullfills', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', function () {
            return true;
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');
    }));
    it('Should NOT show the component when role except fulfills', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('MANAGER', function () {
            return true;
        });
        rolesService.addRole('ADMIN', function () {
            return true;
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
    it('Should NOT show the component when role except fulfills even when only also fullfills', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('MANAGER', function () {
            return true;
        });
        rolesService.addRole('ADMIN', function () {
            return true;
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
    it('Should show the component when role except fulfills with function that returns false and only fullfiles', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('MANAGER', function () {
            return false;
        });
        rolesService.addRole('ADMIN', function () {
            return true;
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');
    }));
});
describe('ngxPermissionsOnly Directive testing else block', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "\n            <div *ngxPermissionsOnly=\"['FAILED_BLOCK']; else elseBlock\">main</div>\n            <ng-template #elseBlock>\n                <div>elseBlock</div>\n            </ng-template>\n            <ng-template #thenBlock>\n                <div>thenBlock</div>\n            </ng-template>\n           \n        "
            })
        ], TestComp);
        return TestComp;
    }());
    var rolesService;
    var permissions;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        rolesService = fixture.debugElement.injector.get(roles_service_1.NgxRolesService);
    });
    it('Should fail and show else block', testing_1.fakeAsync(function () {
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual("elseBlock");
    }));
    it('Should add element remove element and show then block', testing_1.fakeAsync(function () {
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('FAILED_BLOCK', function () {
            return true;
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('main');
        rolesService.removeRole('FAILED_BLOCK');
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual("elseBlock");
    }));
});
describe('ngxPermissionsOnly Directive testing then block', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "\n            <div *ngxPermissionsOnly=\"['THEN_BLOCK']; else elseBlock; then thenBlock\">main</div>\n            <ng-template #elseBlock>\n                <div>elseBlock</div>\n            </ng-template>\n            <ng-template #thenBlock>\n                <div>thenBlock</div>\n            </ng-template>\n           \n        "
            })
        ], TestComp);
        return TestComp;
    }());
    var rolesService;
    var permissions;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        rolesService = fixture.debugElement.injector.get(roles_service_1.NgxRolesService);
    });
    it('Should fail and show then block', testing_1.fakeAsync(function () {
        rolesService.addRole('THEN_BLOCK', function () {
            return true;
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual("thenBlock");
    }));
});
describe('ngxPermissionsExcept Directive testing else block', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "\n            <div *ngxPermissionsExcept=\"['MAIN_BLOCK']; else elseBlock\">main</div>\n            <ng-template #elseBlock>\n                <div>elseBlock</div>\n            </ng-template>\n            <ng-template #thenBlock>\n                thenBlock\n            </ng-template>\n           \n        "
            })
        ], TestComp);
        return TestComp;
    }());
    var rolesService;
    var permissionsService;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        rolesService = fixture.debugElement.injector.get(roles_service_1.NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(permissions_service_1.NgxPermissionsService);
    });
    it('Should fail when adding role and show then block', testing_1.fakeAsync(function () {
        rolesService.addRole('MAIN_BLOCK', function () {
            return true;
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual("elseBlock");
    }));
    it('Should fail when adding permissions and show then block', testing_1.fakeAsync(function () {
        detectChanges(fixture);
        var content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual("main");
        permissionsService.addPermission('MAIN_BLOCK', function () {
            return true;
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual("elseBlock");
    }));
});
describe('ngxPermissionsExcept Directive testing then block', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "\n            <div *ngxPermissionsExcept=\"['THEN_BLOCK']; else elseBlock; then thenBlock\">main</div>\n            <ng-template #elseBlock>\n                <div>elseBlock</div>\n            </ng-template>\n            <ng-template #thenBlock>\n                <div>thenBlock</div>\n            </ng-template>\n           \n        "
            })
        ], TestComp);
        return TestComp;
    }());
    var rolesService;
    var permissions;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        rolesService = fixture.debugElement.injector.get(roles_service_1.NgxRolesService);
    });
    it('Should fail and show then block', testing_1.fakeAsync(function () {
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual("thenBlock");
    }));
});
describe('ngxPermissionsExcept Directive with ngxPermissionsOnly testing then block', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "\n            <ng-template [ngxPermissionsExcept]=\"'FAIL_BLOCK'\" [ngxPermissionsOnly]=\"'ONLY_BLOCK'\" [ngxPermissionsElse]=\"elseBlock\">\n              \n            </ng-template>\n            <ng-template #elseBlock>\n                <div>elseBlock</div>\n            </ng-template>\n            <ng-template #thenBlock>\n                <div>thenBlock</div>\n            </ng-template>\n        "
            })
        ], TestComp);
        return TestComp;
    }());
    var rolesService;
    var permissionsService;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        rolesService = fixture.debugElement.injector.get(roles_service_1.NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(permissions_service_1.NgxPermissionsService);
    });
    it('Except Should fail and show then block', testing_1.fakeAsync(function () {
        permissionsService.addPermission('FAIL_BLOCK');
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual("elseBlock");
    }));
    it('Only Should fail and show then block', testing_1.fakeAsync(function () {
        rolesService.addRole('SOME_BLOCK', function () {
            return true;
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual("elseBlock");
    }));
});
describe('ngxPermissionsExcept Directive with ngxPermissionsOnly testing else block', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "\n            <ng-template [ngxPermissionsExcept]=\"'FAIL_BLOCK'\" [ngxPermissionsOnly]=\"'ONLY_BLOCK'\" [ngxPermissionsElse]=\"elseBlock\">\n              \n            </ng-template>\n            <ng-template #elseBlock>\n                <div>elseBlock</div>\n            </ng-template>\n            <ng-template #thenBlock>\n                <div>thenBlock</div>\n            </ng-template>\n        "
            })
        ], TestComp);
        return TestComp;
    }());
    var rolesService;
    var permissionsService;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        rolesService = fixture.debugElement.injector.get(roles_service_1.NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(permissions_service_1.NgxPermissionsService);
    });
    it('Except Should fail and show then block', testing_1.fakeAsync(function () {
        permissionsService.addPermission('FAIL_BLOCK');
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual("elseBlock");
    }));
    it('Only Should fail and show then block', testing_1.fakeAsync(function () {
        rolesService.addRole('SOME_BLOCK', function () {
            return true;
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual("elseBlock");
    }));
});
describe('ngxPermissionsExcept Directive with ngxPermissionsOnly testing then block success', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "\n            <ng-template [ngxPermissionsExcept]=\"'FAIL_BLOCK'\" [ngxPermissionsOnly]=\"'ONLY_BLOCK'\" [ngxPermissionsElse]=\"elseBlock\" [ngxPermissionsThen]=\"thenBlock\">\n              \n            </ng-template>\n            <ng-template #elseBlock>\n                <div>elseBlock</div>\n            </ng-template>\n            <ng-template #thenBlock>\n                <div>thenBlock</div>\n            </ng-template>\n        "
            })
        ], TestComp);
        return TestComp;
    }());
    var rolesService;
    var permissionsService;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        rolesService = fixture.debugElement.injector.get(roles_service_1.NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(permissions_service_1.NgxPermissionsService);
    });
    it('Except and only should success and show then block', testing_1.fakeAsync(function () {
        permissionsService.addPermission('ONLY_BLOCK');
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual("thenBlock");
    }));
    it('Except and only should success with role and show then block', testing_1.fakeAsync(function () {
        rolesService.addRole('ONLY_BLOCK', function () {
            return true;
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual("thenBlock");
    }));
});
describe('ngxPermissionsExcept Directive with ngxPermissionsOnly testing else block', function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "\n            <ng-template [ngxPermissionsExcept]=\"'FAIL_BLOCK'\" [ngxPermissionsOnly]=\"'ONLY_BLOCK'\" [ngxPermissionsElse]=\"elseBlock\">\n              \n            </ng-template>\n            <ng-template #elseBlock>\n                <div>elseBlock</div>\n            </ng-template>\n            <ng-template #thenBlock>\n                <div>thenBlock</div>\n            </ng-template>\n        "
            })
        ], TestComp);
        return TestComp;
    }());
    var rolesService;
    var permissionsService;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        rolesService = fixture.debugElement.injector.get(roles_service_1.NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(permissions_service_1.NgxPermissionsService);
    });
    it('Except Should fail and show then block', testing_1.fakeAsync(function () {
        permissionsService.addPermission('FAIL_BLOCK');
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual("elseBlock");
    }));
    it('Only Should fail and show then block', testing_1.fakeAsync(function () {
        rolesService.addRole('SOME_BLOCK', function () {
            return true;
        });
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual("elseBlock");
    }));
});
describe("Ngx Permissions Only Directive when no permission specified should return true", function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "\n            <ng-template [ngxPermissionsOnly]=\"\">\n                <div>123</div>\n            </ng-template>\n        "
            })
        ], TestComp);
        return TestComp;
    }());
    var rolesService;
    var permissionsService;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        rolesService = fixture.debugElement.injector.get(roles_service_1.NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(permissions_service_1.NgxPermissionsService);
    });
    it('Except and only should success and show then block', testing_1.fakeAsync(function () {
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual("123");
    }));
});
describe("Ngx Permissions Except Directive when no permission specified should return true", function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "\n            <ng-template [ngxPermissionsExcept]=\"\">\n                <div>123</div>\n            </ng-template>\n        "
            })
        ], TestComp);
        return TestComp;
    }());
    var rolesService;
    var permissionsService;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        rolesService = fixture.debugElement.injector.get(roles_service_1.NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(permissions_service_1.NgxPermissionsService);
    });
    it('Except and only should success and show then block', testing_1.fakeAsync(function () {
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual("123");
    }));
});
describe("Ngx Permissions Except and only Directive when no permission specified should return true", function () {
    var TestComp = /** @class */ (function () {
        function TestComp() {
        }
        TestComp = __decorate([
            core_1.Component({ selector: 'test-comp',
                template: "\n            <ng-template [ngxPermissionsExcept]=\"\" [ngxPermissionsOnly]=\"\">\n                <div>123</div>\n            </ng-template>\n        "
            })
        ], TestComp);
        return TestComp;
    }());
    var rolesService;
    var permissionsService;
    var fixture;
    var comp;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.NgxPermissionsModule.forRoot()] });
        fixture = testing_1.TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        rolesService = fixture.debugElement.injector.get(roles_service_1.NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(permissions_service_1.NgxPermissionsService);
    });
    it('Except and only should success and show then block', testing_1.fakeAsync(function () {
        detectChanges(fixture);
        var content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual("123");
    }));
});
function detectChanges(fixture) {
    testing_1.tick();
    fixture.detectChanges();
    testing_1.tick();
    fixture.detectChanges();
}
