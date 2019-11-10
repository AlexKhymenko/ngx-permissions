import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPermissionsModule } from '../index';
import { DEFAULT_REDIRECT_KEY } from '../model/permissions-router-data.model';
import { NgxPermissionsService } from '../service/permissions.service';
import { NgxRolesService } from '../service/roles.service';
import { NgxPermissionsGuard } from './permissions-guard.service';

describe('Permissions guard only', () => {

    let permissionGuard: NgxPermissionsGuard;
    let testRoute;
    let fakeRouter;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(
      inject([NgxPermissionsService, NgxRolesService], (service: NgxPermissionsService, rolesService: NgxRolesService) => {
        fakeRouter = {navigate: () => {}} as any;
        spyOn(fakeRouter, 'navigate');

        service.addPermission('ADMIN');
        permissionGuard = new NgxPermissionsGuard(service, rolesService, fakeRouter as Router);
    }));

    it('should create an instance', () => {
        expect(permissionGuard).toBeTruthy();
    });

    it ('should return true when only fulfils', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                only: 'ADMIN'
            }
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(true);
        });
    }));

    it ('should return true when only is empty array', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                only: []
            }
        }};
        expect( permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot)).toEqual(true);

    }));

    it ('should return true when no permissions array specified', fakeAsync(() => {
        testRoute = {};
        expect( permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot)).toEqual(true);

    }));

    it ('should return true when except is empty array', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except: []
            }
        }};
        expect( permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot)).toEqual(true);

    }));

    it ('should return false when only doesnt match', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                only: 'DOESNT MATCH'
            }
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
        });
    }));

    it ('should return false when only doesnt match and navigate to 404', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                only: 'DOESNT MATCH',
                redirectTo: './404'
            }
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['./404']);
        });
    }));

    it ('should return false when only doesnt match and navigate to array 404', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                only: 'DOESNT MATCH',
                redirectTo: ['./404']
            }
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['./404']);
        });
    }));

    it ('should return true when neither only not except specified', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                only: '',
                except: '',
                redirectTo: ['./404']
            }
        }};
        expect(permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).toBe(true);
    }));

    it ('should return true when neither only not except specified as array', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                only: [],
                except: [],
                redirectTo: ['./404']
            }
        }};
        expect(permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).toBe(true);
    }));
});

describe('Permissions guard Except', () => {

    let permissionGuard: NgxPermissionsGuard;
    let fakeRouter;
    let testRoute;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(inject([NgxPermissionsService, NgxRolesService], (service: NgxPermissionsService, rolesService: NgxRolesService) => {
        fakeRouter = {navigate: () => {}} as any;
        spyOn(fakeRouter, 'navigate');

        service.addPermission('MANAGER');
        permissionGuard = new NgxPermissionsGuard(service, rolesService, fakeRouter as Router);
    }));

    it('should create an instance', () => {
        expect(permissionGuard).toBeTruthy();
    });

    it ('should return false when except matches', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except: 'MANAGER'
            }
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
        });
    }));

    it ('should return false when except matches and redirectTo 404', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except: 'MANAGER',
                redirectTo: './404'
            }
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['./404']);
        });
    }));

    it ('should return false when except matches at least one array', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except: ['MANAGER', 'Something else']
            }
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
        });
    }));

    it ('should return false when except matches in array and redirectTo 404', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except: ['MANAGER', 'Something else'],
                redirectTo: './404'
            }
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['./404']);
        });
    }));

    it ('should return true when except doesn\'t match', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except: 'DOESNT MATCH'
            }
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(true);
        });
    }));

    it ('should return true when any in array doesn\'t match', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except: ['DOESNT MATCH', 'AWESOME']
            }
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(true);
        });
    }));


});


