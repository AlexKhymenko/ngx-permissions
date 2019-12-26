//
//
// import { NgxPermissionsModule } from '../index';
// import { NgModule } from '@angular/core';
//
// @NgModule({
//     exports: [NgxPermissionsModule],
//     providers: [
//         {provide: NgxPermissionsStore, useClass: NgxPermissionsMockStore},
//         {provide: NgxRolesStore, useClass: NgxPermissionsMockStore},
//         {provide: NgModuleFactoryLoader, useClass: SpyNgModuleFactoryLoader}, {
//             provide: Router,
//             useFactory: setupTestingRouter,
//             deps: [
//                 UrlSerializer, ChildrenOutletContexts, Location, NgModuleFactoryLoader, Compiler, Injector,
//                 ROUTES, ROUTER_CONFIGURATION, [UrlHandlingStrategy, new Optional()]
//             ]
//         },
//         {provide: PreloadingStrategy, useExisting: NoPreloading}, provideRoutes([])
//     ]
// })
// export class RouterTestingModule {
//     static withRoutes(routes: Routes, config?: ExtraOptions): ModuleWithProviders {
//         return {
//             ngModule: RouterTestingModule,
//             providers: [
//                 provideRoutes(routes),
//                 {provide: ROUTER_CONFIGURATION, useValue: config ? config : {}},
//             ]
//         };
//     }
// }
//
// // ngModule: NgxPermissionsModule,
// //     providers: [
// //     NgxPermissionsStore,
// //     NgxRolesStore,
// //     NgxPermissionsService,
// //     NgxPermissionsGuard,
// //     NgxRolesService,
// //     {provide: USE_PERMISSIONS_STORE, useValue: config.permissionsIsolate},
// //     {provide: USE_ROLES_STORE, useValue: config.rolesIsolate},
// // ]
