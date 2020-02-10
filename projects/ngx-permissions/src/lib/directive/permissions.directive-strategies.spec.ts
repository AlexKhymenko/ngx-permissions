import { Component, Renderer2, TemplateRef } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgxPermissionsPredefinedStrategies } from '../enums/predefined-strategies.enum';
import { NgxPermissionsModule } from '../index';
import { NgxPermissionsConfigurationService } from '../service/configuration.service';
import { NgxPermissionsService } from '../service/permissions.service';

enum PermissionsTestEnum {
    ADMIN = 'ADMIN',
    GUEST = 'GUEST'
}

describe('Permission directive angular only configuration', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <button *ngxPermissionsOnly="'ADMIN'">
                <div>123</div>
            </button>`
    })
    class TestComponent {
        data: any;
    }

    let permissionService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    let configurationService: NgxPermissionsConfigurationService;
    const disable = 'disable';
    let renderer: Renderer2;
    const correctTemplate = '<div>123</div>';
    const disableFunction = (tF: TemplateRef<any>) => {
        renderer.setAttribute(tF.elementRef.nativeElement.previousSibling, 'disabled', 'true');
    };
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()], providers: [Renderer2]});

        fixture = TestBed.createComponent(TestComponent);

        permissionService = fixture.debugElement.injector.get(NgxPermissionsService);
        configurationService = fixture.debugElement.injector.get(NgxPermissionsConfigurationService);
        renderer = fixture.debugElement.injector.get(Renderer2);
    });

    it('Should disable component when default method is defined', fakeAsync(() => {
        configurationService.addPermissionStrategy(disable, disableFunction);
        configurationService.setDefaultOnAuthorizedStrategy(disable);
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('button');
        expect(content).toBeTruthy();
        expect(content.disabled).toEqual(true);
    }));

    it('Should show the component when predefined show strategy is selected', fakeAsync(() => {
        configurationService.setDefaultOnAuthorizedStrategy(NgxPermissionsPredefinedStrategies.SHOW);
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('button');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual(correctTemplate);
    }));

    it('Should remove the component when predefined remove strategy is selected', fakeAsync(() => {
        configurationService.setDefaultOnAuthorizedStrategy(NgxPermissionsPredefinedStrategies.REMOVE);
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('button');
        expect(content).toBe(null);
    }));

    it('Should disable component when default unauthorized method is defined', fakeAsync(() => {
        configurationService.addPermissionStrategy(disable, disableFunction);
        configurationService.setDefaultOnUnauthorizedStrategy(disable);
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('button');
        expect(content).toBeTruthy();
        expect(content.disabled).toEqual(true);
    }));

    it('Should show the component when predefined default unauthorized show strategy is selected', fakeAsync(() => {
        configurationService.setDefaultOnUnauthorizedStrategy(NgxPermissionsPredefinedStrategies.SHOW);
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('button');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual(correctTemplate);
    }));

    it('Should remove the component when predefined default unauthorized remove strategy is selected', fakeAsync(() => {
        configurationService.setDefaultOnUnauthorizedStrategy(NgxPermissionsPredefinedStrategies.REMOVE);
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('button');
        expect(content).toBe(null);
    }));
});


describe('Permission directive angular strategies configuration passed by template', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <button *ngxPermissionsOnly="'ADMIN'; authorisedStrategy: 'remove'; unauthorisedStrategy: 'show'">
                <div>123</div>
            </button>`
    })
    class TestComponent {
        data: any;
    }

    let permissionService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    const correctTemplate = '<div>123</div>';
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()], providers: [Renderer2]});

        fixture = TestBed.createComponent(TestComponent);

        permissionService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    it('Should hide the component when predefined hide strategy is selected', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('button');
        expect(content).toEqual(null);
    }));

    it('Should remove the component when predefined remove strategy is selected', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('button');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual(correctTemplate);
    }));
});