describe('Permissions guard Except and only together', () => {

    let permissionGuard: NgxPermissionsGuard;
    let fakeRouter;
    let testRoute;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(inject([NgxPermissionsService, NgxRolesService], (service: NgxPermissionsService, rolesService: NgxRolesService) => {
        fakeRouter = {navigate: () => {}} as any;
        spyOn(fakeRouter, 'navigate');

        service.addPermission('MANAGER');
        permissionGuard = new NgxPermissionsGuard(service, rolesService, fakeRouter as Router);
    }));

    it('should create an instance', () => {
        expect(permissionGuard).toBeTruthy();
    });

    it ('should return false when except matches and it should not check only and redirect to 404', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except: 'MANAGER',
                only: 'AWESOME',
                redirectTo: './404'
            }
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['./404']);
        });
    }));

    it ('should return false when except matches at least one array', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except: ['MANAGER', 'Something else'],
                only: 'AWESOME'
            }
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
        });
    }));

    it ('should return true when except doesn\'t match but only matcher', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except: 'DOESNT MATCH',
                only: 'MANAGER'
            }
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(true);
        });
    }));

    it ('should return true when any in array doesn\'t match but only matches', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except: ['DOESNT MATCH', 'AWESOME'],
                only: ['MANAGER', 'AWESOME']
            }
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(true);
        });
    }));
    it ('should return false when except in array doesn\'t match and only also doesn\'t matches', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except: ['DOESNT MATCH', 'AWESOME'],
                only: ['gg', 'AWESOME'],
                redirectTo: './404'
            }
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['./404']);
        });
    }));
});


describe('Permissions guard use only dynamically', () => {

    let permissionGuard: NgxPermissionsGuard;
    let fakeRouter;
    let testRoute;
    beforeEach(() => {
        TestBed.configureTestingModule({

            imports: [NgxPermissionsModule.forRoot(),

                RouterTestingModule.withRoutes(
                [
                    {
                        path: 'crisis-center/:id',
                        redirectTo: '404',
                        data: {
                            permissions: {
                                except: (activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) => {
                                    return true;
                                }
                            },
                        }
                    },
            ])]
        });
    });
    beforeEach(
      inject([NgxPermissionsService, NgxRolesService], (service: NgxPermissionsService, rolesService: NgxRolesService, router: Router) => {
        fakeRouter = {navigate: () => {}} as any;

        service.addPermission('MANAGER');
        // fakeRouter = router;
        spyOn(fakeRouter, 'navigate');
        permissionGuard = new NgxPermissionsGuard(service, rolesService, fakeRouter as Router);
    }));

    it('should create an instance', () => {
        expect(permissionGuard).toBeTruthy();
    });

    it ('should return true when only matches and it should not check only', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                only: (route: ActivatedRouteSnapshot, awesome: RouterStateSnapshot) => {
                   if (route.data.path.includes(44)) {
                       return ['MANAGER'];
                   } else {
                       return 'notManager';
                   }
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(true);
        });
    }));

    it ('should return true when except matches and it should ', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except: (route: ActivatedRouteSnapshot, awesome: RouterStateSnapshot) => {
                    if (route.data.path.includes('doesntInclude')) {
                        return ['MANAGER'];
                    } else {
                        return 'notManager';
                    }
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(true);
        });
    }));

    it ('should return true when except doesn\'t match but only matches it should  true', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except: (route: ActivatedRouteSnapshot, awesome: RouterStateSnapshot) => {
                    if (route.data.path.includes('doesntInclude')) {
                        return ['MANAGER'];
                    } else {
                        return 'notManager';
                    }
                },
                only: (route: ActivatedRouteSnapshot, awesome: RouterStateSnapshot) => {
                    if (route.data.path.includes('44')) {
                        return ['MANAGER'];
                    } else {
                        return 'notManager';
                    }
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(true);
        });
    }));

    it ('should return true when except doesn\'t match but only matches it should true', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except: (route: ActivatedRouteSnapshot, awesome: RouterStateSnapshot) => {
                    if (route.data.path.includes('doesntInclude')) {
                        return ['MANAGER'];
                    } else {
                        return 'notManager';
                    }
                },
                only: (route: ActivatedRouteSnapshot, awesome: RouterStateSnapshot) => {
                    if (route.data.path.includes('gg')) {
                        return ['MANAGER'];
                    } else {
                        return 'notManager';
                    }
                },
                redirectTo: '/404'
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['/404']);
        });
    }));
});

