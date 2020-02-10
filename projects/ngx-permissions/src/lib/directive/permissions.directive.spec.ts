import { NgxPermissionsDirective } from './permissions.directive';
import { Component } from '@angular/core';
import { NgxPermissionsModule } from '../index';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgxPermissionsService } from '../service/permissions.service';
import { NgxRolesService } from '../service/roles.service';

enum PermissionsTestEnum {
    ADMIN = 'ADMIN',
    GUEST = 'GUEST'
}

describe('NgxPermissionsDirective', () => {
    it('should create an instance', () => {
        expect(true).toBeTruthy();
    });
});

describe('Permission directive angular except', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-template [ngxPermissionsExcept]="'ADMIN'">
                <div>123</div>
            </ng-template>`
    })
    class TestComponent {
        data: any;
    }

    let permissionService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        permissionService = fixture.debugElement.injector.get(NgxPermissionsService);
    });


    it('Should not show component', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        tick();
        fixture.detectChanges();
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

    }));

    it('Should  show the component', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

    }));

    it('Should show the component', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('div');

        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));

    it('Should hide component when permission added', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');

        permissionService.addPermission(PermissionsTestEnum.ADMIN);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    }));

    it('Should show component when permission removed', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);


        permissionService.removePermission(PermissionsTestEnum.ADMIN);
        detectChanges(fixture);

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');
    }));
});

describe('Permission directive angular only', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-template [ngxPermissionsOnly]="'ADMIN'">
                <div>123</div>
            </ng-template>`
    })
    class TestComponent {
        data: any;
    }

    let permissionService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        permissionService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    it('Should show the component', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));

    it('Should not show the component', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    }));

    it('Should show component when permission added', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionService.addPermission(PermissionsTestEnum.ADMIN);
        detectChanges(fixture);

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();

        expect(content2.innerHTML).toEqual('123');
    }));

    it('Should hide component when permission removed', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');

        permissionService.removePermission(PermissionsTestEnum.ADMIN);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    }));
});

