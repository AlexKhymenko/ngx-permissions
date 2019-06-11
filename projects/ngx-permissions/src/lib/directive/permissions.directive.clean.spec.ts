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
        it('should  show else block instead of applying default strategy', fakeAsync(() => {

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

    describe('Given user doesnt have permissions', () => {

        beforeEach(() => {
            configurationService.setDefaultOnUnauthorizedStrategy('show');
            permissionsService.addPermission('ALLOW');
        })
        it('should  show then block instead of applying default strategy', fakeAsync(() => {

            detectChanges(fixture);
            let content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`thenBlock`);
        }));
    })

});

describe('Ngx permissions Except when passing permissions as variable should rerender the page on permissionChange ', () => {
    @Component({selector: 'test-comp',
        template: `
            <ng-container *ngxPermissionsExcept="permissions">
                <div>123</div>
            </ng-container>
        `

    })
    class TestComp {
        data: any;
        permissions = "EXCEPT"
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

    describe('Given user doesnt have permissions', () => {

        beforeEach(() => {
            permissionsService.addPermission('EXCEPT');
        })
        it('should  show then block instead of applying default strategy', fakeAsync(() => {
            detectChanges(fixture);

            let content3 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content3).toEqual(null);


            comp.permissions = "ALLOW";
            detectChanges(fixture);
            let content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`123`);

        }));
    })

});


describe('Ngx permissions when chaning variable to undefined  ', () => {
    @Component({selector: 'test-comp',
        template: `
            <ng-container *ngxPermissionsExcept="permissions">
                <div>123</div>
            </ng-container>
        `

    })
    class TestComp {
        data: any;
        permissions = "EXCEPT"
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

    describe('Given user doesnt have permissions', () => {

        beforeEach(() => {
            permissionsService.addPermission('EXCEPT');
        })
        it('should  show the component', fakeAsync(() => {
            detectChanges(fixture);

            let content3 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content3).toEqual(null);


            comp.permissions = undefined;
            detectChanges(fixture);
            let content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`123`);

        }));
    })

});

describe('Ngx permissions Only when passing permissions as variable should rerender the page ', () => {
    @Component({selector: 'test-comp',
        template: `
            <ng-container *ngxPermissionsOnly="permissions">
                <div>123</div>
            </ng-container>
        `

    })
    class TestComp {
        data: any;
        permissions= "ALLOW"
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
            permissionsService.addPermission('ALLOW');
        })
        it('show and then hide content', fakeAsync(() => {

            detectChanges(fixture);
            let content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`123`);

            comp.permissions = "DONT_ALLOW";
            detectChanges(fixture);
            let content3 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content3).toEqual(null);
        }));
    })

});

describe('Ngx permissions Only when passing undefined it should show the component ', () => {
    @Component({selector: 'test-comp',
        template: `
            <ng-container *ngxPermissionsOnly="permissions">
                <div>123</div>
            </ng-container>
        `

    })
    class TestComp {
        data: any;
        permissions= "ALLOW"
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
            permissionsService.addPermission('DONT_ALLOW');
        })
        it('show and then hide content', fakeAsync(() => {
            detectChanges(fixture);
            let content3 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content3).toEqual(null);


            comp.permissions = undefined;
            detectChanges(fixture);
            let content2 = fixture.debugElement.nativeElement.querySelector('div');
            expect(content2).toBeTruthy();
            expect(content2.innerHTML.trim()).toEqual(`123`);
        }));
    })

});





function detectChanges(fixture) {
    tick();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
}