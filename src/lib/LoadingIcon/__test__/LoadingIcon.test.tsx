import * as React from 'react'
import ErrorIcon from '..'
import { shallow } from 'enzyme'
// import renderer from 'react-test-renderer'
describe('<LoadingIcon />', () => {
  it('LoadingIcon mounted', () => {
    const result = shallow(<ErrorIcon/>)
    expect(result.children().length).toEqual(4)
  })
  it('LoadingIcon size', () => {
    const result = shallow(<ErrorIcon size='sm'/>)
    expect(result.hasClass('lds-ring')).toEqual(true)
    expect(result.hasClass('sm')).toEqual(true)
    expect(result.hasClass('lg')).toEqual(false)
  })
})
