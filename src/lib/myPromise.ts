// 定义三种状态
const PENDING = 'pending';
const RESOLVE = 'resolved';
const REJECTED = 'rejected';

//定义promise 类
export class myPromise {
    value;
    reason;
    state = PENDING;
    onResolve = [];
    onRejected = [];

    resolve (value){
        if(this.state === PENDING){
            this.state = RESOLVE;
            this.value = value;
            this.onResolve.forEach( fn => fn());
        }
    }

    reject (reason){
        if(this.state === PENDING){
            this.state = REJECTED;
            this.reason = reason;
            this.onRejected.forEach( fn => fn());
        }
    }

    /**
     * 处理新旧2个 Promise 的封装方法
     *
     * @static
     * @memberof MyPromise
     */
    resolvePromise(newPromise, returnValue, resolve, reject){
        // 规范 2.3.1，returnValue 不能和 newMyPromise 相同，避免循环引用
        if(newPromise === returnValue) {
            this.reject(new TypeError ('Chaning Circle'));
        }

        // 规范 2.3.2 如果 returnValue 为 Promise，状态为 pending 需要继续等待否则执行
        if(returnValue instanceof myPromise) {
            if(returnValue.state === PENDING ) {
                returnValue.then( (value:any) => {
                    // 再次调用该函数是为了确认 returnValue resolve 的 参数是什么类型，如果是基本类型就再次 resolve 把值传给下个 then
                    this.resolvePromise(newPromise, value, resolve, reject)
                }, reject)
            }
        } else {
            // 规范 2.3.2.2 规范 2.3.2.3  如果 returnValue 为 Promise，状态为 fulfilled 或 rejected ，原因用于相同的状态
            returnValue.then(resolve, reject);
        }
        return;
    }


    constructor(fn){
        if (typeof fn !== 'function') {
            throw new Error('must fuction');
        }
        fn(this.resolve.bind(this),this.reject.bind(this));
    }

    then(onResolved?, onRejected?) {

        // 规范 2.2.onResolved 和 onRejected 都为可选参数
        // 如果 onResolved 和 onRejected 不是函数则要自行生成新的函数，保证了透传
        const _onResolve = typeof onResolved === 'function' ? onResolved : value => value;
        const _onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

        // 规范 2.2.7，then 必须返回一个新的 promise
        let newPromise:myPromise;


        // 初始状态
        if(this.state === PENDING) {
            newPromise = new myPromise( (resolve, reject) => {
                this.onResolve.push( ()=>{
                    try {
                        let returnValue = _onResolve(this.value);
                        // resolve(returnValue) 本次 Promise 继续 returnValue
                        this.resolvePromise(newPromise, returnValue, resolve, reject) 
                      } catch (error) {
                          reject(error);
                    }
                });

                this.onRejected.push( ()=> {
                    try {
                    const returnValue = _onRejected(this.value);
                    this.resolvePromise(newPromise, returnValue, resolve, reject) 
                    } catch (error) {
                        reject(error)
                    }
                })

            })

            return newPromise;
        }
        //resolved状态
        if(this.state === RESOLVE) {
            newPromise = new myPromise( (resolve, reject)=> {
                try {
                    const returnValue = _onResolve(this.value);
                    this.resolvePromise(newPromise, returnValue, resolve, reject) 
                } catch (reason) {
                    reject(reason)
                }
                
            });
            return newPromise;
        }

        // reject status
        if(this.state === REJECTED) {
            newPromise = new myPromise ( (resolve, reject) => {
                setTimeout( ()=> {
                    // 异步执行onRejected
                    try {
                       const returnValue = _onRejected(this.value);
                       this.resolvePromise(newPromise, returnValue, resolve, reject) 
                    } catch (error) {
                        reject(error)
                    }
                })

            })

            return newPromise;
        }

    }

}