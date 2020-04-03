import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { useDispatch } from 'react-redux'
import ACTIONS from '../store/actions'
import { dateUtilities } from '../../../../../common'
import { CellRenderProps, OrderSeriesDetail } from '../store/types'

export default (props: CellRenderProps) => {
  const dispatch = useDispatch()
  const {
    column: { id },
    row: { outToDate, targetDeliveryDate, storeKey },
    value,
  } = props.cellInfo

  interface DisabledDays {
    before: Date
    after: Date | undefined
  }
    const today = new Date()
    const disabledDays: DisabledDays = {
      before: today,
      after: undefined,
    }

    if (id === 'targetDeliveryDate') {
      disabledDays.after = new Date(outToDate)
    }

    if (id === 'outToDate') {
      disabledDays.before = new Date(targetDeliveryDate)
    }

    let theValue = new Date(value)

    const updateDisplay = (selectedDate: any) => {
      const selectedCellsToUpdate: any = document.getElementsByClassName(`selected-${id}`)
      for (let i=0; i<selectedCellsToUpdate.length; ++i) {
        selectedCellsToUpdate[i].value = `${dateUtilities.dateFnsFormat(selectedDate, dateUtilities.FORMAT)}`
        selectedCellsToUpdate[i].parentElement.parentElement.style.border = 'none'
      }

      if (id === 'targetDeliveryDate') {
        const sameStoreRows: any = document.getElementsByClassName(`${storeKey}-${id}`)
        for (let i=0; i<sameStoreRows.length; ++i) {
          sameStoreRows[i].value = `${dateUtilities.dateFnsFormat(selectedDate, dateUtilities.FORMAT)}`
          sameStoreRows[i].parentElement.parentElement.style.border = 'none'
        }        
      }
    }

    return (
      <DayPickerInput
        dayPickerProps={{ disabledDays: { ...disabledDays } }}
        formatDate={dateUtilities.formatDate}
        format={dateUtilities.FORMAT}
        inputProps={{
          className: `${storeKey}-${id}`,
          readOnly: true,
          style: { width: '100%' },
          disabled: true,
        }}
        parseDate={dateUtilities.parseDate}
        placeholder={`${dateUtilities.dateFnsFormat(
          new Date(),
          dateUtilities.FORMAT
        )}`}
        value={theValue}
        onDayChange={day => {
          dispatch(
            ACTIONS.bulkUpdateSelectedRows(
              id as keyof OrderSeriesDetail,
              dateUtilities.formatDateDotNet(day)
            )
          )
          updateDisplay(day)
        }}
      />
    )
}
