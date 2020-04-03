import reducer from '../../../../../../pages/home/components/grid/store/reducer'
import * as types from '../../../../../../pages/home/components/grid/store/types'
import { objectTemplates as Templates } from '../../../../../../common'

const defaultState: types.GridState = {
    orderSeriesResults: [],
    showTable: false,
}

describe('home grid reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(defaultState)
    })

    it('should handle SET_SHOW_TABLE', () => {
        expect(
            reducer(defaultState, {
                type: types.SET_SHOW_TABLE,
                payload: true,
            })
        ).toEqual({
            orderSeriesResults: [],
            showTable: true,
        })
    })

    it('should handle RECEIVE_ORDER_SERIES_RESULTS', () => {
      expect(
        reducer(defaultState, {
          type: types.RECEIVE_ORDER_SERIES_RESULTS,
          payload: [Templates.OrderSeries],
        })
      ).toEqual({
        orderSeriesResults: [Templates.OrderSeries],
        showTable: false,
        })
    })
})
