import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/styles/index.less'
// 引入axios
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp'
Vue.use(ElementUI) // 引入样式
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
