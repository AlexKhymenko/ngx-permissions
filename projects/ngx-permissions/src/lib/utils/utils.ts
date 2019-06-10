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
    return !!value && typeof value === 'string';
}

export function isBoolean(value: any): value is boolean {
    return typeof value === 'boolean';
}

export function isPromise(promise: any) {
    return Object.prototype.toString.call(promise) === '[object Promise]';
}

export function notEmptyValue(value: any): boolean {
    if (Array.isArray(value)) {
        return value.length > 0;
    }
    return !!value;
}

export function transformStringToArray(value: any): string[] {
    if (isString(value)) {
        return [value];
    }
    return value;
}
