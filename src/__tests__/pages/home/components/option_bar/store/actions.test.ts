import { OrderSeries } from '../../../../../../common/types'
import actions from '../../../../../../pages/home/components/option_bar/store/actions'
import * as types from '../../../../../../pages/home/components/option_bar/store/types'

describe('home option bar synchronous actions', () => {
  it('should create an action to set is loading in state', () => {
    const isLoading = true
    const expectedAction = {
      type: types.SET_IS_LOADING,
      payload: isLoading,
    }
    expect(actions.setIsLoading(isLoading)).toEqual(expectedAction)
  })

  it('should create an action to set order series selection in state', () => {
    const selected: types.SelectOption = {value: 70, label: 70}
    const expectedAction = {
      type: types.SET_ORDER_SERIES,
      payload: selected,
    }
    expect(actions.setOrderSeries(selected)).toEqual(expectedAction)
  })

  it('should create an action to set order series in state from receipt of json', () => {
    const orderSeriesArray: OrderSeries[] = []
    const expectedAction = {
      type: types.RECEIVE_ORDER_SERIES,
      payload: orderSeriesArray,
    }
    expect(actions.receiveOrderSeries(orderSeriesArray)).toEqual(expectedAction)
  })
})
