import {
  Filter,
  OriginLocation,
  RequestType,
  Store,
  TruckRoute,
} from '../../../../../common/types'

import { CellInfo, DerivedDataObject, ReactTableFunction } from 'react-table'

export interface FilterProps {
  filter: any
  onChange: ReactTableFunction
  key?: string
}

export interface GridProps {
  data: OrderSeriesDetail[]
  isLoading: boolean
  filtered: Filter[]
  showError: boolean[]

  reset: Function
  setFilteredRows: Function
  checkSelectedBoxes: Function
  clearFilters: Function
  selectAllRows: Function
  unselectAllRows: Function
  setIsDirty: Function
}

export interface GridState {
  data: OrderSeriesDetail[]
  isLoading: boolean
  loadingType: number
  filtered: Filter[]
  selectedRows: { [rowKey: string]: boolean }
  showResultModal: boolean
  filteredRows: Row[]

  selectedStores: { [storeKey: number]: boolean }
  storeObjects: { [storeKey: number]: Store }
  originLocations: OriginLocation[]
  truckRoutes: TruckRoute[]
  stores: Store[]

  requestTypes: RequestType[]
  isDirty: boolean
  deletedDetailIds: number[]
  orderSeriesKey: number

  showError: boolean[]

  selectedOriginLocations: { [locationKey: number]: boolean }
  isOrderSeriesCreator: boolean
}

export interface OrderSeriesDetail {
  orderSeriesDetailKey: any
  orderSeriesKey: number
  tradingPartnerName: string
  outToDate: string
  requestTypes: string
  safetyStockPercent: number
  shipUsingOnlyLowStockQuantities: boolean
  skipPresentationLevels: boolean
  storeKey: number
  targetDeliveryDate: any
  tradingPartnerLocationKey: number
  truckRouteKey: number
  weight: number
}

export interface CellRenderProps {
  cellInfo: CellInfo
}

export interface Row extends DerivedDataObject {
  tradingPartnerName: string
  outToDate: string
  requestTypes: string
  safetyStockPercent: number
  shipUsingOnlyLowStockQuantities: boolean
  skipPresentationLevels: boolean
  storeKey: number
  targetDeliveryDate: any
  tradingPartnerLocationKey: number
  truckRouteKey: number
  undefined: any
  weight: number
  _original:any
}

export interface ButtonArrayProps {
  detailsFound: number
}

export interface GridLookups {
  orderSeriesKey: number
  name: string
  date: any
  statusKey: number
  isForecast: boolean
  details: OrderSeriesDetail[]
  originLocations: OriginLocation[]
  requestTypes: RequestType[]
  truckRoutes: TruckRoute[]
  stores: Store[]
}

export const CREATE_STORE_OBJECTS = 'CREATE_STORE_OBJECTS'

export const RESET = 'RESET_REVIEW_AND_RUN_GRID'
export const SET_IS_LOADING = 'SET_IS_REVIEW_AND_RUN_LOADING'
export const CLEAR_FILTERS = 'CLEAR_REVIEW_AND_RUN_FILTERS'

export const SELECT_ROW = 'SELECT_REVIEW_AND_RUN_ROW'
export const UNSELECT_ROW = 'UNSELECT_REVIEW_AND_RUN_ROW'
export const SELECT_ALL_ROWS = 'SELECT_ALL_REVIEW_AND_RUN_ROWS'
export const UNSELECT_ALL_ROWS = 'UNSELECT_ALL_REVIEW_AND_RUN_ROWS'

export const ADD_ADDITIONAL_DETAILS = 'ADD_ADDITIONAL_REVIEW_AND_RUN_DETAILS'
export const SET_FILTERED_ROWS = 'SET_FILTERED_REVIEW_AND_RUN_ROWS'

export const SET_BULK_UPDATE = 'SET_REVIEW_AND_RUN_BULK_UPDATE'
export const UPDATE_SELECTED_ROWS = 'UPDATE_SELECTED_ROWS'
export const DELETE_SELECTED_ROWS = 'DELETE_SELECTED_REVIEW_AND_RUN_ROWS'
export const RECEIVE_ORIGINS = 'RECEIVE_REVIEW_AND_RUN_ORIGINS'
export const RECEIVE_LOOKUPS = 'RECEIVE_LOOKUPS'
export const RECEIVE_DETAILS = 'RECEIVE_DETAILS'
export const CLEAR_DELETED_DETAILS = 'CLEAR_DELETED_DETAILS'
export const SET_IS_DIRTY = 'SET_REVIEW_AND_RUN_IS_DIRTY'
export const SET_SHOW_ERROR = 'SET_SHOW_ERROR'
export const CHECK_SELECTED_BOXES = 'CHECK_SELECTED_BOXES'

interface CreateStoreObjects {
  type: typeof CREATE_STORE_OBJECTS
  payload: Store[]
}

interface SetIsLoading {
  type: typeof SET_IS_LOADING
  payload: number
}

interface AddAdditionalDetails {
  type: typeof ADD_ADDITIONAL_DETAILS
  payload: any
}

interface SetFilteredRows {
  type: typeof SET_FILTERED_ROWS
  payload: Row[]
}

interface RowUpdatePayload {
  key: keyof OrderSeriesDetail
  value: any
}

interface UpdateSelectedRows {
  type: typeof UPDATE_SELECTED_ROWS
  payload: RowUpdatePayload
}

interface DeleteSelectedRows {
  type: typeof DELETE_SELECTED_ROWS
  payload: any
}

interface ReceiveOrigins {
  type: typeof RECEIVE_ORIGINS
  payload: OriginLocation[]
}

interface ClearDeletedDetails {
  type: typeof CLEAR_DELETED_DETAILS
  payload: any
}

interface SetIsDirty {
  type: typeof SET_IS_DIRTY
  payload: boolean
}

interface SetShowError {
  type: typeof SET_SHOW_ERROR
  payload: any
}

interface Reset {
  type: typeof RESET
  payload: any
}

interface ClearFilters {
  type: typeof CLEAR_FILTERS
  payload: any
}

interface SelectRow {
  type: typeof SELECT_ROW
  payload: number
}

interface UnselectRow {
  type: typeof UNSELECT_ROW
  payload: number
}

interface SelectAllRows {
  type: typeof SELECT_ALL_ROWS
  payload: any
}

interface UnselectAllRows {
  type: typeof UNSELECT_ALL_ROWS
  payload: any
}

interface ReceiveLookups {
  type: typeof RECEIVE_LOOKUPS
  payload: GridLookups
}

interface ReceiveDetails {
  type: typeof RECEIVE_DETAILS
  payload: any
}

interface CheckSelectedBoxes {
  type: typeof CHECK_SELECTED_BOXES
  payload: any
}

export type ReviewAndRunActionTypes =
  | CreateStoreObjects
  | SetIsLoading
  | AddAdditionalDetails
  | SetFilteredRows
  | UpdateSelectedRows
  | DeleteSelectedRows
  | ReceiveOrigins
  | ReceiveLookups
  | ReceiveDetails
  | ClearDeletedDetails
  | SetIsDirty
  | SetShowError
  | Reset
  | ClearFilters
  | SelectRow
  | UnselectRow
  | SelectAllRows
  | UnselectAllRows
  | CheckSelectedBoxes