describe('Permission directive angular strategies configuration passed by template except', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <button *ngxPermissionsExcept="'ADMIN'; authorisedStrategy: 'remove'; unauthorisedStrategy: 'show'">
                <div>123</div>
            </button>`
    })
    class TestComponent {
        data: any;

    }

    let permissionService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    const correctTemplate = '<div>123</div>';
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()], providers: [Renderer2]});

        fixture = TestBed.createComponent(TestComponent);

        permissionService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    it('Should hide the component when predefined hide strategy is selected', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('button');
        expect(content).toEqual(null);
    }));

    it('Should show the component when predefined remove strategy is selected', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('button');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual(correctTemplate);
    }));
});


describe('Permission directive angular strategies as function configuration passed by template', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <button *ngxPermissionsOnly="'ADMIN'; authorisedStrategy: disabled; unauthorisedStrategy: disabled">
                <div>123</div>
            </button>`
    })
    class TestComponent {
        data: any;

        public disabled(templateRef: TemplateRef<any>) {
            templateRef.elementRef.nativeElement.previousSibling.setAttribute('disabled', true);
        }
    }

    let permissionService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()], providers: [Renderer2]});

        fixture = TestBed.createComponent(TestComponent);

        permissionService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    it('Should disable the component when disabled function is passed', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('button');
        expect(content).toBeTruthy();
        expect(content.disabled).toEqual(true);
    }));

    it('Should remove the component when predefined remove strategy is selected', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('button');
        expect(content).toBeTruthy();
        expect(content.disabled).toEqual(true);
    }));
});

describe('Permission directive angular strategies as function configuration passed by template except permissions', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <button *ngxPermissionsExcept="'ADMIN'; authorisedStrategy: disabled; unauthorisedStrategy: disabled">
                <div>123</div>
            </button>`
    })
    class TestComponent {
        data: any;

        public disabled(templateRef: TemplateRef<any>) {
            templateRef.elementRef.nativeElement.previousSibling.setAttribute('disabled', true);
        }
    }

    let permissionService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()], providers: [Renderer2]});

        fixture = TestBed.createComponent(TestComponent);

        permissionService = fixture.debugElement.injector.get(NgxPermissionsService);
    });

    it('Should disable the component when disabled function is passed', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('button');
        expect(content).toBeTruthy();
        expect(content.disabled).toEqual(true);
    }));

    it('Should remove the component when predefined remove strategy is selected', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('button');
        expect(content).toBeTruthy();
        expect(content.disabled).toEqual(true);
    }));
});


describe('Permission directive angular strategies as function passed in configuration except permissions', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <button *ngxPermissionsExcept="'ADMIN'; authorisedStrategy: 'disable'; unauthorisedStrategy: 'disable'">
                <div>123</div>
            </button>`
    })
    class TestComponent {
        data: any;

        public disabled(templateRef: TemplateRef<any>) {
            templateRef.elementRef.nativeElement.previousSibling.setAttribute('disabled', true);
        }
    }

    let permissionService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    let configurationService: NgxPermissionsConfigurationService;
    const disable = 'disable';
    let renderer: Renderer2;
    const disableFunction = (tF: TemplateRef<any>) => {
        renderer.setAttribute(tF.elementRef.nativeElement.previousSibling, 'disabled', 'true');
    };
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()], providers: [Renderer2]});

        fixture = TestBed.createComponent(TestComponent);

        permissionService = fixture.debugElement.injector.get(NgxPermissionsService);
        configurationService = fixture.debugElement.injector.get(NgxPermissionsConfigurationService);
        renderer = fixture.debugElement.injector.get(Renderer2);

    });

    it('Should disable the component when disabled function is passed', fakeAsync(() => {
        configurationService.addPermissionStrategy(disable, disableFunction);

        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('button');
        expect(content).toBeTruthy();
        expect(content.disabled).toEqual(true);
    }));

    it('Should remove the component when predefined remove strategy is selected', fakeAsync(() => {
        configurationService.addPermissionStrategy(disable, disableFunction);

        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('button');
        expect(content).toBeTruthy();
        expect(content.disabled).toEqual(true);
    }));
});


