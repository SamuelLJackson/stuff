import cellRenderers from './cellRenderers'
import filters from './filters'

export default [
  {
    Cell: cellRenderers.cellCheckBox,
    Header: cellRenderers.headerCheckBox,
    Filter: filters.none,
    sortable: false,
    resizable: false,
    width: 40,
  },
  {
    Header: 'Origin Location',
    accessor: 'tradingPartnerName',
    filterMethod: filters.matchTradingPartner,
    width: 300,
  },
  {
    Header: 'Store',
    accessor: 'storeKey',
    width: 65,
  },
  {
    Cell: cellRenderers.editableDate,
    Filter: filters.none,
    Header: 'Target Delivery Date',
    accessor: 'targetDeliveryDate',
    filterMethod: filters.matchDate,
    width: 130,
  },
  {
    Cell: cellRenderers.editableDate,
    Filter: filters.none,
    Header: 'Out to Date',
    accessor: 'outToDate',
    filterMethod: filters.matchDate,
    width: 130,
  },
  {
    Filter: filters.none,
    Header: 'Safety Stock %',
    accessor: 'safetyStockPercent',
    width: 75,
  },
  {
    Cell: cellRenderers.editableSelect,
    Filter: filters.none,
    Header: 'Skip PL',
    accessor: 'skipPresentationLevels',
    filterMethod: filters.yesOrNoMethod,
    width: 75,
  },
  {
    Cell: cellRenderers.editableSelect,
    Filter: filters.none,
    Header: 'Low Stock',
    accessor: 'shipUsingOnlyLowStockQuantities',
    filterMethod: filters.yesOrNoMethod,
    width: 90,
  },
  {
    Cell: cellRenderers.truckRoute,
    Filter: filters.none,
    Header: 'Route',
    accessor: 'truckRouteKey',
    width: 150,
  },
  {
    Cell: cellRenderers.requestTypes,
    Filter: filters.none,
    Header: 'OR Request Types',
    accessor: 'requestTypes',
    width: 680,
  },
  {
    Filter: filters.none,
    Header: 'Weight',
    accessor: 'weight',
    width: 80,
  },
]
