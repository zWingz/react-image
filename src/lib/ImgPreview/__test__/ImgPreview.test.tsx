import * as React from 'react'
import ImgPreview, { PreviewApi } from '..'
import { shallow, mount } from 'enzyme'
import LoadingIcon from '../../LoadingIcon'
import Image from '../../Image'
import ErrorIcon from '../../ErrorIcon'

function getComp() {
  return <ImgPreview />
}
const imgCurrent = '.img-viewer-current'
describe('test preview initial state', () => {
  const wrapper = shallow<ImgPreview>(getComp())
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
  const wrapper = shallow<ImgPreview>(getComp())
  const ins = wrapper.instance()
  const src = '1.jpg'
  ins.exportPreview(src)
  it('test src', () => {
    expect(ins.state.images).toHaveLength(1)
    expect(ins.state.images[0]).toEqual(src)
    expect(wrapper.find(imgCurrent).prop('src')).toEqual(src)
  })
  it('test onload and error status', () => {
    expect(wrapper.find(imgCurrent).hasClass('dis-none')).toBeTruthy()
    expect(wrapper.find(LoadingIcon)).toHaveLength(1)
    expect(wrapper.find(ErrorIcon)).toHaveLength(0)
  })
  it('test preview list', () => {
    expect(wrapper.find(Image)).toHaveLength(1)
    const img = wrapper
      .find(Image)
      .dive()
      .instance() as Image
    expect(img.props.src).toEqual(src)
  })
})
describe('test preview image with onload', () => {
  const wrapper = shallow<ImgPreview>(getComp())
  const ins = wrapper.instance() as ImgPreview
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
  it('scale is 0.75', done => {
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
  const wrapper = shallow<ImgPreview>(getComp())
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
  const wrapper = shallow<ImgPreview>(getComp())
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
  const wrapper = mount<ImgPreview>(getComp())
  const ins = wrapper.instance()
  ins.exportPreview('1.src')
  wrapper.find(imgCurrent).simulate('load', { target: { naturalWidth: 1024 } })
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
      container.simulate('wheel', {
        deltaY: -10,
        preventDefault,
        stopPropagation
      })
      expect(preventDefault).toBeCalledTimes(1)
      expect(stopPropagation).toBeCalledTimes(1)
      expectScale *= 0.8
      expect(ins.state.scale).toEqual(expectScale)
      // done()
      // }, 50)
    })
    it('test scale up', () => {
      // setTimeout(() => {
      container.simulate('wheel', {
        deltaY: 10,
        preventDefault,
        stopPropagation
      })
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
      img.simulate('mousedown', { button: 1, stopPropagation })
      expect(stopPropagation).toBeCalledTimes(1)
      img.simulate('mousedown', {
        button: 0,
        stopPropagation,
        clientX: startX,
        clientY: startY
      })
      wrapper.update()
      ins.forceUpdate()
      expect(ins.state.x).toEqual(100)
      expect(ins.state.y).toEqual(100)
      expect((container.getDOMNode() as HTMLDivElement).style.cursor).toEqual('move')
    })
    it('test mouseMove', () => {
      const endX = 500
      const endY = -500
      const startLeft = ins.state.left
      const startTop = ins.state.top
      const event = new MouseEvent('mousemove', {
        clientX: endX,
        clientY: endY
      })
      container.getDOMNode().dispatchEvent(event)
      expect(ins.state.x).toEqual(endX)
      expect(ins.state.y).toEqual(endY)
      expect(ins.state.left).toEqual(startLeft + endX - startX)
      expect(ins.state.top).toEqual(startTop + endY - startY)
    })
    it('test mouseUp', () => {
      container.simulate('mouseup')
      expect((container.getDOMNode() as HTMLDivElement).style.cursor).toEqual('initial')
    })
    it('it should remove mouseMove listener after mouseUp', () => {
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 100
      })
      const initX = ins.state.x
      const initY = ins.state.y
      container.getDOMNode().dispatchEvent(mouseMoveEvent)
      expect(ins.state.x).toEqual(initX)
      expect(ins.state.y).toEqual(initY)
    })
  })
  describe('test rotate', () => {
    const rotate = wrapper.find('.img-viewer-rotate')
    expect(rotate).toHaveLength(2)
    rotate.at(0).simulate('click')
    expect(ins.state.rotate).toEqual(90)
    rotate.at(1).simulate('click')
    expect(ins.state.rotate).toEqual(0)
  })
})

