export default class AsyncTest{
    static getItem(key, callback){
        return new Promise( (resolve,reject) => {
            try {
                const value = window.localStorage.getItem(key);
                if (callback) {
                    callback(null, value);
                }
                resolve(value);
            } catch (err) {
                if (callback) {
                    callback(err);
                }
                reject(err);
            }
        });
    }

    static setItem(key,val,callback){
        return new Promise( (resolve,reject) => {
            try {
                const value = window.localStorage.setItem(key,val);
                if (callback) {
                    callback(null, value);
                }
                resolve(value);
            } catch (err) {
                if (callback) {
                    callback(err);
                }
                reject(err);
            }
        });
    }
}

