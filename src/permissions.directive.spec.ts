import { PermissionsDirective } from './permissions.directive';
import { Component } from '@angular/core';
import { NgxPermissionsModule } from './index';
import { TestBed } from '@angular/core/testing';
import { PermissionsService } from './permissions.service';
import { RolesService } from './roles.service';

enum PermissionsTestEnum {
    ADMIN = <any> 'ADMIN',
    GUEST = <any> 'GUEST'
}

describe('PermissionsDirective', () => {
    it('should create an instance', () => {
        // const directive = new PermissionsDirective();
        expect(true).toBeTruthy();
    });
});

describe('Permission directive angular except', () => {
    @Component({selector: 'test-comp',
        template: `<ng-template permissions [permissionsExcept]="'ADMIN'"><div>123</div></ng-template>`})
    class TestComp {
        data: any;
    }

    let permissionService;
    let permissions;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        permissionService = fixture.debugElement.injector.get(PermissionsService);

    });


    it('Should not show component', () => {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);

        fixture.detectChanges();
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    });
    it ('Should show the component', () => {
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);

        fixture.detectChanges();
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    });

    it ('Should hide component when permission added', () => {
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');
        permissionService.addPermission(PermissionsTestEnum.ADMIN);
        fixture.detectChanges();
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

    }

    it ('Should show component when permission removed', () => {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        fixture.detectChanges();
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);


        permissionService.removePermission(PermissionsTestEnum.ADMIN);
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');
    })
});

describe('Permission directive angular only', () => {
    @Component({selector: 'test-comp',
        template: `<ng-template permissions [permissionsOnly]="'ADMIN'"><div>123</div></ng-template>`})
    class TestComp {
        data: any;
    }

    let permissionService;
    let permissions;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        permissionService = fixture.debugElement.injector.get(PermissionsService);

    });


    it('Should show the component', () => {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);

        fixture.detectChanges();
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    });
    it ('Should not show the component', () => {
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);

        fixture.detectChanges();
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    });

    it ('Should show component when permission added', () => {
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        fixture.detectChanges();
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionService.addPermission(PermissionsTestEnum.ADMIN);
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();

        expect(content2.innerHTML).toEqual('123');
    })

    it ('Should hide component when permission removed', () => {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');

        permissionService.removePermission(PermissionsTestEnum.ADMIN);
        fixture.detectChanges();
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    })
});

describe('Permission directive angular roles only', () => {
    @Component({selector: 'test-comp',
        template: `<ng-template permissions [permissionsOnly]="'ADMIN'"><div>123</div></ng-template>`})
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissions;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(RolesService);

    });


    it('Should show the component when key of role is the same', () => {
        rolesService.addRole('ADMIN', ['Awsesome']);

        fixture.detectChanges();
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    });
    it ('should show the component when permissions array is the same ', () => {
        rolesService.addRole('GG', ['ADMIN']);
        fixture.detectChanges();
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    });

    it ('should hide the component when user deletes all roles', () => {
        rolesService.addRole('ADMIN', ['Awsesome']);
        fixture.detectChanges();
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');

        rolesService.flushRoles();
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    })

    it ('should hide the component when user deletes one role', () => {
        rolesService.addRole('ADMIN', ['Awsesome']);
        fixture.detectChanges();
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');

        rolesService.removeRole("ADMIN");
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    })
});
describe('Permission directive angular roles only array', () => {
    @Component({selector: 'test-comp',
        template: `<ng-template permissions [permissionsOnly]="['ADMIN', 'GUEST']"><div>123</div></ng-template>`})
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissions;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(RolesService);

    });


    it('Should show the component when key of role is the same', () => {
        rolesService.addRole('ADMIN', ['Awsesome']);

        fixture.detectChanges();
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    });
    it ('should show the component when permissions array is the same ', () => {
        rolesService.addRole('GG', ['ADMIN']);
        fixture.detectChanges();
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    });

    it ('should hide the component when user deletes all roles', () => {
        rolesService.addRole('GG', ['ADMIN']);
        fixture.detectChanges();
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');

        rolesService.flushRoles();
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    })

    it ('should hide the component when user deletes one roles', () => {
        rolesService.addRole('GG', ['ADMIN']);
        fixture.detectChanges();
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');

        rolesService.removeRole("GG");
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    })
});

