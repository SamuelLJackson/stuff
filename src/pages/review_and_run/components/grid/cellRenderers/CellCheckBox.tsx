import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ACTIONS from '../store/actions'
import { BaseState } from '../../../../../common/types'
import { CellRenderProps } from '../store/types'
import { constants } from '../../../../../common'
import utils from '../utils'

export default (props: CellRenderProps) => {
  const {
    original: { tradingPartnerLocationKey },
    row: { storeKey },
  } = props.cellInfo

  const rowId = `${tradingPartnerLocationKey}-${storeKey}`

  const cellId = `checkbox${rowId}`
  const isForecast = useSelector((state: BaseState) => state.reviewAndRun.buttonArray.isForecast)
  const hasEditOrderSeriesPermission = useSelector((state: BaseState) => state.container.hasEditOrderSeriesPermission)
  const isOrderSeriesCreator = useSelector((state: BaseState) => state.reviewAndRun.grid.isOrderSeriesCreator)
  const hasEditSomeoneElsesOrderSeriesPermission = useSelector((state: BaseState) => state.container.hasEditSomeoneElsesOrderSeriesPermission)
  const statusKey = useSelector((state: BaseState) => state.reviewAndRun.titleBar.statusKey)

  const dispatch = useDispatch()

  const displayCheckbox = 
    (statusKey !== constants.OrderSeriesStatusKeys.IS_COMPLETED || isForecast) 
    && 
    (hasEditSomeoneElsesOrderSeriesPermission || (hasEditOrderSeriesPermission && isOrderSeriesCreator))

  if (displayCheckbox) {
    
    return (
      <div>
        <input
          type="checkbox"
          id={`styled-checkbox-${cellId}`}
          className="styled-checkbox delete-checkbox"
          onChange={() => {
            const checkbox: any = document.getElementById(`styled-checkbox-${cellId}`)
            if (checkbox.checked === true) {
              dispatch(ACTIONS.selectRow(rowId))
              utils.showSelect(rowId)
            } else {
              dispatch(ACTIONS.unselectRow(rowId))
              utils.showRowAsDisabled(rowId)
            }
          }}
        />
        <label htmlFor={`styled-checkbox-${cellId}`}></label>
      </div>
    )
  } else {
    return <div />
  }
}
