import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgxPermissionsService, NgxPermissionsConfigurationService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  permission: string[] = ['GUEST'];


  constructor(private permissionsService: NgxPermissionsService,
              private renderer2: Renderer2,
              private ngxPermissionsConfigurationService: NgxPermissionsConfigurationService) {

  }

  ngOnInit(): void {
    this.permissionsService.loadPermissions(['ADMIN']);
    this.ngxPermissionsConfigurationService.addPermissionStrategy('disable', (tF: any) => {
      this.renderer2.setAttribute(tF.elementRef.nativeElement.nextSibling, 'disabled', 'true');
    });

    this.ngxPermissionsConfigurationService.setDefaultOnUnauthorizedStrategy('disable');
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

  changeToAdmin() {
    this.permission = ['ADMIN'];
    console.log(this.permission);
  }

  changeToAnotherPermission() {
    this.permission = ['AWESOME'];
  }

  changeToGuest() {
    this.permission = ['GUEST'];
    console.log(this.permission);
  }


}
