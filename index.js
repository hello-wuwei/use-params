import deepCopy from './deep-copy'

const combine = (params, param) => {
  for (let key in param) {
    params[key] = param[key]
  }
}

const useParams = (sourceParams, callback, initExecute = false) => {
  const initParams = deepCopy(sourceParams)

  const execute = (params, cb) =>
    cb ? cb(params) : callback && callback(params)

  const setParams = (param = {}, cb) => {
    combine(sourceParams, param)
    execute(sourceParams, cb)
  }

  const setParamsInitOther = (param = {}, cb) => {
    const combineParams = { ...initParams, ...param }
    combine(sourceParams, combineParams)
    execute(sourceParams, cb)
  }

  const resetParams = cb => {
    combine(sourceParams, initParams)
    execute(sourceParams, cb)
  }

  initExecute && setParams() // 初次执行

  return { setParams, setParamsInitOther, resetParams }
}

export default useParams
