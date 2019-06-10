/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, Input, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export class NgxPermissionsAllowStubDirective {
    /**
     * @param {?} viewContainer
     * @param {?} templateRef
     */
    constructor(viewContainer, templateRef) {
        this.viewContainer = viewContainer;
        this.templateRef = templateRef;
        this.permissionsAuthorized = new EventEmitter();
        this.permissionsUnauthorized = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.getAuthorizedTemplate());
        this.permissionsUnauthorized.emit();
    }
    /**
     * @private
     * @return {?}
     */
    getAuthorizedTemplate() {
        return this.ngxPermissionsOnlyThen ||
            this.ngxPermissionsExceptThen ||
            this.ngxPermissionsThen ||
            this.templateRef;
    }
}
NgxPermissionsAllowStubDirective.ngDirectiveDef = ɵngcc0.ɵɵdefineDirective({ type: NgxPermissionsAllowStubDirective, selectors: [["", "ngxPermissionsOnly", ""], ["", "ngxPermissionsExcept", ""]], factory: function NgxPermissionsAllowStubDirective_Factory(t) { return new (t || NgxPermissionsAllowStubDirective)(ɵngcc0.ɵɵdirectiveInject(ViewContainerRef), ɵngcc0.ɵɵdirectiveInject(TemplateRef)); }, inputs: { ngxPermissionsOnly: "ngxPermissionsOnly", ngxPermissionsOnlyThen: "ngxPermissionsOnlyThen", ngxPermissionsOnlyElse: "ngxPermissionsOnlyElse", ngxPermissionsExcept: "ngxPermissionsExcept", ngxPermissionsExceptElse: "ngxPermissionsExceptElse", ngxPermissionsExceptThen: "ngxPermissionsExceptThen", ngxPermissionsThen: "ngxPermissionsThen", ngxPermissionsElse: "ngxPermissionsElse", ngxPermissionsOnlyAuthorisedStrategy: "ngxPermissionsOnlyAuthorisedStrategy", ngxPermissionsOnlyUnauthorisedStrategy: "ngxPermissionsOnlyUnauthorisedStrategy", ngxPermissionsExceptUnauthorisedStrategy: "ngxPermissionsExceptUnauthorisedStrategy", ngxPermissionsExceptAuthorisedStrategy: "ngxPermissionsExceptAuthorisedStrategy", ngxPermissionsUnauthorisedStrategy: "ngxPermissionsUnauthorisedStrategy", ngxPermissionsAuthorisedStrategy: "ngxPermissionsAuthorisedStrategy" }, outputs: { permissionsAuthorized: "permissionsAuthorized", permissionsUnauthorized: "permissionsUnauthorized" } });
/*@__PURE__*/ ɵngcc0.ɵsetClassMetadata(NgxPermissionsAllowStubDirective, [{
        type: Directive,
        args: [{
                selector: '[ngxPermissionsOnly],[ngxPermissionsExcept]'
            }]
    }], function () { return [{ type: ViewContainerRef }, { type: TemplateRef }]; }, { constructor: [], viewContainer: [], templateRef: [], permissionsAuthorized: [{
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
/** @nocollapse */
NgxPermissionsAllowStubDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: TemplateRef }
];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL09sZWtzYW5kci5LaHltZW5rby9XZWJzdG9ybVByb2plY3RzL25neC1wZXJtaXNzaW9ucy9kaXN0L25neC1wZXJtaXNzaW9ucy9lc20yMDE1L2xpYi90ZXN0aW5nL3Blcm1pc3Npb25zLWFsbG93LmRpcmVjdGl2ZS5zdHViLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0E2QkMsYUFLQyIsImZpbGUiOiJwZXJtaXNzaW9ucy1hbGxvdy5kaXJlY3RpdmUuc3R1Yi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3IGFkZGVkIGJ5IHRzaWNrbGVcclxuICogQHN1cHByZXNzIHtjaGVja1R5cGVzLGV4dHJhUmVxdWlyZSxtaXNzaW5nT3ZlcnJpZGUsbWlzc2luZ1JldHVybix1bnVzZWRQcml2YXRlTWVtYmVycyx1c2VsZXNzQ29kZX0gY2hlY2tlZCBieSB0c2NcclxuICovXHJcbmltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5leHBvcnQgY2xhc3MgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gez99IHZpZXdDb250YWluZXJcclxuICAgICAqIEBwYXJhbSB7P30gdGVtcGxhdGVSZWZcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iodmlld0NvbnRhaW5lciwgdGVtcGxhdGVSZWYpIHtcclxuICAgICAgICB0aGlzLnZpZXdDb250YWluZXIgPSB2aWV3Q29udGFpbmVyO1xyXG4gICAgICAgIHRoaXMudGVtcGxhdGVSZWYgPSB0ZW1wbGF0ZVJlZjtcclxuICAgICAgICB0aGlzLnBlcm1pc3Npb25zQXV0aG9yaXplZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgICAgICB0aGlzLnBlcm1pc3Npb25zVW5hdXRob3JpemVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnZpZXdDb250YWluZXIuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMuZ2V0QXV0aG9yaXplZFRlbXBsYXRlKCkpO1xyXG4gICAgICAgIHRoaXMucGVybWlzc2lvbnNVbmF1dGhvcml6ZWQuZW1pdCgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZ2V0QXV0aG9yaXplZFRlbXBsYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5neFBlcm1pc3Npb25zT25seVRoZW4gfHxcclxuICAgICAgICAgICAgdGhpcy5uZ3hQZXJtaXNzaW9uc0V4Y2VwdFRoZW4gfHxcclxuICAgICAgICAgICAgdGhpcy5uZ3hQZXJtaXNzaW9uc1RoZW4gfHxcclxuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZVJlZjtcclxuICAgIH1cclxufVxyXG5OZ3hQZXJtaXNzaW9uc0FsbG93U3R1YkRpcmVjdGl2ZS5kZWNvcmF0b3JzID0gW1xyXG4gICAgeyB0eXBlOiBEaXJlY3RpdmUsIGFyZ3M6IFt7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ1tuZ3hQZXJtaXNzaW9uc09ubHldLFtuZ3hQZXJtaXNzaW9uc0V4Y2VwdF0nXHJcbiAgICAgICAgICAgIH0sXSB9XHJcbl07XHJcbi8qKiBAbm9jb2xsYXBzZSAqL1xyXG5OZ3hQZXJtaXNzaW9uc0FsbG93U3R1YkRpcmVjdGl2ZS5jdG9yUGFyYW1ldGVycyA9ICgpID0+IFtcclxuICAgIHsgdHlwZTogVmlld0NvbnRhaW5lclJlZiB9LFxyXG4gICAgeyB0eXBlOiBUZW1wbGF0ZVJlZiB9XHJcbl07XHJcbk5neFBlcm1pc3Npb25zQWxsb3dTdHViRGlyZWN0aXZlLnByb3BEZWNvcmF0b3JzID0ge1xyXG4gICAgbmd4UGVybWlzc2lvbnNPbmx5OiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgIG5neFBlcm1pc3Npb25zT25seVRoZW46IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgbmd4UGVybWlzc2lvbnNPbmx5RWxzZTogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICBuZ3hQZXJtaXNzaW9uc0V4Y2VwdDogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICBuZ3hQZXJtaXNzaW9uc0V4Y2VwdEVsc2U6IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgbmd4UGVybWlzc2lvbnNFeGNlcHRUaGVuOiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgIG5neFBlcm1pc3Npb25zVGhlbjogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICBuZ3hQZXJtaXNzaW9uc0Vsc2U6IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgbmd4UGVybWlzc2lvbnNPbmx5QXV0aG9yaXNlZFN0cmF0ZWd5OiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgIG5neFBlcm1pc3Npb25zT25seVVuYXV0aG9yaXNlZFN0cmF0ZWd5OiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgIG5neFBlcm1pc3Npb25zRXhjZXB0VW5hdXRob3Jpc2VkU3RyYXRlZ3k6IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgbmd4UGVybWlzc2lvbnNFeGNlcHRBdXRob3Jpc2VkU3RyYXRlZ3k6IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgbmd4UGVybWlzc2lvbnNVbmF1dGhvcmlzZWRTdHJhdGVneTogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICBuZ3hQZXJtaXNzaW9uc0F1dGhvcmlzZWRTdHJhdGVneTogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICBwZXJtaXNzaW9uc0F1dGhvcml6ZWQ6IFt7IHR5cGU6IE91dHB1dCB9XSxcclxuICAgIHBlcm1pc3Npb25zVW5hdXRob3JpemVkOiBbeyB0eXBlOiBPdXRwdXQgfV1cclxufTtcclxuaWYgKGZhbHNlKSB7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0FsbG93U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNPbmx5O1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zT25seVRoZW47XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0FsbG93U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNPbmx5RWxzZTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zQWxsb3dTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc0V4Y2VwdDtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zQWxsb3dTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc0V4Y2VwdEVsc2U7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0FsbG93U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNFeGNlcHRUaGVuO1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zVGhlbjtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zQWxsb3dTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc0Vsc2U7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0FsbG93U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNPbmx5QXV0aG9yaXNlZFN0cmF0ZWd5O1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zT25seVVuYXV0aG9yaXNlZFN0cmF0ZWd5O1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zRXhjZXB0VW5hdXRob3Jpc2VkU3RyYXRlZ3k7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0FsbG93U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNFeGNlcHRBdXRob3Jpc2VkU3RyYXRlZ3k7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0FsbG93U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNVbmF1dGhvcmlzZWRTdHJhdGVneTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zQWxsb3dTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc0F1dGhvcmlzZWRTdHJhdGVneTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zQWxsb3dTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5wZXJtaXNzaW9uc0F1dGhvcml6ZWQ7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc0FsbG93U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUucGVybWlzc2lvbnNVbmF1dGhvcml6ZWQ7XHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHs/fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmUucHJvdG90eXBlLnZpZXdDb250YWluZXI7XHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHs/fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmUucHJvdG90eXBlLnRlbXBsYXRlUmVmO1xyXG59XHIiXX0=