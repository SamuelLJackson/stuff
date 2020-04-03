import { combineReducers } from 'redux'
import createReducer from '../pages/create/store/reducer'
import reviewAndRunReducer from '../pages/review_and_run/store/reducer'
import containerReducer from '../container/store/reducer'
import homeReducer from '../pages/home/store/reducer'
import uploadReducer from '../pages/upload/store/reducer'
import { connectRouter } from 'connected-react-router'

const appReducer = (history) =>  combineReducers({
  router: connectRouter(history),
  create: createReducer,
  reviewAndRun: reviewAndRunReducer,
  container: containerReducer,
  home: homeReducer,
  upload: uploadReducer,
})

export default (state, action) =>  appReducer(state, action)
