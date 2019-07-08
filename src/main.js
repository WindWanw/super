import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VCharts from 'v-charts'
Vue.use(VCharts)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import api from './utils/api.js'
Vue.prototype.$api=api;
import rules from './utils/rules.js'
Vue.prototype.$rules=rules;

Vue.config.productionTip = false;
//注册全局过滤器
import filters from './utils/filter';
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
//全局组件
import upload from './utils/components.js';
Vue.use(upload);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
