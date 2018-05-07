"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
classifiedModuleName %  > Component;
from;
'./initial-load.component';
describe('InitialLoadComponent', function () {
    var component =  %  > Component;
    var fixture =  << , classifiedModuleName =  %  > Component > ;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [, classifiedModuleName %  > Component]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(, classifiedModuleName %  > Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
