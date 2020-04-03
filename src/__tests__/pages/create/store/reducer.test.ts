import reducer from '../../../../pages/create/store/reducer'
import * as types from '../../../../pages/create/store/types'
import { objectTemplates as Templates } from '../../../../common'

describe('home option bar reducer reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(Templates.CreateState)
    })

    it('should handle RECEIVE_LOOKUPS', () => {
        const defaultState: types.State = { 
            stateKey: 3, 
            stateName: "3", 
            stores: [Templates.store] 
        }
        const newState = Templates.CreateState
        newState.replenishmentTypes = [Templates.replenishmentType]
        newState.originLocations = [Templates.originLocation]
        newState.stores = [Templates.store]
        newState.requestTypes = [Templates.requestType]
        newState.selectedRequestTypes = {"3": true}

        newState.states = {
            "3": defaultState
        }

        expect(
        reducer(Templates.CreateState, 
            {
                type: types.RECEIVE_LOOKUPS,
                payload: Templates.CreateLookups,
            }
        )).toEqual(newState)
    })

    it('should handle SET_NAME', () => {
        const newState = Templates.CreateState
        const newName = '3'
        newState.name = newName

        expect(
        reducer(Templates.CreateState, 
            {
                type: types.SET_NAME,
                payload: newName,
            }
        )).toEqual(newState)
    })

    it('should handle SET_REPLENISHMeNt type', () => {
        const selectOption = {value: 3, label: '3'}
        const newState = Templates.CreateState
        newState.selectedReplenishmentType = selectOption

        expect(
        reducer(Templates.CreateState, 
            {
                type: types.SELECT_REPLENISHMENT_TYPE,
                payload: selectOption,
            }
        )).toEqual(newState)
    })
/*
    it('should handle SElect origin location', () => {
        const newState = Templates.CreateState
        newState.selectedOriginLocations = {"3": true}

        expect(
        reducer(Templates.CreateState, 
            {
                type: types.SELECT_ORIGIN_LOCATION,
                payload: 3,
            }
        )).toEqual(newState)
    })
    */

    it('should handle SElect all origin locations', () => {
        const newState = Templates.CreateState
        newState.originLocations = [Templates.originLocation]

        expect(
        reducer(newState, 
            { type: types.SELECT_ALL_ORIGIN_LOCATIONS, payload: '' }
        )).toEqual(newState)
    })

    it('should handle unSElect all origin locations', () => {
        const newState = Templates.CreateState
        newState.originLocations = [Templates.originLocation]

        expect(
        reducer(newState, 
            { type: types.UNSELECT_ALL_ORIGIN_LOCATIONS, payload: '' }
        )).toEqual(newState)
    })
})

/*
export const SELECT_STATE = 'SELECT_REVIEW_AND_RUN_STATE'
export const UNSELECT_STATE = 'UNSELECT_STATE'
export const SELECT_STORE = 'SELECT_STORE'
export const SELECT_ALL_STORES = 'SELECT_ALL_STORES'
export const UNSELECT_ALL_STORES = 'UNSELECT_ALL_STORES'

export const SET_DATE = 'SET_DATE'
export const SELECT_REQUEST_TYPE = 'SELECT_REQUEST_TYPE'
export const UNSELECT_REQUEST_TYPE = 'UNSELECT_REVIEW_AND_RUN_REQUEST_TYPE'
export const SELECT_ALL_REQUEST_TYPES = 'SELECT_ALL_REVIEW_AND_RUN_REQUEST_TYPES'
export const UNSELECT_ALL_REQUEST_TYPES = 'UNSELECT_ALL_REVIEW_AND_RUN_REQUEST_TYPES'
export const SET_SKIP_PRESENTATION_LEVELS = 'SET_SKIP_PRESENTATION_LEVELS'
export const SET_SHIP_USING_ONLY_LOW_STOCK_QUANTITIES =
  'SET_SHIP_USING_ONLY_LOW_STOCK_QUANTITIES'
export const SET_GRAY_OVERLAY_DISPLAY = 'SET_GRAY_OVERLAY_DISPLAY'
export const SET_COLLAPSE_STATE = 'SET_COLLAPSE_STATE'
export const RESET = 'RESET_CREATE'
export const SET_STORE_SEARCH_INPUT = 'SET_STORE_SEARCH_INPUT'
export const SET_SHOW_RESULT = 'SET_SHOW_RESULT'
export const SET_COLLAPSE_ALL_STATES = 'SET_COLLAPSE_ALL_STATES'
*/
