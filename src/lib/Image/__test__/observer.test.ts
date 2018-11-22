import {
  CanUseIntersecion, createObserver, observe, unobserve
} from '../observer'

describe('test when IntersectionObserver is false', () => {
  it('CanUseIntersecion return Falsy', () => {
    expect(CanUseIntersecion()).toBeFalsy()
  })
  it('createObserver return null', () => {
    expect(createObserver()).toBeNull()
  })
  it('observe and unobserve return undefined', () => {
    const div = document.createElement('div')
    expect(observe(div, () => {})).toBeUndefined()
    expect(unobserve(div)).toBeUndefined()
  })
})
