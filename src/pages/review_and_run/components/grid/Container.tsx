import React, { Component } from 'react'
import ReactTable, { ReactTableDefaults, RowInfo, Column } from 'react-table'
import columns from './columns'
import ButtonArray from '../button_array'
import { eventHandlers } from '../../../../common'
import cellRenderers from './cellRenderers'
import { GridProps, Row } from './store/types'
import { Filter } from '../../../../common/types'
import TitleBar from '../title_bar'
import utils from './utils'

const editableColumnIds = [
  'targetDeliveryDate',
  'outToDate',
  'skipPresentationLevels',
  'shipUsingOnlyLowStockQuantities',
  'requestTypes',
  'truckRouteKey',
]

export default class Grid extends Component<GridProps, {}> {
  private tableReference: any = null

  constructor(props: GridProps) {
    super(props)
    this.tableReference = React.createRef()
  }

  componentDidMount() {
    eventHandlers.handleHorizontalOverflow()
    eventHandlers.alignTableWithFilterScroll(0)
    this.props.setIsDirty(false)
  }

  componentWillUnmount() {
    this.props.reset()
  }

  updateFilters(filtered: Filter[]) {
    let filteredData: Row[] = []
    if (filtered.length === 0) {
      this.props.setFilteredRows(filteredData, filtered)
    } else {
      filteredData = this.tableReference.current.getResolvedState().sortedData
      this.props.setFilteredRows(filteredData, filtered)
    }
  }

  render() {
    const {
      data,
      isLoading,
      filtered,
      showError,
      checkSelectedBoxes,
    } = this.props

    const columnDefaults = {
      ...ReactTableDefaults.column,
      headerClassName: 'wordwrap',
    }

    let detailsFound = 0
    if (filtered.length > 0) {
      const filteredData = this.tableReference.current.getResolvedState().sortedData
      detailsFound = filteredData.length
    }
    const tableContainerClasses =
      'section-container table-container flex-direction-column'

    console.log('hey we are rendering the whole table again')
    utils.triggerUnselectAll()
    checkSelectedBoxes()
    return (
      <div
        className={tableContainerClasses}
        style={{ marginBottom: '10px' }}
      >
        <TitleBar />
        <ButtonArray detailsFound={detailsFound} />
        <ReactTable
          data={data}
          loading={isLoading}
          showPageSizeOptions={false}
          showPagination={false}
          filterable
          filtered={filtered}
          pageSize={ data.length > 12 ? data.length : 12 }
          style={{ height: window.innerHeight - 240 }}
          defaultSorted={[
            {
              id: 'storeKey',
              desc: false,
            },
            {
              id: 'tradingPartnerName',
              desc: false,
            },
          ]}
          onFilteredChange={filtered => this.updateFilters(filtered)}
          className="-striped review-table"
          getTrProps={(
            state: any,
            rowInfo: RowInfo | undefined,
            column: Column | undefined
          ) => {
            if (rowInfo !== undefined) {
              const {
                original: { tradingPartnerLocationKey },
                row: { storeKey },
              } = rowInfo

              const rowId = `${tradingPartnerLocationKey}-${storeKey}`

              return { id: rowId }
            } else {
              return {}
            }
          }}
          getTdProps={(
            state: any,
            rowInfo: RowInfo | undefined,
            column: Column | undefined
          ) => {
            let isError = false
            let style = {}

            if (typeof column !== 'undefined') {
              if (typeof column.id !== 'undefined') {
                if (editableColumnIds.includes(column.id)) {
                  style = { overflow: 'visible' }
                }

                if (rowInfo !== undefined) {                  
                  if (showError && showError.length > 0) {
                    if (column.id === 'targetDeliveryDate') {
                      isError = showError[rowInfo.index]
                    }
                  }
                }
                if (isError) {
                  style = {
                    borderColor: 'red',
                    borderWidth: '5px',
                    overflow: 'visible',
                  }
                } else if (
                  !isError &&
                  column.id === 'targetDeliveryDate'
                ) {
                  column.Cell = cellRenderers.editableDate
                }
              }
            }

            return { style }
          }}
          column={columnDefaults}
          columns={columns}
          noDataText=""
          ref={this.tableReference}
        />
      </div>
    )
  }
}
