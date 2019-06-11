
import { NgxPermissionsGuard } from './permissions-guard.service';
import { async, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { NgxPermissionsService } from '../service/permissions.service';
import { NgxRolesService } from '../service/roles.service';
import { NgxPermissionsModule } from '../index';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { tick } from "@angular/core/testing";
import { RouterTestingModule } from '@angular/router/testing';

describe('Permissions guard only', () => {

    let permissionGuard: NgxPermissionsGuard;
    let route;
    let fakeRouter;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(inject([NgxPermissionsService, NgxRolesService], (service: NgxPermissionsService, rolesService: NgxRolesService) => {
        fakeRouter = <any>{navigate: () => {}};
        spyOn(fakeRouter, 'navigate');

        service.addPermission('ADMIN');
        permissionGuard = new NgxPermissionsGuard(service, rolesService, fakeRouter as Router);
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
      ((permissionGuard.canLoad(route) as any) as any).then((data) => {
            expect(data).toEqual(true);
        })
    }));

    it ('sholud return false when only doesnt match', fakeAsync(() => {
        route = { data: {
            permissions: {
                only: 'DOESNT MATCH'
            }
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['./404'])
        })
    }));

    it ('should return false when only doesnt match and navigate to array 404', fakeAsync(() => {
        route = { data: {
            permissions: {
                only: 'DOESNT MATCH',
                redirectTo: ['./404']
            }
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['./404'])
        })
    }));

    it ('should return true when neither only not except specified', fakeAsync(() => {
        route = { data: {
            permissions: {
                only: '',
                except: '',
                redirectTo: ['./404']
            }
        }};
        expect(permissionGuard.canLoad(route)).toBe(true);
    }));

    it ('should return true when neither only not except specified as array', fakeAsync(() => {
        route = { data: {
            permissions: {
                only: [],
                except: [],
                redirectTo: ['./404']
            }
        }};
        expect(permissionGuard.canLoad(route)).toBe(true);
    }))
});

describe('Permissions guard Except', () => {

    let permissionGuard: NgxPermissionsGuard;
    let fakeRouter;
    let route;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(inject([NgxPermissionsService, NgxRolesService], (service: NgxPermissionsService, rolesService: NgxRolesService) => {
        fakeRouter = <any>{navigate: () => {}};
        spyOn(fakeRouter, 'navigate');

        service.addPermission('MANAGER');
        permissionGuard = new NgxPermissionsGuard(service, rolesService, fakeRouter as Router);
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
      (permissionGuard.canLoad(route) as any).then((data) => {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(true);
        })
    }));

    it ('sholud return true when any in array doesn"t match', fakeAsync(() => {
        route = { data: {
            permissions: {
                except: ['DOESNT MATCH', "AWESOME"]
            }
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(true);
        })
    }));


});


describe('Permissions guard Except and only together', () => {

    let permissionGuard: NgxPermissionsGuard;
    let fakeRouter;
    let route;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(inject([NgxPermissionsService, NgxRolesService], (service: NgxPermissionsService, rolesService: NgxRolesService) => {
        fakeRouter = <any>{navigate: () => {}};
        spyOn(fakeRouter, 'navigate')

        service.addPermission('MANAGER');
        permissionGuard = new NgxPermissionsGuard(service, rolesService, fakeRouter as Router);
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
      (permissionGuard.canLoad(route) as any).then((data) => {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['./404']);
        })
    }));
});

describe('Permissions guard Except and only together with isolation in root', () => {

    let permissionGuard: NgxPermissionsGuard;
    let fakeRouter;
    let route;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxPermissionsModule.forRoot({permissionsIsolate: true, rolesIsolate: true})]
        });
    });
    beforeEach(inject([NgxPermissionsService, NgxRolesService], (service: NgxPermissionsService, rolesService: NgxRolesService) => {
        fakeRouter = <any>{navigate: () => {}};
        spyOn(fakeRouter, 'navigate')

        service.addPermission('MANAGER');
        permissionGuard = new NgxPermissionsGuard(service, rolesService, fakeRouter as Router);
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
      (permissionGuard.canLoad(route) as any).then((data) => {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['./404']);
        })
    }));
});


