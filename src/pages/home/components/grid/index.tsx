import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import columns from './columns'
import ReactTable from 'react-table'
import { BaseState } from '../../../../common/types'
import ACTIONS from './store/actions'

export default () => {
  const dispatch = useDispatch()

  const orderSeriesResults = useSelector(
    (state: BaseState) => state.home.grid.orderSeriesResults
  )

  const tableContainerClasses =
    'section-container table-container flex-direction-column'
  return (
    <div
      className={tableContainerClasses}
      style={{
        minWidth: '1060px',
      }}
    >
      <p className="showing-items-text" style={{ width: 300 }}>
        Showing {orderSeriesResults.length} of{' '}
        {orderSeriesResults.length} rows
      </p>
      <ReactTable
        data={orderSeriesResults}
        columns={columns}
        pageSize={orderSeriesResults.length}
        showPagination={false}
        className='home-grid'
        style={{
          height: window.innerHeight - 340,
          width: 1250,
        }}
        getTrProps={(state: any, rowInfo: any, column: any) => ({
            className: 'cursor-pointer',
            onClick: () => {
                dispatch(
                  ACTIONS.requestOrderSeriesDetails(
                    rowInfo.original.orderSeriesKey
                  )
                )
            },
          
        })}
      />
    </div>
  )
}
