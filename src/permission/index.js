// 权限拦截 导航守卫
import router from '../router/index.js'
// 路由守卫设置
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  // 判断 拦截的范围
  if (to.path.startsWith('/home')) {
    // 进入到了拦截范围
    // 判断是否登录 有token 就登录 没token就没登录
    let token = window.localStorage.getItem('user-token') // 获取token
    if (token) {
      // 如果有token
      next()
    } else {
      next('/login') // 没有token 就跳转到登录页
    }
  } else {
    next() // 放行
  }
})
// router.beforeEach(function (to, from, next) {
//   var token = window.localStorage.getItem('user-token')
//   // 用户没有登录系统(token===null)
//   // 该用户还要试图访问除登录以外的其他页面(例如/home)
//   // 就强制该用户去登录
//   if (token === null && to.path !== '/login') {
//     return next('/login')
//   }
//   next() // 放行
// })
