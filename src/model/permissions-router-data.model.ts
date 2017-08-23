export interface PermissionsRouterData {
    only?: string | string[] | Function;
    except?: string | string[] | Function;
    redirectTo?: string | Function;
}