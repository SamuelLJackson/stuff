import React from 'react'
import { CellInfo } from 'react-table'
import { constants } from '../../../../common'

const forecast = (cellInfo: CellInfo) => (
  <div>{cellInfo.value === true ? 'Yes' : 'No'}</div>
)

const defaultCell = (cellInfo: CellInfo) => <div>{cellInfo.value}</div>

const status = (cellInfo: CellInfo) => {

  const statusName = constants.StatusKeys[cellInfo.value]
  return (<div>{statusName}</div>)
}

export default { forecast, defaultCell, status }
