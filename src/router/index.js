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
    }, {
      path: 'comment',
      component: () => import('../views/comment') // 按需加载
    }, {
      path: 'material',
      component: () => import('../views/material') // 按需加载
    }, {
      path: 'articles',
      component: () => import('../views/articles') // 按需加载
    }, {
      path: 'publish/:arId', // 定义动态路由参数  此规则只匹配修改文章
      component: () => import('../views/publish') // 按需加载
    }, {
      path: 'publish', //  此规则匹配发布文章
      component: () => import('../views/publish') // 按需加载
    }, {
      path: 'account', // 账户信息
      component: () => import('../views/account') // 按需加载
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

export default router
