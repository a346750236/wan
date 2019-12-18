import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/styles/index.less'
// 引入UI

Vue.use(ElementUI) // 引入样式
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
