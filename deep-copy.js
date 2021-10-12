const deepCopy = target => {
  let copyedObjs = [] // 此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象
  const _deepCopy = target => {
    if (typeof target !== 'object' || !target) {
      return target
    }
    for (let i = 0; i < copyedObjs.length; i++) {
      if (copyedObjs[i].target === target) {
        return copyedObjs[i].copyTarget
      }
    }
    let obj = {}
    if (Array.isArray(target)) {
      obj = [] // 处理target是数组的情况
    }
    copyedObjs.push({ target: target, copyTarget: obj })
    Object.keys(target).forEach(key => {
      if (obj[key]) {
        return
      }
      obj[key] = _deepCopy(target[key])
    })
    return obj
  }
  return _deepCopy(target)
}

export default deepCopy