describe('Permission directive angular roles only', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-template [ngxPermissionsOnly]="'ADMIN'">
                <div>123</div>
            </ng-template>`
    })
    class TestComponent {
        data: any;
    }

    let rolesService: NgxRolesService;
    let permissionsService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    const awesomePermissions = 'AWESOME';
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        rolesService = fixture.debugElement.injector.get(NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    it('Should show the component when key of role is the same', fakeAsync(() => {

        rolesService.addRole('ADMIN', [awesomePermissions]);
        permissionsService.addPermission(awesomePermissions);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));

    it('should show the component when permissions array is the same ', fakeAsync(() => {
        rolesService.addRole('ADMIN', [awesomePermissions]);
        permissionsService.addPermission(awesomePermissions);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));

    it('should hide the component when user deletes all roles', fakeAsync(() => {
        permissionsService.addPermission(awesomePermissions);
        rolesService.addRole('ADMIN', [awesomePermissions]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');

        rolesService.flushRoles();
        tick();
        fixture.detectChanges();
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('should hide the component when user deletes one role', fakeAsync(() => {
        permissionsService.addPermission(awesomePermissions);
        rolesService.addRole('ADMIN', [awesomePermissions]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');

        rolesService.removeRole('ADMIN');
        detectChanges(fixture);

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('should hide the when there is no two permissions', fakeAsync(() => {
        permissionsService.addPermission(awesomePermissions);
        rolesService.addRole('ADMIN', [awesomePermissions, 'noSUch permissions']);
        detectChanges(fixture);

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
});
describe('Permission directive angular roles only array', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-template [ngxPermissionsOnly]="['ADMIN', 'GUEST']">
                <div>123</div>
            </ng-template>`
    })
    class TestComponent {
        data: any;
    }

    let rolesService: NgxRolesService;
    let permissionsService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    const awesomePermission = 'AWESOME';
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        rolesService = fixture.debugElement.injector.get(NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
    });


    it('Should show the component when key of role is the same', fakeAsync(() => {
        permissionsService.addPermission(awesomePermission);
        rolesService.addRole('ADMIN', [awesomePermission]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));

    it('should show the component when there is permission ', fakeAsync(() => {
        permissionsService.addPermission(awesomePermission);
        rolesService.addRole('ADMIN', ['AWESOME']);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));

    it('should hide the component when user deletes all roles', fakeAsync(() => {
        permissionsService.addPermission(awesomePermission);
        rolesService.addRole('ADMIN', [awesomePermission]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');

        rolesService.flushRoles();
        detectChanges(fixture);

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('should hide the component when user deletes one roles', fakeAsync(() => {
        permissionsService.addPermission(awesomePermission);
        rolesService.addRole('ADMIN', [awesomePermission]);
        detectChanges(fixture);


        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');

        rolesService.removeRole('ADMIN');
        detectChanges(fixture);

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
});

describe('Permission directive angular roles except', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-template [ngxPermissionsExcept]="'ADMIN'">
                <div>123</div>
            </ng-template>`
    })
    class TestComponent {
        data: any;
    }

    let rolesService: NgxRolesService;
    let permissionsService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        rolesService = fixture.debugElement.injector.get(NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    it('Should hide the component when key of role is the same', fakeAsync(() => {
        permissionsService.addPermission('AWESOME');
        rolesService.addRole('ADMIN', ['AWESOME']);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    }));

    it('should show the component when permissions array is the same ', fakeAsync(() => {
        permissionsService.addPermission('AWESOME');
        rolesService.addRole('ADMIN', ['AWESOME']);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

    }));

    it('should show the component when user deletes all roles', fakeAsync(() => {
        permissionsService.addPermission('AWESOME');
        rolesService.addRole('ADMIN', ['AWESOME']);
        detectChanges(fixture);

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);

        rolesService.flushRoles();
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));

    it('should show the component when user deletes one role', fakeAsync(() => {
        permissionsService.addPermission('AWESOME');
        rolesService.addRole('ADMIN', ['AWESOME']);
        detectChanges(fixture);

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);

        rolesService.removeRole('ADMIN');
        detectChanges(fixture);


        const content = fixture.debugElement.nativeElement.querySelector('div');

        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
});
describe('Permission directive angular roles except array', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-template [ngxPermissionsExcept]="['ADMIN', 'GUEST']">
                <div>123</div>
            </ng-template>`
    })
    class TestComponent {
        data: any;
    }

    let rolesService: NgxRolesService;
    let permissionsService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        rolesService = fixture.debugElement.injector.get(NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    it('Should not show the component when user have permissions', fakeAsync(() => {
        permissionsService.addPermission('Awesome');
        rolesService.addRole('ADMIN', ['Awesome']);

        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    }));

    it('should show when there is no such permission', fakeAsync(() => {
        rolesService.addRole('ADMIN', ['Awesome']);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content.innerHTML).toEqual('123');
    }));

    it('should show the component when user deletes all roles', fakeAsync(() => {
        permissionsService.addPermission('AWESOME');
        rolesService.addRole('ADMIN', ['AWESOME']);
        detectChanges(fixture);

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);

        rolesService.flushRoles();
        permissionsService.flushPermissions();
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('div');

        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));

    it('should show the component when user deletes one roles', fakeAsync(() => {
        permissionsService.addPermission('SOMETHING');
        rolesService.addRole('ADMIN', ['SOMETHING']);
        detectChanges(fixture);

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);

        rolesService.removeRole('ADMIN');
        detectChanges(fixture);


        const content = fixture.debugElement.nativeElement.querySelector('div');

        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
});

describe('Permission directive angular testing different selectors *permmisionsOnly', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <div *ngxPermissionsOnly="['ADMIN']">
                <div>123</div>
            </div>`
    })
    class TestComponent {
        data: any;
    }

    let rolesService: NgxRolesService;
    let permissionsService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        rolesService = fixture.debugElement.injector.get(NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    it('Should show the component when key of role is the same', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('AWESOME');
        rolesService.addRole('ADMIN', ['AWESOME']);
        detectChanges(fixture);


        const content2 = fixture.debugElement.nativeElement.querySelector('div');

        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should hide the component when key of role is the same', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        rolesService.addRole('GG', ['Awsesome']);
        detectChanges(fixture);


        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
});

describe('Permission directive angular testing different selectors *permmisionsExcept', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <div *ngxPermissionsExcept="['ADMIN']">
                <div>123</div>
            </div>`
    })
    class TestComponent {
        data: any;
    }

    let rolesService: NgxRolesService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        rolesService = fixture.debugElement.injector.get(NgxRolesService);
    });


    it('Should show the component when key of role is the same', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('Guest', ['Awsesome']);
        detectChanges(fixture);

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should hide the component when key of role is the same', fakeAsync(() => {
        rolesService.addRole('ADMIN', ['Awsesome']);
        tick();
        fixture.detectChanges();


        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    }));
});

