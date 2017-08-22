
import { PermissionsGuard } from './permissions-guard.service';
import { async, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { PermissionsService } from '../permissions.service';
import { RolesService } from '../roles.service';
import { NgxPermissionsModule } from '../index';
import { Router, RouterStateSnapshot } from '@angular/router';
import { tick } from "@angular/core/testing";

describe('Permissions guard only', () => {

    let permissionGuard: PermissionsGuard;
    let route;
    let fakeRouter;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(inject([PermissionsService, RolesService], (service: PermissionsService, rolesService: RolesService) => {
        fakeRouter = <any>{navigate: () => {}};
        spyOn(fakeRouter, 'navigate');

        service.addPermission('ADMIN');
        permissionGuard = new PermissionsGuard(service, rolesService, fakeRouter as Router);
    }));

    it('should create an instance', () => {
        expect(permissionGuard).toBeTruthy();
    });

    it ('sholud return true when only fullfills', fakeAsync(() => {
        route = { data: {
            permissions: {
                only: 'ADMIN'
            }
        }};
        permissionGuard.canActivate(route, {} as RouterStateSnapshot).then((data) => {
            expect(data).toEqual(true);
        })
    }));

    it ('sholud return false when only doesnt match', fakeAsync(() => {
        route = { data: {
            permissions: {
                only: 'DOESNT MATCH'
            }
        }};
        permissionGuard.canActivate(route, {} as RouterStateSnapshot).then((data) => {
            expect(data).toEqual(false);
        })
    }));

    it ('sholud return false when only doesnt match and navigate to 404', fakeAsync(() => {
        route = { data: {
            permissions: {
                only: 'DOESNT MATCH',
                redirectTo: './404'
            }
        }};
        permissionGuard.canActivate(route, {} as RouterStateSnapshot).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['./404'])
        })
    }));
});

describe('Permissions guard Except', () => {

    let permissionGuard: PermissionsGuard;
    let fakeRouter;
    let route;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(inject([PermissionsService, RolesService], (service: PermissionsService, rolesService: RolesService) => {
        fakeRouter = <any>{navigate: () => {}};
        spyOn(fakeRouter, 'navigate');

        service.addPermission('MANAGER');
        permissionGuard = new PermissionsGuard(service, rolesService, fakeRouter as Router);
    }));

    it('should create an instance', () => {
        expect(permissionGuard).toBeTruthy();
    });

    it ('sholud return false when except matches', fakeAsync(() => {
        route = { data: {
            permissions: {
                except: 'MANAGER'
            }
        }};
        permissionGuard.canActivate(route, {} as RouterStateSnapshot).then((data) => {
            expect(data).toEqual(false);
        })
    }));

    it ('sholud return false when except matches and redirectTo 404', fakeAsync(() => {
        route = { data: {
            permissions: {
                except: 'MANAGER',
                redirectTo: './404'
            }
        }};
        permissionGuard.canActivate(route, {} as RouterStateSnapshot).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['./404']);
        })
    }));

    it ('sholud return false when except matches at least one array', fakeAsync(() => {
        route = { data: {
            permissions: {
                except: ["MANAGER", 'Something else']
            }
        }};
        permissionGuard.canActivate(route, {} as RouterStateSnapshot).then((data) => {
            expect(data).toEqual(false);
        })
    }));

    it ('sholud return false when except matches in array and redirectTo 404', fakeAsync(() => {
        route = { data: {
            permissions: {
                except: ["MANAGER", 'Something else'],
                redirectTo: './404'
            }
        }};
        permissionGuard.canActivate(route, {} as RouterStateSnapshot).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['./404']);
        })
    }));

    it ('sholud return true when except doesn"t match', fakeAsync(() => {
        route = { data: {
            permissions: {
                except: 'DOESNT MATCH'
            }
        }};
        permissionGuard.canActivate(route, {} as RouterStateSnapshot).then((data) => {
            expect(data).toEqual(true);
        })
    }));

    it ('sholud return true when any in array doesn"t match', fakeAsync(() => {
        route = { data: {
            permissions: {
                except: ['DOESNT MATCH', "AWESOME"]
            }
        }};
        permissionGuard.canActivate(route, {} as RouterStateSnapshot).then((data) => {
            expect(data).toEqual(true);
        })
    }));


});


describe('Permissions guard Except and only together', () => {

    let permissionGuard: PermissionsGuard;
    let fakeRouter;
    let route;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(inject([PermissionsService, RolesService], (service: PermissionsService, rolesService: RolesService) => {
        fakeRouter = <any>{navigate: () => {}};
         spyOn(fakeRouter, 'navigate')

        service.addPermission('MANAGER');
        permissionGuard = new PermissionsGuard(service, rolesService, fakeRouter as Router);
    }));

    it('should create an instance', () => {
        expect(permissionGuard).toBeTruthy();
    });

    it ('sholud return false when except matches and it should not check only and redirect to 404', fakeAsync(() => {
        route = { data: {
            permissions: {
                except: 'MANAGER',
                only: 'AWESOME',
                redirectTo: './404'
            }
        }};
        permissionGuard.canActivate(route, {} as RouterStateSnapshot).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['./404']);
        })
    }));

    it ('should return false when except matches at least one array', fakeAsync(() => {
        route = { data: {
            permissions: {
                except: ["MANAGER", 'Something else'],
                only: 'AWESOME'
            }
        }};
        permissionGuard.canActivate(route, {} as RouterStateSnapshot).then((data) => {
            expect(data).toEqual(false);
        })
    }));

    it ('sholud return true when except doesn"t match but only matcher', fakeAsync(() => {
        route = { data: {
            permissions: {
                except: 'DOESNT MATCH',
                only: "MANAGER"
            }
        }};
        permissionGuard.canActivate(route, {} as RouterStateSnapshot).then((data) => {
            expect(data).toEqual(true);
        })
    }));

    it ('sholud return true when any in array doesn"t match but only matches', fakeAsync(() => {
        route = { data: {
            permissions: {
                except: ['DOESNT MATCH', "AWESOME"],
                only: ['MANAGER', 'AWESOME']
            }
        }};
        permissionGuard.canActivate(route, {} as RouterStateSnapshot).then((data) => {
            expect(data).toEqual(true);
        })
    }));
    it ('sholud return false when except in array doesn"t match and only also doesn"t matches', fakeAsync(() => {
        route = { data: {
            permissions: {
                except: ['DOESNT MATCH', "AWESOME"],
                only: ['gg', 'AWESOME'],
                redirectTo: './404'
            }
        }};
        permissionGuard.canActivate(route, {} as RouterStateSnapshot).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['./404']);
        })
    }));
});

