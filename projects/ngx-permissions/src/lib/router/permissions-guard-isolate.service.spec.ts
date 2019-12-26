import { NgxPermissionsService } from '../service/permissions.service';
import {Component, ModuleWithProviders, NgModule, NgModuleFactoryLoader} from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { ComponentFixture, fakeAsync, getTestBed, inject, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule, SpyNgModuleFactoryLoader } from '@angular/router/testing';
import { NgxPermissionsModule } from '../index';
import { NgxRolesService } from '../service/roles.service';

@Component({
    selector: 'ngx-permissions-root',
    template: `
        <router-outlet></router-outlet>`
})
class RootComponent {
    constructor(public permissions: NgxPermissionsService) {
        permissions.addPermission('ADMIN', () => {
            return false;
        });
    }
}

@Component({
    selector: 'ngx-permissions-lazy',
    template: 'lazy-loaded-parent [<router-outlet></router-outlet>]'
})
class ParentLazyLoadedComponent {
}

function getLazyLoadedModule(importedModule: any) {
    @Component({selector: 'ngx-permissions-lazy', template: 'lazy-loaded-child'})
    class ChildLazyLoadedComponent {
        constructor(public permissions: NgxPermissionsService) {
            permissions.addPermission('ADMIN', () => {
                return true;
            });
            // expect(permissions.hasPermission('LAZY')).toBe(true);
        }
    }

    @NgModule({
        declarations: [ParentLazyLoadedComponent, ChildLazyLoadedComponent],
        imports: [
            RouterModule.forChild([{
                path: 'loaded',
                component: ParentLazyLoadedComponent,
                children: [{path: 'child', component: ChildLazyLoadedComponent}]
            }]),
            importedModule
        ]
    })
    class LoadedModule {
    }

    return LoadedModule;
}

function advance(fixture: ComponentFixture<any>): void {
    tick();
    fixture.detectChanges();
}

function createRoot(router: Router, type: any): ComponentFixture<any> {
    const f = TestBed.createComponent(type);
    advance(f);
    router.initialNavigation();
    advance(f);
    return f;
}

