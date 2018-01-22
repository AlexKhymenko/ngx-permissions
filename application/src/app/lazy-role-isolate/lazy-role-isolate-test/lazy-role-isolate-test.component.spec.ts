import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyRoleIsolateTestComponent } from './lazy-role-isolate-test.component';

xdescribe('LazyRoleIsolateTestComponent', () => {
  let component: LazyRoleIsolateTestComponent;
  let fixture: ComponentFixture<LazyRoleIsolateTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyRoleIsolateTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyRoleIsolateTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
