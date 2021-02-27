/**
 * 这里是 东风金融-创格项目本身就有的内容，这个不用管。
 */
import axios from 'axios'
import Vue from 'vue'
import { baseURL } from './sys.js'

var _axios = axios.create({
  // baseURL: '/api'
  baseURL
})

var flag = true
_axios.interceptors.request.use(
  (config) => {
    flag = true
    const token = sessionStorage.getItem('token')
    config.headers['X-UserToken'] = token
    return config
  }, (error) => {
    return Promise.reject(error)
  }
)
_axios.interceptors.response.use(
  (response) => {
    return response.data
  }, (error) => {
    if (error.response && flag) {
      switch (error.response.status) {
        case 401:
          flag = false
          Vue.$router.push({ path: '/Login' })
          Vue.$message.warning('无权限访问')
          sessionStorage.clear()
          break
        case 500:
          flag = false
          Vue.$message.warning('服务器错误')
          break
        case 504:
          flag = false
          Vue.$message.warning('连接服务器超时')
          break
        case 408:
          flag = false
          Vue.$message.warning('请求超时')
          break
        case 404:
          flag = false
          Vue.$message.warning('服务不存在')
          break
        case 403:
          flag = false
          Vue.$router.push({ path: '/Login' })
          Vue.$message.warning('未登录')
          sessionStorage.clear()
          break
      }
    }
    return Promise.reject(error)
  }
)
export default {

  // 个人报件列表
  personalApplyOrderCustInfoList: function(params) {
    return _axios.get(`/direct-rent-service/direct-rent/personalApplyOrder/listreport`, { params: params })
  },
  queryCompanyDictData: function(data) {
    return _axios.post(`/direct-rent-service/direct-rent/dictData/queryCompanyDictData`, data)
  }

}