describe('Permissions guard use only dynamically', () => {

    let permissionGuard: NgxPermissionsGuard;
    let fakeRouter;
    let route;
    let testRouter;
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
                                    except: (route: ActivatedRouteSnapshot, awesome: RouterStateSnapshot) => {
                                        return true;
                                    }
                                },
                            }
                        },
                    ])]
        });
    });
    beforeEach(inject([NgxPermissionsService, NgxRolesService], (service: NgxPermissionsService, rolesService: NgxRolesService, router: Router) => {
        fakeRouter = <any>{navigate: () => {}};

        service.addPermission('MANAGER');
        // fakeRouter = router;
        spyOn(fakeRouter, 'navigate');
        permissionGuard = new NgxPermissionsGuard(service, rolesService, fakeRouter as Router);
    }));

    it('should create an instance', () => {
        expect(permissionGuard).toBeTruthy();
    });

    it ('sholud return true when only matches and it should not check only', fakeAsync(() => {
        route = { data: {
            permissions: {
                only: (route: ActivatedRouteSnapshot, awesome: RouterStateSnapshot) => {
                    if (route.data.path.includes(44)) {
                        return ['MANAGER']
                    } else {
                        return 'notManager'
                    }
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(true);
        })
    }));

    it ('should return true when except matches and it should ', fakeAsync(() => {
        route = { data: {
            permissions: {
                except: (route: ActivatedRouteSnapshot, awesome: RouterStateSnapshot) => {
                    if (route.data.path.includes('doesntInclude')) {
                        return ['MANAGER']
                    } else {
                        return 'notManager'
                    }
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(true);
        })
    }));

    it ('should return true when except doens"t match but only matches it should  true', fakeAsync(() => {
        route = { data: {
            permissions: {
                except: (route: ActivatedRouteSnapshot, awesome: RouterStateSnapshot) => {
                    if (route.data.path.includes('doesntInclude')) {
                        return ['MANAGER']
                    } else {
                        return 'notManager'
                    }
                },
                only: (route: ActivatedRouteSnapshot, awesome: RouterStateSnapshot) => {
                    if (route.data.path.includes('44')) {
                        return ['MANAGER']
                    } else {
                        return 'notManager'
                    }
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(true);
        })
    }));

    it ('should return true when except doens"t match but only matches it should true', fakeAsync(() => {
        route = { data: {
            permissions: {
                except: (route: ActivatedRouteSnapshot, awesome: RouterStateSnapshot) => {
                    if (route.data.path.includes('doesntInclude')) {
                        return ['MANAGER']
                    } else {
                        return 'notManager'
                    }
                },
                only: (route: ActivatedRouteSnapshot, awesome: RouterStateSnapshot) => {
                    if (route.data.path.includes('gg')) {
                        return ['MANAGER']
                    } else {
                        return 'notManager'
                    }
                },
                redirectTo: '/404'
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['/404']);
        })
    }));
});

describe('Permissions guard test redirectTo path parameters dynamically', () => {

    let permissionGuard: NgxPermissionsGuard;
    let fakeRouter;
    let route;
    let testRouter;
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
                                    except: (route: ActivatedRouteSnapshot, awesome: RouterStateSnapshot) => {
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
    beforeEach(inject([NgxPermissionsService, NgxRolesService], (service: NgxPermissionsService, rolesService: NgxRolesService, router: Router) => {
        fakeRouter = <any>{navigate: () => {}};

        service.addPermission('MANAGER');
        // fakeRouter = router;
        spyOn(fakeRouter, 'navigate');
        permissionGuard = new NgxPermissionsGuard(service, rolesService, fakeRouter as Router);
    }));

    it('should create an instance', () => {
        expect(permissionGuard).toBeTruthy();
    });

    it ('sholud redirect to parameters specified on navigation commands and navigationExtras', fakeAsync(() => {
        route = { data: {
            permissions: {
                only: "TIED",
                redirectTo: {
                    navigationCommands: ['123'],
                    navigationExtras: {
                        skipLocationChange: true
                    }
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['123'], {skipLocationChange: true});

        })
    }));

    it ('sholud redirect to parameters specified in navigation commands and navigationExtras', fakeAsync(() => {
        route = { data: {
            permissions: {
                only: "TIED",
                redirectTo: {
                    navigationCommands: (rejectedPermission, route) => {
                        return ['123']
                    },
                    navigationExtras: (route) => {
                        return {
                            skipLocationChange: true
                        }
                    }
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['123'], {skipLocationChange: true});

        })
    }));

    it ('except sholud redirect to parameters specified in navigation commands and navigationExtras', fakeAsync(() => {
        route = { data: {
            permissions: {
                except: "MANAGER",
                redirectTo: {
                    navigationCommands: (rejectedPermission, route) => {
                        return ['123']
                    },
                    navigationExtras: (route) => {
                        return {
                            skipLocationChange: true
                        }
                    }
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['123'], {skipLocationChange: true});

        })
    }));
});


describe('Permissions guard test redirectTo path multiple redirectionRule', () => {

    let permissionGuard: NgxPermissionsGuard;
    let fakeRouter;
    let route;
    let testRouter;
    let fakeService;
    beforeEach(() => {
        TestBed.configureTestingModule({

            imports: [NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(inject([NgxPermissionsService, NgxRolesService], (service: NgxPermissionsService, rolesService: NgxRolesService) => {
        fakeRouter = <any>{navigate: () => {}};

        service.addPermission('canReadAgenda');
        fakeService = service;
        // fakeRouter = router;
        spyOn(fakeRouter, 'navigate');
        permissionGuard = new NgxPermissionsGuard(service, rolesService, fakeRouter as Router);
    }));

    it('should create an instance', () => {
        expect(permissionGuard).toBeTruthy();
    });

    it ('sholud redirect dashboard can canRead Agenda fullfils can edit agenda fails', fakeAsync(() => {
        route = { data: {
            permissions: {
                except: [ 'canEditAgenda', 'canReadAgenda', "canRun"],
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: 'dashboard',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['agendaList']);
        })
    }));

    it ('sholud redirect to run when there is permission canRun and it fails', fakeAsync(() => {
        fakeService.addPermission('canEditAgenda');

        route = { data: {
            permissions: {
                except: ["canRun", 'canReadAgenda', 'canEditAgenda' ],
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: 'dashboard',
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['agendaList']);
        })
    }));

    it ('sholud path when nothing fails', fakeAsync(() => {
        fakeService.addPermission('canEditAgenda');

        route = { data: {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(true);
        })
    }));

    it ('redirect to default route when it fails but there is no redirect rule for that permission', fakeAsync(() => {

        route = { data: {
            permissions: {
                except: ['canReadAgenda', 'canEditAgenda'],
                redirectTo: {
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['login']);

        })
    }));

    it ('redirect to only failed route when except passes but only fails', fakeAsync(() => {

        route = { data: {
            permissions: {
                except: ['canEditAgenda'],
                only: [ 'canRunAgenda'],
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canRunAgenda: 'dashboard',
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['dashboard']);

        })
    }));

    it ('path if except and only passes', fakeAsync(() => {
        fakeService.addPermission('canRunAgenda');
        route = { data: {
            permissions: {
                except: ['canEditAgenda'],
                only: [ 'canRunAgenda'],
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canRunAgenda: 'dashboard',
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(true);

        })
    }));


    it ('redirect fail on can editAgenda and redirect to dashboard', fakeAsync(() => {
        route = { data: {
            permissions: {
                only: [ 'canReadAgenda', 'canEditAgenda' , "canRun"],
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: 'dashboard',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['dashboard']);
        })
    }));

    it ('redirect to dashboard when canEdit agenda fails only', fakeAsync(() => {
        route = { data: {
            permissions: {
                only: [ 'canReadAgenda', 'canEditAgenda' , "canRun"],
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: (route) => {
                        return 'dashboard'
                    },
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['dashboard']);
        })
    }));

    it ('redirect to dashboard when canEdit agenda fails with objectProperty only', fakeAsync(() => {
        route = { data: {
            permissions: {
                only: [ 'canReadAgenda', 'canEditAgenda' , "canRun"],
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
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['123'], {skipLocationChange: true});
        })
    }));

    it ('should redirect to 123 when redirect to multiple and used as function', fakeAsync(() => {
        route = { data: {
            permissions: {
                only: [ 'canReadAgenda', 'canEditAgenda' , "canRun"],
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: () => {
                        return {
                            navigationCommands: ['123'],
                            navigationExtras: {
                                skipLocationChange: true
                            }
                        }
                    },
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['123'], {skipLocationChange: true});
        })
    }));

    it ('redirect to default when only fails but there is no redirection rule', fakeAsync(() => {
        fakeService.addPermission('canEditAgenda');

        route = { data: {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['login']);
        })
    }));



    it ('sholud path when nothing fails in only blaock', fakeAsync(() => {
        fakeService.addPermission('canEditAgenda');

        route = { data: {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(true);
        })
    }));
});

describe('Permissions guard test redirectTo path multiple redirectionRule permissions load as string', () => {

    let permissionGuard: NgxPermissionsGuard;
    let fakeRouter;
    let route;
    let testRouter;
    let fakeService;
    beforeEach(() => {
        TestBed.configureTestingModule({

            imports: [NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(inject([NgxPermissionsService, NgxRolesService], (service: NgxPermissionsService, rolesService: NgxRolesService) => {
        fakeRouter = <any>{navigate: () => {}};

        service.addPermission('canReadAgenda');
        fakeService = service;
        // fakeRouter = router;
        spyOn(fakeRouter, 'navigate');
        permissionGuard = new NgxPermissionsGuard(service, rolesService, fakeRouter as Router);
    }));

    it('should create an instance', () => {
        expect(permissionGuard).toBeTruthy();
    });

    it ('sholud redirect dashboard can canRead Agenda fullfils can edit agenda fails', fakeAsync(() => {
        route = { data: {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['agendaList']);
        })
    }));

    it ('sholud redirect to run when there is permission canRun and it fails', fakeAsync(() => {
        fakeService.addPermission('canEditAgenda');

        route = { data: {
            permissions: {
                only: "DELETE",
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: 'dashboard',
                    DELETE: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['run']);
        })
    }));

    it ('sholud path when nothing fails', fakeAsync(() => {
        fakeService.addPermission('canEditAgenda');

        route = { data: {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(true);
        })
    }));
    //
    it ('redirect to default route when except fails but there is no redirect rule for that permission', fakeAsync(() => {

        route = { data: {
            permissions: {
                except: 'canReadAgenda',
                redirectTo: {
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['login']);

        })
    }));

    it ('redirect to only failed route when except passes but only fails', fakeAsync(() => {

        route = { data: {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['dashboard']);
        })
    }));

    it ('path if except and only passes', fakeAsync(() => {
        fakeService.addPermission('canRunAgenda');
        route = { data: {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(true);

        })
    }));



    it ('sholud path when nothing fails in only blaock', fakeAsync(() => {
        fakeService.addPermission('canEditAgenda');
        route = { data: {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(true);
        })
    }));
});


describe('Permissions guard test redirectTo path dynamic redirectionRule permissions load as string', () => {

    let permissionGuard: NgxPermissionsGuard;
    let fakeRouter;
    let route;
    let testRouter;
    let fakeService;
    beforeEach(() => {
        TestBed.configureTestingModule({

            imports: [NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(inject([NgxPermissionsService, NgxRolesService], (service: NgxPermissionsService, rolesService: NgxRolesService) => {
        fakeRouter = <any>{navigate: () => {}};

        service.addPermission('canReadAgenda');
        fakeService = service;
        // fakeRouter = router;
        spyOn(fakeRouter, 'navigate');
        permissionGuard = new NgxPermissionsGuard(service, rolesService, fakeRouter as Router);
    }));

    it('should create an instance', () => {
        expect(permissionGuard).toBeTruthy();
    });

    it ('sholud redirect dashboard can canRead Agenda fullfils can edit agenda fails', fakeAsync(() => {
        route = { data: {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['agendaList']);
        })
    }));

    it ('sholud redirect to run when there is permission canRun and it fails', fakeAsync(() => {
        fakeService.addPermission('canEditAgenda');

        route = { data: {
            permissions: {
                only: "DELETE",
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canEditAgenda: 'dashboard',
                    DELETE: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['run']);
        })
    }));

    it ('sholud path when nothing fails', fakeAsync(() => {
        fakeService.addPermission('canEditAgenda');

        route = { data: {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(true);
        })
    }));
    //
    it ('redirect to default route when except fails but there is no redirect rule for that permission', fakeAsync(() => {

        route = { data: {
            permissions: {
                except: 'canReadAgenda',
                redirectTo: {
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['login']);

        })
    }));

    it ('redirect to only failed route when except passes but only fails', fakeAsync(() => {

        route = { data: {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['dashboard']);
        })
    }));
    it ('redirect to only failed route when except passes but only fails called as function', fakeAsync(() => {

        route = { data: {
            permissions: {
                except: 'canEditAgenda',
                only:  'canRunAgenda',
                redirectTo: {
                    canReadAgenda: 'agendaList',
                    canRunAgenda: (failedPermissionName: any,b: any,c: any) => {
                        return failedPermissionName;
                    },
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['canRunAgenda']);
        })
    }));

    it ('redirect to except failed route when except dont pass as a function', fakeAsync(() => {

        route = { data: {
            permissions: {
                except: 'canReadAgenda',
                only:  'canRunAgenda',
                redirectTo: {
                    canReadAgenda: (failedPermissionName: any,b: any,c: any) => {
                        return failedPermissionName;
                    },
                    canRun: 'run',
                    default: 'login'
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['canReadAgenda']);
        })
    }));

    it ('path if except and only passes', fakeAsync(() => {
        fakeService.addPermission('canRunAgenda');
        route = { data: {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(true);

        })
    }));



    it ('sholud path when nothing fails in only blaock', fakeAsync(() => {
        fakeService.addPermission('canEditAgenda');
        route = { data: {
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
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(true);
        })
    }));
});

describe('Permissions guard test redirectTo as function', () => {

    let permissionGuard: NgxPermissionsGuard;
    let fakeRouter;
    let route;
    let testRouter;
    let fakeService;
    beforeEach(() => {
        TestBed.configureTestingModule({

            imports: [NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(inject([NgxPermissionsService, NgxRolesService], (service: NgxPermissionsService, rolesService: NgxRolesService) => {
        fakeRouter = <any>{navigate: () => {}};

        service.addPermission('canReadAgenda');
        fakeService = service;
        // fakeRouter = router;
        spyOn(fakeRouter, 'navigate');
        permissionGuard = new NgxPermissionsGuard(service, rolesService, fakeRouter as Router);
    }));

    it('should create an instance', () => {
        expect(permissionGuard).toBeTruthy();
    });

    it ('sholud redirect dashboard can canRead Agenda fullfils can edit agenda fails', fakeAsync(() => {
        route = { data: {
            permissions: {
                except: [ 'canEditAgenda', 'canReadAgenda', "canRun"],
                redirectTo: (failedPermission, route) => {
                    return failedPermission;
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['canReadAgenda']);
        })
    }));

    it ('it should dynamically redirect to failed route redirectoTo as fucntion', fakeAsync(() => {
        route = { data: {
            permissions: {
                only: [ "canRun"],
                redirectTo: (failedPermission, route) => {
                    return failedPermission;
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['canRun']);
        })
    }));

    it ('it should dynamically redirect to failed route redirectoTo as fucntion when except pass only fails', fakeAsync(() => {
        route = { data: {
            permissions: {
                except: 'nice',
                only: [ "canRun"],
                redirectTo: (failedPermission, route) => {
                    return failedPermission;
                }
            },
            path: 'crisis-center/44'
        }};
      (permissionGuard.canLoad(route) as any).then((data) => {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['canRun']);
        })
    }));
});
