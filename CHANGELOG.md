## 3.2.3
Optimise directive when working with lot of data(prevent re rendering);

## 3.2.2
Fix bug with not resetting permissions on loadPermissions

## 3.2.0
Add NgxPermissionsAllowStubDirective, NgxPermissionsRestrictStubDirective for testing

## 3.1.0
Improve typescript support
Don't show template on initial load.

## 3.0.0
Fix correct role implementation.
When passing function to redirectTo it will use or operator.

## 2.1.1
BugFix When passing empty array. it should show the component.

## 2.1.0
Implement canLoad interface
Implement canActivateChild interface

## 2.0
Add support for angular 5. 

Version 2 for angular 4/5. Version 1 for angular 2/4

## 1.2

###Small Bug Fixes

## 1.1

### Features
Adding then else block functionality


Adding then else block functionality with ngxPermissionsExcept directive
```html
  <div *ngxPermissionsExcept="['THEN_BLOCK']; else elseBlock; then thenBlock">main</div>
  <ng-template #elseBlock>
      <div>elseBlock</div>
  </ng-template>
  <ng-template #thenBlock>
      <div>thenBlock</div>
  </ng-template>
```

Adding then else block functionality with ngxPermissionsOnly directive
```html
  <div *ngxPermissionsOnly="['THEN_BLOCK']; else elseBlock; then thenBlock">main</div>
  <ng-template #elseBlock>
      <div>elseBlock</div>
  </ng-template>
  <ng-template #thenBlock>
      <div>thenBlock</div>
  </ng-template>
```

Using with except and only together should use `ngxPermissionsElse` and `ngxPermissionsThen`
```html
    <ng-template [ngxPermissionsExcept]="'FAIL_BLOCK'" 
    [ngxPermissionsOnly]="'ONLY_BLOCK'"
    [ngxPermissionsElse]="elseBlock"
    [ngxPermissionsThen]="thenBlock">
    </ng-template>
    <ng-template #elseBlock>
        <div>elseBlock</div>
    </ng-template>
    <ng-template #thenBlock>
        <div>thenBlock</div>
    </ng-template>
```


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