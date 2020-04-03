import * as types from './types'
import { deepCopyObject } from '../../../../../common'

const defaultState: types.OptionBarState = {
  orderSeries: [],
  selectedOrderSeries: null,
  isLoading: false,
}

export default (state = defaultState, action: types.OptionBarActionTypes): types.OptionBarState => {
  console.log(action)
  let newState: any = Object.assign({}, state)
  const { type, payload } = action

  switch (type) {
    case types.RECEIVE_ORDER_SERIES: {
      newState.orderSeries = payload
      break
    }

    case types.SET_ORDER_SERIES: {
      newState.selectedOrderSeries = payload
      break
    }

    case types.SET_IS_LOADING: {
      newState.isLoading = action.payload
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