describe('Permission directive angular testing different async functions in roles', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <div *ngxPermissionsOnly="'ADMIN'">
                <div>123</div>
            </div>`
    })
    class TestComponent {
        data: any;
    }

    let rolesService: NgxRolesService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        rolesService = fixture.debugElement.injector.get(NgxRolesService);
    });

    it('Should show the component when promise returns truthy value', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        // rolesService.addRole('ADMIN', () => {
        //     return Promise.resolve();
        // });
        rolesService.addRole('ADMIN', () => {
            return true;
        });
        detectChanges(fixture);
        tick();

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should not show the component when promise returns truthy value', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        rolesService.addRole('ADMIN', () => {
            return false;
        });
        detectChanges(fixture);
        tick();

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should show the component when promise returns truthy value', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', () => {
            return Promise.resolve(true);
        });
        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should not show the component when promise rejects', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', () => {
            return Promise.reject();
        });

        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
});

describe('Permission directive angular testing different async functions in roles via array', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <div *ngxPermissionsOnly="['ADMIN','GUEST']">
                <div>123</div>
            </div>`
    })
    class TestComponent {
        data: any;
    }

    let rolesService: NgxRolesService;
    let permissionsService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        rolesService = fixture.debugElement.injector.get(NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    it('Should show the component when promise returns truthy value', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        // rolesService.addRole('ADMIN', () => {
        //     return Promise.resolve();
        // });
        rolesService.addRole('ADMIN', () => {
            return true;
        });
        detectChanges(fixture);
        tick();

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));


    it('Should not show the component when promise returns false value', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        rolesService.addRole('ADMIN', () => {
            return false;
        });
        detectChanges(fixture);
        tick();

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should show the component when promise returns truthy value', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', () => {
            return Promise.resolve(true);
        });
        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should not show the component when promise rejects', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', () => {
            return Promise.reject();
        });

        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should  show the component when one of the promises fulfills ', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', () => {
            return Promise.reject();
        });

        rolesService.addRole('GUEST', () => {
            return Promise.resolve(true);
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should  show the component when one of the promises fulfills with 0 value', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', () => {
            return Promise.reject();
        });

        rolesService.addRole('GUEST', () => {
            return Promise.resolve();
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should not show the component when all promises fails', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', () => {
            return Promise.reject();
        });

        rolesService.addRole('GUEST', () => {
            return Promise.reject();
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should show the component when one of promises returns true', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        rolesService.addRole('GUEST', () => {
            return true;
        });

        rolesService.addRole('ADMIN', () => {
            return Promise.reject();
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should show the component when 1 passes second fails', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', () => {
            return Promise.reject();
        });
        permissionsService.addPermission('AWESOME');
        rolesService.addRole('GUEST', ['AWESOME']);

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should show the component when one rejects but another one fulfils', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', () => {
            return Promise.reject();
        });
        permissionsService.addPermission('AWESOME');
        rolesService.addRole('GUEST', ['AWESOME']);

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
});

