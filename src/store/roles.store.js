"use strict";
exports.__esModule = true;
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var NgxRolesStore = /** @class */ (function () {
    function NgxRolesStore() {
        this.rolesSource = new BehaviorSubject_1.BehaviorSubject({});
        this.roles$ = this.rolesSource.asObservable();
    }
    return NgxRolesStore;
}());
exports.NgxRolesStore = NgxRolesStore;
