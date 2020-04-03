import { responses, dateUtilities } from '../../../common'
import CONTAINER_ACTIONS from '../../../container/store/actions'
import * as types from './types'

const checkUploadFilePermission = () => {
  return (dispatch: any) => {
    const base = `${window.apiHost}/api/v1.0/orderSeries/`
    return fetch(
      `${base}CheckUploadFilePermission`,
      { credentials: 'include' }
    )
      .then(responses.handleJSON)
      .then((json: any) => {
        dispatch(setUploadFilePermission(true))
      })
      .catch(error =>  {
        if (error.message !== 403) {
          dispatch(CONTAINER_ACTIONS.setError(
            {
              stack: error.stack, 
              message: error.message, 
              innerMessage: '', 
              backTo: 'Home'
            }
          ))
        }
      })
  }
}

const setUploadFilePermission = (isAllowedToUoload: boolean) => ({
  type: types.SET_HAS_UPLOAD_FILE_PERMISSION,
  payload: isAllowedToUoload,
})

const postUpload = () => {
  return (dispatch: any) => {
      const base = `${window.apiHost}/api/v1.0/orderSeries/`
  
      dispatch(setIsLoading(true))

      const input: any = document.getElementById("excel-file")

      if (input !== null) {
          const files = input.files
          
          const formData = new FormData()
          formData.append('uploadTemplate', files[0])

          return fetch(`${base}UploadFile`, 
          { 
              credentials: 'include',
              method: 'POST',
              body: formData,
          })
            .then(response => responses.handleJSON(response))
            .then((json: any) => {
              dispatch(setIsLoading(false))
              if (json.stack) {
                dispatch(
                  CONTAINER_ACTIONS.setError({
                    message: 'Server Error',
                    stack: json.stack,
                    innerMessage: json.innerMessage,
                    backTo: 'Update Shipping Route',
                  })
                )
              } else {
                dispatch(receiveResults(json))
                dispatch(setShowModal(true))
                if (json.rejectedRows.length > 0) {
                  dispatch(requestRejectedRowsExcel(json.rejectedRows))
                } else {
                  input.value = '';
                }
              }
            })
            .catch(error =>  {
              dispatch(setIsLoading(false))
              dispatch(CONTAINER_ACTIONS.setError(
                {
                  stack: error.stack, 
                  message: error.message, 
                  innerMessage: '', 
                  backTo: 'Home'
                }
              ))
            })
          }
      }
  }

const requestRejectedRowsExcel = (rejectedRows: any) => {

  return (dispatch: any) => {
      const input: any = document.getElementById("excel-file")
      const base = `${window.apiHost}/api/v1.0/orderSeries/`
  
      dispatch(setIsLoading(true))

      return fetch(`${base}GetRejectedRows`, 
      { 
          credentials: 'include',
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(rejectedRows ),
      })
      .then(response => {
        dispatch(setIsLoading(false))
        responses.handleExcel(response, `Failed - ${dateUtilities.getTodayAsDateTime()}`)
        .then((json: any) => {
            if (json && json.stack) {
              dispatch(
                CONTAINER_ACTIONS.setError({
                  message: 'Server Error',
                  stack: json.stack,
                  innerMessage: json.innerMessage,
                  backTo: 'Update Shipping Route',
                })
              )
            } else {              
              input.value = '';
              dispatch(setIsFileSelected(false))
            }
        })
      })
      .catch(error =>  {
        alert('hey we are seting is loading to false')
        dispatch(setIsLoading(false))
        dispatch(CONTAINER_ACTIONS.setError(
          {
            stack: error.stack, 
            message: error.message, 
            innerMessage: '', 
            backTo: 'Update Shipping Route'
          }
        ))
      })
  }
}

const requestTemplate = () => {

  return (dispatch: any) => {
      const base = `${window.apiHost}/api/v1.0/orderSeries/`
  
      dispatch(setIsLoading(true))

      return fetch(`${base}GetTemplate`, { credentials: 'include' })
        .then(response => {
          dispatch(setIsLoading(false))
          responses.handleExcel(response, 'Template')
          .then((json: any) => {
              if (json && json.stack) {
                dispatch(
                  CONTAINER_ACTIONS.setError({
                    message: 'Server Error',
                    stack: json.stack,
                    innerMessage: json.innerMessage,
                    backTo: 'Update Shipping Route',
                  })
                )
              }
          })
        })
        .catch(error =>  {
          dispatch(CONTAINER_ACTIONS.setError(
            {
              stack: error.stack, 
              message: error.message, 
              innerMessage: '', 
              backTo: 'Update Shipping Route'
            }
          ))
        })
      }  
    }

const setIsLoading = (isLoading: boolean) => ({
  type: types.SET_IS_LOADING,
  payload: isLoading,
})

const setShowModal = (showModal: boolean) => ({
  type: types.SET_SHOW_MODAL,
  payload: showModal,
})

const receiveResults = (results: any) => ({
  type: types.RECEIVE_RESULTS,
  payload: results,
})

const setIsFileSelected = (isFileSelected: boolean) => ({
  type: types.SET_IS_FILE_SELECTED,
  payload: isFileSelected,
})

const reset = () => ({type: types.RESET_UPLOAD})

export default {
  postUpload,
  requestTemplate,
  setIsLoading,
  setShowModal,
  setIsFileSelected,
  reset,
  checkUploadFilePermission
}
