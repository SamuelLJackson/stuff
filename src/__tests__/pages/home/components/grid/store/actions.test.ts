import { OrderSeries } from '../../../../../../common/types'
import actions from '../../../../../../pages/home/components/grid/store/actions'
import * as types from '../../../../../../pages/home/components/grid/store/types'

describe('home grid synchronous actions', () => {
  it('should create an action to set is loading in state', () => {
    const expectedAction = {
      type: types.SET_SHOW_TABLE,
      payload: true,
    }
    expect(actions.setShowTable(true)).toEqual(expectedAction)
  })

  it('should create an action to set order series in state from receipt of json', () => {
    const orderSeriesArray: OrderSeries[] = []
    const expectedAction = {
      type: types.RECEIVE_ORDER_SERIES_RESULTS,
      payload: orderSeriesArray,
    }
    expect(actions.receiveOrderSeriesResults(orderSeriesArray)).toEqual(expectedAction)
  })
})
