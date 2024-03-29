import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LazyRolesAsyncTestComponent } from './lazy-roles-async-test.component';

xdescribe('LazyRolesAsyncTestComponent', () => {
  let component: LazyRolesAsyncTestComponent;
  let fixture: ComponentFixture<LazyRolesAsyncTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LazyRolesAsyncTestComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyRolesAsyncTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
