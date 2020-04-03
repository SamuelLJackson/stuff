import { deepCopyObject } from '../../../common'
import constants from '../components/basic_information/constants'
import * as types from './types'

import { OriginLocation, Store } from '../../../common/types'
import { objectTemplates } from '../../../common'

export default (state = objectTemplates.CreateState, action: types.CreateActionTypes) => {
  console.log(action)
  let newState = deepCopyObject(state)
  const { type, payload } = action

  switch (type) {
    case types.RECEIVE_LOOKUPS: {
      newState.replenishmentTypes = payload.replenishmentTypes

      newState.originLocations = payload.originLocations

      newState.stores = payload.stores
      for (let i = 0; i < payload.stores.length; ++i) {
        let { stateKey, stateName, stateAbbreviation, storeKey, storeName } = payload.stores[i]

        if (newState.states[stateKey] === undefined) {
          newState.states[stateKey] = {
            stateKey,
            stateName,
            stateAbbreviation,
            stores: [],
          }
        }
        if (
          newState.states[stateKey].stores.filter(
            (store: Store) => store.storeKey === storeKey
          ).length === 0
        ) {
          newState.states[stateKey].stores.push({
            storeKey,
            storeName,
          })
        }
      }

      newState.requestTypes = payload.requestTypes
      for (let i = 0; i < payload.requestTypes.length; ++i) {
        let { key } = payload.requestTypes[i]
        newState.selectedRequestTypes[key] = true
      }
      break
    }

    case types.SET_NAME: {
      newState.name = payload
      break
    }

    case types.SELECT_REPLENISHMENT_TYPE: {
      newState.selectedReplenishmentType = payload
      newState.selectedOriginLocations = {}
      newState.availableOriginLocations = newState.originLocations.filter(
        (origin: OriginLocation) => {
          if (
            newState.selectedReplenishmentType.value ===
            constants.WAREHOUSE_REPLENISHMENT_TYPE_KEY
          ) {
            return origin.locationKey !== constants.RSSI_LOCATION_KEY
          } else {
            return origin.locationKey === constants.RSSI_LOCATION_KEY
          }
        }
      )

      const origins = newState.availableOriginLocations
      for (let i = 0; i < origins.length; ++i) {
        newState.selectedOriginLocations[origins[i].locationKey] = true
      }
      break
    }

    case types.SELECT_ORIGIN_LOCATION: {
      const locationIsAlreadySelected =
        newState.selectedOriginLocations[payload] === true
      if (locationIsAlreadySelected) {
        delete newState.selectedOriginLocations[payload]
      } else {
        newState.selectedOriginLocations[payload] = true
      }
      break
    }

    case types.SELECT_ALL_ORIGIN_LOCATIONS: {
      const origins = newState.availableOriginLocations
      for (let i = 0; i < origins.length; ++i) {
        newState.selectedOriginLocations[origins[i].locationKey] = true
      }
      break
    }

    case types.SET_COLLAPSE_STATE: {
      const collapseState = newState.collapseState[payload]
      newState.collapseState[payload] = !collapseState
      break
    }

    case types.SET_COLLAPSE_ALL_STATES: {
      let collapseState = []
      let states: types.State[] = []
      const stores = newState.stores

      for (let i = 0; i < stores.length; ++i) {
        if (!states.includes(stores[i].stateKey))
          states.push(stores[i].stateKey)
      }

      for (let i = 0; i < states.length; ++i) {
        collapseState[i] = !payload
      }
      newState.collapseState = collapseState
      newState.collapseAll = payload
      break
    }

    case types.UNSELECT_ALL_ORIGIN_LOCATIONS: {
      newState.selectedOriginLocations = {}
      break
    }

    case types.SELECT_STATE: {
      const stores = newState.states[payload].stores
      for (let i = 0; i < stores.length; ++i) {
        newState.selectedStores[stores[i].storeKey] = true
      }
      break
    }

    case types.UNSELECT_STATE: {
      const stores = newState.states[payload].stores
      for (let i = 0; i < stores.length; ++i) {
        delete newState.selectedStores[stores[i].storeKey]
      }
      break
    }

    case types.SELECT_STORE: {
      const storeIsAlreadySelected = newState.selectedStores[payload] === true
      if (storeIsAlreadySelected) {
        delete newState.selectedStores[payload]
      } else {
        newState.selectedStores[payload] = true
      }
      break
    }

    case types.SET_STORE_SEARCH_INPUT: {
      if (payload === '') newState.filteredStates = newState.states
      else {
        let states: types.State[] = []
        let stateKeys: number[] = []

        const stores = newState.stores.filter(
          (store: Store) =>
            store.storeName.toLowerCase().includes(payload.toLowerCase()) ||
            store.stateName.toLowerCase().includes(payload.toLowerCase()) ||
            store.stateAbbreviation.toLowerCase().includes(payload.toLowerCase())
        )

        for (let i = 0; i < stores.length; ++i) {
          let { stateKey, stateName, stateAbbreviation, storeKey, storeName } = stores[i]

          if (!stateKeys.includes(stateKey)) {
            stateKeys.push(stateKey)
            states[stateKey] = {
              stateKey,
              stateName,
              stores: [],
            }
          }

          states[stateKey].stores.push({
            storeKey: storeKey,
            storeName: storeName,
            stateAbbreviation: stateAbbreviation,
            outToDates: 0,
            safetyStockPercent: 0,
            safetyStockPercentHigh: 0,
            safetyStockPercentNormal: 0,
            stateKey: 0,
            stateName: '',
            targetDeliveryDays: 0,
            truckRoute: '',
            truckRouteKey: 0,
            weight: 0,
          })
        }

        states = states.filter(Boolean)
        newState.showNoResult = states && states.length > 0 ? false : true
        newState.filteredStates = states
      }

      break
    }

    case types.SELECT_ALL_STORES: {
      for (let i = 0; i < newState.stores.length; ++i) {
        newState.selectedStores[newState.stores[i].storeKey] = true
      }
      break
    }

    case types.UNSELECT_ALL_STORES: {
      newState.selectedStores = {}
      break
    }

    case types.SET_DATE: {
      newState.selectedDate = payload
      break
    }

    case types.SELECT_REQUEST_TYPE: {
      newState.selectedRequestTypes[payload] = true
      break
    }

    case types.UNSELECT_REQUEST_TYPE: {
      delete newState.selectedRequestTypes[payload]
      break
    }

    case types.SELECT_ALL_REQUEST_TYPES: {
      for (let i = 0; i < newState.requestTypes.length; ++i) {
        let { key } = newState.requestTypes[i]
        newState.selectedRequestTypes[key] = true
      }
      break
    }

    case types.UNSELECT_ALL_REQUEST_TYPES: {
      newState.selectedRequestTypes = {}
      break
    }

    case types.SET_SKIP_PRESENTATION_LEVELS: {
      newState.skipPresentationLevels = payload
      break
    }

    case types.SET_SHIP_USING_ONLY_LOW_STOCK_QUANTITIES: {
      newState.shipUsingOnlyLowStockQuantities = payload
      break
    }

    case types.SET_GRAY_OVERLAY_DISPLAY: {
      const {
        name,
        selectedReplenishmentType,
        selectedOriginLocations,
        selectedStores,
      } = newState
      const noName = name === ''
      const noReplenishmentType = selectedReplenishmentType === null
      let noOriginLocations = true
      if (Object.keys(selectedOriginLocations).length > 0) {
        noOriginLocations = !Object.values(selectedOriginLocations).reduce(
          (acc, cur) => acc && cur
        )
      }
      let noSelectedStores = true
      if (Object.keys(selectedStores).length > 0) {
        noSelectedStores = !Object.values(selectedStores).reduce(
          (acc, cur) => acc && cur
        )
      }

      newState.disableOrdering =
        noName || noReplenishmentType || noOriginLocations || noSelectedStores
      break
    }

    case types.RESET: {
      newState = deepCopyObject(objectTemplates.CreateState)
      break
    }

    default:
      break
  }

  return newState
}
