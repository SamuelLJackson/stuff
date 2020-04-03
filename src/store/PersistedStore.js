import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from './thunk'
import createAppReducer from './reducer'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

const today = new Date()
const yyyy = today.getFullYear()
const mm = String(today.getMonth() + 1).padStart(2, '0')
const dd = String(today.getDate()).padStart(2, '0')
const period = today.getHours() > 11 ? 'PM' : 'AM'

const LOCAL_STORAGE_NAME = `poolBuys${yyyy}-${mm}-${dd}-${period}`
export const history = createBrowserHistory()

class PersistedStore {
  static DefaultStore = null

  static getDefaultStore() {
    if (PersistedStore.DefaultStore === null) {
      PersistedStore.DefaultStore = new PersistedStore()
    }

    return PersistedStore.DefaultStore
  }

  _store = null

  constructor() {
    this.initStore()
  }

  initStore() {
    this._store = createStore(
      createAppReducer(history),
      PersistedStore.loadState(),
      applyMiddleware(logger, thunk, routerMiddleware(history))
    )
    this._store.subscribe(() => {
      PersistedStore.saveState(this._store.getState())
    })
  }

  get store() {
    return this._store
  }

  static loadState() {
    try {
      let serializedState = localStorage.getItem(LOCAL_STORAGE_NAME)

      if (serializedState === null) {
        return PersistedStore.initialStore()
      }

      return JSON.parse(serializedState)
    } catch (err) {
      return PersistedStore.initialState()
    }
  }

  static saveState(state) {
    try {
      let serializedState = JSON.stringify(state)
      localStorage.setItem(LOCAL_STORAGE_NAME, serializedState)
    } catch (err) {}
  }

  static initialState() {
    return {}
  }
}

export default PersistedStore
