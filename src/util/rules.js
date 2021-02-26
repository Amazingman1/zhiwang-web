
function checkNull(val) {
  return val != undefined && val != null
}

function getReg(message,trigger = 'blur', pattern, required = true) {
  let list = []
  if (required) {
    list.push({
      required,
      message,
      trigger
    })
  }

  if (pattern) {
    list.push({
      pattern,
      message,
      trigger
    })
  }
  return list;
}
function getRangeReg(min, max, msg) {
  let list=[]
  if (checkNull(min) || checkNull(max)) {
    list.push({
      validator: (rules, value, callback) => {
        if (checkNull(max) && value > max) {
          return callback(new Error(msg));
        } else if (checkNull(min) && value < min) {
          return callback(new Error(msg));
        } else {
          return callback();
        }
      }, trigger: "blur"
    })
  }
  return list
}



export default {
  getReg,
  getRangeReg
}