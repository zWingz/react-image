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
export function createObserver(container) {
  if(!CanUseIntersecion) {
    return null
  }
  const opt = {}
  if(container) {
    opt.root = container
  }
  return new IntersectionObserver(excute, opt)
}
// const ins = CanUseIntersecion ? new IntersectionObserver(excute) : null
const ins = createObserver()
/* eslint-enable */

export function observe(element, cb, observer = ins) {
  if(!CanUseIntersecion) {
    return
  }
  observer.observe(element)
  targets.set(element, {
    cb,
    observer
  })
}

export function unobserve(element, observer = ins) {
  if(!CanUseIntersecion) {
    return
  }
  targets.delete(element)
  observer.unobserve(element)
}

function excute(entries) {
  entries.forEach(each => {
    const { target, intersectionRatio } = each
    if(intersectionRatio > 0) {
      const tar = targets.get(target)
      tar.cb(each)
      unobserve(target, tar.observer)
    }
  })
}
