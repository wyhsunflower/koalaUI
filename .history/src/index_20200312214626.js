import Vue from 'vue';
import App from './app';
import './components/components.js'
import './styles/global.scss';
import './styles/iconfont/icon.scss'
import router from './router/route';
import 'materialcss';


new Vue({
    router,
    render(h) {
        return h(App);
    }
}).$mount('#app');