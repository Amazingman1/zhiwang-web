
import moment from 'moment'
export default {
  // 数字格式化千分位
  formatMoney: value => {
    var result = ''
    if (value) {
      const fmtSplit = value.toString().split('.')
      var num = fmtSplit[0]
      while (num.length > 3) {
        result = ',' + num.slice(-3) + result
        num = num.slice(0, num.length - 3)
      }
      if (num) { result = num + result }
      if (fmtSplit.length > 1) result += `.${fmtSplit[1]}`
    } else {
      result = '0'
    }
    return result
  },
  // 去掉千分位
  removeMoney: value => {
    return parseFloat(value.replace(/[^\d\.-]/g, ''))
  },
  // 转换时间
  formatDate: value => {
    var date = ''
    if (value) date = moment(value).format('YYYY-MM-DD')
    return date
  },
  formatHour: value => {
    var date = ''
    if (value) date = moment(value).format('YYYY-MM-DD HH:mm:ss')
    return date
  },
  // 一般用于字典查询
  getDictLabel: (val, list, key = 'value', name = 'label') => {
    var result = ''
    if (val && Array.isArray(list)) {
      for (let i = 0; i < list.length; i++) {
        if (list[i][key] === val) {
          result = list[i][name]
          break
        }
      }
    } else {
      result = '--'
    }
    return result
  },
  // 回显省市区
  treeToLabel: (data, arr, code = 'code', name = 'name') => {
    if (!data) return
    const result = []
    const childrenTreeToLabel = (data, arr, result) => {
      for (let j = 0; j < data.length; j++) {
        if (arr[0] === data[j][code]) {
          result.push(data[j][name])
          if (data[j].children && arr.length > 1) {
            childrenTreeToLabel(data[j].children, arr.slice(1), result)
          }
          break
        }
      }
    }
    childrenTreeToLabel(data, arr, result)
    return result.join('')
  }
}

