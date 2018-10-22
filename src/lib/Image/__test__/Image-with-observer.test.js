import React from 'react'
import ImageComponent from '..'
import { shallow, mount } from 'enzyme'

function getComp(prop) {
  return <ImageComponent src="test.png" {...prop} />
}

describe('test when IntersectionObserver is true', () => {
  const observe = jest.fn()
  const unobserve = jest.fn()
  beforeAll(() => {
    window.IntersectionObserver = jest.fn(function() {
      this.observe = observe
      this.unobserve = unobserve
    })
  })
  it('observe img', () => {
    const wrapper = shallow(getComp())
    expect(observe).toBeCalledTimes(1)
    expect(wrapper.instance().state.loadObserve).toBeFalsy()
    expect(wrapper.find('img').length).toEqual(0)
    const observerCallback = window.IntersectionObserver.mock.calls[0][0]
    observerCallback([
      { target: wrapper.instance().refDom.current, intersectionRatio: 100 }
    ])
    expect(unobserve).toBeCalledTimes(1)
    expect(wrapper.instance().state.loadObserve).toBeTruthy()
    expect(wrapper.find('img').length).toEqual(1)
    wrapper.instance().componentWillUnmount()
    expect(unobserve).toBeCalledTimes(1)
  })
})
