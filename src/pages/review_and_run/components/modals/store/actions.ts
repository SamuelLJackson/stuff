import * as types from './types'

import { SelectOption } from '../../../../../common/types'

const setAdditionalStores = (store: SelectOption[]) => ({
  type: types.SET_ADDITIONAL_STORES,
  payload: store,
})

const setShowResultModal = (showModal: boolean, runResultType: number) => ({
  type: types.SET_SHOW_RESULT_MODAL,
  payload: {
    showModal,
    runResultType,
  },
})

const setDate = (date: string) => ({
  type: types.SET_DATE,
  payload: date,
})

const setShowAddStoreModal = (showModal: boolean) => ({
  type: types.SET_SHOW_ADD_STORE_MODAL,
  payload: showModal,
})

const updateResultType = (resultType: number) => ({ 
  type: types.UPDATE_RESULT_TYPE,
  payload: resultType,
})

const setRunTimer = (timer: any) => ({
  type: types.SET_RUN_TIMER,
  payload: timer,
})

const setShowOrderCreationWarningModal = (showModal: boolean) => ({
  type: types.SET_SHOW_ORDER_CREATION_WARNING_MODAL,
  payload: showModal,
})

const setStoreMessage = (message: string) => ({
  type: types.SET_STORE_MESSAGE,
  payload: message
})

const reset = () => ({type: types.RESET})

export default {
  setAdditionalStores,
  setShowResultModal,
  setDate,
  setShowAddStoreModal,
  updateResultType,
  setRunTimer,
  setShowOrderCreationWarningModal,
  reset,
  setStoreMessage
}