describe('Permission directive angular testing different async functions in permissions via array', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <div *ngxPermissionsOnly="['ADMIN','GUEST']">
                <div>123</div>
            </div>`
    })
    class TestComponent {
        data: any;
    }

    let permissionsService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    it('Should show the component when promise returns truthy value', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        // rolesService.addRole('ADMIN', () => {
        //     return Promise.resolve();
        // });
        permissionsService.addPermission('ADMIN', () => {
            return true;
        });
        detectChanges(fixture);
        tick();

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should not show the component when promise returns false value', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        permissionsService.addPermission('ADMIN', () => {
            return false;
        });
        detectChanges(fixture);
        tick();

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should show the component when promise returns truthy value', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.resolve(true);
        });
        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should not show the component when promise rejects', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.reject();
        });

        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should  show the component when one of the promises fulfills ', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.resolve();
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.reject();
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should  show the component when one of the promises fulfills with 0 value', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.resolve();
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.resolve();
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should not show the component when all promises fails', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.reject();
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.reject();
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should show the component when one of promises returns true', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        permissionsService.addPermission('GUEST', () => {
            return true;
        });

        permissionsService.addPermission('ADMIN', () => {
            return Promise.reject();
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should not show the component when all promises fails', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.reject();
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.resolve(true);
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should show the component when one rejects but another one fulfils', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.reject();
        });

        permissionsService.addPermission('GUEST', () => {
            return true;
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should show the component when one rejects but another one fulfils', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return true;
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.reject();
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should show the component when functions with name and store fulfils', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', (name, store) => {
            expect(store[name].name).toBeTruthy();
            return name === 'ADMIN';
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.reject();
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
});


describe('Permission directive angular testing different async functions in permissions via string', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <div *ngxPermissionsOnly="'ADMIN'">
                <div>123</div>
            </div>`
    })
    class TestComponent {
        data: any;
    }

    let permissionsService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    it('Should show the component when promise returns truthy value', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        // rolesService.addRole('ADMIN', () => {
        //     return Promise.resolve();
        // });
        permissionsService.addPermission('ADMIN', () => {
            return true;
        });
        detectChanges(fixture);
        tick();

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should not show the component when promise returns false value', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        permissionsService.addPermission('ADMIN', () => {
            return false;
        });
        detectChanges(fixture);
        tick();

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should show the component when promise returns truthy value', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.resolve(true);
        });
        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should not show the component when promise rejects', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.reject();
        });

        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should  show the component when one of the promises fulfills ', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.resolve();
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.resolve(true);
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should  show the component when one of the promises fulfills with 0 value', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.resolve();
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.reject();
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should not show the component when all promises fails', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.reject();
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.reject();
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should show the component when one of promises returns true', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        permissionsService.addPermission('GUEST', () => {
            return Promise.reject();
        });

        permissionsService.addPermission('ADMIN', () => {
            return true;
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));


    it('Should not show the component when all promises fails', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.resolve(true);
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.reject();
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should show the component when one rejects but another one fulfils', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return true;
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.reject();
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should show the component when functions with name and store fulfils', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', (name, store) => {
            expect(store[name].name).toBeTruthy();
            return name === 'ADMIN';
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.reject();
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
});


describe('Permission  directive angular testing  different only and accept together async functions in permissions via string', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-template ngxPermissionsOnly="ADMIN" ngxPermissionsExcept="MANAGER">
                <div>123</div>
            </ng-template>`
    })
    class TestComponent {
        data: any;
    }

    let permissionsService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
    });


    it('Should show the component when permission except not available and only fulfils', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        permissionsService.addPermission('ADMIN', () => {
            return true;
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');
    }));

    it('Should NOT show the component when permission except fulfills', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        permissionsService.addPermission('MANAGER', () => {
            return true;
        });

        permissionsService.addPermission('ADMIN', () => {
            return true;
        });

        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should NOT show the component when permission except fulfills even when only also fulfils', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        permissionsService.addPermission('MANAGER', () => {
            return true;
        });

        permissionsService.addPermission('ADMIN', () => {
            return true;
        });

        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should show the component when permission except fulfills with function that returns false and only fullfiles', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        permissionsService.addPermission('MANAGER', () => {
            return false;
        });

        permissionsService.addPermission('ADMIN', () => {
            return true;
        });

        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');
    }));
});


describe('Permission  directive angular testing  different only and accept together async functions in permissions via array', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-template [ngxPermissionsOnly]="['ADMIN', 'GUEST']" [ngxPermissionsExcept]="['MANAGER']">
                <div>123</div>
            </ng-template>`
    })
    class TestComponent {
        data: any;
    }

    let permissionsService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    it('Should show the component when permission except not available and only fulfils', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        permissionsService.addPermission('ADMIN', () => {
            return true;
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');
    }));

    it('Should NOT show the component when permission except fulfills', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        permissionsService.addPermission('MANAGER', () => {
            return true;
        });

        permissionsService.addPermission('ADMIN', () => {
            return true;
        });

        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should NOT show the component when permission except fulfills even when only also fulfils', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        permissionsService.addPermission('MANAGER', () => {
            return true;
        });

        permissionsService.addPermission('ADMIN', () => {
            return true;
        });

        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should show the component when permission except fulfills with function that returns false and only fullfiles', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        permissionsService.addPermission('MANAGER', () => {
            return false;
        });

        permissionsService.addPermission('ADMIN', () => {
            return true;
        });

        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');
    }));
});

