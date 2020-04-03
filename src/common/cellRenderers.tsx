import React from 'react'
import { CellInfo } from 'react-table'

const number = (cellInfo: CellInfo) => {
  let returnNumber = '0'
  if (cellInfo.value) {
    if (cellInfo.value > 0) {
      returnNumber = cellInfo.value
    }
  }
  const formattedNumberString = parseFloat(returnNumber).toFixed(2)

  return <div className="text-align-right">{formattedNumberString}</div>
}

const dollars = (cellInfo: CellInfo) => {
  let returnNumber = '0'
  if (cellInfo.value) {
    if (cellInfo.value > 0) {
      returnNumber = cellInfo.value
    }
  }
  const formattedNumberString = parseFloat(returnNumber).toFixed(2)

  return <div className="text-align-right">${formattedNumberString}</div>
}

const date = (cellInfo: CellInfo) => {
  if (cellInfo.value === '01-01-0001') {
    return <div />
  }

  const date = new Date(cellInfo.value)
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const year = date.getFullYear()

  return <div>{month + '/' + day + '/' + year}</div>
}

export default {
  number,
  dollars,
  date,
}
