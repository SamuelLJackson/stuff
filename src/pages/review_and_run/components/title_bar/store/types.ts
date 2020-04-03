export interface TitleBarState {
    name: string
    statusKey: number
}

export const SET_NAME = 'SET_REVIEW_AND_RUN_NAME'
export const SET_STATUS = 'SET_REVIEW_AND_RUN_STATUS'
export const RESET = 'RESET_REVIEW_AND_RUN_TITLE_BAR'

interface SetName {
    type: typeof SET_NAME
    payload: any
}

interface SetStatus {
    type: typeof SET_STATUS
    payload: any
}

interface Reset {
    type: typeof RESET
    payload: any
}

export type TitleBarActionTypes = 
  | SetName
  | SetStatus
  | Reset
