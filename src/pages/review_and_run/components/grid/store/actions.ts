import TITLE_BAR_ACTIONS from '../../title_bar/store/actions'
import BUTTON_ARRAY_ACTIONS from '../../../components/button_array/store/actions'
import * as types from './types'

import {
  Filter,
  SelectOption,
  Store,
} from '../../../../../common/types'

const reset = () => ({ type: types.RESET })

const clearFilters = () => ({
  type: types.CLEAR_FILTERS,
  payload: [],
})

const selectRow = (id: string) => ({
  type: types.SELECT_ROW,
  payload: id,
})

const unselectRow = (id: string) => ({
  type: types.UNSELECT_ROW,
  payload: id,
})

const selectAllRows = () => ({ type: types.SELECT_ALL_ROWS })

const unselectAllRows = () => ({ type: types.UNSELECT_ALL_ROWS })

const setIsLoading = (isLoading: boolean, loadingType: number) => ({
  type: types.SET_IS_LOADING,
  payload: {
    isLoading,
    loadingType,
  },
})

const addAdditionalDetails = (date: string, stores: SelectOption[]) => ({ 
  type: types.ADD_ADDITIONAL_DETAILS,
  payload: {
    date,
    stores,
  }
})

const setFilteredRows = (rows: types.Row[], filters: Filter[]) => ({
  type: types.SET_FILTERED_ROWS,
  payload: { rows, filters },
})

const bulkUpdateSelectedRows = (key: keyof types.OrderSeriesDetail, value: any) => (
  dispatch: any
) => {
  dispatch({
    type: types.UPDATE_SELECTED_ROWS,
    payload: {
      key,
      value,
    },
  })

  dispatch(setIsDirty(true))
}

const deleteSelectedRows = () => ({ type: types.DELETE_SELECTED_ROWS })

const createStoreObjects = (stores: Store[]) => ({
  type: types.CREATE_STORE_OBJECTS,
  payload: stores,
})

const receiveLookups = (lookups: types.GridLookups) => {

  return (dispatch: any) => {
    dispatch({
      type: types.RECEIVE_LOOKUPS,
      payload: lookups,
    })
    dispatch(TITLE_BAR_ACTIONS.setName(lookups.name))
    dispatch(TITLE_BAR_ACTIONS.setStatus(lookups.statusKey))
    dispatch(BUTTON_ARRAY_ACTIONS.setIsForecast(lookups.isForecast))
  }
}

const receiveDetails = (details: types.OrderSeriesDetail[]) => ({
  type: types.RECEIVE_DETAILS,
  payload: details,
})

const clearDeletedDetails = () => ({ type: types.CLEAR_DELETED_DETAILS })

const setIsDirty = (isDirty: boolean) => ({
  type: types.SET_IS_DIRTY,
  payload: isDirty,
})

const setShowError = (date: string, stores: SelectOption[]) => ({ 
  type: types.SET_SHOW_ERROR,
  payload: {
    date,
    stores,
  }
})

const checkSelectedBoxes = () => {
  return (dispatch: any, getState: any) => {
    const selectedRows = getState().reviewAndRun.grid.selectedRows
    let deleteCheckboxes: any = document.getElementsByClassName('delete-checkbox')
    for (let i=0; i< deleteCheckboxes.length; ++i) {
      const rowId = deleteCheckboxes[i].id.replace('styled-checkbox-checkbox', '')
      if (selectedRows[rowId] === true) {
        deleteCheckboxes[i].checked = true
      }
    }
  }
}

export default {
  reset,
  clearFilters,
  selectRow,
  unselectRow,
  selectAllRows,
  unselectAllRows,
  setFilteredRows,
  checkSelectedBoxes,
  deleteSelectedRows,
  bulkUpdateSelectedRows,

  createStoreObjects,
  setIsLoading,
  addAdditionalDetails,
  receiveLookups,
  receiveDetails,
  clearDeletedDetails,
  setIsDirty,
  setShowError,
}
