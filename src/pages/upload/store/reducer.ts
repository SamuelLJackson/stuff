import * as types from './types'
import { deepCopyObject } from '../../../common'
  
  const defaultState: types.UploadState = {
    isLoading: false,
    showModal: false,
    successCount: 0,
    failureCount: 0,
    rejectedRows: [],
    isFileSelected: false,
    hasUploadFilePermission: false
  }
  
  export default (state = defaultState, action: types.UploadActionTypes): types.UploadState => {
    console.log(action)
    let newState: any = Object.assign({}, state)
    const { type, payload } = action
  
    switch (type) {
      case types.SET_IS_LOADING: {
        newState.isLoading = payload
        break
      }

      case types.RECEIVE_RESULTS: {
        newState.successCount = payload.successCount
        newState.failureCount = payload.failureCount
        newState.rejectedRows = payload.rejectedRows
        break
      }

      case types.SET_SHOW_MODAL: {
        newState.showModal = payload
        break
      }

      case types.SET_IS_FILE_SELECTED: {
        newState.isFileSelected = payload
        break
      }

      case types.RESET_UPLOAD: {
        newState = deepCopyObject(defaultState)
        break
      }

      case types.SET_HAS_UPLOAD_FILE_PERMISSION: {
        newState.hasUploadFilePermission = action.payload
        break
      }

      default:
    }
  
    return newState
  }
  