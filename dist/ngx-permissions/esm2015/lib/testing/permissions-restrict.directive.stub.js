/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, Input, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export class NgxPermissionsRestrictStubDirective {
    /**
     * @param {?} viewContainer
     */
    constructor(viewContainer) {
        this.viewContainer = viewContainer;
        this.permissionsAuthorized = new EventEmitter();
        this.permissionsUnauthorized = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.viewContainer.clear();
        if (this.getUnAuthorizedTemplate()) {
            this.viewContainer.createEmbeddedView(this.getUnAuthorizedTemplate());
        }
        this.permissionsUnauthorized.emit();
    }
    /**
     * @private
     * @return {?}
     */
    getUnAuthorizedTemplate() {
        return this.ngxPermissionsOnlyElse ||
            this.ngxPermissionsExceptElse ||
            this.ngxPermissionsElse;
    }
}
NgxPermissionsRestrictStubDirective.ngDirectiveDef = ɵngcc0.ɵɵdefineDirective({ type: NgxPermissionsRestrictStubDirective, selectors: [["", "ngxPermissionsOnly", ""], ["", "ngxPermissionsExcept", ""]], factory: function NgxPermissionsRestrictStubDirective_Factory(t) { return new (t || NgxPermissionsRestrictStubDirective)(ɵngcc0.ɵɵdirectiveInject(ViewContainerRef)); }, inputs: { ngxPermissionsOnly: "ngxPermissionsOnly", ngxPermissionsOnlyThen: "ngxPermissionsOnlyThen", ngxPermissionsOnlyElse: "ngxPermissionsOnlyElse", ngxPermissionsExcept: "ngxPermissionsExcept", ngxPermissionsExceptElse: "ngxPermissionsExceptElse", ngxPermissionsExceptThen: "ngxPermissionsExceptThen", ngxPermissionsThen: "ngxPermissionsThen", ngxPermissionsElse: "ngxPermissionsElse", ngxPermissionsOnlyAuthorisedStrategy: "ngxPermissionsOnlyAuthorisedStrategy", ngxPermissionsOnlyUnauthorisedStrategy: "ngxPermissionsOnlyUnauthorisedStrategy", ngxPermissionsExceptUnauthorisedStrategy: "ngxPermissionsExceptUnauthorisedStrategy", ngxPermissionsExceptAuthorisedStrategy: "ngxPermissionsExceptAuthorisedStrategy", ngxPermissionsUnauthorisedStrategy: "ngxPermissionsUnauthorisedStrategy", ngxPermissionsAuthorisedStrategy: "ngxPermissionsAuthorisedStrategy" }, outputs: { permissionsAuthorized: "permissionsAuthorized", permissionsUnauthorized: "permissionsUnauthorized" } });
/*@__PURE__*/ ɵngcc0.ɵsetClassMetadata(NgxPermissionsRestrictStubDirective, [{
        type: Directive,
        args: [{
                selector: '[ngxPermissionsOnly],[ngxPermissionsExcept]'
            }]
    }], function () { return [{ type: ViewContainerRef }]; }, { constructor: [], viewContainer: [], permissionsAuthorized: [{
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
/** @nocollapse */
NgxPermissionsRestrictStubDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL09sZWtzYW5kci5LaHltZW5rby9XZWJzdG9ybVByb2plY3RzL25neC1wZXJtaXNzaW9ucy9kaXN0L25neC1wZXJtaXNzaW9ucy9lc20yMDE1L2xpYi90ZXN0aW5nL3Blcm1pc3Npb25zLXJlc3RyaWN0LmRpcmVjdGl2ZS5zdHViLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTRCQyxhQUtDIiwiZmlsZSI6InBlcm1pc3Npb25zLXJlc3RyaWN0LmRpcmVjdGl2ZS5zdHViLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcgYWRkZWQgYnkgdHNpY2tsZVxyXG4gKiBAc3VwcHJlc3Mge2NoZWNrVHlwZXMsZXh0cmFSZXF1aXJlLG1pc3NpbmdPdmVycmlkZSxtaXNzaW5nUmV0dXJuLHVudXNlZFByaXZhdGVNZW1iZXJzLHVzZWxlc3NDb2RlfSBjaGVja2VkIGJ5IHRzY1xyXG4gKi9cclxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmV4cG9ydCBjbGFzcyBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1YkRpcmVjdGl2ZSB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7P30gdmlld0NvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih2aWV3Q29udGFpbmVyKSB7XHJcbiAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyID0gdmlld0NvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLnBlcm1pc3Npb25zQXV0aG9yaXplZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgICAgICB0aGlzLnBlcm1pc3Npb25zVW5hdXRob3JpemVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnZpZXdDb250YWluZXIuY2xlYXIoKTtcclxuICAgICAgICBpZiAodGhpcy5nZXRVbkF1dGhvcml6ZWRUZW1wbGF0ZSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5nZXRVbkF1dGhvcml6ZWRUZW1wbGF0ZSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wZXJtaXNzaW9uc1VuYXV0aG9yaXplZC5lbWl0KCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJuIHs/fVxyXG4gICAgICovXHJcbiAgICBnZXRVbkF1dGhvcml6ZWRUZW1wbGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uZ3hQZXJtaXNzaW9uc09ubHlFbHNlIHx8XHJcbiAgICAgICAgICAgIHRoaXMubmd4UGVybWlzc2lvbnNFeGNlcHRFbHNlIHx8XHJcbiAgICAgICAgICAgIHRoaXMubmd4UGVybWlzc2lvbnNFbHNlO1xyXG4gICAgfVxyXG59XHJcbk5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlLmRlY29yYXRvcnMgPSBbXHJcbiAgICB7IHR5cGU6IERpcmVjdGl2ZSwgYXJnczogW3tcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnW25neFBlcm1pc3Npb25zT25seV0sW25neFBlcm1pc3Npb25zRXhjZXB0XSdcclxuICAgICAgICAgICAgfSxdIH1cclxuXTtcclxuLyoqIEBub2NvbGxhcHNlICovXHJcbk5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlLmN0b3JQYXJhbWV0ZXJzID0gKCkgPT4gW1xyXG4gICAgeyB0eXBlOiBWaWV3Q29udGFpbmVyUmVmIH1cclxuXTtcclxuTmd4UGVybWlzc2lvbnNSZXN0cmljdFN0dWJEaXJlY3RpdmUucHJvcERlY29yYXRvcnMgPSB7XHJcbiAgICBuZ3hQZXJtaXNzaW9uc09ubHk6IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgbmd4UGVybWlzc2lvbnNPbmx5VGhlbjogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICBuZ3hQZXJtaXNzaW9uc09ubHlFbHNlOiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgIG5neFBlcm1pc3Npb25zRXhjZXB0OiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgIG5neFBlcm1pc3Npb25zRXhjZXB0RWxzZTogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICBuZ3hQZXJtaXNzaW9uc0V4Y2VwdFRoZW46IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgbmd4UGVybWlzc2lvbnNUaGVuOiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgIG5neFBlcm1pc3Npb25zRWxzZTogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICBuZ3hQZXJtaXNzaW9uc09ubHlBdXRob3Jpc2VkU3RyYXRlZ3k6IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgbmd4UGVybWlzc2lvbnNPbmx5VW5hdXRob3Jpc2VkU3RyYXRlZ3k6IFt7IHR5cGU6IElucHV0IH1dLFxyXG4gICAgbmd4UGVybWlzc2lvbnNFeGNlcHRVbmF1dGhvcmlzZWRTdHJhdGVneTogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICBuZ3hQZXJtaXNzaW9uc0V4Y2VwdEF1dGhvcmlzZWRTdHJhdGVneTogW3sgdHlwZTogSW5wdXQgfV0sXHJcbiAgICBuZ3hQZXJtaXNzaW9uc1VuYXV0aG9yaXNlZFN0cmF0ZWd5OiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgIG5neFBlcm1pc3Npb25zQXV0aG9yaXNlZFN0cmF0ZWd5OiBbeyB0eXBlOiBJbnB1dCB9XSxcclxuICAgIHBlcm1pc3Npb25zQXV0aG9yaXplZDogW3sgdHlwZTogT3V0cHV0IH1dLFxyXG4gICAgcGVybWlzc2lvbnNVbmF1dGhvcml6ZWQ6IFt7IHR5cGU6IE91dHB1dCB9XVxyXG59O1xyXG5pZiAoZmFsc2UpIHtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc09ubHk7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNPbmx5VGhlbjtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc09ubHlFbHNlO1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNSZXN0cmljdFN0dWJEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zRXhjZXB0O1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNSZXN0cmljdFN0dWJEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zRXhjZXB0RWxzZTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc0V4Y2VwdFRoZW47XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNUaGVuO1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNSZXN0cmljdFN0dWJEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zRWxzZTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc09ubHlBdXRob3Jpc2VkU3RyYXRlZ3k7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNPbmx5VW5hdXRob3Jpc2VkU3RyYXRlZ3k7XHJcbiAgICAvKiogQHR5cGUgez99ICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUubmd4UGVybWlzc2lvbnNFeGNlcHRVbmF1dGhvcmlzZWRTdHJhdGVneTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc0V4Y2VwdEF1dGhvcmlzZWRTdHJhdGVneTtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5uZ3hQZXJtaXNzaW9uc1VuYXV0aG9yaXNlZFN0cmF0ZWd5O1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNSZXN0cmljdFN0dWJEaXJlY3RpdmUucHJvdG90eXBlLm5neFBlcm1pc3Npb25zQXV0aG9yaXNlZFN0cmF0ZWd5O1xyXG4gICAgLyoqIEB0eXBlIHs/fSAqL1xyXG4gICAgTmd4UGVybWlzc2lvbnNSZXN0cmljdFN0dWJEaXJlY3RpdmUucHJvdG90eXBlLnBlcm1pc3Npb25zQXV0aG9yaXplZDtcclxuICAgIC8qKiBAdHlwZSB7P30gKi9cclxuICAgIE5neFBlcm1pc3Npb25zUmVzdHJpY3RTdHViRGlyZWN0aXZlLnByb3RvdHlwZS5wZXJtaXNzaW9uc1VuYXV0aG9yaXplZDtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUgez99XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBOZ3hQZXJtaXNzaW9uc1Jlc3RyaWN0U3R1YkRpcmVjdGl2ZS5wcm90b3R5cGUudmlld0NvbnRhaW5lcjtcclxufVxyIl19