import { Component, OnInit } from '@angular/core';
import { PermissionsService } from 'ngx-permissions';
import { RolesService } from 'ngx-permissions';

@Component({
  selector: 'app-isolate',
  templateUrl: './isolate.component.html',
  styleUrls: ['./isolate.component.css']
})
export class IsolateComponent implements OnInit {

  constructor(private permissionsService: PermissionsService,
              private roleService: RolesService) { }

  ngOnInit() {
    this.permissionsService.addPermission('GUEST')
  }

}
