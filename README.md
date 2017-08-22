# ngx-permissions

Permission based access control for your angular applications(AOT, lazy modules compatible)

## Table of contents

- [Installation](#installation)
- [Consuming library](#consuming-library)
- [Managing Permissions](#managing-permissions)
- [Managing Roles](#managing-roles)
- [Controlling access in views](#controlling-access-in-views)
- [Usage with Routes](#usage-with-routes)
- [Development](#development)
- [License](#license)

## Installation

To install this library, run:

```bash
$ npm install ngx-permissions --save
```

## Consuming library

Once you have published your library to npm, you can import your library in any Angular application by running:

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
import { PermissionsService } from 'ngx-permissions';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

   constructor(private permissionsService: PermissionsService,
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
<div *permissionsOnly="['ADMIN', 'GUEST']">
    <div>You can see this text congrats</div>
</div>

<ng-template permissions permissionsOnly="ADMIN">
  <div>You can see this text congrats</div>
 </ng-template>
 
 <ng-template permissions [permissionsExcept]="['JOHNY']">
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
 
Defining permissions
----------------------------
So, how do you tell Permission what does 'readDocuments' or 'listSongs' mean and how to know if the current user belongs
to those definitions?

Well, Permission allows you to set different 'permissions' definitions along with the logic that determines if the current 
session belongs to them. To do that library exposes special container `PermissionsService` that allows you to manipulate them freely.

### Individual permissions

To add permissions individually `PermissionsService` exposes method `addPermission` that generic usage is shown below or add as array: 

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
      useFactory: (ds: DictionaryService, ps: PermissionsService ) => function() {return ds.load().then((data) => {return ps.loadPermissions(data)})},
      deps: [LoadService, PermissionsService],
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
PermissionsService.loadPermissions(permissions) 
PermissionsService.loadPermissions(permissions, (permissionName, permissionStore) => {
    return !!permissionStore[permissionName];
}) 
```
NOTE: This method will remove older permissions and pass only new;

Removing permissions
----------------------------

You can easily remove **all** permissions form the `PermissionsService` (e.g. after user logged out or switched profile) by calling:  

```typescript
PermissionsService.flushPermissions();
```

Alternatively you can use `removePermission` to delete defined permissions manually:

```typescript
PermissionsService.removePermission('user');
```

Retrieving permissions
----------------------------

And to get all user permissions use method `getPermissions` or use Observable `permissions$`:

```typescript
var permissions = PermissionsService.getPermissions();

PermissionsService.permissions$.subscribe((permissions) => {
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

RolesService
  .addRole('ROLE_NAME', ['permissionNameA', 'permissionNameB', 'permissionNameC', ...])
  
RolesService.addRole('Guest', () => {
      return this.sessionService.checkSession().toPromise();
  }); 

RolesService.addRole('Guest', () => {
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
RolesService
  // Permission array validated role
  // Library will internally validate if 'listEvents' and 'editEvents' permissions are valid when checking if role is valid   
  .addRole('ADMIN', ['listEvents', 'editEvents']);  
  
RolesService.addRole('Guest', () => {
      return this.sessionService.checkSession().toPromise();
  });  
  
```

### Multiple roles

Service `RolesService` allows you define multiple roles with `addRoles` method. This method accepts `Object` containing keys as a role names and corresponding validators as values. 

```typescript
RolesService    
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
RolesService.flushRoles();
```

Alternatively you can use `removeRole` to delete defined role manually:

```typescript
RolesService.removeRole('USER');
```

Getting all roles
----------------------------

To get specific role use method `getRole`:

```javascript
let role = RolesService.getRole('roleName');
```

And to get all roles form `RolesService` use method `getRoles` or use `Observable roles$`:

```typescript
let roles = RolesService.getRoles();

RolesService.roles$.subscribe((data) => {
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
  
Permission module exposes directive `permissions` that can show/hide elements of your application based on set of permissions.

Permission directive accepts several attributes:

| Attribute             | Value                    | Description      |
| :----------------------|:------------------------:| :----------------|
| `permissionsOnly`     | <code>[String &#124; String[]]</code>   | Single or multiple permissions allowed to access content | 
| `permissionsExcept`   | <code>[String &#124; String[]]</code>   | Single or multiple permissions denied to access content|
| `(permissionsAuthorized)`   | EventEmitter       | EventEmitter emitted when authorized                         |
| `(permissionsUnauthorized)` | EventEmitter       | EventEmitter emitted when unAuthorized                       |
### Basic usage

Directives accepts either single permission that has to be met in order to display it's content:
 
```html
<ng-template permissions [permissionsOnly]="['ADMIN']" (permissionsAuthorized)="yourCustomAuthorizedFunction()" (permissionsUnauthorized)="yourCustomAuthorizedFunction()">
    <div>You can see this text congrats</div>
 </ng-template>
 <ng-template permissions [permissionsOnly]="'ADMIN'">
    <div>You can see this text congrats</div>
 </ng-template>
  <ng-template permissions permissionsOnly="ADMIN">
    <div>You can see this text congrats</div>
 </ng-template>
 
 <ng-template permissions [permissionsExcept]="['JOHNY']">
   <div> All will see it except JOHNY</div>
 </ng-template>
```

Or set of permissions separated by 'coma':

```html
<ng-template permissions [permissionsOnly]="['ADMIN', 'GUEST']">
    <div>You can see this text congrats</div>
</ng-template>

 <ng-template permissions [permissionsExcept]="['ADMIN', 'JOHNY']">
   <div>All will see it except admin and Johny</div>
 </ng-template>
```

Or just simply by *
```html
<div *permissionsOnly="['ADMIN', 'GUEST']">
    <div>You can see this text congrats</div>
</div>

 <div *permissionsExcept="['ADMIN', 'JOHNY']">
   <div>All will see it except admin and Johny</div>
 </div>
```
 > Note: You cant use `*` style with other * style directives like `*ngIf`. You should wrap them. And YES i don't like it either.
  ```html
   <div *permissionsOnly="['ADMIN', 'GUEST']">
    <div *ngIf="true">
      You can see this text congrats
    </div>
   </div>
   ```

Usage with Routes
----------------------------

1. [Introduction](#introduction)
2. [Property only and except](#property-only-and-except)
  1. [Single permission/role](#single-permissionrole)
  2. [Multiple permissions/roles](#multiple-permissionsroles) 
3. [Property redirectTo](#property-redirectto)
  1. [Single rule redirection](#single-redirection-rule)
4. [Common use cases](#common-use-cases)
  1. [Two guards when first make request for authorisation and gets permissions second checks for permissions](#two-guards-when-first-make-request-for-authorisation-and-gets-permissions-second-checks-for-permissions)

Introduction
----------------------------

Now you are ready to start working with controlling access to the states of your application. In order to restrict any state ngx-permission rely on angular-route's `data` property, reserving key `permissions` allowing to define authorization configuration.

Permissions object accepts following properties:

| Property        | Accepted value                   |
| :-------------- | :------------------------------- |
| `only`          | [`String`\|`Array`]              |
| `except`        | [`String`\|`Array`]              |
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

[//]: <> (> :fire: **Important**   
          > If you combine both `only` and `except` properties you have to make sure they are not excluding each other, because denied roles/permissions would not allow access the state for users even if allowed ones would pass them.   
)
 
#### Single permission/role 

In simplest cases you allow users having single role permission to access the state. To achieve that you can pass as `String` desired role/permission to only/except property:

```typescript
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { PermissionsGuard } from 'ngx-permissions';

const appRoutes: Routes = [
  { path: 'home',
    component: HomeComponent,
    canActivate: [PermissionsGuard],
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

In given case when user is trying to access `home` state `PermissionsGuard` service is called checking if `isAuthorized` permission is valid: 
  - if permission definition is not found it stops transition

#### Multiple permissions/roles 

Often several permissions/roles are sufficient to allow/deny user to access the state. Then array value comes in handy:  

```typescript
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { PermissionsGuard } from 'ngx-permissions';

const appRoutes: Routes = [
  { path: 'home',
    component: HomeComponent,
    canActivate: [PermissionsGuard],
    data: {
      permissions: {
        only: ['ADMIN', 'MODERATOR']
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

When `PermissionGuard` service will be called it would expect user to have either `ADMIN` or `MODERATOR` permissions to pass him to `home` route.

[//]: <> (> :bulb: **Note**   
          > Between values in array operator **OR** is used to create alternative. If you need **AND** operator between permissions define additional `PermRole` containing set of those. 
)

Property redirectTo
----------------------------

Property redirectTo:
  - when used as `String` defines single redirection rule

### Single redirection rule

In case you want to redirect to some specific state when user is not authorized pass to `redirectTo` path of that route.

```typescript
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { PermissionsGuard } from 'ngx-permissions';

const appRoutes: Routes = [
  { path: 'home',
    component: HomeComponent,
    canActivate: [PermissionsGuard],
    data: {
      permissions: {
        only: ['ADMIN', 'MODERATOR'],
        redirectTo: 'another-route'
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

----------------------------


##Common use cases

### Two guards when first make request for authorisation and gets permissions second checks for permissions

This method only works with `angular 4.3.2` or higher see https://github.com/angular/angular/issues/15670

There are a lot of times you have 2 guard one for authorisation when it makes request for permissions and second is permissions guard
and you want them to work in chain. To make them work in chain You should use them next

```typescript

let routes = [
  { path: '', 
    canActivate: [AuthGuard],
    children: [
      {path: 'component', 
      component: ComponentName, 
      canActivate: [PermissionsGuard],
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
> ```js 
    canActivate() {
        return authLogin().then(() => {
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
