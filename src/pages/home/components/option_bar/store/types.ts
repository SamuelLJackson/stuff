import { OrderSeries } from '../../../../../common/types'

export interface SelectOption {
    value: number
    label: string | number
  }
  
  export interface OptionBarState {
    orderSeries: OrderSeries[]
    selectedOrderSeries: SelectOption | null
    isLoading: boolean
  }
  
  export const RECEIVE_ORDER_SERIES = 'RECEIVE_HOME_ORDER_SERIES'
  export const SET_ORDER_SERIES = 'SET_HOME_ORDER_SERIES'
  export const SET_IS_LOADING = 'SET_IS_LOADING'
  export const RESET = 'RESET_HOME_OPTION_BAR'

  interface ReceiveOrderSeries {
    type: typeof RECEIVE_ORDER_SERIES
    payload: OrderSeries[]
  }
  
  interface SetOrderSeries {
    type: typeof SET_ORDER_SERIES
    payload: SelectOption
  }
  
  interface SetIsLoading {
    type: typeof SET_IS_LOADING
    payload: boolean
  }

  interface Reset {
    type: typeof RESET
    payload: any
  }
  
  export type OptionBarActionTypes =
    | ReceiveOrderSeries
    | SetOrderSeries
    | SetIsLoading
    | Reset
  