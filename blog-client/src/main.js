import Vue from 'vue'
import { Message, Modal } from 'view-design'
import router from './router'
import App from './App.vue'
import store from './store'
import 'view-design/dist/styles/iview.css'
import 'mavon-editor/dist/css/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './style/index.less'
import 'highlight.js/styles/github.css'

Vue.config.productionTip = false

Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
