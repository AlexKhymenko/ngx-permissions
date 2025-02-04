import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-initial-load',
    templateUrl: './initial-load.component.html',
    styleUrls: ['./initial-load.component.scss'],
    standalone: false
})
export class InitialLoadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('i m logged');
  }

}
