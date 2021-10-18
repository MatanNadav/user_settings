import Vue from 'vue'
import App from './App.vue'


// Templating and Styling
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';

Vue.use(BootstrapVue);

Vue.config.productionTip = false
import initStore from './store/store';

const store = initStore();
new Vue({
  render: h => h(App, {props:{store,}}),
}).$mount('#app')
