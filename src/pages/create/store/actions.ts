import REVIEW_GRID_ACTIONS from '../../review_and_run/components/grid/store/actions'
import CONTAINER_ACTIONS from '../../../container/store/actions'
import { responses } from '../../../common'
import { constants } from '../../../common'

import * as types from './types'

import { SelectOption } from '../../../common/types'

const requestLookups = () => {
  return (dispatch: any) => {
    return fetch(`${window.apiHost}/api/v1.0/orderSeries/ParametersLookups`, {
      credentials: 'include',
    })
      .then(responses.handleJSON)
      .then((json: any) => {
        dispatch(receiveLookups(json))
        dispatch(REVIEW_GRID_ACTIONS.createStoreObjects(json.stores))
      })
      .catch(error =>  {
        dispatch(CONTAINER_ACTIONS.setError(
          {
            stack: error.stack, 
            message: error.message, 
            innerMessage: '', 
            backTo: 'Create'
          }
        ))
      })
  }
}

const receiveLookups = (lookups: any) => ({
  type: types.RECEIVE_LOOKUPS,
  payload: lookups,
})

const setName = (name: string) => ({
  type: types.SET_NAME,
  payload: name,
})

const setReplenishmentType = (replenishmentType: SelectOption) => ({
  type: types.SELECT_REPLENISHMENT_TYPE,
  payload: replenishmentType,
})

const selectOriginLocation = (location: number) => ({
  type: types.SELECT_ORIGIN_LOCATION,
  payload: location,
})

const selectAllOriginLocations = () => ({
  type: types.SELECT_ALL_ORIGIN_LOCATIONS,
})

const unselectAllOriginLocations = () => ({
  type: types.UNSELECT_ALL_ORIGIN_LOCATIONS,
})

const selectState = (key: number) => ({
  type: types.SELECT_STATE,
  payload: key,
})

const unselectState = (key: number) => ({
  type: types.UNSELECT_STATE,
  payload: key,
})

const setShowResult = (showResult: boolean) => ({
  type: types.SET_SHOW_RESULT,
  payload: showResult,
})

const selectStore = (store: number) => ({
  type: types.SELECT_STORE,
  payload: store,
})

const selectAllStores = () => ({ type: types.SELECT_ALL_STORES })

const unselectAllStores = () => ({ type: types.UNSELECT_ALL_STORES })

const setDate = (date: any) => ({
  type: types.SET_DATE,
  payload: date,
})

const selectRequestType = (requestType: number) => ({
  type: types.SELECT_REQUEST_TYPE,
  payload: requestType,
})

const unselectRequestType = (requestType: number) => ({
  type: types.UNSELECT_REQUEST_TYPE,
  payload: requestType,
})

const selectAllRequestTypes = () => ({ type: types.SELECT_ALL_REQUEST_TYPES })

const unselectAllRequestTypes = () => ({
  type: types.UNSELECT_ALL_REQUEST_TYPES,
})

const setSkipPresentationLevels = (selection: boolean) => ({
  type: types.SET_SKIP_PRESENTATION_LEVELS,
  payload: selection,
})

const setShipUsingOnlyLowStockQuantities = (selection: boolean) => ({
  type: types.SET_SHIP_USING_ONLY_LOW_STOCK_QUANTITIES,
  payload: selection,
})

const setGrayOverlayDisplay = () => ({ type: types.SET_GRAY_OVERLAY_DISPLAY })

const setBasicInformation = (func: any) => {
  return async (dispatch: any) => {
    await dispatch(func)
    dispatch(setGrayOverlayDisplay())
  }
}

const setCollapseState = (key: number) => ({
  type: types.SET_COLLAPSE_STATE,
  payload: key,
})

const setCollapseAllStates = (collapseAllStates: boolean) => ({
  type: types.SET_COLLAPSE_ALL_STATES,
  payload: collapseAllStates,
})

const setStoreSearchInput = (input: string) => ({
  type: types.SET_STORE_SEARCH_INPUT,
  payload: input,
})

const postCreate = () => {
  return async (dispatch: any, getState: any) => {
    const formData = {
      name: getState().create.name,
      replenishmentTypeKey: getState().create.selectedReplenishmentType
        .value,
      origins: Object.keys(getState().create.selectedOriginLocations),
      stores: Object.keys(getState().create.selectedStores),
      date: getState().create.selectedDate.replace(/\//g, '-'),
      requestTypes: Object.keys(getState().create.selectedRequestTypes),
      skipPresentationLevels: getState().create.skipPresentationLevels,
      shipUsingOnlyLowStockQuantities: getState().create
        .shipUsingOnlyLowStockQuantities,
    }

    dispatch(CONTAINER_ACTIONS.updateSelectedView('/reviewAndRun'))
    dispatch(REVIEW_GRID_ACTIONS.setIsLoading(true, constants.LoadingTypes.DETAILS))

    return fetch(`${window.apiHost}/api/v1.0/orderSeries/PersistOrderSeries`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => responses.handleJSON(response))
      .then((json: any) => {
        if (json.stack) {
          dispatch(
            CONTAINER_ACTIONS.setError({
              message: 'Server Error',
              stack: json.stack,
              innerMessage: json.innerMessage,
              backTo: 'Create',
            })
          )
        } else {
          dispatch(REVIEW_GRID_ACTIONS.createStoreObjects(json.stores))
          dispatch(
            REVIEW_GRID_ACTIONS.setIsLoading(false, constants.LoadingTypes.DETAILS)
          )
          dispatch(REVIEW_GRID_ACTIONS.receiveLookups(json))
        }
      })
      .catch(error =>  {
        dispatch(CONTAINER_ACTIONS.setError(
          {
            stack: error.stack, 
            message: error.message, 
            innerMessage: '', 
            backTo: 'Create'
          }
        ))
      })
  }
}

const reset = () => ({ type: types.RESET })

export default {
  requestLookups,

  setName: (name: string) => setBasicInformation(setName(name)),
  setReplenishmentType: (type: SelectOption) =>
    setBasicInformation(setReplenishmentType(type)),
  selectOriginLocation: (location: number) =>
    setBasicInformation(selectOriginLocation(location)),
  selectAllOriginLocations: () =>
    setBasicInformation(selectAllOriginLocations()),
  unselectAllOriginLocations: () =>
    setBasicInformation(unselectAllOriginLocations()),
  selectState: (key: number) => setBasicInformation(selectState(key)),
  unselectState: (key: number) => setBasicInformation(unselectState(key)),
  selectStore: (store: number) => setBasicInformation(selectStore(store)),
  selectAllStores: () => setBasicInformation(selectAllStores()),
  unselectAllStores: () => setBasicInformation(unselectAllStores()),

  setBasicInformation,
  setDate,
  selectRequestType,
  unselectRequestType,
  selectAllRequestTypes,
  unselectAllRequestTypes,
  setSkipPresentationLevels,
  setShipUsingOnlyLowStockQuantities,
  setGrayOverlayDisplay,
  setCollapseState,
  setStoreSearchInput,
  setShowResult,
  setCollapseAllStates,

  postCreate,
  reset,
  receiveLookups,
}
