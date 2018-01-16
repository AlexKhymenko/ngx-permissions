"use strict";
exports.__esModule = true;
var module_1 = require();
if (viewEncapsulation) {
     %  > , ViewEncapsulation <  % ;
}
 %  >  % ;
if (changeDetection) {
     %  > , ChangeDetectionStrategy <  % ;
}
 %  > ;
from;
'@angular/core';
if (inlineTemplate) {
     %  >
        template;
    "\n    <p>\n      initial-load Works!\n    </p>\n  ",  % ;
}
else {
     %  >
        templateUrl;
    './initial-load.component.html',  % ;
}
if (inlineStyle) {
     %  >
        styles;
    [] <  % ;
}
else {
     %  >
        styleUrls;
    ['./initial-load.component.css'] <  % ;
}
 %  >  % ;
if (viewEncapsulation) {
     %  > ,
        encapsulation;
    ViewEncapsulation. < ;
    viewEncapsulation %  >  % ;
}
if (changeDetection) {
     %  > ,
        changeDetection;
    ChangeDetectionStrategy. < ;
    changeDetection %  >  % ;
}
 %  >
;
var default_1 = (function () {
    function default_1() {
    }
    return default_1;
}());
 %  > module_1.Component;
implements;
module_1.OnInit;
{
    constructor();
    { }
    ngOnInit();
    {
    }
}
