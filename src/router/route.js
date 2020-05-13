import Router from 'vue-router';
import Vue from 'vue';
//import Home from '../app';
//import Button from '../components/Button/Button';
import Home from '../views/home';


const routerListDir=[];
 
function importAllRouter(r) {
    r.keys().forEach(
        (key)=>routerListDir.push(r(key).default)
    )
}

importAllRouter(require.context('../router',true,/\.router\.js/));
Vue.use(Router);
console.log(routerListDir);

export default new Router({
    routes: [
        ...routerListDir,
        { path: '/',component:Home},
        //{ path: '/button',component:Button},
    ]
});