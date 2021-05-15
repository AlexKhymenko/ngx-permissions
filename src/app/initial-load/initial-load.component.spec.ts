import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InitialLoadComponent } from './initial-load.component';

xdescribe('InitialLoadComponent', () => {
  let component: InitialLoadComponent;
  let fixture: ComponentFixture<InitialLoadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InitialLoadComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
