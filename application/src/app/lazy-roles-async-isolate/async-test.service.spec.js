"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var async_test_service_1 = require("./async-test.service");
describe('AsyncTestService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [async_test_service_1.AsyncTestService]
        });
    });
    it('should be created', testing_1.inject([async_test_service_1.AsyncTestService], function (service) {
        expect(service).toBeTruthy();
    }));
});
