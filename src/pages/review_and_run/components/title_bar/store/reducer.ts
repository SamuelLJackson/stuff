import * as types from './types'
import { deepCopyObject } from '../../../../../common'

const defaultState: types.TitleBarState = {
    name: '',
    statusKey: 1,
}

export default  (state = defaultState, action: types.TitleBarActionTypes) => {
    console.log(action)
    let newState = Object.assign({}, state)
    const { type, payload } = action

    switch(type) {
        case types.SET_NAME: {
          newState.name = payload
          break
        }
    
        case types.SET_STATUS: {
          newState.statusKey = payload
          break
        }

        case types.RESET: {
          newState = deepCopyObject(defaultState)
          break
        }

        default:
    }

    return newState
}
