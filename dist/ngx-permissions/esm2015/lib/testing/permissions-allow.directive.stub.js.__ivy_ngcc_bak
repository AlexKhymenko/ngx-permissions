/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, Input, Output, TemplateRef, ViewContainerRef } from '@angular/core';
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
NgxPermissionsAllowStubDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxPermissionsOnly],[ngxPermissionsExcept]'
            },] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbnMtYWxsb3cuZGlyZWN0aXZlLnN0dWIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtcGVybWlzc2lvbnMvIiwic291cmNlcyI6WyJsaWIvdGVzdGluZy9wZXJtaXNzaW9ucy1hbGxvdy5kaXJlY3RpdmUuc3R1Yi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNOUcsTUFBTSxPQUFPLGdDQUFnQzs7Ozs7SUEwQnpDLFlBQW9CLGFBQStCLEVBQy9CLFdBQTZCO1FBRDdCLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUMvQixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFMdkMsMEJBQXFCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMzQyw0QkFBdUIsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBSUgsQ0FBQzs7OztJQUdyRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hDLENBQUM7Ozs7O0lBR08scUJBQXFCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQjtZQUM5QixJQUFJLENBQUMsd0JBQXdCO1lBQzdCLElBQUksQ0FBQyxrQkFBa0I7WUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN6QixDQUFDOzs7WUE3Q0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw2Q0FBNkM7YUFDMUQ7Ozs7WUFMcUUsZ0JBQWdCO1lBQTdCLFdBQVc7OztpQ0FRL0QsS0FBSztxQ0FDTCxLQUFLO3FDQUNMLEtBQUs7bUNBRUwsS0FBSzt1Q0FDTCxLQUFLO3VDQUNMLEtBQUs7aUNBRUwsS0FBSztpQ0FDTCxLQUFLO21EQUVMLEtBQUs7cURBQ0wsS0FBSzt1REFFTCxLQUFLO3FEQUNMLEtBQUs7aURBRUwsS0FBSzsrQ0FDTCxLQUFLO29DQUVMLE1BQU07c0NBQ04sTUFBTTs7OztJQXJCUCw4REFBK0M7O0lBQy9DLGtFQUFrRDs7SUFDbEQsa0VBQWtEOztJQUVsRCxnRUFBaUQ7O0lBQ2pELG9FQUFvRDs7SUFDcEQsb0VBQW9EOztJQUVwRCw4REFBOEM7O0lBQzlDLDhEQUE4Qzs7SUFFOUMsZ0ZBQXlFOztJQUN6RSxrRkFBMkU7O0lBRTNFLG9GQUE2RTs7SUFDN0Usa0ZBQTJFOztJQUUzRSw4RUFBdUU7O0lBQ3ZFLDRFQUFxRTs7SUFFckUsaUVBQXFEOztJQUNyRCxtRUFBdUQ7Ozs7O0lBRzNDLHlEQUF1Qzs7Ozs7SUFDdkMsdURBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3RyYXRlZ3lGdW5jdGlvbiB9IGZyb20gJy4uL3NlcnZpY2UvY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbbmd4UGVybWlzc2lvbnNPbmx5XSxbbmd4UGVybWlzc2lvbnNFeGNlcHRdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4UGVybWlzc2lvbnNBbGxvd1N0dWJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIEBJbnB1dCgpIG5neFBlcm1pc3Npb25zT25seTogc3RyaW5nIHwgc3RyaW5nW107XHJcbiAgICBASW5wdXQoKSBuZ3hQZXJtaXNzaW9uc09ubHlUaGVuOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgQElucHV0KCkgbmd4UGVybWlzc2lvbnNPbmx5RWxzZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBASW5wdXQoKSBuZ3hQZXJtaXNzaW9uc0V4Y2VwdDogc3RyaW5nIHwgc3RyaW5nW107XHJcbiAgICBASW5wdXQoKSBuZ3hQZXJtaXNzaW9uc0V4Y2VwdEVsc2U6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgICBASW5wdXQoKSBuZ3hQZXJtaXNzaW9uc0V4Y2VwdFRoZW46IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgQElucHV0KCkgbmd4UGVybWlzc2lvbnNUaGVuOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgQElucHV0KCkgbmd4UGVybWlzc2lvbnNFbHNlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIEBJbnB1dCgpIG5neFBlcm1pc3Npb25zT25seUF1dGhvcmlzZWRTdHJhdGVneTogc3RyaW5nIHwgU3RyYXRlZ3lGdW5jdGlvbjtcclxuICAgIEBJbnB1dCgpIG5neFBlcm1pc3Npb25zT25seVVuYXV0aG9yaXNlZFN0cmF0ZWd5OiBzdHJpbmcgfCBTdHJhdGVneUZ1bmN0aW9uO1xyXG5cclxuICAgIEBJbnB1dCgpIG5neFBlcm1pc3Npb25zRXhjZXB0VW5hdXRob3Jpc2VkU3RyYXRlZ3k6IHN0cmluZyB8IFN0cmF0ZWd5RnVuY3Rpb247XHJcbiAgICBASW5wdXQoKSBuZ3hQZXJtaXNzaW9uc0V4Y2VwdEF1dGhvcmlzZWRTdHJhdGVneTogc3RyaW5nIHwgU3RyYXRlZ3lGdW5jdGlvbjtcclxuXHJcbiAgICBASW5wdXQoKSBuZ3hQZXJtaXNzaW9uc1VuYXV0aG9yaXNlZFN0cmF0ZWd5OiBzdHJpbmcgfCBTdHJhdGVneUZ1bmN0aW9uO1xyXG4gICAgQElucHV0KCkgbmd4UGVybWlzc2lvbnNBdXRob3Jpc2VkU3RyYXRlZ3k6IHN0cmluZyB8IFN0cmF0ZWd5RnVuY3Rpb247XHJcblxyXG4gICAgQE91dHB1dCgpIHBlcm1pc3Npb25zQXV0aG9yaXplZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBwZXJtaXNzaW9uc1VuYXV0aG9yaXplZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cclxuXHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLmdldEF1dGhvcml6ZWRUZW1wbGF0ZSgpKTtcclxuICAgICAgICB0aGlzLnBlcm1pc3Npb25zVW5hdXRob3JpemVkLmVtaXQoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBnZXRBdXRob3JpemVkVGVtcGxhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmd4UGVybWlzc2lvbnNPbmx5VGhlbiB8fFxyXG4gICAgICAgICAgICB0aGlzLm5neFBlcm1pc3Npb25zRXhjZXB0VGhlbiB8fFxyXG4gICAgICAgICAgICB0aGlzLm5neFBlcm1pc3Npb25zVGhlbiB8fFxyXG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlUmVmO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=