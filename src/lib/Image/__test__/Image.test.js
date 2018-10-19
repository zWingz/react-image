import React from 'react'
import Image from '..'
import { shallow } from 'enzyme'

describe('Image', () => {
  it('Image Mounted', () => {
    const result = shallow(<Image src='test.png'/>)
    expect(result.instance().props.src).toEqual('test.png')
  })
})
