
/**
 * JSON.parse(JSON.stringify());可以应对大部分的应用场景，但是它还是有很大缺陷的
 * 比如拷贝其他引用类型、拷贝函数、循环引用等情况。
 * If undefined, a function, or a symbol is encountered during conversion 
 * it is either omitted (when it is found in an object) or 
 * censored to null (when it is found in an array). 
 * JSON.stringify can also just return undefined when passing in "pure" 
 * values like JSON.stringify(function(){}) or JSON.stringify(undefined).
 */

import { isObject } from "lodash";

/**
 * implement deep copy for array and object
 * @param {*} source 
 */
export function deepClone(source, weakMap = new WeakMap()) {

    if (!isObject(source)) {
        return source;
    }

    const isArray = Array.isArray(source);
    let cloneTarget = isArray ? [] : {};

    // 处理循环引用 source = source.source
    if (weakMap.get(source)) {
        return weakMap.get(source);
    }
    // WeakMap ， source 和 weakMap 存在的就是弱引用关系，当下一次垃圾回收机制执行时，这块内存就会被释放掉。
    weakMap.set(source, cloneTarget);

    // 处理对象和数组
    const keys = isArray ? undefined : Object.keys(target);

    forEach(keys || source, (value, key) => {
        if (keys) {
            key = value;
        }
        cloneTarget[key] = deepClone(source[key], map);
    });
    return cloneTarget;
}

function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    // while效率 高于 for in
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}
