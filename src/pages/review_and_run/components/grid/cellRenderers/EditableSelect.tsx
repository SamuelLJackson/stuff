import React from 'react'
import { useDispatch } from 'react-redux'
import ACTIONS from '../store/actions'
import { CellRenderProps, OrderSeriesDetail } from '../store/types'

export default (props: CellRenderProps) => {
  const {
    column: { id },
    original: { tradingPartnerLocationKey },
    row: { storeKey },
    value,
  } = props.cellInfo

  const dispatch = useDispatch()

  const rowId = `${tradingPartnerLocationKey}-${storeKey}`
  const cellId = `${id}-${rowId}`

  const updateDisplay = (selectedValue: number) => {
    const selectedCellsToUpdate: any = document.getElementsByClassName(`selected-${id}`)
    for (let i=0; i<selectedCellsToUpdate.length; ++i) {
      selectedCellsToUpdate[i].value = selectedValue
    }

    const sameStoreRows: any = document.getElementsByClassName(`${storeKey}-${id}`)
    for (let i=0; i<sameStoreRows.length; ++i) {
      sameStoreRows[i].value = selectedValue
    }
  }

  console.log('hey we are rerendering: ' + cellId)
  return (
    <select 
      id={cellId}
      className={`review-grid-select ${storeKey}-${id}`}
      disabled={true}
      style={{backgroundColor: 'lightgray'}}
      onChange={() => {
        const select: any = document.getElementById(cellId)
        dispatch(
          ACTIONS.bulkUpdateSelectedRows(
            id as keyof OrderSeriesDetail,
            parseInt(select.value)
          )
        )
        updateDisplay(select.value)
      }}
    >
      <option value={1} selected={parseInt(value) === 1}>Yes</option>
      <option value={0} selected={parseInt(value) === 0}>No</option>
    </select>
  )
}
