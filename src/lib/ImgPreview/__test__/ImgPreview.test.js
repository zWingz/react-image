import React from 'react'
import ImgPreview from '..'
import { shallow, mount } from 'enzyme'
import LoadingIcon from '../../LoadingIcon'
import Image from '../../Image'
import ErrorIcon from '../../ErrorIcon'
function getComp() {
  return <ImgPreview />
}
const imgCurrent = '.img-viewer-current'
describe('test preview initial state', () => {
  const wrapper = shallow(getComp())
  it('initial state', () => {
    const ins = wrapper.instance()
    expect(ins.state.images).toHaveLength(0)
    expect(ins.state.current).toEqual(0)
    expect(ins.state.open).toEqual(false)
    expect(ins.state.loaded).toEqual(false)
    expect(ins.state.error).toEqual(false)
    expect(ins.state.x).toEqual(0)
    expect(ins.state.y).toEqual(0)
    expect(ins.state.left).toEqual(0)
    expect(ins.state.top).toEqual(0)
    expect(ins.state.scale).toEqual(1)
    expect(ins.state.rotate).toEqual(0)
    expect(ins.state.changed).toEqual(false)
  })
})
describe('test preview img with not load', () => {
  const wrapper = shallow(getComp())
  const ins = wrapper.instance()
  const src = '1.jpg'
  ins.exportPreview(src)
  it('test src', () => {
    expect(ins.state.images).toHaveLength(1)
    expect(ins.state.images[0]).toEqual(src)
    expect(wrapper.find(imgCurrent).prop('src')).toEqual(src)
  })
  it('test onload and error status', () => {
    expect(
      wrapper.find(imgCurrent).hasClass('dis-none')
    ).toBeTruthy()
    expect(wrapper.find(LoadingIcon)).toHaveLength(1)
    expect(wrapper.find(ErrorIcon)).toHaveLength(0)
  })
  it('test preview list', () => {
    expect(wrapper.find(Image)).toHaveLength(1)
    const img = wrapper
      .find(Image)
      .dive()
      .instance()
    expect(img.props.src).toEqual(src)
  })
})
describe('test preview image with onload', () => {
  const wrapper = shallow(getComp())
  const ins = wrapper.instance()
  const spy = jest.spyOn(ins, 'imgOnLoad')
  const src = 'src.jpg'
  ins.exportPreview(src)
  wrapper.update()
  ins.forceUpdate()
  it('trigger onload', () => {
    wrapper
      .find(imgCurrent)
      .simulate('load', { target: { naturalWidth: 1024 } })
    expect(spy).toBeCalledTimes(1)
  })
  it('load and error status', () => {
    expect(ins.state.loaded).toBeTruthy()
    expect(ins.state.error).toBeFalsy()
  })
  it('scale is 0.75', (done) => {
    setTimeout(() => {
      expect(ins.state.scale).toBe(0.75)
      done()
    }, 30)
  })
  it('hide loading icon', () => {
    expect(wrapper.find(LoadingIcon)).toHaveLength(0)
    expect(wrapper.find(ErrorIcon)).toHaveLength(0)
  })
})

describe('test preview img on error', () => {
  const wrapper = shallow(getComp())
  const ins = wrapper.instance()
  ins.exportPreview('src')
  it('trigger onError', () => {
    const spy = jest.spyOn(ins, 'imgOnError')
    wrapper.update()
    ins.forceUpdate()
    wrapper.find(imgCurrent).simulate('error')
    expect(spy).toBeCalledTimes(1)
  })
  it('show error icon and hide loading icon', () => {
    expect(wrapper.find(LoadingIcon)).toHaveLength(0)
    expect(wrapper.find(ErrorIcon)).toHaveLength(1)
  })
})


describe('test preview img in imglist', () => {
  const src1 = '1.jpg'
  const src2 = '2.jpg'
  const src3 = '3.jpg'
  const src4 = '4.jpg'
  const list = [src1, src2, src3, src4]
  const wrapper = shallow(getComp())
  const ins = wrapper.instance()
  it('preview with a src', () => {
    ins.exportPreview(src3, list)
    expect(ins.state.current).toEqual(2)
    expect(ins.state.images).toEqual(list)
    expect(wrapper.find(imgCurrent).prop('src')).toEqual(src3)
  })
  it('preview with a index', () => {
    ins.exportPreview(1)
    expect(ins.state.current).toEqual(1)
    expect(wrapper.find(imgCurrent).prop('src')).toEqual(src2)
  })
  it('preview with a new list', () => {
    const newList = ['1.jpg', '2.jpg']
    ins.exportPreview('1.jpg', newList)
    expect(ins.state.current).toEqual(0)
    expect(ins.state.images).toEqual(newList)
    expect(wrapper.find(imgCurrent).prop('src')).toEqual(newList[0])
  })
  it('preview a img not in list, it will replace old list', () => {
    ins.exportPreview('new.jpg')
    expect(ins.state.current).toEqual(0)
    expect(ins.state.images).toEqual(['new.jpg'])
  })
})


describe('test img transform', () => {
  const wrapper = mount(getComp())
  const ins = wrapper.instance()
  ins.exportPreview('1.src')
  wrapper
    .find(imgCurrent)
    .simulate('load', { target: { naturalWidth: 1024 } })
  // jest.useFakeTimers()
  const container = wrapper.find('#imgPreview')
  wrapper.update()
  describe('test scale', () => {
    let expectScale = 0.75
    const preventDefault = jest.fn()
    const stopPropagation = jest.fn()
    it('test scale down', () => {
      // setTimeout(() => {
      expect(ins.state.scale).toEqual(expectScale)
      container.simulate('wheel', { deltaY: -10, preventDefault, stopPropagation })
      expect(preventDefault).toBeCalledTimes(1)
      expect(stopPropagation).toBeCalledTimes(1)
      expectScale *= 0.8
      expect(ins.state.scale).toEqual(expectScale)
      // done()
      // }, 50)
    })
    it('test scale up', () => {
      // setTimeout(() => {
      container.simulate('wheel', { deltaY: 10, preventDefault, stopPropagation })
      expectScale *= 1.2
      expect(ins.state.scale).toEqual(expectScale)
      // done()
      // }, 50)
    })
  })
  describe('test move', () => {
    const startX = 100
    const startY = 100
    const stopPropagation = jest.fn()
    expect(ins.state.left).toEqual(0)
    expect(ins.state.top).toEqual(0)
    const img = wrapper.find(imgCurrent)
    it('test mouseDown', () => {
      img.simulate('mousedown', { button: 1, stopPropagation})
      expect(stopPropagation).toBeCalledTimes(1)
      img.simulate('mousedown', {
        button: 0, stopPropagation, clientX: startX, clientY: startY
      })
      wrapper.update()
      ins.forceUpdate()
      expect(ins.state.x).toEqual(100)
      expect(ins.state.y).toEqual(100)
      expect(container.getDOMNode().style.cursor).toEqual('move')
    })
  })
})
