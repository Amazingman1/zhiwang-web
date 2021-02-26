
import VueRouter from 'vue-router'

const routes = [
  {
    path: '/test',
    component: resolve => (require(['@/views/demo.vue'], resolve)),
    name: 'test',
    meta: { keepAlive: false }
  },
  {
    path: '/',
    component: resolve => (require(['@/views/home'], resolve)),
    redirect: '/',
    name: '首页',
    children: [
      {
        path: '/',
        component: resolve => (require(['@/views/test'], resolve)),
        name: 'a',
        meta: { menuType: false, isnav: true, keepAlive: false } // isnav 如果是菜单导航就为true
      }
    ]
  },
  {
    path: '*',
    component: resolve => (require(['@/views/notfound/index.vue'], resolve)),
    hidden: true
  }
]
const router = new VueRouter({
  mode: 'hash',
  routes
})
export default router
