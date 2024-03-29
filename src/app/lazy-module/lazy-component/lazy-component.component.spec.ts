import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LazyComponentComponent } from './lazy-component.component';

xdescribe('LazyComponentComponent', () => {
  let component: LazyComponentComponent;
  let fixture: ComponentFixture<LazyComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LazyComponentComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
