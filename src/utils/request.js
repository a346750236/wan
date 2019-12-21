// 对axios 进行处理
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 引入组件对象

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发起请求的时候做一些业务处理
  //   config是要发送请求的配置信息
  let token = window.localStorage.getItem('user-token') // 获取token
  config.headers['Authorization'] = `Bearer ${token}`
  // 统一注入token 到headers属性 因为所有接口要求的token格式是一样的
  return config // 返回的config 就会作为新的请求选项去进行请求
}, function () {
  // 执行请求失败
})
// 导出axios
export default axios
