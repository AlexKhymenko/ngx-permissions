import { Injectable } from '@angular/core';

@Injectable()
export class AsyncTestService {

  constructor() { }


  public promiseResolveTrue() {
    return Promise.resolve(true);
  }

  public promiseResolveFalse() {
    return Promise.resolve(false);
  }

  public promiseReject() {
    return <any>Promise.reject(() => {

    });
  }
}
