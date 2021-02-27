
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui' // 饿了么组件和样式
import 'element-ui/lib/theme-chalk/index.css'
// import { createApp } from 'vue'
import App from './App.vue'
import Components from '@c'
import store from './store'
import VueRouter from 'vue-router'
import router from './router'
import globalFilter from '@/util/filter'
import pattern from '@/util/pattern'
import rules from '@/util/rules'

import { loadingShow, loadingHide } from '@u/weapon'
Vue.prototype.$show = loadingShow
Vue.prototype.$hide = loadingHide

Vue.prototype.$pattern = pattern
Vue.prototype.$rules = rules

Object.keys(globalFilter).forEach(key => {
  Vue.filter(key, globalFilter[key])
})
// eslint-disable-next-line no-unused-vars
import math from '@u/math' // 引入加减乘除
// 自动注册组件
Vue.use(Components)
Vue.use(ElementUI)

Vue.use(VueRouter)
console.log(router, 'router')

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
