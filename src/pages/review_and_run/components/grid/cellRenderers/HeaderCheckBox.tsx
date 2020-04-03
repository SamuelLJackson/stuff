import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ACTIONS from '../store/actions'
import BUTTON_ARRAY_ACTIONS from '../../button_array/store/actions'
import { BaseState } from '../../../../../common/types'
import { constants } from '../../../../../common'
import utils from '../utils'

export default () => {
  const dispatch = useDispatch()

  const statusKey = useSelector((state: BaseState) => state.reviewAndRun.titleBar.statusKey)
  
  const isForecast = useSelector((state: BaseState) => state.reviewAndRun.buttonArray.isForecast)

  const hasEditOrderSeriesPermission = useSelector((state: BaseState) => state.container.hasEditOrderSeriesPermission)
  const isOrderSeriesCreator = useSelector((state: BaseState) => state.reviewAndRun.grid.isOrderSeriesCreator)
  const hasEditSomeoneElsesOrderSeriesPermission = useSelector((state: BaseState) => state.container.hasEditSomeoneElsesOrderSeriesPermission)
  const displayCheckbox = 
    (statusKey !== constants.OrderSeriesStatusKeys.IS_COMPLETED || isForecast) 
    && 
    (hasEditSomeoneElsesOrderSeriesPermission || (hasEditOrderSeriesPermission && isOrderSeriesCreator))

  const selectedRowsCount = Object.keys(useSelector((state: BaseState) => state.reviewAndRun.grid.selectedRows)).length
  const dataCount = useSelector((state: BaseState) => state.reviewAndRun.grid.data).length

  const triggerSelectAll = () => {
    const rows: any = document.getElementsByClassName('rt-tr')
    for (let i=2; i< rows.length; ++i) {
      if (rows[i].classList.contains('-padRow')) {
        break
      }
      utils.showSelect(rows[i].getAttribute('id'))
    }
  }

  if (displayCheckbox) {
    return (
      <div>
        <input
          type="checkbox"
          id={'styled-checkbox-header'}
          className="styled-checkbox delete-checkbox"
          checked={selectedRowsCount === dataCount}
          onClick={() => dispatch(BUTTON_ARRAY_ACTIONS.setIsLoading(true))}
          
          onChange={() => {
            setTimeout(function() {
              dispatch(BUTTON_ARRAY_ACTIONS.setIsLoading(false))
              const headerCheckbox: any = document.getElementById('styled-checkbox-header')
              if (headerCheckbox.checked === false) {
                dispatch(ACTIONS.selectAllRows())
                triggerSelectAll()
              } else {
                dispatch(ACTIONS.unselectAllRows())
                utils.triggerUnselectAll()
              }
            },30)
          }}
          
        />
        <label htmlFor={'styled-checkbox-header'}></label>
        <div
          id='selectedRowsCount'
          style={{
            color: 'red',
            marginTop: '30px',
            fontWeight: 'bold',
          }}
        >
          {selectedRowsCount}
        </div>
      </div>
    )
  } else {
    return <div />
  }
}
