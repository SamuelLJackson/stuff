import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ACTIONS from './store/actions'
import MODALS_ACTIONS from '../modals/store/actions'
import BUTTON_ARRAY_ACTIONS from './store/actions'
import GRID_ACTIONS from '../../components/grid/store/actions'
import { WhiteCheckMark } from '../../../../icons'
import { constants } from '../../../../common'
import { ButtonArrayProps } from '../../components/grid/store/types'
import { BaseState } from '../../../../common/types'
import { Spinner } from 'reactstrap'

export default (props: ButtonArrayProps) => {
  const { detailsFound } = props

  const dispatch = useDispatch()

  const hasRunPermission = useSelector((state: BaseState) => state.container.hasRunPermission)
  const isOrderSeriesCreator = useSelector((state: BaseState) => state.reviewAndRun.grid.isOrderSeriesCreator)
  const hasEditOrderSeriesPermission = useSelector((state: BaseState) => state.container.hasEditOrderSeriesPermission)
  const hasEditSomeoneElsesOrderSeriesPermission = useSelector((state: BaseState) => state.container.hasEditSomeoneElsesOrderSeriesPermission)
  const name = useSelector((state: BaseState) => state.reviewAndRun.titleBar.name)
  const filtered = useSelector((state: BaseState) => state.reviewAndRun.grid.filtered)
  const data = useSelector((state: BaseState) => state.reviewAndRun.grid.data)
  const isLoading = useSelector((state: BaseState) => state.reviewAndRun.buttonArray.isLoading)

  const selectedRowsCount = Object.keys(useSelector((state: BaseState) => state.reviewAndRun.grid.selectedRows)).length

  const statusKey = useSelector((state: BaseState) => state.reviewAndRun.titleBar.statusKey)
  const isForecast = useSelector((state: BaseState) => state.reviewAndRun.buttonArray.isForecast)

  const isDirty = useSelector((state: BaseState) => state.reviewAndRun.grid.isDirty)
  const isClean = !isDirty

  const showRunButton = isClean && !isForecast
  const showForecastButton = isClean && isForecast

  const ordersWereCreated = statusKey === constants.OrderSeriesStatusKeys.IS_COMPLETED && !isForecast
  const showError = useSelector((state: BaseState) => state.reviewAndRun.grid.showError)
  const reducer = (accumulator: boolean, currentValue: boolean) =>
    accumulator || currentValue

  const canEdit = hasEditSomeoneElsesOrderSeriesPermission || (isOrderSeriesCreator && hasEditOrderSeriesPermission)
  let disableSave = name === '' || !canEdit
  if ( showError.length > 0 && showError[0] != undefined) {
    disableSave = disableSave || showError.reduce(reducer)
  }

  const disableRemove = selectedRowsCount === 0 || selectedRowsCount === data.length || !canEdit
  const disableAddStores = ordersWereCreated || !canEdit
  const disableRun = ordersWereCreated || !(hasRunPermission && canEdit)

  const removeTitle = disableRemove ? (canEdit ? 'You must have at least one row selected.' : 'You do not have permission to edit this order series.') : 'Remove selected rows.'
  const addStoresTitle = ordersWereCreated ? 'Orders have already been created with this Order Series.' : (canEdit ?  'Add stores' : 'You do not have permission to edit this order series.')
  const saveTitle = disableSave ? (canEdit ? 'Please check for errors.' : 'You do not have permission to edit this order series') : 'Save your changes.'
  const runTitle = ordersWereCreated ? 'Orders have already been created with this Order Series.' : ((canEdit && hasRunPermission) ? 'Create Orders' : 'You do not have permission to run this order series')

  console.log('hey RERENDERING: button array')
  return (
    <div>
      <div className="display-flex float-left">
        <p className="showing-items-text">
          Showing {filtered.length === 0 ? data.length : detailsFound} of{' '}
          {data.length} rows
        </p>
        <div title={filtered.length === 0 ? 'No active filters.' : 'Clear all active filters.'}>
          <button
            className="btn btn-warning clear-filters"
            disabled={filtered.length === 0}
            onClick={() => dispatch(GRID_ACTIONS.clearFilters())}
          >
            Clear Filters
          </button>
        </div>
        <div title={removeTitle}>
          <button
            className="btn btn-success margin-left-8"
            disabled={disableRemove}
            onMouseDownCapture={() => dispatch(ACTIONS.setIsLoading(true))}
            onMouseUp={() => {
              setTimeout(function() {
                dispatch(GRID_ACTIONS.deleteSelectedRows())
                dispatch(GRID_ACTIONS.setShowError('', []))
                dispatch(ACTIONS.setIsLoading(false))
              },30)
            }}
          >
            Remove
          </button>
        </div>       
        <div title={addStoresTitle}>
          <button
            className="btn btn-warning margin-left-8"
            style={{width: '115px'}}
            disabled={disableAddStores}
            onClick={() => {
              dispatch(MODALS_ACTIONS.setShowAddStoreModal(true))
            }}
          >
            Add Store
          </button>
        </div>
        {
          isLoading
          &&
          <Spinner style={{marginLeft: '10px', marginTop: '3px'}} color="danger" />
        }
      </div>
      {isDirty && (
        <div title={saveTitle} className='float-right'>
          <button
            className="btn btn-warning save-button"
            disabled={disableSave}
            onClick={() => {
              dispatch(GRID_ACTIONS.unselectAllRows())
              dispatch(BUTTON_ARRAY_ACTIONS.save())
            }}
          >
            Save
          </button>
        </div>
      )}
      {showRunButton && (
        <div className='float-right' title={runTitle}>
          <button
            className="btn btn-primary main-process-button"
            disabled={disableRun}
            onClick={() => dispatch(ACTIONS.run())}
          >
            Run
          </button>
        </div>
      )}
      {showForecastButton && (
        <button
          className="btn btn-secondary float-right save-button"
          onClick={() => dispatch(ACTIONS.checkForRunningOrderSeries())}
        >
          Forecast
        </button>
      )}
      <div className="big-checkbox float-right" title='toggle run as forecast'>
        <input
          type="checkbox"
          id={`forecast-checkbox`}
          className="big-green big-small-checkbox"
          disabled={ordersWereCreated}
          checked={isForecast}
          onChange={event => {
            dispatch(ACTIONS.setIsForecast(event.target.checked))
            dispatch(GRID_ACTIONS.setIsDirty(true))
          }}
        />
        <label htmlFor={`forecast-checkbox`}></label>
      </div>
      <p className="float-right found-text forecast-text" style={{marginRight: 8}}>
        Run As Forecast
      </p>
      {isForecast && (
        <img
          alt="skip presentation levels check mark"
          className="forecast-check-mark-icon"
          title='toggle run as forecast'
          src={WhiteCheckMark}
          onClick={() => {
            dispatch(ACTIONS.setIsForecast(false))
            dispatch(GRID_ACTIONS.setIsDirty(true))
          }}
        />
      )}
    </div>
  )
}
