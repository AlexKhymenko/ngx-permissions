/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} functionToCheck
 * @return {?}
 */
export function isFunction(functionToCheck) {
    /** @type {?} */
    let getType = {};
    return !!functionToCheck && functionToCheck instanceof Function && getType.toString.call(functionToCheck) === '[object Function]';
}
/**
 * @param {?} value
 * @return {?}
 */
export function isPlainObject(value) {
    if (Object.prototype.toString.call(value) !== '[object Object]') {
        return false;
    }
    else {
        /** @type {?} */
        let prototype = Object.getPrototypeOf(value);
        return prototype === null || prototype === Object.prototype;
    }
}
/**
 * @param {?} value
 * @return {?}
 */
export function isString(value) {
    return !!value && typeof value === 'string';
}
/**
 * @param {?} value
 * @return {?}
 */
export function isBoolean(value) {
    return typeof value === 'boolean';
}
/**
 * @param {?} promise
 * @return {?}
 */
export function isPromise(promise) {
    return Object.prototype.toString.call(promise) === '[object Promise]';
}
/**
 * @param {?} value
 * @return {?}
 */
export function notEmptyValue(value) {
    if (Array.isArray(value)) {
        return value.length > 0;
    }
    return !!value;
}
/**
 * @param {?} value
 * @return {?}
 */
export function transformStringToArray(value) {
    if (isString(value)) {
        return [value];
    }
    return value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtcGVybWlzc2lvbnMvIiwic291cmNlcyI6WyJsaWIvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxNQUFNLFVBQVUsVUFBVSxDQUFDLGVBQW9COztRQUN2QyxPQUFPLEdBQUcsRUFBRTtJQUNoQixPQUFPLENBQUMsQ0FBQyxlQUFlLElBQUksZUFBZSxZQUFZLFFBQVEsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxtQkFBbUIsQ0FBQztBQUN0SSxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxhQUFhLENBQUMsS0FBVTtJQUNwQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxpQkFBaUIsRUFBRTtRQUM3RCxPQUFPLEtBQUssQ0FBQztLQUNoQjtTQUFNOztZQUNDLFNBQVMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQztRQUM1QyxPQUFPLFNBQVMsS0FBSyxJQUFJLElBQUksU0FBUyxLQUFLLE1BQU0sQ0FBQyxTQUFTLENBQUM7S0FDL0Q7QUFDTCxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxRQUFRLENBQUMsS0FBVTtJQUMvQixPQUFPLENBQUMsQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDO0FBQ2hELENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxLQUFVO0lBQ2hDLE9BQU8sT0FBTyxLQUFLLEtBQUssU0FBUyxDQUFDO0FBQ3RDLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxPQUFZO0lBQ2xDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLGtCQUFrQixDQUFDO0FBQzFFLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLGFBQWEsQ0FBQyxLQUFVO0lBQ3BDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN0QixPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0tBQzNCO0lBQ0QsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ25CLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLHNCQUFzQixDQUFDLEtBQVU7SUFDN0MsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2xCO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKGZ1bmN0aW9uVG9DaGVjazogYW55KTogZnVuY3Rpb25Ub0NoZWNrIGlzIEZ1bmN0aW9uIHtcclxuICAgIGxldCBnZXRUeXBlID0ge307XHJcbiAgICByZXR1cm4gISFmdW5jdGlvblRvQ2hlY2sgJiYgZnVuY3Rpb25Ub0NoZWNrIGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgZ2V0VHlwZS50b1N0cmluZy5jYWxsKGZ1bmN0aW9uVG9DaGVjaykgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpICE9PSAnW29iamVjdCBPYmplY3RdJykge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHByb3RvdHlwZSA9PT0gbnVsbCB8fCBwcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogYW55KTogdmFsdWUgaXMgc3RyaW5nIHtcclxuICAgIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWU6IGFueSk6IHZhbHVlIGlzIGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9taXNlKHByb21pc2U6IGFueSkge1xyXG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9taXNlKSA9PT0gJ1tvYmplY3QgUHJvbWlzZV0nO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbm90RW1wdHlWYWx1ZSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID4gMDtcclxuICAgIH1cclxuICAgIHJldHVybiAhIXZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtU3RyaW5nVG9BcnJheSh2YWx1ZTogYW55KTogc3RyaW5nW10ge1xyXG4gICAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xyXG4gICAgICAgIHJldHVybiBbdmFsdWVdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiJdfQ==