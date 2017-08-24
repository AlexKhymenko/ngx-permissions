### Breaking changes from 0.1 to 1.0 

Prevent name collision in Your application.
Add Prefix ngx to everything

### Templates

Remove `permissions` directive cause it was not usable. Will not break anything Angular will just ignore it. 

The reasoning if you want to use `[permissions]` as input in another component it will show error `can't find template error`.

from 
```html
<ng-template permissions [permissionsOnly]="['ADMIN', 'GUEST']">
    <div>You can see this text congrats</div>
</div>
<div *permissionsExcept="['ADMIN', 'GUEST']">
    <div>You can see this text congrats</div>
</div>
```
to

```html
<ng-template [ngxPermissionsOnly]="['ADMIN', 'GUEST']">
    <div>You can see this text congrats</div>
</div>
<div *ngxPermissionsExcept="['ADMIN', 'GUEST']">
    <div>You can see this text congrats</div>
</div>
```

### Services

Add `Ngx` Prefix to service name

PermissionsService > NgxPermissionsService

RolesService > NgxRolesService

PermissionsGuard > NgxPermissionsGuard


### Directive
Add `Ngx` Prefix to directive name

PermissionsDirective > NgxPermissionsDirective