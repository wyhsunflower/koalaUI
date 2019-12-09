import Vue from 'vue';
import App from './app';
import './components/components.js'
import './styles/global.scss';
import router from './router/route';


new Vue({
    router,
    render(h) {
        return h(App);
    }
}).$mount('#app');