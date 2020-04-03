import { GridState } from '../components/grid/store/types'
import { ModalsState } from '../components/modals/store/types'
import { TitleBarState } from '../components/title_bar/store/types'
import { ButtonArrayState } from '../components/button_array/store/types'

export interface ReviewAndRunState {
  grid: GridState,
  modals: ModalsState,
  titleBar: TitleBarState,
  buttonArray: ButtonArrayState,
}

export const RESET = 'RESET_REVIEW_AND_RUN'
