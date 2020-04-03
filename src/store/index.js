import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from './thunk'
import rootReducer from './reducer'

export default initialState => {
  return createStore(rootReducer, initialState, applyMiddleware(logger, thunk))
}
