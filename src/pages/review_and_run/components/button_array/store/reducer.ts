import * as types from './types'
import { deepCopyObject } from '../../../../../common'

const defaultState: types.ButtonArrayState = {    
  isForecast: true,
  isLoading: false,
}

export default (state = defaultState, action: types.ButtonArrayActionTypes) => {
    console.log(action)
    let newState = Object.assign({}, state)
    const { type, payload } = action
  
    switch (type) {
        case types.SET_IS_FORECAST: {
          newState.isForecast = payload
          break
        }

        case types.SET_IS_LOADING: {
          newState.isLoading = payload
          break
        }

        case types.RESET: {
          newState = deepCopyObject(defaultState)
          break
        }

        default:
    }

    return newState
}