describe('test change index', () => {
  const wrapper = shallow<ImgPreview>(getComp())
  const ins = wrapper.instance()
  const src = ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
  ins.exportPreview('1.jpg', src)
  // expect(ins.state.current).toEqual(0)
  it('test prev', () => {
    const prev = wrapper.find('.img-viewer-prev')
    expect(prev).toHaveLength(1)
    prev.simulate('click')
    expect(ins.state.current).toEqual(3)
    expect(wrapper.find(imgCurrent).prop('src')).toEqual(src[3])
  })
  it('test next', () => {
    const next = wrapper.find('.img-viewer-next')
    expect(next).toHaveLength(1)
    next.simulate('click')
    expect(ins.state.current).toEqual(0)
    expect(wrapper.find(imgCurrent).prop('src')).toEqual(src[0])
  })
  it('test keyup code 39 is next', () => {
    const event = new KeyboardEvent('keyup', {
      keyCode: 39
    } as KeyboardEventInit)
    window.dispatchEvent(event)
    expect(ins.state.current).toEqual(1)
    expect(wrapper.find(imgCurrent).prop('src')).toEqual(src[1])
  })
  it('test keyup code 37 is prev', () => {
    const event = new KeyboardEvent('keyup', {
      keyCode: 37
    } as KeyboardEventInit)
    window.dispatchEvent(event)
    expect(ins.state.current).toEqual(0)
    expect(wrapper.find(imgCurrent).prop('src')).toEqual(src[0])
  })
  it('test chang in preview list', () => {
    const result = 2
    expect(wrapper.find('.img-viewer-list-item')).toHaveLength(4)
    wrapper
      .find('.img-viewer-list-item')
      .at(result)
      .simulate('click')
    expect(ins.state.current).toEqual(result)
    expect(wrapper.find(imgCurrent).prop('src')).toEqual(src[result])
  })
})

describe('test show/hide', () => {
  const wrapper = mount<ImgPreview>(getComp())
  const ins = wrapper.instance()
  it('test show', () => {
    wrapper.setState({
      top: 100,
      left: 100,
      scale: 100,
      rotate: 100,
      changed: true,
      loaded: true
    })
    expect(wrapper.state()).toMatchObject({
      top: 100,
      left: 100,
      scale: 100,
      rotate: 100,
      changed: true,
      loaded: true
    })
    ins.show()
    expect(wrapper.state()).toMatchObject({
      top: 0,
      left: 0,
      scale: 0,
      rotate: 0,
      loaded: false,
      open: true
    })
    expect(document.body.style.overflow).toEqual('hidden')
  })
  it('test hide', () => {
    ins.hide()
    expect(wrapper.state('open')).toBe(false)
    expect(document.body.style.overflow).toEqual('')
    ins.show()
    const hide = jest.spyOn(ins, 'hide')
    const event = new KeyboardEvent('keyup', {
      keyCode: 27
    } as KeyboardEventInit)
    window.dispatchEvent(event)
    expect(hide).toBeCalledTimes(1)
    const bodyHideHandle = jest.spyOn(ins, 'hideHandle')
    ins.show()
    const bodyClickEvent = new MouseEvent('click', {
      bubbles: true
    })
    document.body.dispatchEvent(bodyClickEvent)
    expect(bodyHideHandle).toBeCalledTimes(1)
  })
})

describe('test getInstance', () => {
  let instance
  it('test mount dom', () => {
    expect(document.getElementById('imgPreview')).toBeFalsy()
    ImgPreview.newInstance(i => {
      instance = i
    })
    expect(document.getElementById('imgPreview')).toBeTruthy()
  })
  it('test instance property', () => {
    expect(instance).toHaveProperty('preview')
    expect(instance).toHaveProperty('show')
    expect(instance).toHaveProperty('hide')
    expect(instance).toHaveProperty('component')
    expect(instance).toHaveProperty('destroy')
    expect(instance.component).toBeInstanceOf(ImgPreview)
  })
  it('test instance preview', () => {
    const ins = instance.component
    ins.exportPreview = jest.fn()
    instance.preview('1', ['1', '2'])
    expect(ins.exportPreview).toBeCalledTimes(1)
    expect(ins.exportPreview).toBeCalledWith('1', ['1', '2'])
  })
  it('test instance show', () => {
    const ins = instance.component
    expect(ins).toBeInstanceOf(ImgPreview)
    ins.show = jest.fn()
    instance.show()
    expect(ins.show).toBeCalledTimes(1)
  })
  it('test instance hide', () => {
    const ins = instance.component
    expect(ins).toBeInstanceOf(ImgPreview)
    ins.hide = jest.fn()
    instance.hide()
    expect(ins.hide).toBeCalledTimes(1)
  })
  it('test instance destroy', () => {
    const ins = instance.component
    expect(ins).toBeInstanceOf(ImgPreview)
    instance.destroy()
    expect(document.getElementById('imgPreview')).toBeFalsy()
  })
})

describe('test api', () => {
  it('test api', () => {
    const preview = jest.fn()
    const show = jest.fn()
    const hide = jest.fn()
    const destroy = jest.fn()
    ImgPreview.newInstance = function(callback) {
      callback({
        preview(current, list) {
          preview(current, list)
        },
        show() {
          show()
        },
        component: {} as ImgPreview,
        hide() {
          hide()
        },
        destroy
      })
    }
    PreviewApi.preview('1', ['1', '2'])
    expect(preview).toBeCalledTimes(1)
    expect(preview).toBeCalledWith('1', ['1', '2'])
    PreviewApi.show()
    expect(show).toBeCalledTimes(1)
    PreviewApi.hide()
    expect(hide).toBeCalledTimes(1)
    PreviewApi.destroy()
    expect(destroy).toBeCalledTimes(1)
  })
})
