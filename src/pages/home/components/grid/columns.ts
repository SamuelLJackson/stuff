import cellRenderers from './cellRenderers'
import { Column } from 'react-table'

const columns: Column[] = [
  {
    Cell: cellRenderers.defaultCell,
    Header: 'Order Series Number',
    headerClassName: 'table-header',
    className: 'order-series-key',
    accessor: 'orderSeriesKey',
    width: 300,
  },
  {
    Cell: cellRenderers.defaultCell,
    Header: 'Order Series Name',
    headerClassName: 'table-header',
    className: '',
    accessor: 'name',
    width: 400,
  },
  {
    Cell: cellRenderers.defaultCell,
    Header: 'Order Series Replenishment Type',
    headerClassName: 'table-header',
    className: '',
    accessor: 'replenishmentType.name',
    width: 300,
  },
  {
    Cell: cellRenderers.forecast,
    Header: 'Forecast?',
    className: '',
    headerClassName: 'table-header',
    accessor: 'isForecast',
    width: 100,
  },
  {
    Cell: cellRenderers.status,
    Header: 'Status',
    headerClassName: 'table-header',
    className: '',
    accessor: 'statusKey',
    width: 150,
  }
]

export default columns