describe('Permission directive angular strategies as function passed in configuration except permissions', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <button *ngxPermissionsOnly="'ADMIN'; authorisedStrategy: 'disable'; unauthorisedStrategy: 'disable'">
                <div>123</div>
            </button>`
    })
    class TestComponent {
        data: any;

        public disabled(templateRef: TemplateRef<any>) {
            templateRef.elementRef.nativeElement.previousSibling.setAttribute('disabled', true);
        }
    }

    let permissionService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    let configurationService: NgxPermissionsConfigurationService;
    const disable = 'disable';
    let renderer: Renderer2;
    const disableFunction = (tF: TemplateRef<any>) => {
        renderer.setAttribute(tF.elementRef.nativeElement.previousSibling, 'disabled', 'true');
    };
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()], providers: [Renderer2]});

        fixture = TestBed.createComponent(TestComponent);

        permissionService = fixture.debugElement.injector.get(NgxPermissionsService);
        configurationService = fixture.debugElement.injector.get(NgxPermissionsConfigurationService);
        renderer = fixture.debugElement.injector.get(Renderer2);

    });

    it('Should disable the component when disabled function is passed', fakeAsync(() => {
        configurationService.addPermissionStrategy(disable, disableFunction);

        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('button');
        expect(content).toBeTruthy();
        expect(content.disabled).toEqual(true);
    }));

    it('Should remove the component when predefined remove strategy is selected', fakeAsync(() => {
        configurationService.addPermissionStrategy(disable, disableFunction);

        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('button');
        expect(content).toBeTruthy();
        expect(content.disabled).toEqual(true);
    }));
});


describe('test predefined strategies', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <button *ngxPermissionsOnly="'ADMIN'; authorisedStrategy: 'show'; unauthorisedStrategy: 'remove'">
                <div>123</div>
            </button>`
    })
    class TestComponent {
        data: any;

        public disabled(templateRef: TemplateRef<any>) {
            templateRef.elementRef.nativeElement.previousSibling.setAttribute('disabled', true);
        }
    }

    let permissionService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    let configurationService: NgxPermissionsConfigurationService;
    const disable = 'disable';
    let renderer: Renderer2;
    const disableFunction = (tF: TemplateRef<any>) => {
        renderer.setAttribute(tF.elementRef.nativeElement.previousSibling, 'disabled', 'true');
    };
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()], providers: [Renderer2]});

        fixture = TestBed.createComponent(TestComponent);

        permissionService = fixture.debugElement.injector.get(NgxPermissionsService);
        configurationService = fixture.debugElement.injector.get(NgxPermissionsConfigurationService);
        renderer = fixture.debugElement.injector.get(Renderer2);

    });

    it('Should disable the component when disabled function is passed', fakeAsync(() => {

        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('button');
        expect(content).toBeTruthy();
    }));

    it('Should remove the component when predefined remove strategy is selected', fakeAsync(() => {
        configurationService.addPermissionStrategy(disable, disableFunction);

        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('button');
        expect(content).toEqual(null);
    }));
});


describe('test predefined strategies normal behavior', () => {
    @Component({
        selector: 'ngx-permissions-test-comp',
        template: `
            <button *ngxPermissionsOnly="'ADMIN';  unauthorisedStrategy: 'disable'; authorisedStrategy: 'enable'">
                <div>123</div>
            </button>`
    })
    class TestComponent {
        data: any;

        public disabled(templateRef: TemplateRef<any>) {
            templateRef.elementRef.nativeElement.previousSibling.setAttribute('disabled', true);
        }
    }

    let permissionService: NgxPermissionsService;
    let fixture: ComponentFixture<TestComponent>;
    let configurationService: NgxPermissionsConfigurationService;
    const disable = 'disable';
    let renderer: Renderer2;
    const disableFunction = (tF: TemplateRef<any>) => {
        renderer.setAttribute(tF.elementRef.nativeElement.previousSibling, 'disabled', 'true');
    };
    const enableFunction = (tF: TemplateRef<any>) => {
        renderer.removeAttribute(tF.elementRef.nativeElement.previousSibling, 'disabled');
    };
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgxPermissionsModule.forRoot()], providers: [Renderer2]});

        fixture = TestBed.createComponent(TestComponent);

        permissionService = fixture.debugElement.injector.get(NgxPermissionsService);
        configurationService = fixture.debugElement.injector.get(NgxPermissionsConfigurationService);
        renderer = fixture.debugElement.injector.get(Renderer2);
    });

    it('Should show the component when predefined strategy is present', fakeAsync(() => {
        configurationService.addPermissionStrategy(disable, disableFunction);
        configurationService.addPermissionStrategy('enable', enableFunction);

        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        const content = fixture.debugElement.nativeElement.querySelector('button');
        expect(content).toBeTruthy();
        expect(content.disabled).toBe(true);

        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);

        detectChanges(fixture);
        const content2 = fixture.debugElement.nativeElement.querySelector('button');


        expect(content2).toBeTruthy();
        expect(content2.disabled).toBeFalsy();
    }));
});


function detectChanges(fixture) {
    tick();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

}
