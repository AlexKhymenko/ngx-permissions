# ngx-permissions
============================

*Permission based access control for your angular applications*

## Installation

To install this library, run:

```bash
$ npm install ngx-permissions --save
```

## Consuming your library

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
import { NgxPermissions } from 'ngx-permissions';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
     NgxPermissions.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

SharedModule

If you use a SharedModule that you import in multiple other feature modules, you can export the TranslateModule to make sure you don't have to import it in every module.
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



Then use them in Your templates

| Attribute             | Value                    | Description      |
| ----------------------|:------------------------:| ----------------|
| `permissionsOnly`     | <code>[String &#124; String[]]</code>   | Single or multiple permissions allowed to access content | 
| `permissionsExcept`   | <code>[String &#124; String[]]</code>   | Single or multiple permissions denied to access content|

```xml
<!-- You can now use your library component in app.component.html -->
You can use as Array
<ng-template permissions [permissionsOnly]="['ADMIN']">
 I will not see it
</ng-template>
or as one string
<ng-template permissions [permissionsOnly]="'GUEST'">
  I will see it
</ng-template>

<ng-template permissions [permissionsExcept]="['ADMINNNN']">
  <div>I will see it except adminnnnnnn</div>
</ng-template>

<ng-template permissions [permissionsExcept]="['ADMIN']">
  <div>I Should not see it except admin</div>
</ng-template>
```

Usage with Routes
----------------------------

1. [Introduction](#introduction)
2. [Property only and except](#property-only-and-except)
  1. [Single permission/role](#single-permissionrole)
  2. [Multiple permissions/roles](#multiple-permissionsroles) 
3. [Property redirectTo](#property-redirectto)
  1. [Single rule redirection](#single-redirection-rule)

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

## License

MIT © [Oleksandr Khymenko](mailto:alexanderKhymenko@gmail.com)