describe('Permissions guard test redirectTo path parameters dynamically', () => {

    let permissionGuard: NgxPermissionsGuard;
    let fakeRouter;
    let testRoute;
    beforeEach(() => {
        TestBed.configureTestingModule({

            imports: [NgxPermissionsModule.forRoot(),

                RouterTestingModule.withRoutes(
                    [
                        {
                            path: 'crisis-center/:id',
                            redirectTo: '404',
                            data: {
                                permissions: {
                                    except: (activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) => {
                                        return true;
                                    },
                                    redirectTo: {
                                        navigationCommands: ['123'],
                                        navigationExtras: {
                                            skipLocationChange: true
                                        }
                                    }
                                },
                            }
                        },
                    ])]
        });
    });
    beforeEach(
      inject([NgxPermissionsService, NgxRolesService], (service: NgxPermissionsService, rolesService: NgxRolesService, router: Router) => {
        fakeRouter = {navigate: () => {}} as any;

        service.addPermission('MANAGER');
        // fakeRouter = router;
        spyOn(fakeRouter, 'navigate');
        permissionGuard = new NgxPermissionsGuard(service, rolesService, fakeRouter as Router);
    }));

    it('should create an instance', () => {
        expect(permissionGuard).toBeTruthy();
    });

    it ('should redirect to parameters specified on navigation commands and navigationExtras', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                only: 'TIED',
                redirectTo: {
                    navigationCommands: ['123'],
                    navigationExtras: {
                        skipLocationChange: true
                    }
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['123'], {skipLocationChange: true});

        });
    }));

    it ('should redirect to parameters specified in navigation commands and navigationExtras', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                only: 'TIED',
                redirectTo: {
                    navigationCommands: (rejectedPermission, route, state) => {
                        return ['123'];
                    },
                    navigationExtras: (route, state) => {
                       return {
                           skipLocationChange: true
                       };
                    }
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['123'], {skipLocationChange: true});

        });
    }));

    it ('except should redirect to parameters specified in navigation commands and navigationExtras', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except: 'MANAGER',
                redirectTo: {
                    navigationCommands: (rejectedPermission, route, state) => {
                        return ['123'];
                    },
                    navigationExtras: (route, state) => {
                        return {
                            skipLocationChange: true
                        };
                    }
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['123'], {skipLocationChange: true});

        });
    }));
});


