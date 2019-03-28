import Preview, { PreviewInstanceInterface, PreviewInstanceCallback, PreviewInterface } from './ImgPreview'
import './style.scss'

let ins: PreviewInstanceInterface = null

/**
 * 获取ImgPreview实例
 *
 * @param {Function} callback 回调
 */
function getInstance(callback: PreviewInstanceCallback) {
  if(ins) {
    callback(ins)
    return
  }
  Preview.newInstance((instance: PreviewInstanceInterface) => {
    ins = instance
    callback(instance)
  })
}

/**
 * 高阶函数
 * 绑定ins相应的方法并返回
 * @param {String} fun 方法名
 * @returns Function
 */
function exec(fun: string) {
  return function(...arg) {
    getInstance(instance => {
      instance[fun](...arg)
    })
  }
}

const Api: {destroy: () => void, preview: PreviewInterface, show: () => void, hide: () => void} = {
  preview: null,
  show: null,
  hide: null,
  destroy() {
    if(ins) {
      ins.destroy()
      ins = null
    }
  }
}

const func = ['preview', 'show', 'hide']
func.forEach(each => {
  Api[each] = exec(each)
})

export const PreviewApi = Api

export default Preview
