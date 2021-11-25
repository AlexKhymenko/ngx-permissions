# ngx-permissions

Permission and roles based access control for your angular(angular 2,4,5,6,7,8+) applications(AOT, lazy modules compatible)


##

[![Build Status](https://travis-ci.org/AlexKhymenko/ngx-permissions.svg?branch=master)](https://travis-ci.org/AlexKhymenko/ngx-permissions)
[![codecov](https://codecov.io/gh/AlexKhymenko/ngx-permissions/branch/master/graph/badge.svg)](https://codecov.io/gh/AlexKhymenko/ngx-permissions)
[![npm version](https://badge.fury.io/js/ngx-permissions.svg)](https://badge.fury.io/js/ngx-permissions)
![npm](https://img.shields.io/npm/dm/ngx-permissions)

## Documentation and examples
Documentation here is outdated please visit [wiki-page](https://github.com/AlexKhymenko/ngx-permissions/wiki).
To see better structured documentation go to [wiki-page](https://github.com/AlexKhymenko/ngx-permissions/wiki).  
In `one month` the detailed functionality description will be available only on wiki page.

## Demo
You can test library in [Plunker](https://plnkr.co/edit/n6Wa6hXg0JzI6e050wBt?p=preview)

## YouTube
I'm working on tutorial for the library will add more video with time. This is my first videos [YouTube](https://www.youtube.com/playlist?list=PLHw3vRAUIqUOLqBpoR-eYvZxiPGPh18y5)

## Support
If You have chance please support on patreon for more open source ideas  [![Support me on Patreon](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3DalexKhymenko%26type%3Dpatrons&style=flat)](https://patreon.com/alexKhymenko)

## Table of contents

Some functionality is missing visit [wiki-page](https://github.com/AlexKhymenko/ngx-permissions/wiki)

- [Installation](#installation)
- [Consuming library](#consuming-library)
- [Managing Permissions](#managing-permissions)
- [Managing Roles](#managing-roles)
- [Controlling access in views](#controlling-access-in-views)
- [Usage with Routes](#usage-with-routes)
- [Development](#development)
- [License](#license)

### With version 7 minimal angular version 8.0
### With version 5 minimal rxjs dependency 6.0
### With version 4 minimal rxjs dependency 5.5
### Version 2 for angular 4/5. Version 1 for angular 2/4



## Installation

To install this library, run:

```bash
$ npm install ngx-permissions --save
```

## Consuming library

You can import library in any Angular application by running:

```bash
$ npm install ngx-permissions  --save
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
     NgxPermissionsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

SharedModule

If you use a SharedModule that you import in multiple other feature modules, you can export the NgxPermissionsModule to make sure you don't have to import it in every module.
```typescript
@NgModule({
    exports: [
        CommonModule,
        NgxPermissionsModule
    ]
})
export class SharedModule { }
```
> Note: Never call a forRoot static method in the SharedModule. You might end up with different instances of the service in your injector tree. But you can use forChild if necessary.

##### Lazy loaded modules

When you lazy load a module, you should use the `forChild` static method to import the `NgxPermissionsModule`.

Since lazy loaded modules use a different injector from the rest of your application, you can configure them separately.
You can also isolate the service by using `permissionsIsolate: true` or `rolesIsolate: true`. In which case the service is a completely isolated instance.
Otherwise, by default, it will share its data with other instances of the service.

```typescript
@NgModule({
    imports: [
        NgxPermissionsModule.forChild()
    ]
})
export class LazyLoadedModule { }
```

```typescript
@NgModule({
    imports: [
        NgxPermissionsModule.forChild({
        permissionsIsolate: true, 
        rolesIsolate: true})
    ]
})
export class LazyIsolatedLoadedModule { }
```


Once your library is imported, you can use its components, directives and pipes in your Angular application:

Import service to the main application and load permissions

```typescript
import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

   constructor(private permissionsService: NgxPermissionsService,
               private http: HttpClient) {}

  ngOnInit(): void {
    const perm = ["ADMIN", "EDITOR"];

    this.permissionsService.loadPermissions(perm);
    
     this.http.get('url').subscribe((permissions) => {
       //const perm = ["ADMIN", "EDITOR"]; example of permissions
       this.permissionsService.loadPermissions(permissions);
    })
  }
}
```

Usage in templates

```html
<div *ngxPermissionsOnly="['ADMIN', 'GUEST']">
    <div>You can see this text congrats</div>
</div>

<ng-template ngxPermissionsOnly="ADMIN">
  <div>You can see this text congrats</div>
 </ng-template>
 
 <ng-template [ngxPermissionsExcept]="['JOHNY']">
   <div> All will see it except JOHNY</div>
 </ng-template>
```
### Managing permissions


Overview
----------------------------

1. [Introduction](#introduction)
2. [Defining permissions](#defining-permissions)
1. [Individual permissions](#individual-permissions)
2. [To load permissions before application start up](#to-load-permissions-before-application-start-up)
3. [Multiple permissions](#multiple-permissions)
3. [Removing permissions](#removing-permissions)
4. [Retrieving permissions](#retrieving-permissions)

Introduction
----------------------------

Let's start with little explanation **what** permission is. Permission is the most atomic **ability** that a user can have
in your application. So you can think about permission as a smallest action that user can do inside your site.

But can `user` or `anonymous` be a permission? Technically yes, but from business point of view you should treat them
as Roles that are more complex objects that can store more complex logic.

> :bulb: **Note**   
> It's a good convention to start permission with a verb and combine them with resource or object, so permissions like `readDocuments` or `listSongs`
are meaningful and easy to understand for other programmes. Notice that they are named lowerCamelCase for easy differentiation form roles.

> :skull: **Warning**   
> This library is intended for simplify the client side development workflow in a role based web application. **DO NOT RELY ONLY ON THIS CHECKS FOR YOU APPLICATION SECURITY!** Client side checks can be easily bypassed, so always implement the checks on the backend!

Defining permissions
----------------------------
So, how do you tell Permission what does 'readDocuments' or 'listSongs' mean and how to know if the current user belongs
to those definitions?

Well, Permission allows you to set different 'permissions' definitions along with the logic that determines if the current
session belongs to them. To do that library exposes special container `NgxPermissionsService` that allows you to manipulate them freely.

### Individual permissions

To add permissions individually `NgxPermissionsService` exposes method `addPermission` that generic usage is shown below or add as array:

```typescript
[...]
 ngOnInit() {
    this.permissionsService.addPermission('changeSomething')
    this.permissionsService.addPermission(['changeSomething', 'anotherAlso'])
    this.permissionsService.addPermission('changeSomething', () => {
        return true;
    })
     
    this.permissionsService.addPermission('anotherPermissions', (permissionName, permissionsObject) => {
        return !!permissionsObject[permissionName];
    });
    this.permissionsService.addPermission(['anotherPermissions', 'AnotherOne'], (permissionName, permissionsObject) => {
        return !!permissionsObject[permissionName];
    });
     
    //Will add validation function to every permission
     this.permissionsService.addPermission(['anotherPermissions', 'AnotherOne'], (permissionName, permissionsObject) => {
         return !!permissionsObject[permissionName];
     });
     
     this.permissionsService.addPermission('permissions', (permissionName, permissionsObject) => {
       return this.checkSession().toPromise();
     });
 }

```

### To load permissions before application start up

APP_INITIALIZER is defined in angular/core. You include it in your app.module.ts like this.


APP_INITIALIZER is an OpaqueToken that references the ApplicationInitStatus service. ApplicationInitStatus is a multi provider. It supports multiple dependencies and you can use it in your providers list multiple times. It is used like this.
```typescript
import { APP_INITIALIZER } from '@angular/core';

@NgModule({
  providers: [
    DictionaryService,
    {
      provide: APP_INITIALIZER,
      useFactory: (ds: DictionaryService, ps: NgxPermissionsService ) => function() {return ds.load().then((data) => {return ps.loadPermissions(data)})},
      deps: [LoadService, NgxPermissionsService],
      multi: true
    }]
})
export class AppModule { }
```

Validation function are injected with any angular services. There are 2 local injectables available that can be used to implement more complex validation logic.

| Injectable Local       | Description                                                               | 
| :--------------------- | :------------------------------------------------------------------------ |
| `permissionName`       | String representing name of checked permission                            |
| `permissionsObject`    | Object of store permissions storing permissions properties                            |


It also have to return one of values to properly represent results:

| Validation result      | Returned value             | 
| :--------------------- | :------------------------- |
| Valid                  | [`true`\|`Promise.resolve() but it should not resolve false`]   |
| Invalid                | [`false`\|`Promise.reject() or Promise.resolve(false)`]   |
### Multiple permissions

To define multiple permissions  method `loadPermissions` can be used. The only
difference from `definePermission` is that it accepts `Array` of permission names instead of single one.


Often meet example of usage is set of permissions (e.g. received from server after user login) that you will iterate over to
check if permission is valid.

```typescript
const permissions = ['listMeeting', 'seeMeeting', 'editMeeting', 'deleteMeeting']
NgxPermissionsService.loadPermissions(permissions) 
NgxPermissionsService.loadPermissions(permissions, (permissionName, permissionStore) => {
    return !!permissionStore[permissionName];
}) 
```
NOTE: This method will remove older permissions and pass only new;

Removing permissions
----------------------------

You can easily remove **all** permissions form the `NgxPermissionsService` (e.g. after user logged out or switched profile) by calling:

```typescript
NgxPermissionsService.flushPermissions();
```

Alternatively you can use `removePermission` to delete defined permissions manually:

```typescript
NgxPermissionsService.removePermission('user');
```

Retrieving permissions
----------------------------

And to get all user permissions use method `getPermissions` or use Observable `permissions$`:

```typescript
var permissions = NgxPermissionsService.getPermissions();

NgxPermissionsService.permissions$.subscribe((permissions) => {
    console.log(permissions)
})
```

## Managing roles

Before start
----------------------------

Make sure you are familiar with:
- [Managing permissions](#managing-permissions)

Overview
----------------------------

1. [Introduction](#before-start)
2. [Defining roles](#defining-roles)
1. [Individual roles](#individual-roles)
2. [Multiple roles](#multiple-roles)
3. [Removing roles](#removing-roles)
4. [Getting all roles](#getting-all-roles)

Introduction
----------------------------
By definition a role is a named set of abilities (permissions) by which a specific group of users is identified.
So for example `USER` or `ANONYMOUS` would be roles and not permissions. We can represent our `USER` role as a group of permissions that the role should be able to perform. For example: `listArticles`, `editArticles` and other custom server/browser validated privileges.

> :bulb: **Note**   
> It's a good convention to name roles with UPPER_CASE, so roles like `ACCOUNTANT` or `ADMIN` are easier to distinguish from permissions.

Defining roles
----------------------------

### Individual roles

Similarly to permissions we are gonna use here `RolesService` that exposes `addRole` allowing to define custom roles used by users in your application.

```typescript
[...]

NgxRolesService
  .addRole('ROLE_NAME', ['permissionNameA', 'permissionNameB', 'permissionNameC', ...])
  
NgxRolesService.addRole('Guest', () => {
      return this.sessionService.checkSession().toPromise();
  }); 

NgxRolesService.addRole('Guest', () => {
      return true;
  }); 
```

Validation function are injected with any angular services. There are 2 local injectables available that can be used to implement more complex validation logic.

| Parameter              | Description                                                               | 
| :--------------------- | :------------------------------------------------------------------------ |
| `roleName`             | String representing name of checked role                                  |
| `transitionProperties` | Array or validation function |


It also have to return one of values to properly represent results:

| Validation result      | Returned value             | 
| :--------------------- | :------------------------- |
| Valid                  | [`true`\|`Promise.resolve() but it should not resolve false`]   |
| Invalid                | [`false`\|`Promise.reject() or Promise.resolve(false)`]   |

> Note: Right now to make request to the backend it only supports promises
> Note: If at least one of request fulfils it will show the component


Usage of `addRole` is very similar to `addPermissions`:

```typescript
NgxRolesService
  NgxPermission
  // Library will internally validate if 'listEvents' and 'editEvents' permissions are valid when checking if role is valid   
  .addRole('ADMIN', ['listEvents', 'editEvents']);  
  
NgxRolesService.addRole('Guest', () => {
      return this.sessionService.checkSession().toPromise();
  });  
  
```

### Multiple roles

Service `NgxRolesService` allows you define multiple roles with `addRoles` method. This method accepts `Object` containing keys as a role names and corresponding validators as values.

```typescript
NgxRolesService    
  // Or use your own function/service to validate role
  .addRoles({
    'USER': ['canReadInvoices'],
    'ADMIN': ['canReadInvoices','canEditInvoices','canUploadImages'],
    'GUEST': () => {
        return this.sessionService.checkSessions().toPromise();
    }
  });
```

> :bulb: **Note**

Removing roles
----------------------------

To remove **all** roles use `flushRoles` method:

```typescript
NgxRolesService.flushRoles();
```

Alternatively you can use `removeRole` to delete defined role manually:

```typescript
NgxRolesService.removeRole('USER');
```

Getting all roles
----------------------------

To get specific role use method `getRole`:

```javascript
let role = NgxRolesService.getRole('roleName');
```

And to get all roles form `NgxRolesService` use method `getRoles` or use `Observable roles$`:

```typescript
let roles = NgxRolesService.getRoles();

NgxRolesService.roles$.subscribe((data) => {
    console.log(data);
})
```


## Controlling access in views

Overview
----------------------------

1. [Permission directive](#permission-directive)
1. [Basic usage](#basic-usage)

Permission directive
----------------------------

Permission module exposes directive `ngxPermissionsOnly` and `ngxPermissionsExcept` that can show/hide elements of your application based on set of permissions.
> :fire: **Important**   
>  Else, then syntax is supported.   
Note if you use `then` block don't put anything in main block it will be not visible, only `then` block will be used.


Permission directive accepts several attributes:

| Attribute             | Value                    | Description      |
| :----------------------|:------------------------:| :----------------|
| `ngxPermissionsOnly`     | <code>[String &#124; String[]]</code>   | Single or multiple permissions allowed to access content | 
| `ngxPermissionsExcept`   | <code>[String &#124; String[]]</code>   | Single or multiple permissions denied to access content|
| `(permissionsAuthorized)`   | EventEmitter       | EventEmitter emitted when authorized                         |
| `(permissionsUnauthorized)` | EventEmitter       | EventEmitter emitted when unAuthorized                       |
### Basic usage

Directives accepts either single permission that has to be met in order to display it's content,
You can use both `ngxPermissionsOnly` and `ngxPermissionsExcept` at the same time:

```html
<ng-template [ngxPermissionsOnly]="['ADMIN']" (permissionsAuthorized)="yourCustomAuthorizedFunction()" (permissionsUnauthorized)="yourCustomAuthorizedFunction()">
    <div>You can see this text congrats</div>
 </ng-template>
 <ng-template [ngxPermissionsOnly]="'ADMIN'"  [ngxPermissionsExcept]="'Manager'">
    <div>You can see this text congrats</div>
 </ng-template>
  <ng-template ngxPermissionsOnly="ADMIN">
    <div>You can see this text congrats</div>
 </ng-template>
 
 <ng-template [ngxPermissionsExcept]="['JOHNY']">
   <div> All will see it except JOHNY</div>
 </ng-template>
```

Or set of permissions separated by 'coma':

```html
<ng-template [ngxPermissionsOnly]="['ADMIN', 'GUEST']">
    <div>You can see this text congrats</div>
</ng-template>

 <ng-template [ngxPermissionsExcept]="['ADMIN', 'JOHNY']">
   <div>All will see it except admin and Johny</div>
 </ng-template>
  <ng-template [ngxPermissionsExcept]="['ADMIN', 'JOHNY']" [ngxPermissionsOnly]="['MANAGER']">
    <div>All will see it except admin and Johny</div>
  </ng-template>
  
  <ng-template [ngxPermissionsExcept]="['MANAGER']" 
  [ngxPermissionExceptThen]="thenBlock" 
  [ngxPermissionExceptElse]="elseBlock">
    </ng-template>
   <ng-template #elseBlock>
       <div>elseBlock</div>
   </ng-template>
   <ng-template #thenBlock>
       <div>thenBlock</div>
   </ng-template>
   
   <ng-template
     [ngxPermissionsOnly]="['MANAGER']" 
     [ngxPermissionsOnlyThen]="thenBlock" 
     [ngxPermissionsOnlyElse]="elseBlock">
       </ng-template>
      <ng-template #elseBlock>
          <div>elseBlock</div>
      </ng-template>
      <ng-template #thenBlock>
          <div>thenBlock</div>
      </ng-template>
    
    
 
```

Or just simply by *
```html
<div *ngxPermissionsOnly="['ADMIN', 'GUEST']">
    <div>You can see this text congrats</div>
</div>

 <div *ngxPermissionsOnly="['THEN_BLOCK']; else elseBlock; then thenBlock">main</div>
     <ng-template #elseBlock>
         <div>elseBlock</div>
     </ng-template>
     <ng-template #thenBlock>
         <div>thenBlock</div>
     </ng-template>
     
 <div *ngxPermissionsExcept="['THEN_BLOCK']; else elseBlock; then thenBlock"></div>
       <ng-template #elseBlock>
           <div>elseBlock</div>
       </ng-template>
       <ng-template #thenBlock>
           <div>thenBlock</div>
       </ng-template>

```
> Note: You cant use `*` style with other * style directives like `*ngIf`. You should wrap them. And YES i don't like it either.
  ```html
   <div *ngxPermissionsOnly="['ADMIN', 'GUEST']">
    <div *ngIf="true">
      You can see this text congrats
    </div>
   </div>

   ```
>  :fire: **Important**   
>  Using with except and only `together` should use `ngxPermissionsElse` or `ngxPermissionsThen`
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


Usage with Routes
----------------------------

1. [Introduction](#introduction)
2. [Property only and except](#property-only-and-except)
1. [Single permission/role](#single-permissionrole)
2. [Multiple permissions/roles](#multiple-permissionsroles)
3. [Dynamic access](#dynamic-access)
3. [Property redirectTo](#property-redirectto)
1. [Single rule redirection](#single-redirection-rule)
2. [Multiple rule redirection](#multiple-redirection-rules)
3. [Dynamic redirection rules](#dynamic-redirection-rules)
4. [Implemented Guards](#implemented-guards)
1. [Can Activate Guard](#can-activate-guard)
2. [Can Load Guard](#can-load-guard)
3. [Can Activate Child Guard]($can-activate-child-guard)
5. [Common use cases](#common-use-cases)
1. [Two guards when first make request for authorisation and gets permissions second checks for permissions](#two-guards-when-first-make-request-for-authorisation-and-gets-permissions-second-checks-for-permissions)

Introduction
----------------------------

Now you are ready to start working with controlling access to the states of your application. In order to restrict any state ngx-permission rely on angular-route's `data` property, reserving key `permissions` allowing to define authorization configuration.

Permissions object accepts following properties:

| Property        | Accepted value                   |
| :-------------- | :------------------------------- |
| `only`          | [`String`\|`Array`\|`Function`]              |
| `except`        | [`String`\|`Array`\|`Function`]              |
| `redirectTo`    | [`String`]                       |

Property only and except
----------------------------

Property `only`:
- is used to explicitly define permission or role that are allowed to access the state
- when used as `String` contains single permission or role
- when used as `Array` contains set of permissions and/or roles

Property `except`:
- is used to explicitly define permission or role that are denied to access the state
- when used as `String` contains single permission or role
- when used as `Array` contains set of permissions and/or roles

> :fire: **Important**   
> If you combine both `only` and `except` properties you have to make sure they are not excluding each other, because denied roles/permissions would not allow access the state for users even if allowed ones would pass them.


#### Single permission/role

In simplest cases you allow users having single role permission to access the state. To achieve that you can pass as `String` desired role/permission to only/except property:
You can use `except` and `only` at the same time;
```typescript
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

const appRoutes: Routes = [
  { path: 'home',
    component: HomeComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'ADMIN'
      }
    }
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}

```

In given case when user is trying to access `home` state `NgxPermissionsGuard` service is called checking if `isAuthorized` permission is valid:
- if permission definition is not found it stops transition


#### Multiple permissions/roles

Often several permissions/roles are sufficient to allow/deny user to access the state. Then array value comes in handy:

```typescript
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

const appRoutes: Routes = [
  { path: 'home',
    component: HomeComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['ADMIN', 'MODERATOR'],
        except: ['GUEST']
      }
    }
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
```

When `NgxPermissionsGuard` service will be called it would expect user to have either `ADMIN` or `MODERATOR` permissions to pass him to `home` route.

[//]: <> (> :bulb: **Note**   
          > Between values in array operator **OR** is used to create alternative. If you need **AND** operator between permissions define additional `PermRole` containing set of those. 
)

#### Dynamic access

You can find states that would require to verify access dynamically - often depending on parameters.

Let's imagine situation where user want to modify the invoice. We need to check every time if he is allowed to do that on state level. We are gonna use `ActivatedRouteSnapshot` and `RouterStateSnapshot`   object to check weather he is able to do that.

> To make AOT compatible you should export function.
> Below is presented code AOT Compatible

AOT compatible
```typescript
export function testPermissions(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  if (route.params['id'] === 42) {
    return ['MANAGER', "UTILS"]
  } else {
    return 'ADMIN'
  }
}
const appRoutes: Routes = [
  { path: 'dynamic/:id',
      component: HomeComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: testPermissions
        }
      }
    }
];
```

> :skull: **Warning**   
> The code below is not AOT compatible

```typescript
const appRoutes: Routes = [
  { path: 'dynamic/:id',
      component: HomeComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
              if (route.params['id'] === 42) {
                  return ['MANAGER', "UTILS"]
                } else {
                  return 'ADMIN'
                }
          }
        }
      }
    }
];
```

So whenever we try access state with param `id = 42` set to true additional check for permission `manager and utils` will be made. Otherwise only `ADMIN` will be required.

> :fire: **Important**   
> Notice that function must always return array or string of roles/permissions in order to work properly.

Property redirectTo
----------------------------

Property redirectTo:
- when used as `String` defines single redirection rule
- when used as `Objects` defines single/multiple redirection rules
- when used as `Function` defines dynamic redirection rule(s)

### Single redirection rule

In case you want to redirect to a specific state when the user is not authorized, set `redirectTo` path to that route.


```typescript
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

const appRoutes: Routes = [
  { path: 'home',
    component: HomeComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['ADMIN', 'MODERATOR'],
        redirectTo: '/another-route'
      }
    }
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
```

In order to pass additional properties like params, set `redirectTo` to an object.
`navigationCommands` and `navigationExtras` are reserved words it corresponds to parameters passed to router.navigate function
`navigate(commands: any[], extras: NavigationExtras): Promise<boolean>`

```typescript

const appRoutes: Routes = [
  { path: 'home',
    component: HomeComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['ADMIN', 'MODERATOR'],
        redirectTo: {
            navigationCommands: ['123'],
            navigationExtras: {
                skipLocationChange: true
            }
        }               
    }
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
````
## Multiple redirection rules

In case you want to redirect the user based on `denied` permission/role to create redirection strategies. In order to do that you have to create redirection `Object` that contain keys representing rejected permissions or roles and values implementing redirection rules.

Redirection rules are represented by following values:

| Value type    | Return                     | Usage                                         | 
| :------------ | :------------------------- | :-------------------------------------------- |
| `String`      | [`String`]                 | Simple state transitions                      |
| `Object`      | [`Object`]                 | Redirection with custom parameters or options | 
| `Function`    | [`String`\|`Object`]       | Dynamic properties-based redirection          | 


> :bulb: **Note**   
> Use _default_ property that will handle fallback redirect for not defined permissions.

The simplest example of multiple redirection rules are redirection based on pairs role/permission and state. When user is not granted to access the state will be redirected to `agendaList` if missing `canReadAgenda` permission or to `dashboard` when missing `canEditAgenda`. Property `default` is reserved for cases when you want handle specific cases leaving default redirection.



```typescript
  const appRoutes: Routes = [
    { path: 'home',
      component: HomeComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
       permissions: {
               only: ['canReadAgenda','canEditAgenda'],
               redirectTo: {
                 canReadAgenda: 'agendaList',
                 canEditAgenda: 'dashboard',
                 default: 'login'
               }
        }
      }
    },
  ];
  @NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
```

If you need more control over redirection parameters `Object` as a value can be used to customise target url `navigationCommands` and transition `navigationExtras`.
> :bulb: **Note**  `navigationCommands` and `navigationExtras` are reserved words it corresponds to parameters passed to router.navigate function
`navigate(commands: any[], extras: NavigationExtras): Promise<boolean>`

```typescript 

  const appRoutes: Routes = [
    { path: 'home',
      component: HomeComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
         permissions: {
               only: ['canEditAgenda'],
               redirectTo: 
                 canEditAgenda: {
                   navigationCommands: 'dashboard',
                   navigationExtras: {
                       skipLocationChange: true
                   }
                 
                 },
                 default: 'login'
             }
          }
      }
    },
  ];
  @NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    exports: [
      RouterModule
    ]
  })  
```

To present usage `redirectTo` as `Object` with values as `Function` in a state definition `agenda` presented below redirection rules are interpreted as:
- when user does not have `canReadAgenda` invoked function returns string representing the state name to which unauthorized user will be redirected
- when user does not have `canEditAgenda` invoked function returns object with custom options and params that will be passed along to transited `dashboard` url


```typescript

 const appRoutes: Routes = [
    { path: 'home',
      component: HomeComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
       permissions: {
              only: ['canReadAgenda','canEditAgenda'],
              redirectTo: {
                canReadAgenda: (rejectedPermissionName: string, activateRouteSnapshot: ActivatedRouteSnapshot, routeStateSnapshot: RouterStateSnapshot) => {
                  return 'dashboard';
                },
                canEditAgenda: (rejectedPermissionName: string, activateRouteSnapshot: ActivatedRouteSnapshot, routeStateSnapshot: RouterStateSnapshot) => {
                  return {
                      navigationCommands: ['/dashboard'],
                      navigationExtras: {
                          skipLocationChange: true
                      }
                  }
                },
                default: 'login'
            }
        }
      }
    },
  ];
  @NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
```
> :fire: **Important**   
> Above code is not AOT compatible to make it AOT compatible extract it to function
> `navigationCommands` and `navigationExtras` reserved words. Matching parameter to router.navigate function

```typescript
export function canReadAgenda(rejectedPermissionName: string, activateRouteSnapshot: ActivatedRouteSnapshot, routeStateSnapshot: RouterStateSnapshot) => {                                                 
    return 'dashboard';
},

redirectTo: {
    canReadAgenda: canReadAgenda
 
}
```

### Dynamic redirection rules

Similarly to examples showing defining dynamic access to state redirection can also be defined based on any parameters of `ActivatedRouteSnapshot` and `RouterStateSnapshot`;

> :bulb: **Note**   
> Remember to always return state name or object.

```typescript 
const appRoutes: Routes = [
    { path: 'home/:isEditable',
      component: HomeComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
      permissions: {
             only: ['canReadAgenda','canEditAgenda'],
             redirectTo: (rejectedPermissionName: string, activateRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) => {
               if(activateRouteSnapshot.params['id'] === 42){
                 return 'login';
               } else {
                 return 'dashboard'
               }
             }
      }
    },
  ];
  @NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
```

> :fire: **Important**   
> The code above is not AOT compatible. To make it AOT compatible extract it to a function

```typescript
export function redirectToFunc(rejectedPermissionName: string, activateRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) => {
     if(activateRouteSnapshot.params['id'] === 42){
       return 'login';
     } else {
       return 'dashboard'
     }
   }

redirectTo: redirectToFunc
```
----------------------------

## Implemented Guards

### Can Activate Guard
NgxPermissionsGuard implements CanActivate interface, see examples above.

### Can Load Guard

NgxPermissionsGuard implements CanLoad Interface. Functionality is the same as canActivate

```typescript
const appRoutes: Routes = [

  {
    path: 'lazy',
    data: {
      permissions: {
        except: 'ADDDMIN',
      }
    },
    canLoad: [NgxPermissionsGuard],
    loadChildren: 'app/lazy-module/lazy-module.module#LazyModule'
  },
 

];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    // CanDeactivateGuard
  ]
})
export class AppRoutingModule {}


 
```

> :fire: **Warning**
> * The only difference if you use as a function the parameter is **only 1** and its type of  **Route**

```typescript

{
    path: 'lazy',
    data: {
      permissions: {
         only: (route: Route) => {
                  //logic here
                   return ['MANAGER', "UTILS"]
                  }
      }
    },
    canLoad: [NgxPermissionsGuard],
    loadChildren: 'app/lazy-module/lazy-module.module#LazyModule'
  },
```

### Can Activate Child Guard

`NgxPermissionsGuard` implements CanLoad Interface. Functionality is the same as canActivate

> :fire: **Warning**
> * Rules and data must be specified on **Child Components** not on parent component

```typescript
const appRoutes: Routes = [
  { path: '',
    component: IsolateComponent,
    canActivateChild: [NgxPermissionsGuard],
    children: [
      {
        path: 'except-should',
        component: AnotherComponent,
        data: {
          permissions: {
            except: 'ADMIN'
          }
        }
      },
      {
        path: 'only-should',
        component: ComeComponent,
        data: {
          permissions: {
            only: 'GUEST'
          }
        }
      },
    ]
  },
];
```
----------------------------


## Common use cases

### Two guards when first make request for authorization and gets permissions second checks for permissions

This method only works with `angular 4.3.2` or higher see https://github.com/angular/angular/issues/15670

There are a lot of times you have 2 guard one for authorisation when it makes request for permissions and second is permissions guard
and you want them to work in chain. To make them work in chain You should use them in a following way:

```typescript

let routes = [
  { path: '', 
    canActivate: [AuthGuard],
    children: [
      {path: 'component', 
      component: ComponentName, 
      canActivate: [NgxPermissionsGuard],
      data: {
         permissions: {
           only: ['ADMIN', 'MODERATOR'],
           redirectTo: 'another-route'
         }
       }}
    ]
  }
]
```
> Note: Make sure the permission request in chained in auth guard
 ```js 
    canActivate() {
        return authLogin().then((obj) => {
            // or load here if you dont need second request
            // this.permissions.service.loadPermissions(obj.permissions)
           
            return this.authPermissions.getPermissions('url');
        }).then((permissions) => {
            this.permissions.service.loadPermissions(permissions)
        )
    }
```


| --- |
## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```
## Thank You

`Thank You for using the library and support. HAVE A GREAT DAY!`

## For google
angular 2 permissions, angular 4 permissions, angular permissions, angular 5 permissions ng2 permissions ng permissions
ng-permissions ng2-permissions angular2 permissions  angular4 permissions angular 5 permissions

## License

MIT © [Oleksandr Khymenko](mailto:alexanderKhymenko@gmail.com)