describe('Permissions guard test redirectTo path multiple redirectionRule', () => {

    let permissionGuard: NgxPermissionsGuard;
    let fakeRouter;
    let testRoute;
    let fakeService;
    beforeEach(() => {
        TestBed.configureTestingModule({

            imports: [NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(inject([NgxPermissionsService, NgxRolesService], (service: NgxPermissionsService, rolesService: NgxRolesService) => {
        fakeRouter = {navigate: () => {}} as any;

        service.addPermission('canReadAgenda');
        fakeService = service;
        // fakeRouter = router;
        spyOn(fakeRouter, 'navigate');
        permissionGuard = new NgxPermissionsGuard(service, rolesService, fakeRouter as Router);
    }));

    it('should create an instance', () => {
        expect(permissionGuard).toBeTruthy();
    });

    it ('should redirect dashboard can canRead Agenda fulfils can edit agenda fails', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except: ['canEditAgenda', 'canReadAgenda', 'canRun'],
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: 'dashboard',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['agendaList']);
        });
    }));

    it ('should redirect to run when there is permission canRun and it fails', fakeAsync(() => {
        fakeService.addPermission('canEditAgenda');

        testRoute = { data: {
            permissions: {
                except: ['canRun', 'canReadAgenda', 'canEditAgenda' ],
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: 'dashboard',
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['agendaList']);
        });
    }));

    it ('should path when nothing fails', fakeAsync(() => {
        fakeService.addPermission('canEditAgenda');

        testRoute = { data: {
            permissions: {
                except: ['aweomse', 'awesome'],
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: 'dashboard',
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(true);
        });
    }));

    it ('redirect to default route when it fails but there is no redirect rule for that permission', fakeAsync(() => {

        testRoute = { data: {
            permissions: {
                except: ['canReadAgenda', 'canEditAgenda'],
                redirectTo: {
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['login']);

        });
    }));

    it ('redirect to only failed route when except passes but only fails', fakeAsync(() => {

        testRoute = { data: {
            permissions: {
                except: ['canEditAgenda'],
                only: ['canRunAgenda'],
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canRunAgenda: 'dashboard',
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['dashboard']);

        });
    }));

    it ('path if except and only passes', fakeAsync(() => {
        fakeService.addPermission('canRunAgenda');
        testRoute = { data: {
            permissions: {
                except: ['canEditAgenda'],
                only: ['canRunAgenda'],
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canRunAgenda: 'dashboard',
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(true);

        });
    }));


    it ('redirect fail on can editAgenda and redirect to dashboard', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                only: ['canReadAgenda', 'canEditAgenda' , 'canRun'],
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: 'dashboard',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['dashboard']);
        });
    }));

    it ('redirect to dashboard when canEdit agenda fails only', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                only: ['canReadAgenda', 'canEditAgenda' , 'canRun'],
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: (route, state) => {
                        return 'dashboard';
                    },
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['dashboard']);
        });
    }));

    it ('redirect to dashboard when canEdit agenda fails with objectProperty only', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                only: ['canEditAgenda' , 'canRun'],
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: {
                        navigationCommands: ['123'],
                        navigationExtras: {
                            skipLocationChange: true
                        }
                    },
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['123'], {skipLocationChange: true});
        });
    }));

    it ('should redirect to 123 when redirect to multiple and used as function', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                only: ['canReadAgenda', 'canEditAgenda' , 'canRun'],
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: () => {
                        return {
                            navigationCommands: ['123'],
                            navigationExtras: {
                                skipLocationChange: true
                            }
                        };
                    },
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['123'], {skipLocationChange: true});
        });
    }));

    it ('redirect to default when only fails but there is no redirection rule', fakeAsync(() => {
        fakeService.addPermission('canEditAgenda');

        testRoute = { data: {
            permissions: {
                only: ['canReadAgenda', 'canEditAgenda', 'Can run' ],
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: 'dashboard',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
        });
    }));



    it ('should path when nothing fails in only block', fakeAsync(() => {
        fakeService.addPermission('canEditAgenda');

        testRoute = { data: {
            permissions: {
                only: ['canEditAgenda'],
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: 'dashboard',
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(true);
        });
    }));
});