describe('Permission directive angular roles except', () => {
    @Component({selector: 'test-comp',
        template: `<ng-template permissions [permissionsExcept]="'ADMIN'"><div>123</div></ng-template>`})
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissions;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(RolesService);

    });


    it('Should hide the component when key of role is the same', () => {
        rolesService.addRole('ADMIN', ['Awsesome']);

        fixture.detectChanges();
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    });
    it ('should show the component when permissions array is the same ', () => {
        rolesService.addRole('GG', ['ADMIN']);
        fixture.detectChanges();
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

    });

    it ('should show the component when user deletes all roles', () => {
        rolesService.addRole('ADMIN', ['Awsesome']);
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);

        rolesService.flushRoles();
        let content = fixture.debugElement.nativeElement.querySelector('div');

        fixture.detectChanges();
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    })

    it ('should show the component when user deletes one role', () => {
        rolesService.addRole('ADMIN', ['Awsesome']);
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);

        rolesService.removeRole("ADMIN");
        let content = fixture.debugElement.nativeElement.querySelector('div');

        fixture.detectChanges();
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    })
});
describe('Permission directive angular roles except array', () => {
    @Component({selector: 'test-comp',
        template: `<ng-template permissions [permissionsExcept]="['ADMIN', 'GUEST']"><div>123</div></ng-template>`})
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissions;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(RolesService);

    });


    it('Should show the component when key of role is the same', () => {
        rolesService.addRole('ADMIN', ['Awsesome']);

        fixture.detectChanges();
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

    });
    it ('should show the component when permissions array is the same ', () => {
        rolesService.addRole('GG', ['ADMIN']);
        fixture.detectChanges();
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

    });

    it ('should show the component when user deletes all roles', () => {
        rolesService.addRole('GG', ['ADMIN']);
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);

        rolesService.flushRoles();
        let content = fixture.debugElement.nativeElement.querySelector('div');

        fixture.detectChanges();
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    })

    it ('should show the component when user deletes one roles', () => {
        rolesService.addRole('GG', ['ADMIN']);
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);

        rolesService.removeRole("GG");
        let content = fixture.debugElement.nativeElement.querySelector('div');

        fixture.detectChanges();
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    })
});

describe('Permission directive angular testing different selectors *permmisionsOnly', () => {
    @Component({selector: 'test-comp',
        template: `<div *permissionsOnly="['ADMIN']"><div>123</div></div>`})
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissions;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(RolesService);

    });


    it('Should show the component when key of role is the same', () => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', ['Awsesome']);
        fixture.detectChanges();

        let content2 = fixture.debugElement.nativeElement.querySelector('div');

        fixture.detectChanges();
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    });

    it('Should hide the component when key of role is the same', () => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('GG', ['Awsesome']);
        fixture.detectChanges();

        let content2 = fixture.debugElement.nativeElement.querySelector('div');

        fixture.detectChanges();
        expect(content2).toEqual(null);

    });
});

describe('Permission directive angular testing different selectors *permmisionsExcept', () => {
    @Component({selector: 'test-comp',
        template: `<div *permissionsExcept="['ADMIN']"><div>123</div></div>`})
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissions;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(RolesService);

    });


    it('Should show the component when key of role is the same', () => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('Guest', ['Awsesome']);
        fixture.detectChanges();

        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        fixture.detectChanges();
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    });

    it('Should hide the component when key of role is the same', () => {
        rolesService.addRole('ADMIN', ['Awsesome']);
        fixture.detectChanges();

        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    });
});
