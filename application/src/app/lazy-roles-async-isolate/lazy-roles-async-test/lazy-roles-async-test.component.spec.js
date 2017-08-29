"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var lazy_roles_async_test_component_1 = require("./lazy-roles-async-test.component");
describe('LazyRolesAsyncTestComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [lazy_roles_async_test_component_1.LazyRolesAsyncTestComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(lazy_roles_async_test_component_1.LazyRolesAsyncTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
