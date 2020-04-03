import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import thunk from '../store/thunk'
import configureMockStore from 'redux-mock-store'

const middlewares = [thunk]
export const mockStore = configureMockStore(middlewares)


export const reduxify = (Component, props = {}, state = {}) => {
    
    return function reduxWrap() {
      return (
        <ReduxProvider store={mockStore(state)}>
            <Component {...props} />
        </ReduxProvider>
      )
    }
}

export const makeMountRender = (Component, defaultProps = {}) => {
    return (customProps = {}) => {
        const props = {
        ...defaultProps,
        ...customProps,
        }
        return mount(<Component {...props} />)
    }
}

export const makeShallowRender = (Component, defaultProps = {}) => {
  return (customProps = {}) => {
    const props = {
      ...defaultProps,
      ...customProps,
    }
    return shallow(<Component {...props} />)
  }
}

export const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  })
}
