/**
 * @file
 * 调用InterseciontObserver, 监听图片是否出现在viewport中
 * 出现才进行加载
 * 如果浏览器不支持InterseciontObserver, 则不作操作
 */
let canUse = null
export const CanUseIntersecion = function() {
  if(canUse !== null) {
    return canUse
  }
  canUse = 'IntersectionObserver' in window
  return canUse
}
// const targets = []
const targets = new Map()
/* eslint-disable */
export function createObserver(container) {
  if(!CanUseIntersecion()) {
    return null
  }
  const opt = {}
  if(container) {
    opt.root = container
  }
  return new IntersectionObserver(excute, opt)
}
// const ins = CanUseIntersecion ? new IntersectionObserver(excute) : null
let ins = null

function getObserve(observer) {
  if(observer) {
    return observer
  }
  if(!ins) {
    ins = createObserver()
  }
  return ins
}

/* eslint-enable */

export function observe(element, cb, obs) {
  if(!CanUseIntersecion()) {
    return
  }
  const observer = getObserve(obs)
  observer.observe(element)
  targets.set(element, {
    cb,
    observer
  })
}

export function unobserve(element, obs) {
  if(!CanUseIntersecion()) {
    return
  }
  const observer = getObserve(obs)
  targets.delete(element)
  observer.unobserve(element)
}

function excute(entries) {
  entries.forEach(each => {
    const { target, intersectionRatio, isIntersecting } = each
    if(intersectionRatio > 0 || isIntersecting) {
      const tar = targets.get(target)
      if(tar) {
        tar.cb(each)
        unobserve(target, tar.observer)
      }
    }
  })
}
