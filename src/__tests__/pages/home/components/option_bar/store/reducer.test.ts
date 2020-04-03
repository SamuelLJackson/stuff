import reducer from '../../../../../../pages/home/components/option_bar/store/reducer'
import * as types from '../../../../../../pages/home/components/option_bar/store/types'
import { objectTemplates as Templates } from '../../../../../../common'

const defaultState: types.OptionBarState = {
    orderSeries: [],
    selectedOrderSeries: null,
    isLoading: false,
  }

const defaultSelectOption: types.SelectOption = {
    value: 1,
    label: '1',
}

describe('home option bar reducer reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(defaultState)
    })

    it('should handle RECEIVE_ORDER_SERIES', () => {
      expect(
        reducer(defaultState, {
          type: types.RECEIVE_ORDER_SERIES,
          payload: [Templates.OrderSeries],
        })
      ).toEqual({
        orderSeries: [Templates.OrderSeries],
        selectedOrderSeries: null,
        isLoading: false,
        })
    })

    it('should handle SET_Order_SERIES', () => {
        expect(
            reducer(defaultState, {
                type: types.SET_ORDER_SERIES,
                payload: defaultSelectOption,
            })
        ).toEqual({
            orderSeries: [],
            selectedOrderSeries: defaultSelectOption,
            isLoading: false,
        })
    })

    it('should handle SET_IS_LOADING', () => {
        expect(
            reducer(defaultState, {
                type: types.SET_IS_LOADING,
                payload: true,
            })
        ).toEqual({
            orderSeries: [],
            selectedOrderSeries: null,
            isLoading: true,
        })
    })
})
