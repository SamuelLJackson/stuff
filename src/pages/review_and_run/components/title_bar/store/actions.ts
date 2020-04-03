import * as types from './types'

const setName = (name: string) => ({
    type: types.SET_NAME,
    payload: name,
})

const setStatus = (statusKey: number) => ({
    type: types.SET_STATUS,
    payload: statusKey,
})

const reset = () => ({type: types.RESET})

export default {
    setName,
    setStatus,
    reset,
}
