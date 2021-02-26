
import * as types from '@/store/mutation-types'
import api from '@/api'
import Vue from 'vue'

export default {
  // 数据字典
  [types.GET_dict]({ commit, state }, { dictTypes }) {
    api.queryCompanyDictData({ dictTypes }).then((res) => {
      if (res.code === '200') {
        const data = res.data || {}

        commit(types.UPDATE_dict, data)
      } else {
        Vue.$message({
          type: 'error',
          message: res.msg
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }

}

