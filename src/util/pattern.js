
export default {

  // 密码复杂校验 数字字母混搭 6到18位 位数如果有变化 修改最后的6和18
  loginPassWord: /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,18}$/,
  // 大于等于0的正整数
  IntegerPlusRegex: /^([1-9]\d*|0)$/,
  // 大于0正数 两位小数
  moneyRegex: /^(([1-9]{1}\d*)|(0))(\.\d{1,2})?$/,
  // 可以为负数
  moneyNegativeRegex: /^((-?[1-9]{1}\d*)|(-?0{1}))(\.\d{1,2})?$/,
  // 小于100的 百分数
  percentageRegex: /^(((\d|[1-9]\d)(\.\d{1,2})?)|100|100.0|100.00)$/,
  // 邮箱
  emailRegex: /^.+@.+\..+$/,
  // 手机
  mobileRegex: /^1\d{10}$/,
  // 电话号码
  telephoneRegex: /^((\d{3,4}-))?\d{7,8}$/,
  // 身份证号码
  idCode: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/i

}
