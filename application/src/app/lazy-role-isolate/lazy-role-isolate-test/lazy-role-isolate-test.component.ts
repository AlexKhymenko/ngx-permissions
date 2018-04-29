import { Component, OnInit, Renderer2, TemplateRef } from '@angular/core';
import { NgxRolesService, NgxPermissionsConfigurationService, NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-lazy-role-isolate-test',
  templateUrl: './lazy-role-isolate-test.component.html',
  styleUrls: ['./lazy-role-isolate-test.component.css']
})
export class LazyRoleIsolateTestComponent implements OnInit {

  constructor(private rolesService: NgxRolesService,
              private permissionsService: NgxPermissionsService,
              private renderer: Renderer2,
              private configService: NgxPermissionsConfigurationService) { }

  ngOnInit() {
    this.configService.addPermissionStrategy('lol', (tf: any) => {
      this.renderer.setAttribute(tf.elementRef.nativeElement.nextSibling, 'disabled', 'true');
    });

    this.configService.setDefaultOnUnauthorizedStrategy('lol');
    this.permissionsService.addPermission('ADMIN')
    this.rolesService.addRole('ADMIN', ['NICE']);
  }

}
