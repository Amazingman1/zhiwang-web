import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

// 应用初始状态
const state = {
  dictList: {}, // 字典数据列表
  userInfo: {}, // 用户信息
  supName: '', // 供应商名称
  navName: '/workbench',
  leftNav: [],
  acitveTab: '1'
}

// 创建 store 实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
