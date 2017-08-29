"use strict";
exports.__esModule = true;
var permissions_guard_service_1 = require("./permissions-guard.service");
var testing_1 = require("@angular/core/testing");
var permissions_service_1 = require("../service/permissions.service");
var roles_service_1 = require("../service/roles.service");
var index_1 = require("../index");
var testing_2 = require("@angular/router/testing");
describe('Permissions guard only', function () {
    var permissionGuard;
    var route;
    var fakeRouter;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(testing_1.inject([permissions_service_1.NgxPermissionsService, roles_service_1.NgxRolesService], function (service, rolesService) {
        fakeRouter = { navigate: function () { } };
        spyOn(fakeRouter, 'navigate');
        service.addPermission('ADMIN');
        permissionGuard = new permissions_guard_service_1.NgxPermissionsGuard(service, rolesService, fakeRouter);
    }));
    it('should create an instance', function () {
        expect(permissionGuard).toBeTruthy();
    });
    it('sholud return true when only fullfills', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    only: 'ADMIN'
                }
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(true);
        });
    }));
    it('sholud return false when only doesnt match', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    only: 'DOESNT MATCH'
                }
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
        });
    }));
    it('sholud return false when only doesnt match and navigate to 404', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    only: 'DOESNT MATCH',
                    redirectTo: './404'
                }
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['./404']);
        });
    }));
});
describe('Permissions guard Except', function () {
    var permissionGuard;
    var fakeRouter;
    var route;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(testing_1.inject([permissions_service_1.NgxPermissionsService, roles_service_1.NgxRolesService], function (service, rolesService) {
        fakeRouter = { navigate: function () { } };
        spyOn(fakeRouter, 'navigate');
        service.addPermission('MANAGER');
        permissionGuard = new permissions_guard_service_1.NgxPermissionsGuard(service, rolesService, fakeRouter);
    }));
    it('should create an instance', function () {
        expect(permissionGuard).toBeTruthy();
    });
    it('sholud return false when except matches', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: 'MANAGER'
                }
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
        });
    }));
    it('sholud return false when except matches and redirectTo 404', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: 'MANAGER',
                    redirectTo: './404'
                }
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['./404']);
        });
    }));
    it('sholud return false when except matches at least one array', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: ["MANAGER", 'Something else']
                }
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
        });
    }));
    it('sholud return false when except matches in array and redirectTo 404', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: ["MANAGER", 'Something else'],
                    redirectTo: './404'
                }
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['./404']);
        });
    }));
    it('sholud return true when except doesn"t match', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: 'DOESNT MATCH'
                }
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(true);
        });
    }));
    it('sholud return true when any in array doesn"t match', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: ['DOESNT MATCH', "AWESOME"]
                }
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(true);
        });
    }));
});
describe('Permissions guard Except and only together', function () {
    var permissionGuard;
    var fakeRouter;
    var route;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(testing_1.inject([permissions_service_1.NgxPermissionsService, roles_service_1.NgxRolesService], function (service, rolesService) {
        fakeRouter = { navigate: function () { } };
        spyOn(fakeRouter, 'navigate');
        service.addPermission('MANAGER');
        permissionGuard = new permissions_guard_service_1.NgxPermissionsGuard(service, rolesService, fakeRouter);
    }));
    it('should create an instance', function () {
        expect(permissionGuard).toBeTruthy();
    });
    it('sholud return false when except matches and it should not check only and redirect to 404', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: 'MANAGER',
                    only: 'AWESOME',
                    redirectTo: './404'
                }
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['./404']);
        });
    }));
    it('should return false when except matches at least one array', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: ["MANAGER", 'Something else'],
                    only: 'AWESOME'
                }
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
        });
    }));
    it('sholud return true when except doesn"t match but only matcher', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: 'DOESNT MATCH',
                    only: "MANAGER"
                }
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(true);
        });
    }));
    it('sholud return true when any in array doesn"t match but only matches', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: ['DOESNT MATCH', "AWESOME"],
                    only: ['MANAGER', 'AWESOME']
                }
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(true);
        });
    }));
    it('sholud return false when except in array doesn"t match and only also doesn"t matches', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: ['DOESNT MATCH', "AWESOME"],
                    only: ['gg', 'AWESOME'],
                    redirectTo: './404'
                }
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['./404']);
        });
    }));
});
describe('Permissions guard use only dynamically', function () {
    var permissionGuard;
    var fakeRouter;
    var route;
    var testRouter;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.NgxPermissionsModule.forRoot(),
                testing_2.RouterTestingModule.withRoutes([
                    {
                        path: 'crisis-center/:id',
                        redirectTo: '404',
                        data: {
                            permissions: {
                                except: function (route, awesome) {
                                    return true;
                                }
                            }
                        }
                    },
                ])]
        });
    });
    beforeEach(testing_1.inject([permissions_service_1.NgxPermissionsService, roles_service_1.NgxRolesService], function (service, rolesService, router) {
        fakeRouter = { navigate: function () { } };
        service.addPermission('MANAGER');
        // fakeRouter = router;
        spyOn(fakeRouter, 'navigate');
        permissionGuard = new permissions_guard_service_1.NgxPermissionsGuard(service, rolesService, fakeRouter);
    }));
    it('should create an instance', function () {
        expect(permissionGuard).toBeTruthy();
    });
    it('sholud return true when only matches and it should not check only', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    only: function (route, awesome) {
                        if (route.data.path.includes(44)) {
                            return ['MANAGER'];
                        }
                        else {
                            return 'notManager';
                        }
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(true);
        });
    }));
    it('should return true when except matches and it should ', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: function (route, awesome) {
                        if (route.data.path.includes('doesntInclude')) {
                            return ['MANAGER'];
                        }
                        else {
                            return 'notManager';
                        }
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(true);
        });
    }));
    it('should return true when except doens"t match but only matches it should  true', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: function (route, awesome) {
                        if (route.data.path.includes('doesntInclude')) {
                            return ['MANAGER'];
                        }
                        else {
                            return 'notManager';
                        }
                    },
                    only: function (route, awesome) {
                        if (route.data.path.includes('44')) {
                            return ['MANAGER'];
                        }
                        else {
                            return 'notManager';
                        }
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(true);
        });
    }));
    it('should return true when except doens"t match but only matches it should true', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: function (route, awesome) {
                        if (route.data.path.includes('doesntInclude')) {
                            return ['MANAGER'];
                        }
                        else {
                            return 'notManager';
                        }
                    },
                    only: function (route, awesome) {
                        if (route.data.path.includes('gg')) {
                            return ['MANAGER'];
                        }
                        else {
                            return 'notManager';
                        }
                    },
                    redirectTo: '/404'
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['/404']);
        });
    }));
});
describe('Permissions guard test redirectTo path parameters dynamically', function () {
    var permissionGuard;
    var fakeRouter;
    var route;
    var testRouter;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.NgxPermissionsModule.forRoot(),
                testing_2.RouterTestingModule.withRoutes([
                    {
                        path: 'crisis-center/:id',
                        redirectTo: '404',
                        data: {
                            permissions: {
                                except: function (route, awesome) {
                                    return true;
                                },
                                redirectTo: {
                                    navigationCommands: ['123'],
                                    navigationExtras: {
                                        skipLocationChange: true
                                    }
                                }
                            }
                        }
                    },
                ])]
        });
    });
    beforeEach(testing_1.inject([permissions_service_1.NgxPermissionsService, roles_service_1.NgxRolesService], function (service, rolesService, router) {
        fakeRouter = { navigate: function () { } };
        service.addPermission('MANAGER');
        // fakeRouter = router;
        spyOn(fakeRouter, 'navigate');
        permissionGuard = new permissions_guard_service_1.NgxPermissionsGuard(service, rolesService, fakeRouter);
    }));
    it('should create an instance', function () {
        expect(permissionGuard).toBeTruthy();
    });
    it('sholud redirect to parameters specified on navigation commands and navigationExtras', testing_1.fakeAsync(function () {
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
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['123'], { skipLocationChange: true });
        });
    }));
    it('sholud redirect to parameters specified in navigation commands and navigationExtras', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    only: "TIED",
                    redirectTo: {
                        navigationCommands: function (rejectedPermission, route, state) {
                            return ['123'];
                        },
                        navigationExtras: function (route, state) {
                            return {
                                skipLocationChange: true
                            };
                        }
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['123'], { skipLocationChange: true });
        });
    }));
    it('except sholud redirect to parameters specified in navigation commands and navigationExtras', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: "MANAGER",
                    redirectTo: {
                        navigationCommands: function (rejectedPermission, route, state) {
                            return ['123'];
                        },
                        navigationExtras: function (route, state) {
                            return {
                                skipLocationChange: true
                            };
                        }
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['123'], { skipLocationChange: true });
        });
    }));
});
describe('Permissions guard test redirectTo path multiple redirectionRule', function () {
    var permissionGuard;
    var fakeRouter;
    var route;
    var testRouter;
    var fakeService;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(testing_1.inject([permissions_service_1.NgxPermissionsService, roles_service_1.NgxRolesService], function (service, rolesService) {
        fakeRouter = { navigate: function () { } };
        service.addPermission('canReadAgenda');
        fakeService = service;
        // fakeRouter = router;
        spyOn(fakeRouter, 'navigate');
        permissionGuard = new permissions_guard_service_1.NgxPermissionsGuard(service, rolesService, fakeRouter);
    }));
    it('should create an instance', function () {
        expect(permissionGuard).toBeTruthy();
    });
    it('sholud redirect dashboard can canRead Agenda fullfils can edit agenda fails', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: ['canEditAgenda', 'canReadAgenda', "canRun"],
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canEditAgenda: 'dashboard',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['agendaList']);
        });
    }));
    it('sholud redirect to run when there is permission canRun and it fails', testing_1.fakeAsync(function () {
        fakeService.addPermission('canEditAgenda');
        route = { data: {
                permissions: {
                    except: ["canRun", 'canReadAgenda', 'canEditAgenda'],
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canEditAgenda: 'dashboard',
                        canRun: 'run',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['agendaList']);
        });
    }));
    it('sholud path when nothing fails', testing_1.fakeAsync(function () {
        fakeService.addPermission('canEditAgenda');
        route = { data: {
                permissions: {
                    except: ['aweomse', 'awesome'],
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canEditAgenda: 'dashboard',
                        canRun: 'run',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(true);
        });
    }));
    it('redirect to default route when it fails but there is no redirect rule for that permission', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: ['canReadAgenda', 'canEditAgenda'],
                    redirectTo: {
                        canRun: 'run',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['login']);
        });
    }));
    it('redirect to only failed route when except passes but only fails', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: ['canEditAgenda'],
                    only: ['canRunAgenda'],
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canRunAgenda: 'dashboard',
                        canRun: 'run',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['dashboard']);
        });
    }));
    it('path if except and only passes', testing_1.fakeAsync(function () {
        fakeService.addPermission('canRunAgenda');
        route = { data: {
                permissions: {
                    except: ['canEditAgenda'],
                    only: ['canRunAgenda'],
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canRunAgenda: 'dashboard',
                        canRun: 'run',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(true);
        });
    }));
    it('redirect fail on can editAgenda and redirect to dashboard', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    only: ['canReadAgenda', 'canEditAgenda', "canRun"],
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canEditAgenda: 'dashboard',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['dashboard']);
        });
    }));
    it('redirect to dashboard when canEdit agenda fails only', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    only: ['canReadAgenda', 'canEditAgenda', "canRun"],
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canEditAgenda: function (route, state) {
                            return 'dashboard';
                        },
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['dashboard']);
        });
    }));
    it('redirect to dashboard when canEdit agenda fails with objectProperty only', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    only: ['canReadAgenda', 'canEditAgenda', "canRun"],
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canEditAgenda: {
                            navigationCommands: ['123'],
                            navigationExtras: {
                                skipLocationChange: true
                            }
                        },
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['123'], { skipLocationChange: true });
        });
    }));
    it('should redirect to 123 when redirect to multiple and used as function', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    only: ['canReadAgenda', 'canEditAgenda', "canRun"],
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canEditAgenda: function () {
                            return {
                                navigationCommands: ['123'],
                                navigationExtras: {
                                    skipLocationChange: true
                                }
                            };
                        },
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['123'], { skipLocationChange: true });
        });
    }));
    it('redirect to default when only fails but there is no redirection rule', testing_1.fakeAsync(function () {
        fakeService.addPermission('canEditAgenda');
        route = { data: {
                permissions: {
                    only: ['canReadAgenda', 'canEditAgenda', 'Can run'],
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canEditAgenda: 'dashboard',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['login']);
        });
    }));
    it('sholud path when nothing fails in only blaock', testing_1.fakeAsync(function () {
        fakeService.addPermission('canEditAgenda');
        route = { data: {
                permissions: {
                    only: ['canEditAgenda'],
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canEditAgenda: 'dashboard',
                        canRun: 'run',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(true);
        });
    }));
});
describe('Permissions guard test redirectTo path multiple redirectionRule permissions load as string', function () {
    var permissionGuard;
    var fakeRouter;
    var route;
    var testRouter;
    var fakeService;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(testing_1.inject([permissions_service_1.NgxPermissionsService, roles_service_1.NgxRolesService], function (service, rolesService) {
        fakeRouter = { navigate: function () { } };
        service.addPermission('canReadAgenda');
        fakeService = service;
        // fakeRouter = router;
        spyOn(fakeRouter, 'navigate');
        permissionGuard = new permissions_guard_service_1.NgxPermissionsGuard(service, rolesService, fakeRouter);
    }));
    it('should create an instance', function () {
        expect(permissionGuard).toBeTruthy();
    });
    it('sholud redirect dashboard can canRead Agenda fullfils can edit agenda fails', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: 'canReadAgenda',
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canEditAgenda: 'dashboard',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['agendaList']);
        });
    }));
    it('sholud redirect to run when there is permission canRun and it fails', testing_1.fakeAsync(function () {
        fakeService.addPermission('canEditAgenda');
        route = { data: {
                permissions: {
                    only: "DELETE",
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canEditAgenda: 'dashboard',
                        DELETE: 'run',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['run']);
        });
    }));
    it('sholud path when nothing fails', testing_1.fakeAsync(function () {
        fakeService.addPermission('canEditAgenda');
        route = { data: {
                permissions: {
                    except: 'aweomse',
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canEditAgenda: 'dashboard',
                        canRun: 'run',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(true);
        });
    }));
    //
    it('redirect to default route when except fails but there is no redirect rule for that permission', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: 'canReadAgenda',
                    redirectTo: {
                        canRun: 'run',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['login']);
        });
    }));
    it('redirect to only failed route when except passes but only fails', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: 'canEditAgenda',
                    only: 'canRunAgenda',
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canRunAgenda: 'dashboard',
                        canRun: 'run',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['dashboard']);
        });
    }));
    it('path if except and only passes', testing_1.fakeAsync(function () {
        fakeService.addPermission('canRunAgenda');
        route = { data: {
                permissions: {
                    except: 'canEditAgenda',
                    only: 'canRunAgenda',
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canRunAgenda: 'dashboard',
                        canRun: 'run',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(true);
        });
    }));
    it('sholud path when nothing fails in only blaock', testing_1.fakeAsync(function () {
        fakeService.addPermission('canEditAgenda');
        route = { data: {
                permissions: {
                    only: 'canEditAgenda',
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canEditAgenda: 'dashboard',
                        canRun: 'run',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(true);
        });
    }));
});
describe('Permissions guard test redirectTo path dynamic redirectionRule permissions load as string', function () {
    var permissionGuard;
    var fakeRouter;
    var route;
    var testRouter;
    var fakeService;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(testing_1.inject([permissions_service_1.NgxPermissionsService, roles_service_1.NgxRolesService], function (service, rolesService) {
        fakeRouter = { navigate: function () { } };
        service.addPermission('canReadAgenda');
        fakeService = service;
        // fakeRouter = router;
        spyOn(fakeRouter, 'navigate');
        permissionGuard = new permissions_guard_service_1.NgxPermissionsGuard(service, rolesService, fakeRouter);
    }));
    it('should create an instance', function () {
        expect(permissionGuard).toBeTruthy();
    });
    it('sholud redirect dashboard can canRead Agenda fullfils can edit agenda fails', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: 'canReadAgenda',
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canEditAgenda: 'dashboard',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['agendaList']);
        });
    }));
    it('sholud redirect to run when there is permission canRun and it fails', testing_1.fakeAsync(function () {
        fakeService.addPermission('canEditAgenda');
        route = { data: {
                permissions: {
                    only: "DELETE",
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canEditAgenda: 'dashboard',
                        DELETE: 'run',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['run']);
        });
    }));
    it('sholud path when nothing fails', testing_1.fakeAsync(function () {
        fakeService.addPermission('canEditAgenda');
        route = { data: {
                permissions: {
                    except: 'aweomse',
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canEditAgenda: 'dashboard',
                        canRun: 'run',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(true);
        });
    }));
    //
    it('redirect to default route when except fails but there is no redirect rule for that permission', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: 'canReadAgenda',
                    redirectTo: {
                        canRun: 'run',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['login']);
        });
    }));
    it('redirect to only failed route when except passes but only fails', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: 'canEditAgenda',
                    only: 'canRunAgenda',
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canRunAgenda: 'dashboard',
                        canRun: 'run',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['dashboard']);
        });
    }));
    it('redirect to only failed route when except passes but only fails called as function', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: 'canEditAgenda',
                    only: 'canRunAgenda',
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canRunAgenda: function (failedPermissionName, b, c) {
                            return failedPermissionName;
                        },
                        canRun: 'run',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['canRunAgenda']);
        });
    }));
    it('redirect to except failed route when except dont pass as a function', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: 'canReadAgenda',
                    only: 'canRunAgenda',
                    redirectTo: {
                        canReadAgenda: function (failedPermissionName, b, c) {
                            return failedPermissionName;
                        },
                        canRun: 'run',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['canReadAgenda']);
        });
    }));
    it('path if except and only passes', testing_1.fakeAsync(function () {
        fakeService.addPermission('canRunAgenda');
        route = { data: {
                permissions: {
                    except: 'canEditAgenda',
                    only: 'canRunAgenda',
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canRunAgenda: 'dashboard',
                        canRun: 'run',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(true);
        });
    }));
    it('sholud path when nothing fails in only blaock', testing_1.fakeAsync(function () {
        fakeService.addPermission('canEditAgenda');
        route = { data: {
                permissions: {
                    only: 'canEditAgenda',
                    redirectTo: {
                        canReadAgenda: 'agendaList',
                        canEditAgenda: 'dashboard',
                        canRun: 'run',
                        "default": 'login'
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(true);
        });
    }));
});
describe('Permissions guard test redirectTo as function', function () {
    var permissionGuard;
    var fakeRouter;
    var route;
    var testRouter;
    var fakeService;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.NgxPermissionsModule.forRoot()]
        });
    });
    beforeEach(testing_1.inject([permissions_service_1.NgxPermissionsService, roles_service_1.NgxRolesService], function (service, rolesService) {
        fakeRouter = { navigate: function () { } };
        service.addPermission('canReadAgenda');
        fakeService = service;
        // fakeRouter = router;
        spyOn(fakeRouter, 'navigate');
        permissionGuard = new permissions_guard_service_1.NgxPermissionsGuard(service, rolesService, fakeRouter);
    }));
    it('should create an instance', function () {
        expect(permissionGuard).toBeTruthy();
    });
    it('sholud redirect dashboard can canRead Agenda fullfils can edit agenda fails', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: ['canEditAgenda', 'canReadAgenda', "canRun"],
                    redirectTo: function (failedPermission, route, state) {
                        return failedPermission;
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['canReadAgenda']);
        });
    }));
    it('it should dynamically redirect to failed route redirectoTo as fucntion', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    only: ["canRun"],
                    redirectTo: function (failedPermission, route, state) {
                        return failedPermission;
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['canRun']);
        });
    }));
    it('it should dynamically redirect to failed route redirectoTo as fucntion when except pass only fails', testing_1.fakeAsync(function () {
        route = { data: {
                permissions: {
                    except: 'nice',
                    only: ["canRun"],
                    redirectTo: function (failedPermission, route, state) {
                        return failedPermission;
                    }
                },
                path: 'crisis-center/44'
            } };
        permissionGuard.canActivate(route, {}).then(function (data) {
            expect(data).toEqual(false);
            expect(fakeRouter.navigate).toHaveBeenCalledWith(['canRun']);
        });
    }));
});