describe('Permission  directive angular testing  different only and accept together async functions in roles via array', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-template [ngxPermissionsOnly]="['ADMIN', 'GUEST']" [ngxPermissionsExcept]="['MANAGER']">
                <div>123</div>
            </ng-template>
        `
    })
    class TestComponent {
        data: any;
    }

    let rolesService: NgxRolesService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        rolesService = fixture.debugElement.injector.get(NgxRolesService);
    });

    it('Should show the component when role except not available and only fulfils', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        rolesService.addRole('ADMIN', () => {
            return true;
        });

        detectChanges(fixture);

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');
    }));

    it('Should NOT show the component when role except fulfills', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        rolesService.addRole('MANAGER', () => {
            return true;
        });

        rolesService.addRole('ADMIN', () => {
            return true;
        });

        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should NOT show the component when role except fulfills even when only also fulfils', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        rolesService.addRole('MANAGER', () => {
            return true;
        });

        rolesService.addRole('ADMIN', () => {
            return true;
        });

        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should show the component when role except fulfills with function that returns false and only fullfiles', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        rolesService.addRole('MANAGER', () => {
            return false;
        });

        rolesService.addRole('ADMIN', () => {
            return true;
        });

        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');
    }));
});


describe('ngxPermissionsOnly Directive testing else block', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <div *ngxPermissionsOnly="['FAILED_BLOCK']; else elseBlock">main</div>
            <ng-template #elseBlock>
                <div>elseBlock</div>
            </ng-template>
            <ng-template #thenBlock>
                <div>thenBlock</div>
            </ng-template>
        `
    })
    class TestComponent {
        data: any;
    }

    let rolesService: NgxRolesService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        rolesService = fixture.debugElement.injector.get(NgxRolesService);
    });


    it('Should fail and show else block', fakeAsync(() => {
        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual(`elseBlock`);
    }));

    it('Should add element remove element and show then block', fakeAsync(() => {
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        rolesService.addRole('FAILED_BLOCK', () => {
            return true;
        });

        detectChanges(fixture);

        const content3 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content3).toBeTruthy();
        expect(content3.innerHTML).toEqual('main');

        rolesService.removeRole('FAILED_BLOCK');
        detectChanges(fixture);

        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual(`elseBlock`);
    }));
});