describe('module', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                NgxPermissionsModule.forRoot(),
            ],
            declarations: [RootComponent]
        });
    });

    it('should work when lazy loaded using forChild', fakeAsync(inject(
        [Router, Location, NgModuleFactoryLoader],
        (router: Router, location: Location, loader: SpyNgModuleFactoryLoader) => {
            const LoadedModule = getLazyLoadedModule(NgxPermissionsModule.forChild());
            loader.stubbedModules = {expected: LoadedModule};

            const fixture = createRoot(router, RootComponent);
            const injector = getTestBed();
            const permissionsService: NgxPermissionsService = injector.get(NgxPermissionsService);

            permissionsService.hasPermission('ADMIN').then((data) => {
                expect(data).toBe(false);
            });

            router.resetConfig([{path: 'lazy', loadChildren: 'expected'}]);

            router.navigateByUrl('/lazy/loaded/child');
            advance(fixture);

            expect(location.path()).toEqual('/lazy/loaded/child');

            // since the root module imports the NgxPermissionsModule with forRoot and the lazy loaded module with forChild
            // the permissionsService service is shared between both modules
            // the constructor of the ChildLazyLoadedComponent overwrote the "ADMIN" key of the root NgxPermissionsService
            permissionsService.hasPermission('ADMIN').then((data) => {
                expect(data).toBe(true);
            });
        }))
    );

    it('should work when loaded using just Module', fakeAsync(inject(
        [Router, Location, NgModuleFactoryLoader],
        (router: Router, location: Location, loader: SpyNgModuleFactoryLoader) => {
            const LoadedModule = getLazyLoadedModule(NgxPermissionsModule);
            loader.stubbedModules = {expected: LoadedModule};

            const fixture = createRoot(router, RootComponent);
            const injector = getTestBed();
            const permissionsService: NgxPermissionsService = injector.get(NgxPermissionsService);

            permissionsService.hasPermission('ADMIN').then((data) => {
                expect(data).toBe(false);
            });

            router.resetConfig([{path: 'lazy', loadChildren: 'expected'}]);

            router.navigateByUrl('/lazy/loaded/child');
            advance(fixture);

            expect(location.path()).toEqual('/lazy/loaded/child');

            // since the root module imports the NgxPermissionsModule with forRoot and the lazy loaded module with forChild
            // the permissionsService service is shared between both modules
            // the constructor of the ChildLazyLoadedComponent overwrote the "ADMIN" key of the root NgxPermissionsService
            permissionsService.hasPermission('ADMIN').then((data) => {
                expect(data).toBe(true);
            });
        }))
    );

    it('should create 2 instances of the service when lazy loaded using forRoot', fakeAsync(inject(
        [Router, Location, NgModuleFactoryLoader],
        (router: Router, location: Location, loader: SpyNgModuleFactoryLoader) => {
            const LoadedModule = getLazyLoadedModule(NgxPermissionsModule.forRoot());
            loader.stubbedModules = {expected: LoadedModule};

            const fixture = createRoot(router, RootComponent);
            const injector = getTestBed();
            const permissionsService = injector.get(NgxPermissionsService);

            permissionsService.hasPermission('ADMIN').then((data) => {
                expect(data).toBe(false);
            });
            router.resetConfig([{path: 'lazy', loadChildren: 'expected'}]);

            router.navigateByUrl('/lazy/loaded/child');
            advance(fixture);

            expect(location.path()).toEqual('/lazy/loaded/child');

            // since both the root module and the lazy loaded module use forRoot to define the NgxPermissionsModule
            // the permissionsService service is NOT shared, and 2 instances co-exist
            // the constructor of the ChildLazyLoadedComponent didn't overwrote the "ADMIN" key of the root NgxPermissionsService
            permissionsService.hasPermission('ADMIN').then((data) => {
                expect(data).toBe(false);
            });        }))
    );

    it('should create 2 instances of the service when lazy loaded using forChild and isolate true', fakeAsync(inject(
        [Router, Location, NgModuleFactoryLoader],
        (router: Router, location: Location, loader: SpyNgModuleFactoryLoader) => {
            const LoadedModule = getLazyLoadedModule(NgxPermissionsModule.forChild({permissionsIsolate: true}));
            loader.stubbedModules = {expected: LoadedModule};

            const fixture = createRoot(router, RootComponent);
            const injector = getTestBed();
            const permissionsService = injector.get(NgxPermissionsService);

            permissionsService.hasPermission('ADMIN').then((data) => {
                expect(data).toBe(false);
            });
            router.resetConfig([{path: 'lazy', loadChildren: 'expected'}]);

            router.navigateByUrl('/lazy/loaded/child');
            advance(fixture);

            expect(location.path()).toEqual('/lazy/loaded/child');

            // since both the root module and the lazy loaded module use forRoot to define the NgxPermissionsModule
            // the permissions service is NOT shared, and 2 instances co-exist
            // the constructor of the ChildLazyLoadedComponent didn't overwrote the "false" key of the root NgxPermissionsService
            permissionsService.hasPermission('ADMIN').then((data) => {
                expect(data).toBe(false);
            });
        }))
    );
});


@Component({
    selector: 'ngx-permissions-root-roles',
    template: `
        <router-outlet></router-outlet>`
})
class RootRolesComponent {
    constructor(public roleService: NgxRolesService) {
        roleService.addRole('ADMIN', () => {
            return false;
        });
    }
}

@Component({
    selector: 'ngx-permissions-lazy',
    template: 'lazy-loaded-parent [<router-outlet></router-outlet>]'
})
class ParentLazyRolesLoadedComponent {
}

function getLazyRolesLoadedModule(importedModule: ModuleWithProviders) {
    @Component({selector: 'ngx-permissions-lazy', template: 'lazy-loaded-child'})
    class ChildLazyLoadedComponent {
        constructor(public permissions: NgxRolesService) {
            permissions.addRole('ADMIN', () => {
                return true;
            });
            // expect(permissions.hasPermission('LAZY')).toBe(true);
        }
    }

    @NgModule({
        declarations: [ParentLazyLoadedComponent, ChildLazyLoadedComponent],
        imports: [
            RouterModule.forChild([{
                path: 'loaded',
                component: ParentLazyLoadedComponent,
                children: [{path: 'child', component: ChildLazyLoadedComponent}]
            } as Route]),
            importedModule
        ]
    })
    class LoadedModule {
    }

    return LoadedModule;
}

