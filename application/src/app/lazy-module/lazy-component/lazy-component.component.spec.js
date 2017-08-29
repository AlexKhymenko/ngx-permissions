"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var lazy_component_component_1 = require("./lazy-component.component");
describe('LazyComponentComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [lazy_component_component_1.LazyComponentComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(lazy_component_component_1.LazyComponentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
