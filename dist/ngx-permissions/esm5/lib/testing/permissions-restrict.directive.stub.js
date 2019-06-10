/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, Input, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
var NgxPermissionsRestrictStubDirective = /** @class */ (function () {
    function NgxPermissionsRestrictStubDirective(viewContainer) {
        this.viewContainer = viewContainer;
        this.permissionsAuthorized = new EventEmitter();
        this.permissionsUnauthorized = new EventEmitter();
    }
    /**
     * @return {?}
     */
    NgxPermissionsRestrictStubDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.viewContainer.clear();
        if (this.getUnAuthorizedTemplate()) {
            this.viewContainer.createEmbeddedView(this.getUnAuthorizedTemplate());
        }
        this.permissionsUnauthorized.emit();
    };
    /**
     * @private
     * @return {?}
     */
    NgxPermissionsRestrictStubDirective.prototype.getUnAuthorizedTemplate = /**
     * @private
     * @return {?}
     */
    function () {
        return this.ngxPermissionsOnlyElse ||
            this.ngxPermissionsExceptElse ||
            this.ngxPermissionsElse;
    };
    /** @nocollapse */
    NgxPermissionsRestrictStubDirective.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    NgxPermissionsRestrictStubDirective.propDecorators = {
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
NgxPermissionsRestrictStubDirective.ngDirectiveDef = ɵngcc0.ɵɵdefineDirective({ type: NgxPermissionsRestrictStubDirective, selectors: [["", "ngxPermissionsOnly", ""], ["", "ngxPermissionsExcept", ""]], factory: function NgxPermissionsRestrictStubDirective_Factory(t) { return new (t || NgxPermissionsRestrictStubDirective)(ɵngcc0.ɵɵdirectiveInject(ViewContainerRef)); }, inputs: { ngxPermissionsOnly: "ngxPermissionsOnly", ngxPermissionsOnlyThen: "ngxPermissionsOnlyThen", ngxPermissionsOnlyElse: "ngxPermissionsOnlyElse", ngxPermissionsExcept: "ngxPermissionsExcept", ngxPermissionsExceptElse: "ngxPermissionsExceptElse", ngxPermissionsExceptThen: "ngxPermissionsExceptThen", ngxPermissionsThen: "ngxPermissionsThen", ngxPermissionsElse: "ngxPermissionsElse", ngxPermissionsOnlyAuthorisedStrategy: "ngxPermissionsOnlyAuthorisedStrategy", ngxPermissionsOnlyUnauthorisedStrategy: "ngxPermissionsOnlyUnauthorisedStrategy", ngxPermissionsExceptUnauthorisedStrategy: "ngxPermissionsExceptUnauthorisedStrategy", ngxPermissionsExceptAuthorisedStrategy: "ngxPermissionsExceptAuthorisedStrategy", ngxPermissionsUnauthorisedStrategy: "ngxPermissionsUnauthorisedStrategy", ngxPermissionsAuthorisedStrategy: "ngxPermissionsAuthorisedStrategy" }, outputs: { permissionsAuthorized: "permissionsAuthorized", permissionsUnauthorized: "permissionsUnauthorized" } });
/*@__PURE__*/ ɵngcc0.ɵsetClassMetadata(NgxPermissionsRestrictStubDirective, [{
        type: Directive,
        args: [{
                selector: '[ngxPermissionsOnly],[ngxPermissionsExcept]'
            }]
    }], function () { return [{ type: ViewContainerRef }]; }, { viewContainer: [], permissionsAuthorized: [{
            type: Output
        }], permissionsUnauthorized: [{
            type: Output
        }], ngOnInit: [], getUnAuthorizedTemplate: [], ngxPermissionsOnly: [{
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
    return NgxPermissionsRestrictStubDirective;
}());
export { NgxPermissionsRestrictStubDirective };
if (false) {
    /** @type {?} */
    NgxPermissionsRestrictStubDirective.prototype.ngxPermissionsOnly;
    /** @type {?} */
    NgxPermissionsRestrictStubDirective.prototype.ngxPermissionsOnlyThen;
    /** @type {?} */
    NgxPermissionsRestrictStubDirective.prototype.ngxPermissionsOnlyElse;
    /** @type {?} */
    NgxPermissionsRestrictStubDirective.prototype.ngxPermissionsExcept;
    /** @type {?} */
    NgxPermissionsRestrictStubDirective.prototype.ngxPermissionsExceptElse;
    /** @type {?} */
    NgxPermissionsRestrictStubDirective.prototype.ngxPermissionsExceptThen;
    /** @type {?} */
    NgxPermissionsRestrictStubDirective.prototype.ngxPermissionsThen;
    /** @type {?} */
    NgxPermissionsRestrictStubDirective.prototype.ngxPermissionsElse;
    /** @type {?} */
    NgxPermissionsRestrictStubDirective.prototype.ngxPermissionsOnlyAuthorisedStrategy;
    /** @type {?} */
    NgxPermissionsRestrictStubDirective.prototype.ngxPermissionsOnlyUnauthorisedStrategy;
    /** @type {?} */
    NgxPermissionsRestrictStubDirective.prototype.ngxPermissionsExceptUnauthorisedStrategy;
    /** @type {?} */
    NgxPermissionsRestrictStubDirective.prototype.ngxPermissionsExceptAuthorisedStrategy;
    /** @type {?} */
    NgxPermissionsRestrictStubDirective.prototype.ngxPermissionsUnauthorisedStrategy;
    /** @type {?} */
    NgxPermissionsRestrictStubDirective.prototype.ngxPermissionsAuthorisedStrategy;
    /** @type {?} */
    NgxPermissionsRestrictStubDirective.prototype.permissionsAuthorized;
    /** @type {?} */
    NgxPermissionsRestrictStubDirective.prototype.permissionsUnauthorized;
    /**
     * @type {?}
     * @private
     */
    NgxPermissionsRestrictStubDirective.prototype.viewContainer;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL09sZWtzYW5kci5LaHltZW5rby9XZWJzdG9ybVByb2plY3RzL25neC1wZXJtaXNzaW9ucy9hcHBsaWNhdGlvbi9kaXN0L25neC1wZXJtaXNzaW9ucy9lc201L2xpYi90ZXN0aW5nL3Blcm1pc3Npb25zLXJlc3RyaWN0LmRpcmVjdGl2ZS5zdHViLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQStCTSxBQUtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2NBc0JBIiwiZmlsZSI6InBlcm1pc3Npb25zLXJlc3RyaWN0LmRpcmVjdGl2ZS5zdHViLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcgYWRkZWQgYnkgdHNpY2tsZVxyXG4gKiBAc3VwcHJlc3Mge2NoZWNrVHlwZXMsZXh0cmFSZXF1aXJlLG1pc3NpbmdPdmVycmlkZSxtaXNzaW5nUmV0dXJuLHVudXNlZFByaXZhdGVNZW1iZXJzLHVzZWxlc3NDb2RlfSBjaGVja2VkIGJ5IHRzY1xyXG4gKi9cclxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbnZhciBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1YkRpcmVjdGl2ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlKHZpZXdDb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLnZpZXdDb250YWluZXIgPSB2aWV3Q29udGFpbmVyO1xyXG4gICAgICAgIHRoaXMucGVybWlzc2lvbnNBdXRob3JpemVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgICAgIHRoaXMucGVybWlzc2lvbnNVbmF1dGhvcml6ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm4gez99XHJcbiAgICAgKi9cclxuICAgIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5uZ09uSW5pdCA9IC8qKlxyXG4gICAgICogQHJldHVybiB7P31cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xyXG4gICAgICAgIGlmICh0aGlzLmdldFVuQXV0aG9yaXplZFRlbXBsYXRlKCkpIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLmdldFVuQXV0aG9yaXplZFRlbXBsYXRlKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBlcm1pc3Npb25zVW5hdXRob3JpemVkLmVtaXQoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUuZ2V0VW5BdXRob3JpemVkVGVtcGxhdGUgPSAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmd4UGVybWlzc2lvbnNPbmx5RWxzZSB8fFxyXG4gICAgICAgICAgICB0aGlzLm5neFBlcm1pc3Npb25zRXhjZXB0RWxzZSB8fFxyXG4gICAgICAgICAgICB0aGlzLm5neFBlcm1pc3Npb25zRWxzZTtcclxuICAgIH07XHJcbiAgICBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1YkRpcmVjdGl2ZS5kZWNvcmF0b3JzID0gW1xyXG4gICAgICAgIHsgdHlwZTogRGlyZWN0aXZlLCBhcmdzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnW25neFBlcm1pc3Npb25zT25seV0sW25neFBlcm1pc3Npb25zRXhjZXB0XSdcclxuICAgICAgICAgICAgICAgIH0sXSB9XHJcbiAgICBdO1xyXG4gICAgLyoqIEBub2NvbGxhcHNlICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1YkRpcmVjdGl2ZS5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcclxuICAgICAgICB7IHR5cGU6IFZpZXdDb250YWluZXJSZWYgfVxyXG4gICAgXTsgfTtcclxuICAgIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlLnByb3BEZWNvcmF0b3JzID0ge1xyXG4gICAgICAgIG5neFBlcm1pc3Npb25zT25seTogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICAgICAgbmd4UGVybWlzc2lvbnNPbmx5VGhlbjogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICAgICAgbmd4UGVybWlzc2lvbnNPbmx5RWxzZTogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICAgICAgbmd4UGVybWlzc2lvbnNFeGNlcHQ6IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgICAgIG5neFBlcm1pc3Npb25zRXhjZXB0RWxzZTogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICAgICAgbmd4UGVybWlzc2lvbnNFeGNlcHRUaGVuOiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgICAgICBuZ3hQZXJtaXNzaW9uc1RoZW46IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgICAgIG5neFBlcm1pc3Npb25zRWxzZTogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICAgICAgbmd4UGVybWlzc2lvbnNPbmx5QXV0aG9yaXNlZFN0cmF0ZWd5OiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgICAgICBuZ3hQZXJtaXNzaW9uc09ubHlVbmF1dGhvcmlzZWRTdHJhdGVneTogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICAgICAgbmd4UGVybWlzc2lvbnNFeGNlcHRVbmF1dGhvcmlzZWRTdHJhdGVneTogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICAgICAgbmd4UGVybWlzc2lvbnNFeGNlcHRBdXRob3Jpc2VkU3RyYXRlZ3k6IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgICAgIG5neFBlcm1pc3Npb25zVW5hdXRob3Jpc2VkU3RyYXRlZ3k6IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgICAgIG5neFBlcm1pc3Npb25zQXV0aG9yaXNlZFN0cmF0ZWd5OiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgICAgICBwZXJtaXNzaW9uc0F1dGhvcml6ZWQ6IFt7IHR5cGU6IE91dHB1dCB9XSxcclxuICAgICAgICBwZXJtaXNzaW9uc1VuYXV0aG9yaXplZDogW3sgdHlwZTogT3V0cHV0IH1dXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlO1xyXG59KCkpO1xyXG5leHBvcnQgeyBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1YkRpcmVjdGl2ZSB9O1xyXG5pZiAoZmFsc2UpIHtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc09ubHk7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNPbmx5VGhlbjtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc09ubHlFbHNlO1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNSZXN0cmljdFN0dWJEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zRXhjZXB0O1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNSZXN0cmljdFN0dWJEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zRXhjZXB0RWxzZTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc0V4Y2VwdFRoZW47XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNUaGVuO1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNSZXN0cmljdFN0dWJEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zRWxzZTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc09ubHlBdXRob3Jpc2VkU3RyYXRlZ3k7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNPbmx5VW5hdXRob3Jpc2VkU3RyYXRlZ3k7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNFeGNlcHRVbmF1dGhvcmlzZWRTdHJhdGVneTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc0V4Y2VwdEF1dGhvcmlzZWRTdHJhdGVneTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc1VuYXV0aG9yaXNlZFN0cmF0ZWd5O1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNSZXN0cmljdFN0dWJEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zQXV0aG9yaXNlZFN0cmF0ZWd5O1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNSZXN0cmljdFN0dWJEaXJlY3RpdmUucHJvdG90eXBlLnBlcm1pc3Npb25zQXV0aG9yaXplZDtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5wZXJtaXNzaW9uc1VuYXV0aG9yaXplZDtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgez99XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUudmlld0NvbnRhaW5lcjtcclxufVxyIl19