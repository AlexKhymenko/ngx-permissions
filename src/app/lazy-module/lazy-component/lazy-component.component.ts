import { Component, OnInit } from '@angular/core';
import { NgxPermissionsConfigurationService } from 'ngx-permissions';

@Component({
    selector: 'app-lazy-component',
    templateUrl: './lazy-component.component.html',
    styleUrls: ['./lazy-component.component.scss'],
    standalone: false
})
export class LazyComponentComponent implements OnInit {

  constructor(private ngxConfService: NgxPermissionsConfigurationService) { }

  ngOnInit() {
    console.log(this.ngxConfService.onUnAuthorisedDefaultStrategy);
    console.log(this.ngxConfService.getAllStrategies());
  }

}
