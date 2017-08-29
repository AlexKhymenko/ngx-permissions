"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var lazy_role_isolate_test_component_1 = require("./lazy-role-isolate-test.component");
describe('LazyRoleIsolateTestComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [lazy_role_isolate_test_component_1.LazyRoleIsolateTestComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(lazy_role_isolate_test_component_1.LazyRoleIsolateTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
