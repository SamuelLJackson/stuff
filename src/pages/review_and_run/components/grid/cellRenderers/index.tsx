import React from 'react'
import { cellRenderers as commonCells } from '../../../../../common'
import HeaderCheckBox from './HeaderCheckBox'
import CellCheckBox from './CellCheckBox'
import Origin from './Origin'
import EditableDate from './EditableDate'
import EditableSelect from './EditableSelect'
import RequestTypes from './RequestTypes'
import TruckRoute from './TruckRoute'
import { CellInfo } from 'react-table'

const headerCheckBox = (cellInfo: CellInfo) => <HeaderCheckBox />

const cellCheckBox = (cellInfo: CellInfo) => (
  <CellCheckBox cellInfo={cellInfo} />
)

const origin = (cellInfo: CellInfo) => <Origin cellInfo={cellInfo} />

const editableDate = (cellInfo: CellInfo) => (
  <EditableDate cellInfo={cellInfo} />
)

const editableSelect = (cellInfo: CellInfo) => (
  <EditableSelect cellInfo={cellInfo} />
)

const requestTypes = (cellInfo: CellInfo) => (
  <RequestTypes cellInfo={cellInfo} />
)

const truckRoute = (cellInfo: CellInfo) => <TruckRoute cellInfo={cellInfo} />

export default {
  ...commonCells,
  headerCheckBox,
  cellCheckBox,
  origin,
  editableDate,
  editableSelect,
  requestTypes,
  truckRoute,
}
