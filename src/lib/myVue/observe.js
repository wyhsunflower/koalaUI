import { Dep } from "./Dep";

// 遍历属性
function myObserve (data) {
    if(!data || typeof(data) !== 'object') { return;}
    Object.keys(data).forEach( function loopData(key) {
        defineReactive(data,key,data[key])
    })
}

// 数据劫持
function defineReactive(data, key, value) {
    myObserve(value);//子属性
    const dep = new Dep();
    Object.defineProperty(data, key, {
        enumerable: true, // 可枚举
        configurable: false, // 不能再define
        get: function() {
            // 由于需要在闭包内添加watcher，所以通过Dep定义一个全局target属性，暂存watcher, 添加完移除
		    Dep.target && dep.addDep(Dep.target);
            return value;
        },
        set: function(newVal) {
            if (value === newVal) {
                return;
            }
            console.log(value, 'change to ', newVal);
            value = newVal;
            dep.notify();
        }
    });
}