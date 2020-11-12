import AsyncTest from './Test.js';
class TestPackage {
    get(key){
        return AsyncTest.getItem(key).then((value) => {
            return value;
        });
        return val;
        console.log(val);
    }

    static set(key,value){
        // debugger;
        return AsyncTest.setItem(key,value);
    }
}

export default TestPackage;