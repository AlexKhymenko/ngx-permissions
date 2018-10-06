import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgxPermissionsModule } from '../index';
import { NgxRolesService } from '../service/roles.service';
import { NgxPermissionsService } from '../service/permissions.service';
import { NgxPermissionsConfigurationService } from '../service/configuration.service';

describe('Ngx permissions Except with default strategy and with else block then block ', () => {
    @Component({selector: 'test-comp',
        template: `
            <div *ngxPermissionsExcept="['FAIL_BLOCK']; else elseBlock; then thenBlock">
                FAILED
            </div>
            <ng-template #elseBlock>
                <div>elseBlock</div>
            </ng-template>
            <ng-template #thenBlock>
                <div>thenBlock</div>
            </ng-template>
        `

    })
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissionsService;
    let configurationService: NgxPermissionsConfigurationService;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
        configurationService = fixture.debugElement.injector.get(NgxPermissionsConfigurationService);

    });

    describe('Given user does have permissions', () => {

        beforeEach(() => {
            configurationService.setDefaultOnUnauthorizedStrategy('show');
            permissionsService.addPermission('FAIL_BLOCK');
        })
        it('should  show else block instead of applying strategy', fakeAsync(() => {

            detectChanges(fixture);
            let content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`elseBlock`);
        }));
    })

});

describe('Ngx permissions Except with default strategy without any blocks', () => {
    @Component({selector: 'test-comp',
        template: `
            <div *ngxPermissionsExcept="['FAIL_BLOCK'];">
                FAILED
            </div>
        `

    })
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissionsService;
    let configurationService: NgxPermissionsConfigurationService;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
        configurationService = fixture.debugElement.injector.get(NgxPermissionsConfigurationService);

    });

    describe('Given user does have permissions', () => {

        beforeEach(() => {
            configurationService.setDefaultOnUnauthorizedStrategy('show');
            permissionsService.addPermission('FAIL_BLOCK');
        })
        it('should  show else block instead of applying strategy', fakeAsync(() => {

            detectChanges(fixture);
            let content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`FAILED`);
        }));
    })
});


describe('Ngx permissions Except with default strategy and with else block then block ', () => {
    @Component({selector: 'test-comp',
        template: `
            <div *ngxPermissionsExcept="['FAIL_BLOCK']; else elseBlock; then thenBlock">
                FAILED
            </div>
            <ng-template #elseBlock>
                <div>elseBlock</div>
            </ng-template>
            <ng-template #thenBlock>
                <div>thenBlock</div>
            </ng-template>
        `

    })
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissionsService;
    let configurationService: NgxPermissionsConfigurationService;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
        configurationService = fixture.debugElement.injector.get(NgxPermissionsConfigurationService);

    });

    describe('Given user does have permissions', () => {

        beforeEach(() => {
            configurationService.setDefaultOnUnauthorizedStrategy('show');
            permissionsService.addPermission('FAIL_BLOCK');
        })
        it('should  show else block instead of applying strategy', fakeAsync(() => {

            detectChanges(fixture);
            let content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`elseBlock`);
        }));
    })

});

describe('Simple ngxPermissionsExcept directive', () => {
    @Component({selector: 'test-comp',
        template: `
            <div *ngxPermissionsOnly="['ONLY_PERMISSION'];" (permissionsUnauthorized)="permissionsUnauthorized()">
                
            </div>
        `

    })
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissionsService;
    let configurationService: NgxPermissionsConfigurationService;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
        comp.permissionsUnauthorized = () => {};

        rolesService = fixture.debugElement.injector.get(NgxRolesService);
        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
        configurationService = fixture.debugElement.injector.get(NgxPermissionsConfigurationService);

    });

    describe('Given user does NOT have permissions', () => {

        beforeEach(() => {
            permissionsService.addPermission('FAIL_BLOCK');
        })
        it('should not rerender directive', fakeAsync(() => {
            spyOn(comp, 'permissionsUnauthorized');
            detectChanges(fixture);
            permissionsService.addPermission('FAIL_ANOTHER_BLOCK');
            detectChanges(fixture);
            expect(comp.permissionsUnauthorized).toHaveBeenCalledTimes(0);
        }));
    })
});



function detectChanges(fixture) {
    tick();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
}