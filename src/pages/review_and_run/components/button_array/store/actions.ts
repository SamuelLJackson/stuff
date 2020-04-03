import GRID_ACTIONS from '../../grid/store/actions'
import CONTAINER_ACTIONS from '../../../../../container/store/actions'
import MODALS_ACTIONS from '../../../components/modals/store/actions'
import TITLE_BAR_ACTIONS from '../../title_bar/store/actions'
import { constants, responses, dateUtilities } from '../../../../../common'
import * as types from './types'

const save = () => {

    return (dispatch: any, getState: any) => {
      const details = getState().reviewAndRun.grid.data
      const deletedDetailIds = getState().reviewAndRun.grid.deletedDetailIds
      const isForecast = getState().reviewAndRun.buttonArray.isForecast
      const name = getState().reviewAndRun.titleBar.name
      const orderSeriesKey = getState().reviewAndRun.grid.orderSeriesKey
  
      dispatch(GRID_ACTIONS.setIsLoading(true, constants.LoadingTypes.SAVE_CHANGES))
  
      return fetch(`${window.apiHost}/api/v1.0/orderSeries/UpdateDetails`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          details,
          deletedDetailIds,
          isForecast,
          name,
          orderSeriesKey,
        }),
      })
        .then(response => responses.handleJSON(response))
        .then((json: any) => {
          if (json.stack) {
            dispatch(
              CONTAINER_ACTIONS.setError({
                message: 'Server Error',
                stack: json.stack,
                innerMessage: json.innerMessage,
                backTo: 'Home',
              })
            )
          } else {
            dispatch(GRID_ACTIONS.setIsLoading(false, constants.LoadingTypes.SAVE_CHANGES))
            dispatch(GRID_ACTIONS.setIsDirty(false))
            dispatch(GRID_ACTIONS.clearDeletedDetails())
            dispatch(GRID_ACTIONS.receiveDetails(json.details))
          }
        })
        .catch(error =>  {
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

const run = ()  => (dispatch: any, getState: any) => {
  dispatch(GRID_ACTIONS.setIsLoading(true, constants.LoadingTypes.ORDER_CREATION))
  const data = getState().reviewAndRun.grid.data
  const orderSeriesKey = data[0].orderSeriesKey
  const base = `${window.apiHost}/api/v1.0/orderSeries/`
  const endpoint = `${base}RunOrderSeries?orderSeriesKey=${orderSeriesKey}`
  dispatch(MODALS_ACTIONS.setShowResultModal(true, constants.RunResultTypes.PROCESSING))
  dispatch(GRID_ACTIONS.unselectAllRows())

  return fetch(endpoint, { credentials: 'include' })
    .then(response => responses.handleJSON(response))
    .then((json: any) => {
      dispatch(GRID_ACTIONS.setIsLoading(false, constants.LoadingTypes.ORDER_CREATION))
      if (json.stack) {
        if (json.stack === 'isRunning') {
          dispatch(MODALS_ACTIONS.setShowResultModal(false, constants.RunResultTypes.WARNING_ORDER_CREATION))
          let runTimer = getState().reviewAndRun.modals.runTimer
          clearInterval(runTimer)
          dispatch(MODALS_ACTIONS.setRunTimer(null))
          dispatch(MODALS_ACTIONS.setShowOrderCreationWarningModal(true))
        } else {
          dispatch(
            CONTAINER_ACTIONS.setError({
              message: 'Server Error',
              stack: json.stack,
              innerMessage: json.innerMessage,
              backTo: 'Home',
            })
          )
          let runTimer = getState().reviewAndRun.modals.runTimer
          clearInterval(runTimer)
          dispatch(MODALS_ACTIONS.setRunTimer(null))
        }
      } else {
          dispatch(MODALS_ACTIONS.setStoreMessage(json.innerMessage))
          dispatch(MODALS_ACTIONS.updateResultType(constants.RunResultTypes.ORDER_CREATION))
          let runTimer = getState().reviewAndRun.modals.runTimer
          clearInterval(runTimer)
          dispatch(MODALS_ACTIONS.setRunTimer(null))
          dispatch(TITLE_BAR_ACTIONS.setStatus(constants.OrderSeriesStatusKeys.IS_COMPLETED))
      }
    })
    .catch(error =>  {
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

const requestForecast = (showWarning: boolean) => (dispatch: any, getState: any) => {
  dispatch(GRID_ACTIONS.setIsLoading(true, constants.LoadingTypes.FORECAST))
  const data = getState().reviewAndRun.grid.data
  const orderSeriesKey = data[0].orderSeriesKey
  const base = `${window.apiHost}/api/v1.0/orderSeries/`
  const endpoint = `${base}CreateForecast?orderSeriesKey=${orderSeriesKey}`
  const orderSeriesName = getState().reviewAndRun.titleBar.name
  dispatch(MODALS_ACTIONS.setShowResultModal(true, constants.RunResultTypes.PROCESSING))
  if (showWarning) {
    dispatch(MODALS_ACTIONS.setShowResultModal(true, constants.RunResultTypes.WARNING_FORECAST))
  }

  return fetch(endpoint, { credentials: 'include' })
    .then(response => {
      dispatch(GRID_ACTIONS.setIsLoading(false, constants.RunResultTypes.WARNING_FORECAST))
    
      responses.handleExcel(response, `Forecast - ${orderSeriesName} - ${dateUtilities.getTodayAsDateTime()}`)
      .then((json: any) => {
          if (json && json.stack) {
            if (json.stack === 'noItems') {
              dispatch(MODALS_ACTIONS.updateResultType(constants.RunResultTypes.NO_ITEMS))
            } else {
              dispatch(
                CONTAINER_ACTIONS.setError({
                  message: 'Server Error',
                  stack: json.stack,
                  innerMessage: json.innerMessage,
                  backTo: 'Home',
                })
              )
            }
            let runTimer = getState().reviewAndRun.modals.runTimer
            clearInterval(runTimer)
            dispatch(MODALS_ACTIONS.setRunTimer(null))
          } else {
            dispatch(MODALS_ACTIONS.updateResultType(constants.RunResultTypes.FORECAST))
            let runTimer = getState().reviewAndRun.modals.runTimer
            clearInterval(runTimer)
            dispatch(MODALS_ACTIONS.setRunTimer(null))
        }
      })
    })
    .catch(error =>  {
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

const checkForRunningOrderSeries = () => (dispatch: any, getState: any) => {
  const base = `${window.apiHost}/api/v1.0/orderSeries/`
  const orderSeriesKey = getState().reviewAndRun.grid.orderSeriesKey
  const endpoint = `${base}CheckForRunningOrderSeries?orderSeriesKey=${orderSeriesKey}`

  return fetch(endpoint, { credentials: 'include' })
  .then(response => responses.handleJSON(response))
  .then((json: any) => {
    if (json.stack) {
      dispatch(
        CONTAINER_ACTIONS.setError({
          message: 'Server Error',
          stack: json.stack,
          innerMessage: json.innerMessage,
          backTo: 'Home',
        })
      )
    } else {
      dispatch(requestForecast(json.showWarning))
    }
  })
  .catch(error =>  {
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

const setIsForecast = (isForecast: boolean) => ({
  type: types.SET_IS_FORECAST,
  payload: isForecast,
})

const setIsLoading = (isLoading: boolean) => ({
  type: types.SET_IS_LOADING,
  payload: isLoading,
})

const reset = () => ({type: types.RESET})

export default {
  save,
  run,
  checkForRunningOrderSeries,
  setIsForecast,
  setIsLoading,
  reset,
}