describe('ngxPermissionsOnly Directive testing then block', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <div *ngxPermissionsOnly="['THEN_BLOCK']; else elseBlock; then thenBlock">main</div>
            <ng-template #elseBlock>
                <div>elseBlock</div>
            </ng-template>
            <ng-template #thenBlock>
                <div>thenBlock</div>
            </ng-template>
        `
    })
    class TestComponent {
        data: any;
    }

    let rolesService: NgxRolesService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        rolesService = fixture.debugElement.injector.get(NgxRolesService);
    });

    it('Should fail and show then block', fakeAsync(() => {
        rolesService.addRole('THEN_BLOCK', () => {
            return true;
        });
        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual(`thenBlock`);
    }));
});


describe('ngxPermissionsExcept Directive testing else block', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <div *ngxPermissionsExcept="['MAIN_BLOCK']; else elseBlock">main</div>
            <ng-template #elseBlock>
                <div>elseBlock</div>
            </ng-template>
            <ng-template #thenBlock>
                thenBlock
            </ng-template>
        `
    })
    class TestComponent {
        data: any;
    }

    let rolesService: NgxRolesService;
    let permissionsService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        rolesService = fixture.debugElement.injector.get(NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    it('Should fail when adding role and show then block', fakeAsync(() => {
        rolesService.addRole('MAIN_BLOCK', () => {
            return true;
        });

        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual(`elseBlock`);
    }));

    it('Should fail when adding permissions and show then block', fakeAsync(() => {
        detectChanges(fixture);
        const content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual(`main`);

        permissionsService.addPermission('MAIN_BLOCK', () => {
            return true;
        });

        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual(`elseBlock`);
    }));
});

describe('ngxPermissionsExcept Directive testing then block', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <div *ngxPermissionsExcept="['THEN_BLOCK']; else elseBlock; then thenBlock">main</div>
            <ng-template #elseBlock>
                <div>elseBlock</div>
            </ng-template>
            <ng-template #thenBlock>
                <div>thenBlock</div>
            </ng-template>
        `
    })
    class TestComponent {
        data: any;
    }

    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);
    });

    it('Should fail and show then block', fakeAsync(() => {
        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual(`thenBlock`);
    }));
});

describe('ngxPermissionsExcept Directive with ngxPermissionsOnly testing then block', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-template [ngxPermissionsExcept]="'FAIL_BLOCK'" [ngxPermissionsOnly]="'ONLY_BLOCK'" [ngxPermissionsElse]="elseBlock">

            </ng-template>
            <ng-template #elseBlock>
                <div>elseBlock</div>
            </ng-template>
            <ng-template #thenBlock>
                <div>thenBlock</div>
            </ng-template>
        `
    })
    class TestComponent {
        data: any;
    }

    let rolesService: NgxRolesService;
    let permissionsService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        rolesService = fixture.debugElement.injector.get(NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    it('Except Should fail and show then block', fakeAsync(() => {
        permissionsService.addPermission('FAIL_BLOCK');
        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual(`elseBlock`);
    }));

    it('Only Should fail and show then block', fakeAsync(() => {
        rolesService.addRole('SOME_BLOCK', () => {
            return true;
        });
        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual(`elseBlock`);
    }));
});

describe('ngxPermissionsExcept Directive with ngxPermissionsOnly testing else block', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-template [ngxPermissionsExcept]="'FAIL_BLOCK'" [ngxPermissionsOnly]="'ONLY_BLOCK'" [ngxPermissionsElse]="elseBlock">

            </ng-template>
            <ng-template #elseBlock>
                <div>elseBlock</div>
            </ng-template>
            <ng-template #thenBlock>
                <div>thenBlock</div>
            </ng-template>
        `
    })
    class TestComponent {
        data: any;
    }

    let rolesService: NgxRolesService;
    let permissionsService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        rolesService = fixture.debugElement.injector.get(NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    it('Except Should fail and show then block', fakeAsync(() => {
        permissionsService.addPermission('FAIL_BLOCK');
        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual(`elseBlock`);
    }));

    it('Only Should fail and show then block', fakeAsync(() => {
        rolesService.addRole('SOME_BLOCK', () => {
            return true;
        });
        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual(`elseBlock`);
    }));
});

describe('ngxPermissionsExcept Directive with ngxPermissionsOnly testing then block success', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-template
                [ngxPermissionsExcept]="'FAIL_BLOCK'"
                [ngxPermissionsOnly]="'ONLY_BLOCK'"
                [ngxPermissionsElse]="elseBlock"
                [ngxPermissionsThen]="thenBlock">

            </ng-template>
            <ng-template #elseBlock>
                <div>elseBlock</div>
            </ng-template>
            <ng-template #thenBlock>
                <div>thenBlock</div>
            </ng-template>
        `
    })
    class TestComponent {
        data: any;
    }

    let rolesService: NgxRolesService;
    let permissionsService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        rolesService = fixture.debugElement.injector.get(NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    it('Except and only should success and show then block', fakeAsync(() => {
        permissionsService.addPermission('ONLY_BLOCK');
        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual(`thenBlock`);
    }));

    it('Except and only should success with role and show then block', fakeAsync(() => {
        rolesService.addRole('ONLY_BLOCK', () => {
            return true;
        });
        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual(`thenBlock`);
    }));
});

