export function isFunction<T>(value: any): value is T {
    return typeof value === 'function';
}

export function isPlainObject(value: any): boolean {
    if (Object.prototype.toString.call(value) !== '[object Object]') {
        return false;
    } else {
        const prototype = Object.getPrototypeOf(value);
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

export function notEmptyValue(value: string | string[]): boolean {
    if (Array.isArray(value)) {
        return value.length > 0;
    }
    return !!value;
}

export function transformStringToArray(value: string | string[]): string[] {
    if (isString(value)) {
        return [value];
    }
    return value;
}
