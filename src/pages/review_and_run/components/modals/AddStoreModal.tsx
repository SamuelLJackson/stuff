import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import Select from 'react-select'
import { dateUtilities } from '../../../../common'
import ACTIONS from './store/actions'
import GRID_ACTIONS from '../grid/store/actions'
import BUTTON_ARRAY_ACTIONS from '../button_array/store/actions'
import { BaseState } from '../../../../common/types'
import { Store } from '../../../../common/types'
import { OrderSeriesDetail } from '../grid/store/types'
import { Spinner } from 'reactstrap'

export default () => {
  const selectedDate = useSelector(
    (state: BaseState) => state.reviewAndRun.modals.selectedDate
  )

  const isLoading = useSelector((state: BaseState) => state.reviewAndRun.buttonArray.isLoading)
  const data = useSelector((state: BaseState) => state.reviewAndRun.grid.data)
  const stores = useSelector((state: BaseState) => state.reviewAndRun.grid.stores)
  const selectedAdditionalStore = useSelector(
    (state: BaseState) => state.reviewAndRun.modals.selectedAdditionalStores
  )
  const selectedOriginLocations = useSelector(
    (state: BaseState) => state.reviewAndRun.grid.selectedOriginLocations
  )
  const selectedOriginsCount = Object.keys(selectedOriginLocations).length
  const selectedStoreKeys = data.map((row: OrderSeriesDetail) => row.storeKey)

  const availableStores = stores.filter((store: Store) => {
    let currentStoreKeys = selectedStoreKeys.filter(
      (key: number) => key === store.storeKey
    )
    
    if (currentStoreKeys.length === selectedOriginsCount) {
      return false
    } else {
      return true
    }
  })

  const compare = (a: Store, b: Store) => {
    if (a.storeKey >= b.storeKey) {
      return 1
    } else {
      return -1
    }
  }

  availableStores.sort(compare)

  const availableStoresOptions = availableStores.map((store: Store) => ({
    value: store.storeKey,
    label: store.storeName,
  }))

  const showModal = useSelector(
    (state: BaseState) => state.reviewAndRun.modals.showAddStoreModal
  )

  const dispatch = useDispatch()

  const today = new Date()

  return (
    <Modal
      isOpen={showModal}
      toggle={() => dispatch(ACTIONS.setShowAddStoreModal(false))}
      size="lg"
    >
      <ModalHeader toggle={() => dispatch(ACTIONS.setShowAddStoreModal(false))}>
        Add Store
      </ModalHeader>
      <ModalBody>
          <div
            className="display-flex"
            style={{
              marginBottom: 18,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p className="order-series-parameter-name" style={{ width: 145 }}>
              Store:
            </p>
            <Select
              className="margin-left-8"
              options={availableStoresOptions}
              isMulti={true}
              placeholder="Select Store..."
              value={selectedAdditionalStore}
              styles={{
                container: (base, state) => ({
                  ...base,
                  width: 400,
                }),
              }}
              onChange={(stores: any) =>
                dispatch(ACTIONS.setAdditionalStores(stores))
              }
            />
          </div>
          <div
            className="display-flex"
            style={{
              marginBottom: 18,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p className="order-series-parameter-name" style={{ width: 145 }}>
              Ordering Week:
            </p>
            <DayPickerInput
              dayPickerProps={{ disabledDays: { before: today } }}
              formatDate={dateUtilities.formatDate}
              format={dateUtilities.FORMAT}
              inputProps={{
                readOnly: true,
                style: {
                  width: 400,
                  height: 39,
                  marginLeft: 8,
                },
              }}
              parseDate={dateUtilities.parseDate}
              placeholder={`${dateUtilities.dateFnsFormat(
                new Date(),
                dateUtilities.FORMAT
              )}`}
              value={selectedDate}
              onDayChange={day =>
                dispatch(
                  ACTIONS.setDate(
                    dateUtilities.dateFnsFormat(day, dateUtilities.FORMAT)
                  )
                )
              }
            />
          </div>
      </ModalBody>
      <ModalFooter>
        {
          isLoading
          &&
          <Spinner style={{marginLeft: '10px', marginTop: '3px'}} color="primary" />
        }
        <button
          className="btn btn-primary"
          disabled={
            selectedAdditionalStore === null ||
            selectedDate === null ||
            selectedDate === ''
          }
          onMouseDownCapture={() => {
            dispatch(BUTTON_ARRAY_ACTIONS.setIsLoading(true))
          }}
          onMouseUp={() => {
            dispatch(ACTIONS.setShowAddStoreModal(false))
            dispatch(GRID_ACTIONS.addAdditionalDetails(selectedDate, selectedAdditionalStore))
            dispatch(GRID_ACTIONS.setShowError(selectedDate, selectedAdditionalStore))
            dispatch(BUTTON_ARRAY_ACTIONS.setIsLoading(false))
          }}
        >
          Add Store
        </button>
      </ModalFooter>
    </Modal>
  )
}
