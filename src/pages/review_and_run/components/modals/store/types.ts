import { SelectOption } from '../../../../../common/types'

export interface ModalsState {
  selectedAdditionalStores: SelectOption[]
  showResultModal: boolean

  selectedDate: string

  showAddStoreModal: boolean
  showModal: boolean
  runResultType: number
  runTimer: any
  showOrderCreationWarningModal: boolean
  storeMessage: string
}

export const SET_ADDITIONAL_STORES = 'SET_ADDITIONAL_REVIEW_AND_RUN_STORES'
export const SET_SHOW_RESULT_MODAL = 'SET_SHOW_REVIEW_AND_RUN_RESULT_MODAL'
export const SET_DATE = 'SET_REVIEW_AND_RUN_DATE'
export const UPDATE_RESULT_TYPE = 'UPDATE_RESULT_TYPE'
export const SET_RUN_TIMER = 'SET_RUN_TIMER'

export const SET_SHOW_ADD_STORE_MODAL = 'SET_SHOW_ADD_STORE_MODAL'
export const SET_SHOW_ORDER_CREATION_WARNING_MODAL = 'SET_SHOW_ORDER_CREATION_WARNING_MODAL'
export const RESET = 'RESET_REVIEW_AND_RUN_MODALS'
export const SET_STORE_MESSAGE = 'SET_STORE_MESSAGE'

interface SetAdditionalStores {
  type: typeof SET_ADDITIONAL_STORES
  payload: SelectOption[]
}

interface ShowResultModalPayload {
  showModal: boolean
  runResultType: number
}

interface SetShowResultModal {
  type: typeof SET_SHOW_RESULT_MODAL
  payload: ShowResultModalPayload
}

interface SetDate {
  type: typeof SET_DATE
  payload: string
}

interface SetShowAddStoreModal {
  type: typeof SET_SHOW_ADD_STORE_MODAL
  payload: boolean
}

interface UpdateResultType {
  type: typeof UPDATE_RESULT_TYPE
  payload: number
}

interface SetRunTimer {
  type: typeof SET_RUN_TIMER
  payload: any
}

interface SetShowOrderCreationWarningModal {
  type: typeof SET_SHOW_ORDER_CREATION_WARNING_MODAL
  payload: boolean
}

interface Reset {
  type: typeof RESET
  payload: any
}

interface setStoreMessage {
  type: typeof SET_STORE_MESSAGE
  payload: string
}

export type ModalsActionTypes =
  | SetAdditionalStores
  | SetShowResultModal
  | SetDate
  | SetShowAddStoreModal
  | UpdateResultType
  | SetRunTimer
  | SetShowOrderCreationWarningModal
  | Reset
  | setStoreMessage
