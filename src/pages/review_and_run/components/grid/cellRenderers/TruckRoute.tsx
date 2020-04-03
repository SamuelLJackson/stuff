import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ACTIONS from '../store/actions'
import { CellRenderProps, OrderSeriesDetail } from '../store/types'
import { BaseState } from '../../../../../common/types'
import { TruckRoute } from '../../../../../common/types'

export default (props: CellRenderProps) => {
  const {
    column: { id },
    original: { tradingPartnerLocationKey },
    row: { storeKey },
    value,
  } = props.cellInfo

  const rowId = `${tradingPartnerLocationKey}-${storeKey}`
  const cellId = `${id}-${rowId}`

  const truckRoutes = useSelector(
    (state: BaseState) => state.reviewAndRun.grid.truckRoutes
  )

  const options = truckRoutes.map((route: TruckRoute, index: number) => {
    const { truckRouteKey, name} = route

    return <option key={`truckRoute${index}`} value={truckRouteKey} selected={parseInt(value) === truckRouteKey}>{name}</option>
  })

  const updateDisplay = (selectedValue: number) => {
    const selectedCellsToUpdate: any = document.getElementsByClassName(`selected-${id}`)
    for (let i=0; i<selectedCellsToUpdate.length; ++i) {
      selectedCellsToUpdate[i].value = selectedValue
    }
  }

  const dispatch = useDispatch()

  return (
    <select
      id={cellId}
      className='review-grid-select'
      disabled={true}
      style={{backgroundColor: 'lightgray'}}
      onChange={() => {
        const select: any = document.getElementById(cellId)

        const newWeight = truckRoutes.filter(
          (route: TruckRoute) => route.truckRouteKey === parseInt(select.value)
        )[0].maxWeight

        dispatch(
          ACTIONS.bulkUpdateSelectedRows(
            id as keyof OrderSeriesDetail,
            select.value
          )
        )
        updateDisplay(select.value)
        dispatch(ACTIONS.bulkUpdateSelectedRows('weight', newWeight))
      }}
    >
      {options}
    </select>
  )
}
