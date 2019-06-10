import { Component, OnInit } from '@angular/core';
import { NgxPermissionsConfigurationService } from 'ngx-permissions'
@Component({
  selector: 'app-lazy-component',
  templateUrl: './lazy-component.component.html',
  styleUrls: ['./lazy-component.component.css']
})
export class LazyComponentComponent implements OnInit {

  constructor(private ngxconfService: NgxPermissionsConfigurationService) { }

  ngOnInit() {
    console.log(this.ngxconfService.onUnAuthorisedDefaultStrategy);
    console.log(this.ngxconfService.getAllStrategies());
  }

}
