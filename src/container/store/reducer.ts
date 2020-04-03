import * as types from './types'

const defaultState: types.ContainerState = {
  error: types.BaseError,
  hasCreatePermission: false,
  hasEditSomeoneElsesOrderSeriesPermission: false,
  hasRunPermission: false,
  hasEditOrderSeriesPermission: false
}

const reducer = (state = defaultState, action: types.ContainerActionTypes) => {
  console.log(action)
  let newState = Object.assign({}, state)
  switch (action.type) {
    case types.SET_ERROR: {
      newState.error = action.payload
      break
    }

    case types.SET_HAS_CREATE_PERMISSION: {
      newState.hasCreatePermission = action.payload
      break
    }

    case types.SET_HAS_RUN_PERMISSION: {
      newState.hasRunPermission = action.payload
      break
    }

    case types.SET_HAS_EDIT_SOMEONE_ELSES_ORDER_SERIES_PERMISSION: {
      newState.hasEditSomeoneElsesOrderSeriesPermission = action.payload
      break
    }

    case types.SET_HAS_EDIT_ORDER_SERIES_PERMISSION: {
      newState.hasEditOrderSeriesPermission = action.payload
      break
    }

    case types.RESET: {
      newState.hasCreatePermission = false
      newState.hasEditOrderSeriesPermission = false
      newState.hasEditSomeoneElsesOrderSeriesPermission = false
      newState.hasRunPermission = false
      break
    }

    default:
      break
  }
  return newState
}

export default reducer
