import * as types from './types'
import { deepCopyObject } from '../../../../../common'

const defaultState: types.GridState = {
  orderSeriesResults: [],
  showTable: false,
}

export default (state = defaultState, action: types.GridActionTypes): types.GridState => {
  console.log(action)
  let newState: any = Object.assign({}, state)
  const { type, payload } = action

  switch (type) {
    case types.RECEIVE_ORDER_SERIES_RESULTS: {
      newState.orderSeriesResults = payload
      break
    }

    case types.SET_SHOW_TABLE: {
      newState.showTable = action.payload
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