describe('Permissions guard test redirectTo path multiple redirectionRule permissions load as string', () => {

    let permissionGuard: NgxPermissionsGuard;
    let fakeRouter;
    let testRoute;
    let fakeService;
    beforeEach(() => {
        TestBed.configureTestingModule({

            imports: [NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(inject([NgxPermissionsService, NgxRolesService], (service: NgxPermissionsService, rolesService: NgxRolesService) => {
        fakeRouter = {navigate: () => {}} as any;

        service.addPermission('canReadAgenda');
        fakeService = service;
        // fakeRouter = router;
        spyOn(fakeRouter, 'navigate');
        permissionGuard = new NgxPermissionsGuard(service, rolesService, fakeRouter as Router);
    }));

    it('should create an instance', () => {
        expect(permissionGuard).toBeTruthy();
    });

    it ('should redirect dashboard can canRead Agenda fulfils can edit agenda fails', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except:  'canReadAgenda',
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: 'dashboard',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['agendaList']);
        });
    }));

    it ('should redirect to run when there is permission canRun and it fails', fakeAsync(() => {
        fakeService.addPermission('canEditAgenda');

        testRoute = { data: {
            permissions: {
                only: 'DELETE',
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: 'dashboard',
                    DELETE: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['run']);
        });
    }));

    it ('should path when nothing fails', fakeAsync(() => {
        fakeService.addPermission('canEditAgenda');

        testRoute = { data: {
            permissions: {
                except: 'aweomse',
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: 'dashboard',
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(true);
        });
    }));
    //
    it ('redirect to default route when except fails but there is no redirect rule for that permission', fakeAsync(() => {

        testRoute = { data: {
            permissions: {
                except: 'canReadAgenda',
                redirectTo: {
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['login']);

        });
    }));

    it ('redirect to only failed route when except passes but only fails', fakeAsync(() => {

        testRoute = { data: {
            permissions: {
                except: 'canEditAgenda',
                only:  'canRunAgenda',
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canRunAgenda: 'dashboard',
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['dashboard']);
        });
    }));

    it ('path if except and only passes', fakeAsync(() => {
        fakeService.addPermission('canRunAgenda');
        testRoute = { data: {
            permissions: {
                except: 'canEditAgenda',
                only:  'canRunAgenda',
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canRunAgenda: 'dashboard',
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(true);

        });
    }));



    it ('should path when nothing fails in only block', fakeAsync(() => {
        fakeService.addPermission('canEditAgenda');
        testRoute = { data: {
            permissions: {
                only: 'canEditAgenda',
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: 'dashboard',
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(true);
        });
    }));
});


describe('Permissions guard test redirectTo path dynamic redirectionRule permissions load as string', () => {

    let permissionGuard: NgxPermissionsGuard;
    let fakeRouter;
    let testRoute;
    let fakeService;
    beforeEach(() => {
        TestBed.configureTestingModule({

            imports: [NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(inject([NgxPermissionsService, NgxRolesService], (service: NgxPermissionsService, rolesService: NgxRolesService) => {
        fakeRouter = {navigate: () => {}} as any;

        service.addPermission('canReadAgenda');
        fakeService = service;
        // fakeRouter = router;
        spyOn(fakeRouter, 'navigate');
        permissionGuard = new NgxPermissionsGuard(service, rolesService, fakeRouter as Router);
    }));

    it('should create an instance', () => {
        expect(permissionGuard).toBeTruthy();
    });

    it ('should redirect dashboard can canRead Agenda fulfils can edit agenda fails', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except:  'canReadAgenda',
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: 'dashboard',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['agendaList']);
        });
    }));

    it ('should redirect to run when there is permission canRun and it fails', fakeAsync(() => {
        fakeService.addPermission('canEditAgenda');

        testRoute = { data: {
            permissions: {
                only: 'DELETE',
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: 'dashboard',
                    DELETE: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['run']);
        });
    }));

    it ('should path when nothing fails', fakeAsync(() => {
        fakeService.addPermission('canEditAgenda');

        testRoute = { data: {
            permissions: {
                except: 'aweomse',
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: 'dashboard',
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(true);
        });
    }));
    //
    it ('redirect to default route when except fails but there is no redirect rule for that permission', fakeAsync(() => {

        testRoute = { data: {
            permissions: {
                except: 'canReadAgenda',
                redirectTo: {
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['login']);

        });
    }));

    it ('redirect to only failed route when except passes but only fails', fakeAsync(() => {

        testRoute = { data: {
            permissions: {
                except: 'canEditAgenda',
                only:  'canRunAgenda',
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canRunAgenda: 'dashboard',
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['dashboard']);
        });
    }));
    it ('redirect to only failed route when except passes but only fails called as function', fakeAsync(() => {

        testRoute = { data: {
            permissions: {
                except: 'canEditAgenda',
                only:  'canRunAgenda',
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canRunAgenda: (failedPermissionName: any, b: any, c: any) => {
                        return failedPermissionName;
                    },
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['canRunAgenda']);
        });
    }));

    it ('redirect to except failed route when except dont pass as a function', fakeAsync(() => {

        testRoute = { data: {
            permissions: {
                except: 'canReadAgenda',
                only:  'canRunAgenda',
                redirectTo: {
                    canReadAgenda: (failedPermissionName: any, b: any, c: any) => {
                        return failedPermissionName;
                    },
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['canReadAgenda']);
        });
    }));

    it ('path if except and only passes', fakeAsync(() => {
        fakeService.addPermission('canRunAgenda');
        testRoute = { data: {
            permissions: {
                except: 'canEditAgenda',
                only:  'canRunAgenda',
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canRunAgenda: 'dashboard',
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(true);

        });
    }));



    it ('should path when nothing fails in only block', fakeAsync(() => {
        fakeService.addPermission('canEditAgenda');
        testRoute = { data: {
            permissions: {
                only: 'canEditAgenda',
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: 'dashboard',
                    canRun: 'run',
                    [DEFAULT_REDIRECT_KEY]: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(true);
        });
    }));
});

describe('Permissions guard test redirectTo as function', () => {

    let permissionGuard: NgxPermissionsGuard;
    let fakeRouter;
    let testRoute;
    let fakeService;
    beforeEach(() => {
        TestBed.configureTestingModule({

            imports: [NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(inject([NgxPermissionsService, NgxRolesService], (service: NgxPermissionsService, rolesService: NgxRolesService) => {
        fakeRouter = {navigate: () => {}} as any;

        service.addPermission('canReadAgenda');
        fakeService = service;
        // fakeRouter = router;
        spyOn(fakeRouter, 'navigate');
        permissionGuard = new NgxPermissionsGuard(service, rolesService, fakeRouter as Router);
    }));

    it('should create an instance', () => {
        expect(permissionGuard).toBeTruthy();
    });

    it ('should redirect dashboard can canRead Agenda fulfils can edit agenda fails', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except: ['canEditAgenda', 'canReadAgenda', 'canRun'],
                redirectTo: (failedPermission, route, state) => {
                    return failedPermission;
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['canReadAgenda']);
        });
    }));

    it ('it should dynamically redirect to failed route redirectTo as function', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                only: ['canRun'],
                redirectTo: (failedPermission, route, state) => {
                    return failedPermission;
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['canRun']);
        });
    }));

    it ('it should dynamically redirect to failed route redirectTo as function when except pass only fails', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except: 'nice',
                only: ['canRun'],
                redirectTo: (failedPermission, route, state) => {
                    return failedPermission;
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['canRun']);
        });
    }));

    it ('it should allow to pass when at least one of parameters allow passing and redirectToIsFunction', fakeAsync(() => {
        function loginRedirect(activateRouteSnapshot: ActivatedRouteSnapshot,
                               routerStateSnapshot: RouterStateSnapshot) {
            return 'login';
        }
        testRoute = { data: {
            permissions: {
                only: ['canReadAgenda', 'CAN_SWIM'],
                redirectTo: loginRedirect
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(true);
        });
    }));

    it ('it should allow to pass when at least except and only parameters passes the check', fakeAsync(() => {
        function loginRedirect(permissonName, activateRouteSnapshot: ActivatedRouteSnapshot,
                               routerStateSnapshot: RouterStateSnapshot) {
            localStorage.setItem('redirectUrl', routerStateSnapshot.url);
            return 'login';
        }
        testRoute = { data: {
            permissions: {
                except: ['Dont exist'],
                only: ['CAN_SWIM', 'TROLOLO'],
                redirectTo: loginRedirect
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['login']);
        });
    }));


    it ('it should allow to pass when at least except parameters passes the check', fakeAsync(() => {
        function loginRedirect(activateRouteSnapshot: ActivatedRouteSnapshot,
                               routerStateSnapshot: RouterStateSnapshot) {
            return 'login';
        }
        testRoute = { data: {
            permissions: {
                except: ['Dont exist', 'Me also doesnt exist'],
                redirectTo: loginRedirect
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(true);
        });
    }));
});


describe('Role guard test redirectTo as function', () => {

    let permissionGuard: NgxPermissionsGuard;
    let fakeRouter;
    let testRoute;
    let fakeService;
    let roleService;
    beforeEach(() => {
        TestBed.configureTestingModule({

            imports: [NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(inject([NgxPermissionsService, NgxRolesService], (service: NgxPermissionsService, rolesService: NgxRolesService) => {
        fakeRouter = {navigate: () => {}} as any;

        service.addPermission('canReadAgenda');
        service.addPermission('AWESOME');
        rolesService.addRole('ADMIN', ['AWESOME', 'canReadAgenda']);
        roleService = rolesService;
        fakeService = service;
        // fakeRouter = router;
        spyOn(fakeRouter, 'navigate');
        permissionGuard = new NgxPermissionsGuard(service, rolesService, fakeRouter as Router);
    }));

    it('should create an instance', () => {
        expect(permissionGuard).toBeTruthy();
    });

    xit ('Should redirect to failed permission', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except: ['ADMIN'],
                redirectTo: {
                    AWESOME: 'agendaList',
                    SOMETHING: 'dashboard',
                    canRun: 'run',
                    default: 'login'
                }
                // redirectTo: (failedPermission, route, state) => {
                //     console.log(failedPermission);
                //     return failedPermission;
                // }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['canReadAgenda']);
        });
    }));



    it ('it should dynamically redirect to failed route redirectTo as function', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                only: ['canRun'],
                redirectTo: (failedPermission, route, state) => {
                    return failedPermission;
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['canRun']);
        });
    }));

    it ('it should dynamically redirect to failed role route redirectTo as function', fakeAsync(() => {
        roleService.addRole('RUN', ['BLABLA', 'BLABLA']);

        testRoute = { data: {
            permissions: {
                only: ['RUN'],
                redirectTo: (failedPermission, route, state) => {
                    return failedPermission;
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            // expect(fakeRouter.navigate).toHaveBeenCalledWith(['canRun']);
        });
    }));

    it ('it should dynamically pass if one satisfies', fakeAsync(() => {
        roleService.addRole('RUN', ['BLABLA', 'BLABLA']);

        testRoute = { data: {
            permissions: {
                only: ['RUN', 'AWESOME'],
                redirectTo: (failedPermission, route, state) => {
                    return failedPermission;
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(true);
        });
    }));

    it ('it should dynamically redirect to failed route redirectTo as function when except pass only fails', fakeAsync(() => {
        testRoute = { data: {
            permissions: {
                except: 'nice',
                only: ['canRun'],
                redirectTo: (failedPermission, route, state) => {
                    return failedPermission;
                }
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['canRun']);
        });
    }));

    it ('it should allow to pass when at least one of parameters allow passing and redirectToIsFunction', fakeAsync(() => {
        function loginRedirect(activateRouteSnapshot: ActivatedRouteSnapshot,
                               routerStateSnapshot: RouterStateSnapshot) {
            return 'login';
        }
        testRoute = { data: {
            permissions: {
                only: ['canReadAgenda', 'CAN_SWIM'],
                redirectTo: loginRedirect
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(true);
        });
    }));

    it ('it should allow to pass when at least except and only parameters passes the check', fakeAsync(() => {
        function loginRedirect(permissonName, activateRouteSnapshot: ActivatedRouteSnapshot,
                               routerStateSnapshot: RouterStateSnapshot) {
            localStorage.setItem('redirectUrl', routerStateSnapshot.url);
            return 'login';
        }
        testRoute = { data: {
            permissions: {
                except: ['Dont exist'],
                only: ['CAN_SWIM', 'TROLOLO'],
                redirectTo: loginRedirect
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['login']);
        });
    }));


    it ('it should allow to pass when at least except parameters passes the check', fakeAsync(() => {
        function loginRedirect(activateRouteSnapshot: ActivatedRouteSnapshot,
                               routerStateSnapshot: RouterStateSnapshot) {
            return 'login';
        }
        testRoute = { data: {
            permissions: {
                except: ['Dont exist', 'Me also doesnt exist'],
                redirectTo: loginRedirect
            },
            path: 'crisis-center/44'
        }};
        (permissionGuard.canActivate(testRoute, {} as RouterStateSnapshot) as any).then((data) => {
            expect(data).toEqual(true);
        });
    }));
});
