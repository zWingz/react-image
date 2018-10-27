import React from 'react'
import ErrorIcon from '..'
import { shallow, mount, render } from 'enzyme'
// import renderer from 'react-test-renderer'
describe('<ErrorIcon />', () => {
  it('ErrorIcon mounted', () => {
    const result = shallow(<ErrorIcon />)
    expect(result.children().length).toEqual(0)
  })
  it('ErrorIcon style', () => {
    const style = { width: '100px'}
    const result = shallow(<ErrorIcon style={style} />)
    expect(result.prop('style')).toEqual({
      backgroundImage: 'url(test-file-stub)',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '65% 65%',
      border: '1px dashed #dadada',
      height: '100%',
      // width: '100px'
      ...style
    })
  })
})
