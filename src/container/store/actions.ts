import * as types from './types'
import { push } from 'connected-react-router'

import REVIEW_AND_RUN_ACTIONS from '../../pages/review_and_run/store/actions'
import UPLOAD_ACTIONS from '../../pages/upload/store/actions'
import CREATE_ACTIONS from '../../pages/create/store/actions'
import HOME_ACTIONS from '../../pages/home/store/actions'
import CONTAINER_ACTIONS from '../../container/store/actions'
import { responses } from '../../common'

const updateSelectedView = (view: string) => {

  return (dispatch: any, getState: any) => {
    const isDirty = getState().reviewAndRun.grid.isDirty
  
    if (isDirty) {
      if (window.confirm('OK to lose unfinished changes?')) {
        dispatch(REVIEW_AND_RUN_ACTIONS.closeReviewSession())
        dispatch(push(`${window.appName}${view}`))
      } else {
        return
      }
    } else if (getState().container.selectedView === '/create') {
      dispatch(REVIEW_AND_RUN_ACTIONS.closeReviewSession())
    }

    dispatch(REVIEW_AND_RUN_ACTIONS.closeReviewSession())
    dispatch(push(`${window.appName}${view}`))
  }
}

const setError = (error: types.Error) => {
  return (dispatch: any) => {
    dispatch({
      type: types.SET_ERROR,
      payload: error,
    })
    dispatch(push(`${window.appName}/error`))
    dispatch(resetApp())
  }
}

const setHasCreatePermission = (isAllowedToCreate: boolean) => ({
  type: types.SET_HAS_CREATE_PERMISSION,
  payload: isAllowedToCreate,
})

const setHasRunPermission = (isAllowedToRun: boolean) => ({
  type: types.SET_HAS_RUN_PERMISSION,
  payload: isAllowedToRun,
})

const setHasEditSomeoneElsesOrderSeriesPermission = (isAllowedToEditSomeoneElsesOrderSeries: boolean) => ({
  type: types.SET_HAS_EDIT_SOMEONE_ELSES_ORDER_SERIES_PERMISSION,
  payload: isAllowedToEditSomeoneElsesOrderSeries,
})

const setHasEditOrderSeriesPermission = (isAllowedToEdit: boolean) => ({
  type: types.SET_HAS_EDIT_ORDER_SERIES_PERMISSION,
  payload: isAllowedToEdit,
})

const checkRunOrderSeriesPermission = () => {
  return (dispatch: any) => {
    const base = `${window.apiHost}/api/v1.0/orderSeries/`
    return fetch(
      `${base}CheckRunOrderseriesPermission`,
      { credentials: 'include' }
    )
      .then(responses.handleJSON)
      .then((json: any) => {
        dispatch(setHasRunPermission(true))
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

const checkEditSomeoneElsesOrderSeriesPermission = () => {
  return (dispatch: any) => {
    const base = `${window.apiHost}/api/v1.0/orderSeries/`
    return fetch(
      `${base}CheckEditSomeoneElsesOrderSeriesPermission`,
      { credentials: 'include' }
    )
      .then(responses.handleJSON)
      .then((json: any) => {
        dispatch(setHasEditSomeoneElsesOrderSeriesPermission(true))
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

const checkCreateOrderSeriesPermission = () => {
  return (dispatch: any) => {
    const base = `${window.apiHost}/api/v1.0/orderSeries/`
    return fetch(
      `${base}CheckCreateOrderseriesPermission`,
      { credentials: 'include' }
    )
      .then(responses.handleJSON)
      .then((json: any) => {
        dispatch(setHasCreatePermission(true))
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

const checkEditOrderSeriesPermission = () => {
  return (dispatch: any) => {
    const base = `${window.apiHost}/api/v1.0/orderSeries/`
    return fetch(
      `${base}CheckEditOrderseriesPermission`,
      { credentials: 'include' }
    )
      .then(responses.handleJSON)
      .then((json: any) => {
        dispatch(setHasEditOrderSeriesPermission(true))
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

const resetContainer = () => ({ type: types.RESET })

const resetApp = () => {
  return (dispatch: any) => {
    dispatch(UPLOAD_ACTIONS.reset())
    dispatch(CREATE_ACTIONS.reset())
    dispatch(HOME_ACTIONS.reset())
    dispatch(REVIEW_AND_RUN_ACTIONS.reset())
    dispatch(resetContainer())
  }
}

const checkPermissions = () => {
  return (dispatch: any) => {
    dispatch(checkCreateOrderSeriesPermission())
    dispatch(checkRunOrderSeriesPermission())
    dispatch(checkEditOrderSeriesPermission())
    dispatch(checkEditSomeoneElsesOrderSeriesPermission())
  }
}

export default {
  updateSelectedView,
  setError,
  resetApp,
  checkPermissions,
}
