import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './permission' // 引入js
// 引入UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/styles/index.less'
// 引入axios
import axios from './utils/request' // 定义一个全局地址
import Component from './components'
Vue.prototype.$axios = axios // 赋值给全局对象
Vue.use(ElementUI) // 引入样式
Vue.use(Component) // 注册全局组件对象 =>  调用该对象中的一个方法 install
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
