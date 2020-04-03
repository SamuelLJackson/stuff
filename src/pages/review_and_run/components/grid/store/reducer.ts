import { dateUtilities, deepCopyObject } from '../../../../../common'
import * as types from './types'

const defaultState: types.GridState = {
  data: [],
  isLoading: false,
  loadingType: 0,
  filtered: [],
  selectedRows: {},
  showResultModal: false,
  filteredRows: [],

  storeObjects: {},
  selectedStores: {},
  originLocations: [],
  truckRoutes: [],
  stores: [],

  requestTypes: [],
  isDirty: false,
  deletedDetailIds: [],
  orderSeriesKey: 0,

  showError: [],
  selectedOriginLocations: {},
  isOrderSeriesCreator: false,
}

export default (state = defaultState, action: types.ReviewAndRunActionTypes) => {
  console.log(action)
  let newState = Object.assign({}, state)
  const { type, payload } = action

  switch (type) {
    case types.RESET: {
      newState = deepCopyObject(defaultState)
      break
    }

    case types.SET_IS_LOADING: {
      newState = deepCopyObject(state)
      newState.isLoading = payload.isLoading
      newState.loadingType = payload.loadingType
      break
    }

    case types.CREATE_STORE_OBJECTS: {
      if (payload) {
        for (let i = 0; i < payload.length; ++i) {
          newState.storeObjects[payload[i].storeKey] = payload[i]
        }
      }
      break
    }

    case types.RECEIVE_LOOKUPS: {
      newState.orderSeriesKey = payload.orderSeriesKey
      newState.requestTypes = payload.requestTypes
      newState.truckRoutes = payload.truckRoutes
      newState.stores = payload.stores
      newState.data = payload.details
      newState.originLocations = payload.originLocations
      newState.isOrderSeriesCreator = payload.isOrderSeriesCreator
      
      for(let i=0; i<payload.details.length; ++i) {
        newState.selectedOriginLocations[payload.details[i].tradingPartnerLocationKey] = true
        if (Object.keys(newState.selectedOriginLocations).length === payload.originLocations.length) {
          break
        }
      }
      break
    }

    case types.RECEIVE_DETAILS: {
      newState = deepCopyObject(state)
      let selectedOrigins: { [locationKey: number]: boolean } = {}
      for(let i=0; i<payload.length; ++i) {
        selectedOrigins[payload[i].tradingPartnerLocationKey] = true
        if (Object.keys(selectedOrigins).length === newState.originLocations.length) {
          break
        }
      }
      newState.selectedOriginLocations = deepCopyObject(selectedOrigins)

      newState.data = payload
      break
    }

    case types.CLEAR_FILTERS: {
      newState.filtered = []
      break
    }

    case types.SET_FILTERED_ROWS: {
      newState.filteredRows = payload.rows
      newState.filtered = payload.filters
      break
    }

    case types.UPDATE_SELECTED_ROWS: {
      const { key, value } = payload

      let currentRowId = ''
      let shouldUpdate = false
      const selectedStoreKeys = Object.keys(newState.selectedRows).map(key =>
        parseInt(key.split('-')[1])
      )

      for (let i=0; i<newState.data.length; ++i) {
        const row = newState.data[i]
        currentRowId = `${row.tradingPartnerLocationKey}-${row.storeKey}`

        if (key === 'outToDate') {
          shouldUpdate = newState.selectedRows[currentRowId] === true
        } else {
          shouldUpdate = selectedStoreKeys.includes(row.storeKey)
        }

        if (shouldUpdate) {
          ;(row as any)[key as keyof types.OrderSeriesDetail] = value
        }
      }
      break
    }

    case types.SELECT_ROW: {
      newState.selectedRows = deepCopyObject(state.selectedRows)

      newState.selectedRows[payload] = true
      break
    }

    case types.UNSELECT_ROW: {
      newState.selectedRows = deepCopyObject(state.selectedRows)
      delete newState.selectedRows[payload]
      break
    }

    case types.SELECT_ALL_ROWS: {
      newState.selectedRows = deepCopyObject(state.selectedRows)
      
      const isFilteredView = newState.filtered.length > 0
      let rows = isFilteredView ? newState.filteredRows : newState.data
      let currentRowId = ''
      for (let i = 0; i < rows.length; ++i) {      
        let tradingPartnerLocationKey = isFilteredView ? newState.filteredRows[i]._original.tradingPartnerLocationKey : newState.data[i].tradingPartnerLocationKey
        currentRowId = `${tradingPartnerLocationKey}-${rows[i].storeKey}`
        newState.selectedRows[currentRowId] = true
      }
      newState.isLoading = false
      break
    }

    case types.UNSELECT_ALL_ROWS: {
      newState.selectedRows = deepCopyObject(state.selectedRows)

      const isFilteredView = newState.filtered.length > 0
      if (isFilteredView) {
        const rows = newState.filteredRows
        let currentRowId = ''
        for (let i = 0; i < rows.length; ++i) {
          currentRowId = `${rows[i]._original.tradingPartnerLocationKey}-${rows[i].storeKey}`
          if (newState.selectedRows[currentRowId]) {
            delete newState.selectedRows[currentRowId]
          }
        }
      } else {
        const keys = Object.keys(newState.selectedRows)
        for (let i=0; i<keys.length; ++i) {
          delete newState.selectedRows[keys[i]]
        }
      }
      break
    }

    case types.DELETE_SELECTED_ROWS: {
      let currentRowId = ''

      let deletedDetailRows: types.OrderSeriesDetail[] = newState.data.filter(row => {
        currentRowId = `${row.tradingPartnerLocationKey}-${row.storeKey}`
        const isRowSelected = newState.selectedRows[currentRowId]
        const detailExists = row.orderSeriesDetailKey !== null
        return isRowSelected && detailExists
      })
      
      let currentDeletedIds: number[] = newState.deletedDetailIds
      newState.deletedDetailIds = currentDeletedIds.concat(deletedDetailRows.map(
        row => row.orderSeriesDetailKey
      ))

      for (let i = 0; i < newState.data.length; ++i) {
        for (let j = 0; j < deletedDetailRows.length; ++j) {
          if (newState.showError[i] === false) delete newState.showError[i]

          if (
            newState.data[i].orderSeriesKey ===
              deletedDetailRows[j].orderSeriesKey &&
            newState.data[i].storeKey === deletedDetailRows[j].storeKey &&
            newState.data[i].tradingPartnerName ===
              deletedDetailRows[j].tradingPartnerName
          )
            delete newState.showError[i]
        }
      }

      newState.data = newState.data.filter(
        row =>
          newState.selectedRows[
            `${row.tradingPartnerLocationKey}-${row.storeKey}`
          ] !== true
      )

      newState.selectedRows = deepCopyObject({})
      newState.isDirty = true
      break
    }

    case types.ADD_ADDITIONAL_DETAILS: {
      newState = deepCopyObject(state)
      const {
        orderSeriesKey,
        selectedOriginLocations,
        originLocations,
        storeObjects,
        requestTypes,
        data,
      } = newState

      const selectedStores = payload.stores

      if (selectedStores) {
        for (let i = 0; i < payload.stores.length; ++i) {
          const newStoreKey = payload.stores[i].value

          const storeInfo = deepCopyObject(storeObjects[newStoreKey])
          const defaultRowData = {
            storeKey: newStoreKey,
            shipUsingOnlyLowStockQuantities: false,
            skipPresentationLevels: false,
            truckRouteKey: storeInfo.truckRouteKey,
            weight: storeInfo.weight,
          }

          const existingRowsWithThisStore = data.filter(
            row => row.storeKey === newStoreKey
          )

          if (existingRowsWithThisStore.length > 0) {
            defaultRowData.shipUsingOnlyLowStockQuantities =
              existingRowsWithThisStore[0].shipUsingOnlyLowStockQuantities
            defaultRowData.skipPresentationLevels =
              existingRowsWithThisStore[0].skipPresentationLevels
            defaultRowData.truckRouteKey =
              existingRowsWithThisStore[0].truckRouteKey
            defaultRowData.weight = existingRowsWithThisStore[0].weight
          }

          let outToDate = new Date(payload.date)
          let targetDeliveryDate = new Date(payload.date)
          outToDate = new Date(
            outToDate.setDate(outToDate.getDate() + storeInfo.outToDays)
          )

          targetDeliveryDate = new Date(
            targetDeliveryDate.setDate(
              targetDeliveryDate.getDate() + storeInfo.targetDeliveryDays
            )
          )

          const existingOrigins = existingRowsWithThisStore.map(
            row => row.tradingPartnerLocationKey
          )
          const locationKeys = Object.keys(selectedOriginLocations)
          const locationKeysToAdd = locationKeys.filter(
            key => !existingOrigins.includes(parseInt(key))
          )

          let tradingPartnerName = ''
          for (let i = 0; i < locationKeysToAdd.length; ++i) {
            tradingPartnerName = originLocations.filter(
              origin => origin.locationKey === parseInt(locationKeysToAdd[i])
            )[0].name
            newState.data.unshift({
              orderSeriesDetailKey: null,
              orderSeriesKey,
              outToDate: dateUtilities.dateFnsFormat(outToDate, 'MM-dd-yyyy'),
              targetDeliveryDate: dateUtilities.dateFnsFormat(
                targetDeliveryDate,
                'MM-dd-yyyy'
              ),
              tradingPartnerLocationKey: parseInt(locationKeysToAdd[i]),
              tradingPartnerName,
              requestTypes: requestTypes
                .map(type => type.abbreviation)
                .join(','),
              safetyStockPercent: Math.floor(
                storeInfo.safetyStockPercent * 100
              ),
              ...defaultRowData,
            })
          }

          newState.isDirty = true
          newState.selectedStores[newStoreKey] = true
        }
      }
      break
    }

    case types.SET_SHOW_ERROR: {
      newState = deepCopyObject(state)

      const { storeObjects, data } = newState

      const selectedStore = payload.stores

      const showError = []

      for (let i = 0; i < data.length; ++i) showError.push(false)

      if (selectedStore && payload.date) {
        for (let i = 0; i < selectedStore.length; ++i) {
          const newStoreKey = selectedStore[i].value
          const storeInfo = deepCopyObject(storeObjects[newStoreKey])
          const existingRowsWithThisStore = data.filter(
            row => row.storeKey === newStoreKey
          )
          let targetDeliveryDate = new Date(payload.date)
          let targetDeliveryDateTime = new Date(
            targetDeliveryDate.setDate(
              targetDeliveryDate.getDate() + storeInfo.targetDeliveryDays
            )
          ).setHours(0, 0, 0, 0)

          if (existingRowsWithThisStore.length > 0) {
            for (let k = 0; k < existingRowsWithThisStore.length; ++k) {
              let exsistingDateTime = new Date(
                existingRowsWithThisStore[k].targetDeliveryDate
              ).setHours(0, 0, 0, 0)
              if (exsistingDateTime !== targetDeliveryDateTime) {
                let errorRow = existingRowsWithThisStore.filter(
                  row =>
                    new Date(row.targetDeliveryDate).setHours(0, 0, 0, 0) ===
                    targetDeliveryDateTime
                )
                for (let j = 0; j < data.length; j++) {
                  if (
                    data[j].storeKey === errorRow[0].storeKey &&
                    data[j].tradingPartnerName ===
                      errorRow[0].tradingPartnerName
                  ) {
                    showError[j] = true
                  }
                }
              }
            }
          }
        }
      }

      newState.showError = showError
      break
    }

    case types.CLEAR_DELETED_DETAILS: {
      newState.deletedDetailIds = []
      break
    }

    case types.SET_IS_DIRTY: {
      newState.isDirty = payload
      break
    }

    default:
      break
  }

  return newState
}
