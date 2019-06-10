import { TestBed, inject } from '@angular/core/testing';

import { AsyncTestService } from './async-test.service';

xdescribe('AsyncTestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsyncTestService]
    });
  });

  it('should be created', inject([AsyncTestService], (service: AsyncTestService) => {
    expect(service).toBeTruthy();
  }));
});
