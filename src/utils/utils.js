"use strict";
exports.__esModule = true;
function isFunction(functionToCheck) {
    var getType = {};
    return !!functionToCheck && functionToCheck instanceof Function && getType.toString.call(functionToCheck) === '[object Function]';
}
exports.isFunction = isFunction;
function isPlainObject(value) {
    if (Object.prototype.toString.call(value) !== '[object Object]') {
        return false;
    }
    else {
        var prototype = Object.getPrototypeOf(value);
        return prototype === null || prototype === Object.prototype;
    }
}
exports.isPlainObject = isPlainObject;
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
function isPromise(promise) {
    return Object.prototype.toString.call(promise) === "[object Promise]";
}
exports.isPromise = isPromise;
