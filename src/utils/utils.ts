


export function isFunction(functionToCheck: any): functionToCheck is Function {
    let getType = {};
    return !!functionToCheck && functionToCheck instanceof Function && getType.toString.call(functionToCheck) === '[object Function]';
}

export function isPlainObject(value: any): boolean {
    if (Object.prototype.toString.call(value) !== '[object Object]') {
        return false;
    } else {
        let prototype = Object.getPrototypeOf(value);
        return prototype === null || prototype === Object.prototype;
    }
}

export function isString(value: any): value is string {
    return typeof value === 'string';
}

export function isPromise(promise: any) {
    return Object.prototype.toString.call(promise) === "[object Promise]"
}