/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, Input, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
var NgxPermissionsAllowStubDirective = /** @class */ (function () {
    function NgxPermissionsAllowStubDirective(viewContainer, templateRef) {
        this.viewContainer = viewContainer;
        this.templateRef = templateRef;
        this.permissionsAuthorized = new EventEmitter();
        this.permissionsUnauthorized = new EventEmitter();
    }
    /**
     * @return {?}
     */
    NgxPermissionsAllowStubDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.getAuthorizedTemplate());
        this.permissionsUnauthorized.emit();
    };
    /**
     * @private
     * @return {?}
     */
    NgxPermissionsAllowStubDirective.prototype.getAuthorizedTemplate = /**
     * @private
     * @return {?}
     */
    function () {
        return this.ngxPermissionsOnlyThen ||
            this.ngxPermissionsExceptThen ||
            this.ngxPermissionsThen ||
            this.templateRef;
    };
    /** @nocollapse */
    NgxPermissionsAllowStubDirective.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: TemplateRef }
    ]; };
    NgxPermissionsAllowStubDirective.propDecorators = {
        ngxPermissionsOnly: [{ type: Input }],
        ngxPermissionsOnlyThen: [{ type: Input }],
        ngxPermissionsOnlyElse: [{ type: Input }],
        ngxPermissionsExcept: [{ type: Input }],
        ngxPermissionsExceptElse: [{ type: Input }],
        ngxPermissionsExceptThen: [{ type: Input }],
        ngxPermissionsThen: [{ type: Input }],
        ngxPermissionsElse: [{ type: Input }],
        ngxPermissionsOnlyAuthorisedStrategy: [{ type: Input }],
        ngxPermissionsOnlyUnauthorisedStrategy: [{ type: Input }],
        ngxPermissionsExceptUnauthorisedStrategy: [{ type: Input }],
        ngxPermissionsExceptAuthorisedStrategy: [{ type: Input }],
        ngxPermissionsUnauthorisedStrategy: [{ type: Input }],
        ngxPermissionsAuthorisedStrategy: [{ type: Input }],
        permissionsAuthorized: [{ type: Output }],
        permissionsUnauthorized: [{ type: Output }]
    };
