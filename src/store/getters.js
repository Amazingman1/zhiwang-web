export default {
  supName(state) {
    return state.supName
  },
  // 数据字典对照表
  dict(state) {
    var dict = {}
    state.dictList.forEach((item) => {
      dict[item.id] = item.value
    })
    return dict
  },
  navName(state) {
    return state.navName
  }
}
