import { Dep } from "./Dep";

// 观察者
// 只要在订阅者Watcher初始化的时候才需要添加订阅者，
// 所以需要做一个判断操作，
// 因此可以在订阅器上做一下手脚：在Dep.target上缓存下订阅者，添加成功后再将其去掉就可以了。
export default class Watcher {
    vm;
    cb;
    exp;
    value;

    constructor(vm, exp, cb){
       this.cb = cb;
       this.vm = vm;
       this.exp = exp;
       this.value = this.get(); // 将自己添加到订阅器的操作
    }

    get() {
        //缓存自己
        Dep.target = this;  
        // 强制执行监听器里的get函数
        this.value = this.vm.data[this.exp];
        //释放自己
        Dep.target = null;
    }

    update() {
        this.run();
    }

    run() {
        const value = this.vm.data[this.exp];
        const oldValue = this.value;
        if (value !== oldValue) {
            this.value = value;
            this.cb.call(this.vm, value, oldValue);
        }
    }
}