
// 登录的uuid
export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

// 传入省市区code转换name
export function treeToLabel(data, arr) {
  if (!data) return
  const result = []
  const childrenTreeToLabel = (data, arr, result) => {
    for (let j = 0; j < data.length; j++) {
      if (arr[0] === data[j].code) {
        result.push(data[j].name)
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
//
