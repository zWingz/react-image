import React from 'react'
import ImageComponent from '..'
import { shallow } from 'enzyme'

function getComp(prop) {
  return <ImageComponent src="test.png" {...prop} />
}

describe('test when IntersectionObserver is true', () => {
  let observeCallCounter = 0
  let unobserveCallCounter = 0
  const observe = jest.fn(() => {
    observeCallCounter++
  })
  const unobserve = jest.fn(() => {
    unobserveCallCounter++
  })
  beforeAll(() => {
    window.IntersectionObserver = jest.fn(function() {
      this.observe = observe
      this.unobserve = unobserve
    })
  })
  beforeEach(() => {
    observeCallCounter = 0
    unobserveCallCounter = 0
  })
  it('observe img', () => {
    const wrapper = shallow(getComp())
    expect(observeCallCounter).toEqual(1)
    expect(wrapper.instance().state.loadObserve).toBeFalsy()
    expect(wrapper.find('img')).toHaveLength(0)
    const observerCallback = window.IntersectionObserver.mock.calls[0][0]
    observerCallback([
      { target: wrapper.instance().refDom.current, intersectionRatio: 100 }
    ])
    expect(unobserveCallCounter).toEqual(1)
    expect(wrapper.instance().state.loadObserve).toBeTruthy()
    expect(wrapper.find('img')).toHaveLength(1)
    wrapper.instance().componentWillUnmount()
    expect(unobserveCallCounter).toEqual(1)
  })
  it('unobserve when unmount', () => {
    const wrapper = shallow(getComp())
    expect(observeCallCounter).toEqual(1)
    wrapper.instance().componentWillUnmount()
    expect(unobserveCallCounter).toEqual(1)
  })
})
