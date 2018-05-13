import Vue from 'vue'
import Index from './index'
import router from '../router/index.js'
import axios from 'axios'
import Module from '@/modules/index.vue'

Vue.config.productionTip = false
Vue.prototype.$http = axios //接口调用

//引用样式
import '@/assets/less/style.less'

var app = new Vue({
  el: '#app',
  router,
  render: h=> h(Module)
}).$mount("#app")
