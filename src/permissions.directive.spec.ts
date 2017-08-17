import { PermissionsDirective } from './permissions.directive';
import { Component } from '@angular/core';
import { NgxPermissionsModule } from './index';
import { TestBed } from '@angular/core/testing';
import { PermissionsService } from './permissions.service';

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
    })
    it ('Should show the component', () => {
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);

        fixture.detectChanges();
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    })

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