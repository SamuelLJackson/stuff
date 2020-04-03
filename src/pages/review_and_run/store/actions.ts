import BUTTON_ARRAY_ACTIONS from '../components/button_array/store/actions'
import GRID_ACTIONS from '../components/grid/store/actions'
import MODALS_ACTIONS from '../components/modals/store/actions'
import TITLE_BAR_ACTIONS from '../components/title_bar/store/actions'
import * as types from './types'
import CONTAINER_ACTIONS from '../../../container/store/actions'
import { responses } from '../../../common'

const reset = () => {
    return (dispatch: any) => {
        dispatch({type: types.RESET})
        dispatch(BUTTON_ARRAY_ACTIONS.reset())
        dispatch(GRID_ACTIONS.reset())
        dispatch(MODALS_ACTIONS.reset())
        dispatch(TITLE_BAR_ACTIONS.reset())
    }
}

const closeReviewSession = () => {
    return (dispatch: any, getState: any) => {
      const orderSeriesKey = getState().reviewAndRun.grid.orderSeriesKey
      if (orderSeriesKey === 0) {
        return
      }
      const base = `${window.apiHost}/api/v1.0/orderSeries/`
  
      return fetch(`${base}CloseReviewSession?orderSeriesKey=${orderSeriesKey}`, {
        credentials: 'include',
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

export default {
    closeReviewSession,
    reset,
}
