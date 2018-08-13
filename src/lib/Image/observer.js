/**
 * @file
 * 调用InterseciontObserver, 监听图片是否出现在viewport中
 * 出现才进行加载
 * 如果浏览器不支持InterseciontObserver, 则不作操作
 */
export const CanUseIntersecion = 'IntersectionObserver' in window
// const targets = []
const targets = new Map()
/* eslint-disable */
const ins = CanUseIntersecion ? new IntersectionObserver(excute) : null
/* eslint-enable */

export function observe(element, cb) {
  if(!CanUseIntersecion) {
    return
  }
  ins.observe(element)
  targets.set(element, cb)
}

export function unobserve(element) {
  if(!CanUseIntersecion) {
    return
  }
  targets.delete(element)
  ins.unobserve(element)
}

function excute(entries) {
  entries.forEach(each => {
    const { target, isIntersecting } = each
    if(isIntersecting) {
      const cb = targets.get(target)
      cb(each)
      unobserve(target)
    }
  })
}
