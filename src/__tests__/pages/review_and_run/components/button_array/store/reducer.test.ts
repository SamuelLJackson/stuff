import reducer from '../../../../../../pages/review_and_run/components/button_array/store/reducer'
import * as types from '../../../../../../pages/review_and_run/components/button_array/store/types'

const defaultState: any = {    
    isForecast: true,
}

describe('review and run button array reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(defaultState)
    })

    it('should handle SET_IS_FORECAST', () => {
      expect(
        reducer(defaultState, {
          type: types.SET_IS_FORECAST,
          payload: false,
        })
      ).toEqual({
          isForecast: false,
        })
    })

    it('should handle RESET', () => {
      expect(
        reducer(defaultState, {
          type: types.RESET,
            payload: '',
        })
      ).toEqual({
          isForecast: true,
        })
    })
})
