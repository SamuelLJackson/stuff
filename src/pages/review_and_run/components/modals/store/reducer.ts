import * as types from './types'
import { deepCopyObject } from '../../../../../common'

const defaultState: types.ModalsState = {
  selectedDate: '',

  showAddStoreModal: false,
  selectedAdditionalStores: [],
  showResultModal: false,
  showModal: false,
  runResultType: 1,

  runTimer: null,
  showOrderCreationWarningModal: false,
  storeMessage: ''
}

export default (state = defaultState, action: types.ModalsActionTypes) => {
  console.log(action)
  let newState = Object.assign({}, state)
  const { type, payload } = action

  switch (type) {

    case types.SET_DATE: {
      newState.selectedDate = payload
      break
    }

    case types.SET_ADDITIONAL_STORES: {
      newState.selectedAdditionalStores = payload
      break
    }

    case types.SET_SHOW_RESULT_MODAL: {
      newState.showModal = payload.showModal
      newState.runResultType = payload.runResultType
      break
    }

    case types.SET_SHOW_ADD_STORE_MODAL: {
      newState.showAddStoreModal = payload
      if (payload === false) {
        newState.selectedDate = ''
        newState.selectedAdditionalStores = []
      }
      break
    }

    case types.UPDATE_RESULT_TYPE: {
      newState.runResultType = payload
      break
    }

    case types.SET_RUN_TIMER: {
      newState.runTimer = payload
      break
    }

    case types.SET_SHOW_ORDER_CREATION_WARNING_MODAL: {
      newState.showOrderCreationWarningModal = payload
      break
    }

    case types.RESET: {
      newState = deepCopyObject(defaultState)
      break
    }

    case types.SET_STORE_MESSAGE:{
      newState.storeMessage = payload
      break 
    }

    default:
      break
  }

  return newState
}
