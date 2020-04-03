import { OrderSeries } from '../../../../../common/types'

export interface GridState {
  orderSeriesResults: OrderSeries[]
  showTable: boolean
}

export interface GridProps {
  orderSeriesResults: OrderSeries[]
  requestOrderSeriesDetails: Function
}

export const SET_SHOW_TABLE = 'SET_SHOW_TABLE'
export const RECEIVE_ORDER_SERIES_RESULTS = 'RECEIVE_ORDER_SERIES_RESULTS'
export const RESET = 'RESET_HOME_GRID'

interface ReceiveOrderSeriesResults {
  type: typeof RECEIVE_ORDER_SERIES_RESULTS
  payload: OrderSeries[]
}

interface SetShowTable {
  type: typeof SET_SHOW_TABLE
  payload: boolean
}

interface Reset { 
  type: typeof RESET
  payload: any
}

export type GridActionTypes =
  | ReceiveOrderSeriesResults
  | SetShowTable
  | Reset
