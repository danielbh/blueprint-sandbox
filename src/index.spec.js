import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Button from './index'

// If you would like to do this is a separate test setup file:
// https://github.com/airbnb/enzyme/issues/1265
configure({ adapter: new Adapter() })

describe('<Button />', () => {
  it('matches snapshot', () => {
    const tree = renderer
      .create(<Button onClick={() => { }} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('calls callback on click', () => {
    const spy = jest.fn()
    const component = shallow(<Button onClick={spy} />)
    component.simulate('click')
  })
})