describe('Role module', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                NgxPermissionsModule.forRoot(),
            ],
            declarations: [RootRolesComponent]
        });
    });

    it('should work when lazy loaded using forChild', fakeAsync(inject(
        [Router, Location, NgModuleFactoryLoader],
        (router: Router, location: Location, loader: SpyNgModuleFactoryLoader) => {
            const LoadedModule = getLazyRolesLoadedModule(NgxPermissionsModule.forChild());
            loader.stubbedModules = {expected: LoadedModule};

            const fixture = createRoot(router, RootRolesComponent);
            const injector = getTestBed();
            const rolesService: NgxRolesService = injector.get(NgxRolesService);

            rolesService.hasOnlyRoles('ADMIN').then((data) => {
                expect(data).toBe(false);
            });

            router.resetConfig([{path: 'lazy', loadChildren: 'expected'}]);

            router.navigateByUrl('/lazy/loaded/child');
            advance(fixture);

            expect(location.path()).toEqual('/lazy/loaded/child');

            // since the root module imports the NgxPermissionsModule with forRoot and the lazy loaded module with forChild
            // the rolesServihasOnlyRoles() is shared between both modules
            // the constructor of the ChildLazyLoadedComponent overwrote the "ADMIN" key of the root roleServiceService
            rolesService.hasOnlyRoles('ADMIN').then((data) => {
                expect(data).toBe(true);
            });
        }))
    );

    it('should create 2 instances of the service when lazy loaded using forRoot', fakeAsync(inject(
        [Router, Location, NgModuleFactoryLoader],
        (router: Router, location: Location, loader: SpyNgModuleFactoryLoader) => {
            const LoadedModule = getLazyRolesLoadedModule(NgxPermissionsModule.forRoot());
            loader.stubbedModules = {expected: LoadedModule};

            const fixture = createRoot(router, RootRolesComponent);
            const injector = getTestBed();
            const rolesService = injector.get(NgxRolesService);

            rolesService.hasOnlyRoles('ADMIN').then((data) => {
                expect(data).toBe(false);
            });
            router.resetConfig([{path: 'lazy', loadChildren: 'expected'}]);

            router.navigateByUrl('/lazy/loaded/child');
            advance(fixture);

            expect(location.path()).toEqual('/lazy/loaded/child');

            // since both the root module and the lazy loaded module use forRoot to define the NgxPermisionsModule
            // the rolesService service is NOT shared, and 2 instances co-exist
            // the constructor of the ChildLazyLoadedComponent didn't overwrote the "ADMIN" key of the root PermissionsService
            rolesService.hasOnlyRoles('ADMIN').then((data) => {
                expect(data).toBe(false);
            });        }))
    );

    it('should create 2 instances of the service when lazy loaded using forChild and isolate true', fakeAsync(inject(
        [Router, Location, NgModuleFactoryLoader],
        (router: Router, location: Location, loader: SpyNgModuleFactoryLoader) => {
            const LoadedModule = getLazyRolesLoadedModule(NgxPermissionsModule.forChild({rolesIsolate: true}));
            loader.stubbedModules = {expected: LoadedModule};

            const fixture = createRoot(router, RootRolesComponent);
            const injector = getTestBed();
            const rolesService = injector.get(NgxRolesService);

            rolesService.hasOnlyRoles('ADMIN').then((data) => {
                expect(data).toBe(false);
            });
            router.resetConfig([{path: 'lazy', loadChildren: 'expected'}]);

            router.navigateByUrl('/lazy/loaded/child');
            advance(fixture);

            expect(location.path()).toEqual('/lazy/loaded/child');

            // since both the root module and the lazy loaded module use forRoot to define the NgxPermissionsModule
            // the permissions service is NOT shared, and 2 instances co-exist
            // the constructor of the ChildLazyLoadedComponent didn't overwrote the "false" key of the root NgxRolesService
            rolesService.hasOnlyRoles('ADMIN').then((data) => {
                expect(data).toBe(false);
            });
        }))
    );
});