NgxPermissionsAllowStubDirective.ngDirectiveDef = ɵngcc0.ɵɵdefineDirective({ type: NgxPermissionsAllowStubDirective, selectors: [["", "ngxPermissionsOnly", ""], ["", "ngxPermissionsExcept", ""]], factory: function NgxPermissionsAllowStubDirective_Factory(t) { return new (t || NgxPermissionsAllowStubDirective)(ɵngcc0.ɵɵdirectiveInject(ViewContainerRef), ɵngcc0.ɵɵdirectiveInject(TemplateRef)); }, inputs: { ngxPermissionsOnly: "ngxPermissionsOnly", ngxPermissionsOnlyThen: "ngxPermissionsOnlyThen", ngxPermissionsOnlyElse: "ngxPermissionsOnlyElse", ngxPermissionsExcept: "ngxPermissionsExcept", ngxPermissionsExceptElse: "ngxPermissionsExceptElse", ngxPermissionsExceptThen: "ngxPermissionsExceptThen", ngxPermissionsThen: "ngxPermissionsThen", ngxPermissionsElse: "ngxPermissionsElse", ngxPermissionsOnlyAuthorisedStrategy: "ngxPermissionsOnlyAuthorisedStrategy", ngxPermissionsOnlyUnauthorisedStrategy: "ngxPermissionsOnlyUnauthorisedStrategy", ngxPermissionsExceptUnauthorisedStrategy: "ngxPermissionsExceptUnauthorisedStrategy", ngxPermissionsExceptAuthorisedStrategy: "ngxPermissionsExceptAuthorisedStrategy", ngxPermissionsUnauthorisedStrategy: "ngxPermissionsUnauthorisedStrategy", ngxPermissionsAuthorisedStrategy: "ngxPermissionsAuthorisedStrategy" }, outputs: { permissionsAuthorized: "permissionsAuthorized", permissionsUnauthorized: "permissionsUnauthorized" } });
/*@__PURE__*/ ɵngcc0.ɵsetClassMetadata(NgxPermissionsAllowStubDirective, [{
        type: Directive,
        args: [{
                selector: '[ngxPermissionsOnly],[ngxPermissionsExcept]'
            }]
    }], function () { return [{ type: ViewContainerRef }, { type: TemplateRef }]; }, { viewContainer: [], templateRef: [], permissionsAuthorized: [{
            type: Output
        }], permissionsUnauthorized: [{
            type: Output
        }], ngOnInit: [], getAuthorizedTemplate: [], ngxPermissionsOnly: [{
            type: Input
        }], ngxPermissionsOnlyThen: [{
            type: Input
        }], ngxPermissionsOnlyElse: [{
            type: Input
        }], ngxPermissionsExcept: [{
            type: Input
        }], ngxPermissionsExceptElse: [{
            type: Input
        }], ngxPermissionsExceptThen: [{
            type: Input
        }], ngxPermissionsThen: [{
            type: Input
        }], ngxPermissionsElse: [{
            type: Input
        }], ngxPermissionsOnlyAuthorisedStrategy: [{
            type: Input
        }], ngxPermissionsOnlyUnauthorisedStrategy: [{
            type: Input
        }], ngxPermissionsExceptUnauthorisedStrategy: [{
            type: Input
        }], ngxPermissionsExceptAuthorisedStrategy: [{
            type: Input
        }], ngxPermissionsUnauthorisedStrategy: [{
            type: Input
        }], ngxPermissionsAuthorisedStrategy: [{
            type: Input
        }] });
    return NgxPermissionsAllowStubDirective;
}());
export { NgxPermissionsAllowStubDirective };
if (false) {
    /** @type {?} */
    NgxPermissionsAllowStubDirective.prototype.ngxPermissionsOnly;
    /** @type {?} */
    NgxPermissionsAllowStubDirective.prototype.ngxPermissionsOnlyThen;
    /** @type {?} */
    NgxPermissionsAllowStubDirective.prototype.ngxPermissionsOnlyElse;
    /** @type {?} */
    NgxPermissionsAllowStubDirective.prototype.ngxPermissionsExcept;
    /** @type {?} */
    NgxPermissionsAllowStubDirective.prototype.ngxPermissionsExceptElse;
    /** @type {?} */
    NgxPermissionsAllowStubDirective.prototype.ngxPermissionsExceptThen;
    /** @type {?} */
    NgxPermissionsAllowStubDirective.prototype.ngxPermissionsThen;
    /** @type {?} */
    NgxPermissionsAllowStubDirective.prototype.ngxPermissionsElse;
    /** @type {?} */
    NgxPermissionsAllowStubDirective.prototype.ngxPermissionsOnlyAuthorisedStrategy;
    /** @type {?} */
    NgxPermissionsAllowStubDirective.prototype.ngxPermissionsOnlyUnauthorisedStrategy;
    /** @type {?} */
    NgxPermissionsAllowStubDirective.prototype.ngxPermissionsExceptUnauthorisedStrategy;
    /** @type {?} */
    NgxPermissionsAllowStubDirective.prototype.ngxPermissionsExceptAuthorisedStrategy;
    /** @type {?} */
    NgxPermissionsAllowStubDirective.prototype.ngxPermissionsUnauthorisedStrategy;
    /** @type {?} */
    NgxPermissionsAllowStubDirective.prototype.ngxPermissionsAuthorisedStrategy;
    /** @type {?} */
    NgxPermissionsAllowStubDirective.prototype.permissionsAuthorized;
    /** @type {?} */
    NgxPermissionsAllowStubDirective.prototype.permissionsUnauthorized;
    /**
     * @type {?}
     * @private
     */
    NgxPermissionsAllowStubDirective.prototype.viewContainer;
    /**
     * @type {?}
     * @private
     */
    NgxPermissionsAllowStubDirective.prototype.templateRef;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL09sZWtzYW5kci5LaHltZW5rby9XZWJzdG9ybVByb2plY3RzL25neC1wZXJtaXNzaW9ucy9hcHBsaWNhdGlvbi9kaXN0L25neC1wZXJtaXNzaW9ucy9lc201L2xpYi90ZXN0aW5nL3Blcm1pc3Npb25zLWFsbG93LmRpcmVjdGl2ZS5zdHViLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQStCTSxBQUtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztjQXVCQSIsImZpbGUiOiJwZXJtaXNzaW9ucy1hbGxvdy5kaXJlY3RpdmUuc3R1Yi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3IGFkZGVkIGJ5IHRzaWNrbGVcclxuICogQHN1cHByZXNzIHtjaGVja1R5cGVzLGV4dHJhUmVxdWlyZSxtaXNzaW5nT3ZlcnJpZGUsbWlzc2luZ1JldHVybix1bnVzZWRQcml2YXRlTWVtYmVycyx1c2VsZXNzQ29kZX0gY2hlY2tlZCBieSB0c2NcclxuICovXHJcbmltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG52YXIgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBOZ3hQZXJtaXNzaW9uc0FsbG93U3R1YkRpcmVjdGl2ZSh2aWV3Q29udGFpbmVyLCB0ZW1wbGF0ZVJlZikge1xyXG4gICAgICAgIHRoaXMudmlld0NvbnRhaW5lciA9IHZpZXdDb250YWluZXI7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVJlZiA9IHRlbXBsYXRlUmVmO1xyXG4gICAgICAgIHRoaXMucGVybWlzc2lvbnNBdXRob3JpemVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgICAgIHRoaXMucGVybWlzc2lvbnNVbmF1dGhvcml6ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zQWxsb3dTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5uZ09uSW5pdCA9IC8qKlxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5nZXRBdXRob3JpemVkVGVtcGxhdGUoKSk7XHJcbiAgICAgICAgdGhpcy5wZXJtaXNzaW9uc1VuYXV0aG9yaXplZC5lbWl0KCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmUucHJvdG90eXBlLmdldEF1dGhvcml6ZWRUZW1wbGF0ZSA9IC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uZ3hQZXJtaXNzaW9uc09ubHlUaGVuIHx8XHJcbiAgICAgICAgICAgIHRoaXMubmd4UGVybWlzc2lvbnNFeGNlcHRUaGVuIHx8XHJcbiAgICAgICAgICAgIHRoaXMubmd4UGVybWlzc2lvbnNUaGVuIHx8XHJcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVSZWY7XHJcbiAgICB9O1xyXG4gICAgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmUuZGVjb3JhdG9ycyA9IFtcclxuICAgICAgICB7IHR5cGU6IERpcmVjdGl2ZSwgYXJnczogW3tcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ1tuZ3hQZXJtaXNzaW9uc09ubHldLFtuZ3hQZXJtaXNzaW9uc0V4Y2VwdF0nXHJcbiAgICAgICAgICAgICAgICB9LF0gfVxyXG4gICAgXTtcclxuICAgIC8qKiBAbm9jb2xsYXBzZSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmUuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXHJcbiAgICAgICAgeyB0eXBlOiBWaWV3Q29udGFpbmVyUmVmIH0sXHJcbiAgICAgICAgeyB0eXBlOiBUZW1wbGF0ZVJlZiB9XHJcbiAgICBdOyB9O1xyXG4gICAgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmUucHJvcERlY29yYXRvcnMgPSB7XHJcbiAgICAgICAgbmd4UGVybWlzc2lvbnNPbmx5OiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgICAgICBuZ3hQZXJtaXNzaW9uc09ubHlUaGVuOiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgICAgICBuZ3hQZXJtaXNzaW9uc09ubHlFbHNlOiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgICAgICBuZ3hQZXJtaXNzaW9uc0V4Y2VwdDogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICAgICAgbmd4UGVybWlzc2lvbnNFeGNlcHRFbHNlOiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgICAgICBuZ3hQZXJtaXNzaW9uc0V4Y2VwdFRoZW46IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgICAgIG5neFBlcm1pc3Npb25zVGhlbjogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICAgICAgbmd4UGVybWlzc2lvbnNFbHNlOiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgICAgICBuZ3hQZXJtaXNzaW9uc09ubHlBdXRob3Jpc2VkU3RyYXRlZ3k6IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgICAgIG5neFBlcm1pc3Npb25zT25seVVuYXV0aG9yaXNlZFN0cmF0ZWd5OiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgICAgICBuZ3hQZXJtaXNzaW9uc0V4Y2VwdFVuYXV0aG9yaXNlZFN0cmF0ZWd5OiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgICAgICBuZ3hQZXJtaXNzaW9uc0V4Y2VwdEF1dGhvcmlzZWRTdHJhdGVneTogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICAgICAgbmd4UGVybWlzc2lvbnNVbmF1dGhvcmlzZWRTdHJhdGVneTogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICAgICAgbmd4UGVybWlzc2lvbnNBdXRob3Jpc2VkU3RyYXRlZ3k6IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgICAgIHBlcm1pc3Npb25zQXV0aG9yaXplZDogW3sgdHlwZTogT3V0cHV0IH1dLFxyXG4gICAgICAgIHBlcm1pc3Npb25zVW5hdXRob3JpemVkOiBbeyB0eXBlOiBPdXRwdXQgfV1cclxuICAgIH07XHJcbiAgICByZXR1cm4gTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmU7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IE5neFBlcm1pc3Npb25zQWxsb3dTdHViRGlyZWN0aXZlIH07XHJcbmlmIChmYWxzZSkge1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zT25seTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zQWxsb3dTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc09ubHlUaGVuO1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zT25seUVsc2U7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0FsbG93U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNFeGNlcHQ7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0FsbG93U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNFeGNlcHRFbHNlO1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zRXhjZXB0VGhlbjtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zQWxsb3dTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc1RoZW47XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0FsbG93U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNFbHNlO1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zT25seUF1dGhvcmlzZWRTdHJhdGVneTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zQWxsb3dTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc09ubHlVbmF1dGhvcmlzZWRTdHJhdGVneTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zQWxsb3dTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc0V4Y2VwdFVuYXV0aG9yaXNlZFN0cmF0ZWd5O1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zRXhjZXB0QXV0aG9yaXNlZFN0cmF0ZWd5O1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zVW5hdXRob3Jpc2VkU3RyYXRlZ3k7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0FsbG93U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNBdXRob3Jpc2VkU3RyYXRlZ3k7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0FsbG93U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUucGVybWlzc2lvbnNBdXRob3JpemVkO1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmUucHJvdG90eXBlLnBlcm1pc3Npb25zVW5hdXRob3JpemVkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7P31cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zQWxsb3dTdHViRGlyZWN0aXZlLnByb3RvdHlwZS52aWV3Q29udGFpbmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7P31cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zQWxsb3dTdHViRGlyZWN0aXZlLnByb3RvdHlwZS50ZW1wbGF0ZVJlZjtcclxufVxyIl19