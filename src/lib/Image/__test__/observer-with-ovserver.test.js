import {
  CanUseIntersecion, createObserver, observe, unobserve
} from '../observer'

describe('test when IntersectionObserver is false', () => {
  const observeFn = jest.fn()
  const unobserveFn = jest.fn()
  beforeAll(() => {
    window.IntersectionObserver = jest.fn(function(excute, opt) {
      this.observe = observeFn
      this.unobserve = unobserveFn
      this.root = opt.root
    })
  })
  it('CanUseIntersecion return true', () => {
    expect(CanUseIntersecion()).toBeTruthy()
  })
  it('createObserver', () => {
    const observer1 = createObserver()
    expect(observer1).toBeTruthy()
    const observer2 = createObserver(document.body)
    expect(observer2.root).toBe(document.body)
  })
  it('observe callback', () => {
    const observeCb = jest.fn()
    const dom = document.body
    observe(dom, observeCb)
    const observerCallback = window.IntersectionObserver.mock.calls[0][0]
    observerCallback([
      { target: dom, intersectionRatio: 100 }
    ])
    expect(observeCb).toBeCalledTimes(1)
    expect(unobserveFn).toBeCalledTimes(1)
    observerCallback([
      { target: dom, intersectionRatio: 100 }
    ])
    expect(observeCb).toBeCalledTimes(1)
    expect(unobserveFn).toBeCalledTimes(1)
  })
})
