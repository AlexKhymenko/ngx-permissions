export interface PermissionsRouterData {
    only: string | string[];
    except: string | string[];
    redirectTo: string | Function;
}