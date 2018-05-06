import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private permissionsService: NgxPermissionsService) {

  }

  ngOnInit(): void {
    this.permissionsService.loadPermissions(['ADMIN']);
  }

  public unAuthorized() {
    console.log('unAuthorized');
  }

  public authorized() {
    console.log('authorizes');
  }

  public addPermission() {
    this.permissionsService.addPermission('CHECK_LOAD');
  }
}
