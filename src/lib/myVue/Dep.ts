// 订阅器
import Watcher from './watcher';

export class Dep {
    subs:Array<Watcher>;

    addSub(sub:Watcher) {
        this.subs.push(sub);
    }

    notify(){
        this.subs.forEach( (sub) => {
            sub.update();
        })
    }
}