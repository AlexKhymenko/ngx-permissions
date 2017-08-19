import { Component, OnInit } from '@angular/core';
import { RolesService } from 'ngx-permissions';

@Component({
  selector: 'app-lazy-role-isolate-test',
  templateUrl: './lazy-role-isolate-test.component.html',
  styleUrls: ['./lazy-role-isolate-test.component.css']
})
export class LazyRoleIsolateTestComponent implements OnInit {

  constructor(private rolesService: RolesService) { }

  ngOnInit() {
    this.rolesService.addRole('ADMIN', ['NICE']);
  }

}
