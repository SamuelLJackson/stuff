import { responses } from '../../../../../common'
import CONTAINER_ACTIONS from '../../../../../container/store/actions'
import GRID_ACTIONS from '../../grid/store/actions'
import * as types from './types'
import { OrderSeries } from '../../../../../common/types'

const requestAllOrderSeries = () => {
    return (dispatch: any) => {
      const base = `${window.apiHost}/api/v1.0/orderSeries/`
  
      dispatch(setIsLoading(true))
      return fetch(`${base}OrderSeriesLookup`, { credentials: 'include' })
        .then(responses.handleJSON)
        .then((json: any) => {
          dispatch(setIsLoading(false))
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
            dispatch(GRID_ACTIONS.receiveOrderSeriesResults(json.orderSeries))
            dispatch(receiveOrderSeries(json.orderSeries))
            dispatch(GRID_ACTIONS.setShowTable(true))
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

const requestOrderSeriesOutput = (orderSeriesKey: number) => {
    return (dispatch: any, getState: any) => {
    const base = `${window.apiHost}/api/v1.0/orderSeries/`

    dispatch(setIsLoading(true))
    return fetch(
        `${base}GetOrderSeriesByKey?orderSeriesKey=${orderSeriesKey}`,
        { credentials: 'include' })
        .then(responses.handleJSON)
        .then((json: any) => {
        dispatch(setIsLoading(false))
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
            dispatch(GRID_ACTIONS.receiveOrderSeriesResults(json.orderSeries))
            if (getState().home.grid.showTable === false) {
              dispatch(GRID_ACTIONS.setShowTable(true))
            }
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

const setIsLoading = (isLoading: boolean) => ({
  type: types.SET_IS_LOADING,
  payload: isLoading,
})

const setOrderSeries = (orderSeries: types.SelectOption | null) => ({
  type: types.SET_ORDER_SERIES,
  payload: orderSeries,
})

const receiveOrderSeries = (orderSeries: OrderSeries[]) => ({
  type: types.RECEIVE_ORDER_SERIES,
  payload: orderSeries,
})

const reset = () => ({type: types.RESET})

export default {
  requestAllOrderSeries,
  requestOrderSeriesOutput,
  setIsLoading,
  setOrderSeries,
  receiveOrderSeries,
  reset,
}
