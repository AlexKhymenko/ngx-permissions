import { Component, OnInit } from '@angular/core';
import { NgxRolesService } from 'ngx-permissions';

@Component({
  selector: 'app-lazy-role-isolate-test',
  templateUrl: './lazy-role-isolate-test.component.html',
  styleUrls: ['./lazy-role-isolate-test.component.css']
})
export class LazyRoleIsolateTestComponent implements OnInit {

  constructor(private rolesService: NgxRolesService) { }

  ngOnInit() {
    this.rolesService.addRole('ADMIN', ['NICE']);
  }

}
