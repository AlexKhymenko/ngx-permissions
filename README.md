# ngx-permissions

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
