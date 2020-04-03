import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BaseState } from '../../../../common/types'
import { constants } from '../../../../common'
import ACTIONS from './store/actions'
import GRID_ACTIONS from '../grid/store/actions'

export default () => {
    const dispatch = useDispatch()

    const statusKey = useSelector((state: BaseState) => state.reviewAndRun.titleBar.statusKey)
    const seriesName = useSelector((state: BaseState) => state.reviewAndRun.titleBar.name)
    const orderSeriesKey = useSelector((state: BaseState) => state.reviewAndRun.grid.orderSeriesKey)
    const isForecast = useSelector((state: BaseState) => state.reviewAndRun.buttonArray.isForecast)

    const inputStyle = {width: '363px', border: 'none'}

    if (seriesName === '') {
      inputStyle.border = '5px solid red'
    }else{
      inputStyle.border = '1px solid #f0f0f0'
    }

    console.log('rendering title bar')
    return (
    <div className="display-flex">
      {
        (statusKey === constants.OrderSeriesStatusKeys.IS_COMPLETED && !isForecast)
        &&
        <p
          id="orderSeriesName"
          className="showing-items-text"
        >
          {seriesName}
        </p>
      }
      {
        (statusKey !== constants.OrderSeriesStatusKeys.IS_COMPLETED || isForecast)
        &&
        <input
          className="order-series-input-text"
          maxLength={50}
          placeholder="Enter name..."
          style={inputStyle}
          value={seriesName}
          onChange={event => {
            dispatch(ACTIONS.setName(event.target.value))
            dispatch(GRID_ACTIONS.setIsDirty(true))
          }}
        />
      }
      <p
        className="showing-items-text"
        style={{
          marginLeft: 8,
        }}
      >
        Order Series #: {orderSeriesKey}
      </p>
    </div>
    )
}