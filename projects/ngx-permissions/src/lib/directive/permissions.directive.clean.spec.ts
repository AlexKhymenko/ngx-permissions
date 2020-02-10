import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgxPermissionsModule } from '../index';
import { NgxPermissionsService } from '../service/permissions.service';
import { NgxPermissionsConfigurationService } from '../service/configuration.service';

describe('Ngx permissions Except with default strategy and with else block then block ', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
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
    class TestComponent {
        data: any;
    }

    let permissionsService: NgxPermissionsService;
    let configurationService: NgxPermissionsConfigurationService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
        configurationService = fixture.debugElement.injector.get(NgxPermissionsConfigurationService);
    });

    describe('Given user does have permissions', () => {

        beforeEach(() => {
            configurationService.setDefaultOnUnauthorizedStrategy('show');
            permissionsService.addPermission('FAIL_BLOCK');
        });
        it('should  show else block instead of applying strategy', fakeAsync(() => {

            detectChanges(fixture);
            const content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`elseBlock`);
        }));
    });
});

describe('Ngx permissions Except with default strategy without any blocks', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <div *ngxPermissionsExcept="['FAIL_BLOCK'];">
                FAILED
            </div>
        `
    })
    class TestComponent {
        data: any;
    }

    let permissionsService: NgxPermissionsService;
    let configurationService: NgxPermissionsConfigurationService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
        configurationService = fixture.debugElement.injector.get(NgxPermissionsConfigurationService);
    });

    describe('Given user does have permissions', () => {

        beforeEach(() => {
            configurationService.setDefaultOnUnauthorizedStrategy('show');
            permissionsService.addPermission('FAIL_BLOCK');
        });
        it('should  show else block instead of applying strategy', fakeAsync(() => {

            detectChanges(fixture);
            const content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`FAILED`);
        }));
    });
});


describe('Ngx permissions Except with default strategy and with else block then block ', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
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
    class TestComponent {
        data: any;
    }

    let permissionsService: NgxPermissionsService;
    let configurationService: NgxPermissionsConfigurationService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
        configurationService = fixture.debugElement.injector.get(NgxPermissionsConfigurationService);
    });

    describe('Given user does have permissions', () => {

        beforeEach(() => {
            configurationService.setDefaultOnUnauthorizedStrategy('show');
            permissionsService.addPermission('FAIL_BLOCK');
        });
        it('should  show else block instead of applying default strategy', fakeAsync(() => {

            detectChanges(fixture);
            const content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`elseBlock`);
        }));
    });
});

describe('Simple ngxPermissionsExcept directive', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <div *ngxPermissionsOnly="['ONLY_PERMISSION'];">

            </div>
        `
    })
    class TestComponent {
        data: any;
    }

    let permissionsService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);
        comp = fixture.componentInstance;
        comp.permissionsUnauthorized = () => {
        };

        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    describe('Given user does NOT have permissions', () => {

        beforeEach(() => {
            permissionsService.addPermission('FAIL_BLOCK');
        });
        it('should not rerender directive', fakeAsync(() => {
            spyOn(comp, 'permissionsUnauthorized');
            detectChanges(fixture);
            permissionsService.addPermission('FAIL_ANOTHER_BLOCK');
            detectChanges(fixture);
            expect(comp.permissionsUnauthorized).toHaveBeenCalledTimes(0);
        }));
    });
});

describe('Ngx permissions Except with default strategy and with else block then block ', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
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
    class TestComponent {
        data: any;
    }

    let permissionsService: NgxPermissionsService;
    let configurationService: NgxPermissionsConfigurationService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);

        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
        configurationService = fixture.debugElement.injector.get(NgxPermissionsConfigurationService);
    });

    describe('Given user doesnt have permissions', () => {

        beforeEach(() => {
            configurationService.setDefaultOnUnauthorizedStrategy('show');
            permissionsService.addPermission('ALLOW');
        });
        it('should  show then block instead of applying default strategy', fakeAsync(() => {

            detectChanges(fixture);
            const content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`thenBlock`);
        }));
    });
});

describe('Ngx permissions Except when passing permissions as variable should rerender the page on permissionChange ', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-container *ngxPermissionsExcept="permissions">
                <div>123</div>
            </ng-container>
        `
    })
    class TestComponent {
        data: any;
        permissions = 'EXCEPT';
    }

    let permissionsService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);
        comp = fixture.componentInstance;

        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    describe('Given user doesnt have permissions', () => {

        beforeEach(() => {
            permissionsService.addPermission('EXCEPT');
        });
        it('should  show then block instead of applying default strategy', fakeAsync(() => {
            detectChanges(fixture);

            const content3 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content3).toEqual(null);


            comp.permissions = 'ALLOW';
            detectChanges(fixture);
            const content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`123`);

        }));
    });
});


describe('Ngx permissions when chaning variable to undefined  ', () => {
    @Component({selector: 'ngx-permissions-test-comp',
        template: `
            <ng-container *ngxPermissionsExcept="permissions">
                <div>123</div>
            </ng-container>
        `
    })
    class TestComponent {
        data: any;
        permissions = 'EXCEPT';
    }

    let permissionsService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;

        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    describe('Given user doesnt have permissions', () => {

        beforeEach(() => {
            permissionsService.addPermission('EXCEPT');
        });
        it('should  show the component', fakeAsync(() => {
            detectChanges(fixture);

            const content3 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content3).toEqual(null);


            testComponent.permissions = undefined;
            detectChanges(fixture);
            const content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`123`);

        }));
    });
});

describe('Ngx permissions Only when passing permissions as variable should rerender the page ', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-container *ngxPermissionsOnly="permissions">
                <div>123</div>
            </ng-container>
        `
    })
    class TestComponent {
        data: any;
        permissions = 'ALLOW';
    }

    let permissionsService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;

        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    describe('Given user does have permissions', () => {

        beforeEach(() => {
            permissionsService.addPermission('ALLOW');
        });
        it('show and then hide content', fakeAsync(() => {

            detectChanges(fixture);
            const content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`123`);

            testComponent.permissions = 'DONT_ALLOW';
            detectChanges(fixture);
            const content3 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content3).toEqual(null);
        }));
    });
});

describe('Ngx permissions Only when passing undefined it should show the component ', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <ng-container *ngxPermissionsOnly="permissions">
                <div>123</div>
            </ng-container>
        `
    })
    class TestComponent {
        data: any;
        permissions = 'ALLOW';
    }

    let permissionsService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;

        permissionsService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    describe('Given user does have permissions', () => {

        beforeEach(() => {
            permissionsService.addPermission('DONT_ALLOW');
        });
        it('show and then hide content', fakeAsync(() => {
            detectChanges(fixture);
            const content3 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content3).toEqual(null);


            testComponent.permissions = undefined;
            detectChanges(fixture);
            const content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`123`);
        }));
    });
});


function detectChanges(fixture) {
    tick();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
}
