import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/error',
    name: 'Error',
    props: route => ({ message: route.query.message, goBackPath: route.query.goBackPath }),
    component: () => import('../views/Error.vue')
  }
]

const router = new VueRouter({
  routes
})

/*  
vue-router路由版本更新产生的问题
路由跳转（调用push时）报错via a navigation guard，但并不影响程序功能
在全局做如下处理
*/
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router
