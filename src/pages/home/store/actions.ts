import GRID_ACTIONS from '../components/grid/store/actions'
import OPTION_BAR_ACTIONS from '../components/option_bar/store/actions'
import * as types from './types'

const reset = () => {
    return (dispatch: any) => {
        dispatch({type: types.RESET_HOME})
        dispatch(GRID_ACTIONS.reset())
        dispatch(OPTION_BAR_ACTIONS.reset())
    }
}

export default {
    reset
}
