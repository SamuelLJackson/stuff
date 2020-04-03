import { GridState } from '../components/grid/store/types'
import { OptionBarState } from '../components/option_bar/store/types'

export const RESET_HOME = 'RESET_HOME'

const defaultGridState: GridState = {
  orderSeriesResults: [],
  showTable: false,
}

const defaultOptionBarState: OptionBarState = {
  orderSeries: [],
  selectedOrderSeries: null,
  isLoading: false,
}


export const defaultHomeState: HomeState = {
  grid: defaultGridState,
  optionBar: defaultOptionBarState,
}

export interface HomeState {
  grid: GridState,
  optionBar: OptionBarState,
}
