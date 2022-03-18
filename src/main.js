import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'

import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'mini'});
import('element-ui/lib/theme-chalk/index.css')

import './components/iconSvg'

import '@/permission'

import '@/mockjs'; 

import i18n from "@/lang";

import { shareConfig } from './utils/share';
Vue.prototype.shareConfig = shareConfig;


Vue.config.productionTip = false;


new Vue({
  router,
  store,
  i18n, 
  render: h => h(App),
}).$mount('#app')
