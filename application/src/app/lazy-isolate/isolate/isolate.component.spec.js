"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var isolate_component_1 = require("./isolate.component");
describe('IsolateComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [isolate_component_1.IsolateComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(isolate_component_1.IsolateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
