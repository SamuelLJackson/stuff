import CONTAINER_ACTIONS from '../../../../../container/store/actions'
import { responses, constants } from '../../../../../common'
import { OrderSeries } from '../../../../../common/types'
import REVIEW_AND_RUN_GRID_ACTIONS from '../../../../review_and_run/components/grid/store/actions'
import REVIEW_AND_RUN_MODALS_ACTIONS from '../../../../review_and_run/components/modals/store/actions'
import * as types from './types'
import OPTION_BAR_ACTIONS from '../../option_bar/store/actions'

const requestLookups = () => {
  return (dispatch: any) => {
    const base = `${window.apiHost}/api/v1.0/orderSeries/`

    dispatch(OPTION_BAR_ACTIONS.setIsLoading(true))
    return fetch(`${base}OrderSeriesLookup`, { credentials: 'include' })
      .then(responses.handleJSON)
      .then((json: any) => {
        dispatch(OPTION_BAR_ACTIONS.setIsLoading(false))
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
          dispatch(OPTION_BAR_ACTIONS.receiveOrderSeries(json.orderSeries))
          dispatch(setShowTable(true))
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

const receiveOrderSeriesResults = (orderSeriesResults: OrderSeries[]) => ({
  type: types.RECEIVE_ORDER_SERIES_RESULTS,
  payload: orderSeriesResults,
})

const setShowTable = (showTable: boolean) => ({
  type: types.SET_SHOW_TABLE,
  payload: showTable,
})

const requestOrderSeriesDetails = (orderSeriesKey: number) => {
  return (dispatch: any) => {
    
    dispatch(CONTAINER_ACTIONS.updateSelectedView('/reviewAndRun'))
    dispatch(REVIEW_AND_RUN_GRID_ACTIONS.setIsLoading(true, constants.LoadingTypes.DETAILS))
    const base = `${window.apiHost}/api/v1.0/orderSeries/`

    return fetch(
      `${base}GetOrderSeriesDetails?orderSeriesKey=${orderSeriesKey}`,
      { credentials: 'include' }
    )
      .then(responses.handleJSON)
      .then((json: any) => {
        if (json.stack) {
          if (json.stack === 'inReview') {
            dispatch(
              REVIEW_AND_RUN_MODALS_ACTIONS.setShowResultModal(
                true,
                constants.RunResultTypes.IN_REVIEW
              )
            )
            dispatch(
              REVIEW_AND_RUN_GRID_ACTIONS.setIsLoading(false, constants.LoadingTypes.DETAILS)
            )
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
        } else {
          dispatch(
            REVIEW_AND_RUN_GRID_ACTIONS.setIsLoading(false, constants.LoadingTypes.DETAILS)
          )
          dispatch(REVIEW_AND_RUN_GRID_ACTIONS.receiveLookups(json))

          dispatch(REVIEW_AND_RUN_GRID_ACTIONS.createStoreObjects(json.stores))
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

const reset = () => ({type: types.RESET})

export default {
  requestLookups,
  receiveOrderSeriesResults,
  requestOrderSeriesDetails,
  setShowTable,
  reset,
}