describe('ngxPermissionsExcept Directive with ngxPermissionsOnly testing else block', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-template [ngxPermissionsExcept]="'FAIL_BLOCK'" [ngxPermissionsOnly]="'ONLY_BLOCK'" [ngxPermissionsElse]="elseBlock">

            </ng-template>
            <ng-template #elseBlock>
                <div>elseBlock</div>
            </ng-template>
            <ng-template #thenBlock>
                <div>thenBlock</div>
            </ng-template>
        `
    })
    class TestComponent {
        data: any;
    }

    let rolesService: NgxRolesService;
    let permissionsService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        rolesService = fixture.debugElement.injector.get(NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    it('Except Should fail and show then block', fakeAsync(() => {
        permissionsService.addPermission('FAIL_BLOCK');
        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual(`elseBlock`);
    }));

    it('Only Should fail and show then block', fakeAsync(() => {
        rolesService.addRole('SOME_BLOCK', () => {
            return true;
        });
        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual(`elseBlock`);
    }));
});

describe('Ngx Permissions Only Directive when no permission specified should return true', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-template [ngxPermissionsOnly]="">
                <div>123</div>
            </ng-template>
        `
    })
    class TestComponent {
        data: any;
    }

    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);
    });

    it('Except and only should success and show then block', fakeAsync(() => {
        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual(`123`);
    }));
});

describe('Ngx Permissions Except Directive when no permission specified should return true', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-template [ngxPermissionsExcept]="">
                <div>123</div>
            </ng-template>
        `
    })
    class TestComponent {
        data: any;
    }

    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);
    });

    it('Except and only should success and show then block', fakeAsync(() => {
        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual(`123`);
    }));
});

describe('Ngx Permissions Except Directive when no permission is empty array specified should return true', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-template [ngxPermissionsOnly]="[]">
                <div>123</div>
            </ng-template>
        `
    })
    class TestComponent {
        data: any;
    }

    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);
    });

    it('Except and only should success and show then block', fakeAsync(() => {
        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual(`123`);
    }));
});

describe('Ngx Permissions Except and only Directive when no permission specified should return true', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-template [ngxPermissionsExcept]="" [ngxPermissionsOnly]="">
                <div>123</div>
            </ng-template>
        `
    })
    class TestComponent {
        data: any;
    }

    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);
    });

    it('Except and only should success and show then block', fakeAsync(() => {
        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual(`123`);
    }));
});

describe('Ngx Permissions Except and only Directive when no permission specified as array should return true', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-template [ngxPermissionsExcept]="[]" [ngxPermissionsOnly]="[]">
                <div>123</div>
            </ng-template>
        `
    })
    class TestComponent {
        data: any;
    }

    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);
    });

    it('Except and only should success and show then block', fakeAsync(() => {
        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual(`123`);
    }));
});

describe('Ngx Permissions only Directive when no permission specified as array should return true', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-template [ngxPermissionsOnly]="[]">
                <div>123</div>
            </ng-template>
        `
    })
    class TestComponent {
        data: any;
    }

    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);
    });

    it('Except and only should success and show then block', fakeAsync(() => {
        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual(`123`);
    }));
});

describe('Ngx Permissions except Directive when no permission specified as array should return true', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-template [ngxPermissionsExcept]="[]">
                <div>123</div>
            </ng-template>
        `
    })
    class TestComponent {
        data: any;
    }

    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);
    });

    it('Except and only should success and show then block', fakeAsync(() => {
        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual(`123`);
    }));
});


function detectChanges(fixture) {
    tick();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
}
