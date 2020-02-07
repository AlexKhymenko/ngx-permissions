import { ActivatedRouteSnapshot, NavigationExtras, Route, RouterStateSnapshot } from '@angular/router';

export interface NgxPermissionsRouterData {
    only?: string | string[] | OnlyFn;
    except?: string | string[] | ExceptFn;
    redirectTo?: RedirectTo | RedirectToFn;
}

export interface NgxRedirectToNavigationParameters {
    navigationCommands: any[] | NavigationCommandsFn;
    navigationExtras?: NavigationExtras | NavigationExtrasFn;
}

export declare type OnlyFn = (route: ActivatedRouteSnapshot | Route, state?: RouterStateSnapshot) => string | string[];
export declare type ExceptFn = (route: ActivatedRouteSnapshot | Route, state?: RouterStateSnapshot) => string | string[];

export declare type RedirectTo =
    string
    | { [name: string]: NgxRedirectToNavigationParameters | string | RedirectToFn }
    | NgxRedirectToNavigationParameters;
export declare type RedirectToFn =
    (rejectedPermissionName?: string, route?: ActivatedRouteSnapshot | Route, state?: RouterStateSnapshot) => RedirectTo;

export declare type NavigationCommandsFn = (route: ActivatedRouteSnapshot | Route, state?: RouterStateSnapshot) => any[];
export declare type NavigationExtrasFn = (route: ActivatedRouteSnapshot | Route, state?: RouterStateSnapshot) => NavigationExtras;
export declare type ValidationFn = ((name?: string, store?: any) => Promise<void | string | boolean> | boolean | string[]);

export const DEFAULT_REDIRECT_KEY = 'default';
