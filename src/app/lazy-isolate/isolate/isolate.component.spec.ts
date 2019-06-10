import {NgxPermissionsAllowStubDirective} from 'ngx-permissions'
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsolateComponent } from './isolate.component';

describe('IsolateComponent', () => {
  let component: IsolateComponent;
  let fixture: ComponentFixture<IsolateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  IsolateComponent, NgxPermissionsAllowStubDirective ],
      imports: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsolateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
