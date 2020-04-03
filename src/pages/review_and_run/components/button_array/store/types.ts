export interface ButtonArrayState {
    isForecast: boolean
    isLoading: boolean
}

export const SET_IS_FORECAST = 'SET_IS_FORECAST'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const RESET = 'RESET_REVIEW_AND_RUN_BUTTON_ARRAY'

interface SetIsForecast {
    type: typeof SET_IS_FORECAST,
    payload: any
}

interface SetIsLoading {
    type: typeof SET_IS_LOADING,
    payload: any
}

interface Reset {
    type: typeof RESET,
    payload: any
}

export type ButtonArrayActionTypes =
    | SetIsForecast
    | SetIsLoading
    | Reset
