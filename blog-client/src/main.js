import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'
import 'view-design/dist/styles/iview.css'
import 'mavon-editor/dist/css/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './style/index.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
