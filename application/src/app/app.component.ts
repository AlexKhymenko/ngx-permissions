import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { NgxPermissionsConfigurationService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private permissionsService: NgxPermissionsService, config: NgxPermissionsConfigurationService) {
    config.addPermissionStrategy("ADMIN", (templateref, permissions) => {
      let a = 0;
    })
  }

  ngOnInit(): void {
    // this.permissionsService.loadPermissions(['ADMIN']);
    this.permissionsService.addPermission('ADMIN', () => {
      // return false;
      return new Promise<boolean>((resolve, reject) => {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      })
    })

  }

  public unAuthorized() {
    console.log('unAuthorized');
  }

  public authorized() {
    console.log('authorizes')
  }

  public addPermission() {
    this.permissionsService.addPermission('CHECK_LOAD');
  }
}
