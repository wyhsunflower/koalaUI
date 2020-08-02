// 订阅器
export class Dep {
    subs = [];

    addSub(sub) {
        this.subs.push(sub);
    }

    notify(){
        this.subs.forEach( (sub) => {
            sub.update();
        })
    }
}