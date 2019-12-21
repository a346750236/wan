import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Home2 from '../views/home/home'
Vue.use(VueRouter)

const routes = [
  {
    // 强制跳转到指定页面
    path: '/',
    redirect: '/home'
  },
  {
    // 主页
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '',
      component: Home2
    }]
  }, {
    // 登录页
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

// 路由守卫设置
// 全局前置守卫
// router.beforeEach(function (to, from, next) {
//   // 判断 拦截的范围
//   if (to.path.startsWith('/home')) {
//     // 进入到了拦截范围
//     // 判断是否登录 有token 就登录 没token就没登录
//     let token = window.localStorage.getItem('user-token') // 获取token
//     if (token) {
//       // 如果有token
//       next()
//     } else {
//       next('/login') // 没有token 就跳转到登录页
//     }
//   } else {
//     next() // 放行
//   }
// })
router.beforeEach(function (to, from, next) {
  var token = window.localStorage.getItem('user-token')
  // 用户没有登录系统(token===null)
  // 该用户还要试图访问除登录以外的其他页面(例如/home)
  // 就强制该用户去登录
  if (token === null && to.path !== '/login') {
    return next('/login')
  }
  next() // 放行
})

export default router
