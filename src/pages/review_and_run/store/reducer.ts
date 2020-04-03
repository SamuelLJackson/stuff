import { combineReducers } from 'redux'
import gridReducer from '../components/grid/store/reducer'
import modalsReducer from '../components/modals/store/reducer'
import titleBarReducer from '../components/title_bar/store/reducer'
import buttonArrayReducer from '../components/button_array/store/reducer'

export default combineReducers({
    grid: gridReducer,
    modals: modalsReducer,
    titleBar: titleBarReducer,
    buttonArray: buttonArrayReducer,
  })
