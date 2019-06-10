import { Component, OnInit } from '@angular/core';
import { NgxRolesService } from 'ngx-permissions';
import { AsyncTestService } from '../async-test.service';

@Component({
  selector: 'app-lazy-roles-async-test',
  templateUrl: './lazy-roles-async-test.component.html',
  styleUrls: ['./lazy-roles-async-test.component.css']
})
export class LazyRolesAsyncTestComponent implements OnInit {

  constructor(private rolesServices: NgxRolesService, private asyncTest: AsyncTestService) { }

  ngOnInit() {
    this.rolesServices.addRole("ADMIN_TRUE", () => {
      return true;
    });

    this.rolesServices.addRole("ADMIN_FALSE", () => {
      return false;
    });

    this.rolesServices.addRole("ADMIN_RESOLVE_TRUE", () => {
      return this.asyncTest.promiseResolveTrue();
    });

    this.rolesServices.addRole("ADMIN_RESOLVE_FALSE", () => {
      return this.asyncTest.promiseResolveFalse();
    });

    this.rolesServices.addRole("ADMIN_REJECT", () => {
      return this.asyncTest.promiseReject();
    })

    console.log(this.rolesServices.getRoles());
  }

}
