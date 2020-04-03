import {
  OriginLocation,
  SelectOption,
  RequestType,
  Store,
} from '../../../common/types'

export interface ReplenishmentType {
  replenishmentTypeKey: number
  name: string
}

export interface State {
  stateKey: number
  stateName: string
  stores: Store[]
}

export interface CreateState {
  name: string
  selectedReplenishmentType: SelectOption | null
  replenishmentTypes: ReplenishmentType[]
  originLocations: OriginLocation[]
  availableOriginLocations: OriginLocation[]
  selectedOriginLocations: { [locationKey: number]: boolean }
  stores: Store[]
  states: { [stateKey: number]: State }
  selectedStores: { [storeKey: number]: boolean }
  selectedDate: string
  requestTypes: RequestType[]
  selectedRequestTypes: { [requestTypeKey: number]: boolean }
  skipPresentationLevels: boolean
  shipUsingOnlyLowStockQuantities: boolean
  disableOrdering: boolean
  collapseState: { [stateKey: number]: boolean }
  collapseAll: boolean
  filteredStates: State[]
  showNoResult: boolean
}

export const RECEIVE_LOOKUPS = 'RECEIVE_REVIEW_AND_RUN_LOOKUPS'
export const SET_NAME = 'SET_NAME'
export const SELECT_REPLENISHMENT_TYPE = 'SELECT_REPLENISHMENT_TYPE'
export const SELECT_ORIGIN_LOCATION = 'SELECT_ORIGIN_LOCATION'
export const SELECT_ALL_ORIGIN_LOCATIONS = 'SELECT_ALL_REVIEW_AND_RUN_ORIGIN_LOCATIONS'
export const UNSELECT_ALL_ORIGIN_LOCATIONS =
  'UNSELECT_ALL_REVIEW_AND_RUN_ORIGIN_LOCATIONS'
export const SELECT_STATE = 'SELECT_REVIEW_AND_RUN_STATE'
export const UNSELECT_STATE = 'UNSELECT_STATE'
export const SELECT_STORE = 'SELECT_STORE'
export const SELECT_ALL_STORES = 'SELECT_ALL_STORES'
export const UNSELECT_ALL_STORES = 'UNSELECT_ALL_STORES'

export const SET_DATE = 'SET_DATE'
export const SELECT_REQUEST_TYPE = 'SELECT_REQUEST_TYPE'
export const UNSELECT_REQUEST_TYPE = 'UNSELECT_REVIEW_AND_RUN_REQUEST_TYPE'
export const SELECT_ALL_REQUEST_TYPES = 'SELECT_ALL_REVIEW_AND_RUN_REQUEST_TYPES'
export const UNSELECT_ALL_REQUEST_TYPES = 'UNSELECT_ALL_REVIEW_AND_RUN_REQUEST_TYPES'
export const SET_SKIP_PRESENTATION_LEVELS = 'SET_SKIP_PRESENTATION_LEVELS'
export const SET_SHIP_USING_ONLY_LOW_STOCK_QUANTITIES =
  'SET_SHIP_USING_ONLY_LOW_STOCK_QUANTITIES'
export const SET_GRAY_OVERLAY_DISPLAY = 'SET_GRAY_OVERLAY_DISPLAY'
export const SET_COLLAPSE_STATE = 'SET_COLLAPSE_STATE'
export const RESET = 'RESET_CREATE'
export const SET_STORE_SEARCH_INPUT = 'SET_STORE_SEARCH_INPUT'
export const SET_SHOW_RESULT = 'SET_SHOW_RESULT'
export const SET_COLLAPSE_ALL_STATES = 'SET_COLLAPSE_ALL_STATES'

interface ReceiveLookups {
  type: typeof RECEIVE_LOOKUPS
  payload: any
}

interface SetName {
  type: typeof SET_NAME
  payload: string
}

interface SetReplenishmentType {
  type: typeof SELECT_REPLENISHMENT_TYPE
  payload: SelectOption
}

interface SelectOriginLocation {
  type: typeof SELECT_ORIGIN_LOCATION
  payload: number
}

interface SelectAllOriginLocations {
  type: typeof SELECT_ALL_ORIGIN_LOCATIONS
  payload: any
}

interface UnselectAllOriginLocations {
  type: typeof UNSELECT_ALL_ORIGIN_LOCATIONS
  payload: any
}

interface SelectState {
  type: typeof SELECT_STATE
  payload: number
}

interface UnselectState {
  type: typeof UNSELECT_STATE
  payload: number
}

interface SetShowResult {
  type: typeof SET_SHOW_RESULT
  payload: boolean
}

interface SelectStore {
  type: typeof SELECT_STORE
  payload: number
}

interface SelectAllStores {
  type: typeof SELECT_ALL_STORES
  payload: any
}

interface UnselectAllStores {
  type: typeof UNSELECT_ALL_STORES
  payload: any
}

interface SetDate {
  type: typeof SET_DATE
  payload: any
}

interface SelectRequestType {
  type: typeof SELECT_REQUEST_TYPE
  payload: number
}

interface UnselectRequestType {
  type: typeof UNSELECT_REQUEST_TYPE
  payload: number
}

interface SelectAllRequestTypes {
  type: typeof SELECT_ALL_REQUEST_TYPES
  payload: any
}

interface UnselectAllRequestTypes {
  type: typeof UNSELECT_ALL_REQUEST_TYPES
  payload: any
}

interface SetSkipPresentationLevels {
  type: typeof SET_SKIP_PRESENTATION_LEVELS
  payload: boolean
}

interface SetShipUsingOnlyLowStock {
  type: typeof SET_SHIP_USING_ONLY_LOW_STOCK_QUANTITIES
  payload: boolean
}

interface SetGrayOverlayDisplay {
  type: typeof SET_GRAY_OVERLAY_DISPLAY
  payload: any
}

interface SetCollapseState {
  type: typeof SET_COLLAPSE_STATE
  payload: number
}

interface SetCollapseAllStates {
  type: typeof SET_COLLAPSE_ALL_STATES
  payload: boolean
}

interface SetSelectedStores {
  type: typeof SET_STORE_SEARCH_INPUT
  payload: string
}

interface Reset {
  type: typeof RESET
  payload: any
}

export type CreateActionTypes =
  | ReceiveLookups
  | SetName
  | SetReplenishmentType
  | SelectOriginLocation
  | SelectAllOriginLocations
  | UnselectAllOriginLocations
  | SelectState
  | UnselectState
  | SetShowResult
  | SelectStore
  | SelectAllStores
  | UnselectAllStores
  | SetDate
  | SelectRequestType
  | UnselectRequestType
  | SelectAllRequestTypes
  | UnselectAllRequestTypes
  | SetSkipPresentationLevels
  | SetShipUsingOnlyLowStock
  | SetGrayOverlayDisplay
  | SetCollapseState
  | SetCollapseAllStates
  | SetSelectedStores
  | Reset
