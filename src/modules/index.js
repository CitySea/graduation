// import Vue from 'vue'
// import Index from './index'
// import router from '../router/index.js'
// import axios from 'axios'
// import Module from '@/modules/index.vue'

// Vue.config.productionTip = false
// Vue.prototype.$http = axios //接口调用

// //引用样式
// import '@/assets/less/style.less'

// var app = new Vue({
//   el: '#app',
//   router,
//   render: h=> h(Module)
// }).$mount("#app")


import Vue from 'vue'
import Index from './index'
import vuex from 'vuex'
import Vueditor from 'vueditor'
import router from '../router/index.js'
import axios from 'axios'
import Module from '@/modules/index.vue'

Vue.config.productionTip = false
Vue.prototype.$http = axios //接口调用

//引用样式
import '@/assets/less/style.less'
import '@/assets/css/editor/vueditor.min.css'

let editorConfig = {
  toolbar: [
    'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
    'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider',
    'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
    'insertOrderedList', 'insertUnorderedList'
  ],
  fontName: [
    {val: 'arial black'}, 
    {val: 'times new roman'}, 
    {val: 'Courier New'}
  ],
  fontSize: ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'],
  uploadUrl: ''
}
Vue.use(vuex);
Vue.use(Vueditor, editorConfig);

let app = new Vue({
  el: '#app',
  router,
  render: h=> h(Module)
}).$mount("#app")

