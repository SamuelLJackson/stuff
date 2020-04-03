import { combineReducers } from 'redux'
import gridReducer from '../components/grid/store/reducer'
import optionBarReducer from '../components/option_bar/store/reducer'

export default combineReducers({
  grid: gridReducer,
  optionBar: optionBarReducer,
})
