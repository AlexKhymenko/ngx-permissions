import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initial-load',
  templateUrl: './initial-load.component.html',
  styleUrls: ['./initial-load.component.css']
})
export class InitialLoadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('i m loged')
  }

}
