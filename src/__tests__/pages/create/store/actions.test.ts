import actions from '../../../../pages/create/store/actions'
import * as types from '../../../../pages/create/store/types'
import { SelectOption } from '../../../../common/types'
import configureMockStore from 'redux-mock-store'
import thunk from '../../../../store/thunk'
import fetchMock from 'fetch-mock'
import { ThunkDispatch } from '../../../../store/types';
import { AnyAction } from 'redux';
import expect from 'expect' // You can use any testing library

const initialState = {};
type State = typeof initialState;
const middlewares = [thunk];
const mockStore = configureMockStore<State, ThunkDispatch<State, any, AnyAction>>(middlewares);

describe('create synchronous actions', () => {
  it('should create an action to receive lookups', () => {
    const lookups: any = {}
    const expectedAction = {
      type: types.RECEIVE_LOOKUPS,
      payload: lookups,
    }
    expect(actions.receiveLookups(lookups)).toEqual(expectedAction) 
  })

  it('should create an action to set show result', () => {
    const showResult = true
    const expectedAction = { type: types.SET_SHOW_RESULT, payload: showResult }
    
    expect(actions.setShowResult(showResult)).toEqual(expectedAction) 
  })

  it('should create an action to set date', () => {
    const date = '10-10-1010'
    const expectedAction = { type: types.SET_DATE, payload: date }
    
    expect(actions.setDate(date)).toEqual(expectedAction) 
  })

  it('should create an action to select request type', () => {
    const requestType = 3
    const expectedAction = { type: types.SELECT_REQUEST_TYPE, payload: requestType }
    
    expect(actions.selectRequestType(requestType)).toEqual(expectedAction) 
  })

  it('should create an action to unselect request type', () => {
    const requestType = 3
    const expectedAction = { type: types.UNSELECT_REQUEST_TYPE, payload: requestType }
    
    expect(actions.unselectRequestType(requestType)).toEqual(expectedAction) 
  })

  it('should create an action to select all request types', () => {
    const expectedAction = { type: types.SELECT_ALL_REQUEST_TYPES  }
    
    expect(actions.selectAllRequestTypes()).toEqual(expectedAction) 
  })

  it('should create an action to unselect all request types', () => {
    const expectedAction = { type: types.UNSELECT_ALL_REQUEST_TYPES  }
    
    expect(actions.unselectAllRequestTypes()).toEqual(expectedAction) 
  })

  it('should create an action to set skip presentation levels', () => {
    const selection = true
    const expectedAction = { type: types.SET_SKIP_PRESENTATION_LEVELS, payload: selection }
    
    expect(actions.setSkipPresentationLevels(selection)).toEqual(expectedAction) 
  })

  it('should create an action to set ship only using low stock quantities bool', () => {
    const selection = true
    const expectedAction = { type: types.SET_SHIP_USING_ONLY_LOW_STOCK_QUANTITIES, payload: selection }
    
    expect(actions.setShipUsingOnlyLowStockQuantities(selection)).toEqual(expectedAction) 
  })

  it('should create an action to set gray overlay display', () => {
    const expectedAction = { type: types.SET_GRAY_OVERLAY_DISPLAY }
    
    expect(actions.setGrayOverlayDisplay()).toEqual(expectedAction) 
  })

  it('should create an action to set collapse state', () => {
    const stateKey = 3
    const expectedAction = { type: types.SET_COLLAPSE_STATE, payload: stateKey }
    
    expect(actions.setCollapseState(stateKey)).toEqual(expectedAction) 
  })

  it('should create an action to collapse all states', () => {
    const collapseAllStates = false
    const expectedAction = { type: types.SET_COLLAPSE_ALL_STATES, payload: collapseAllStates }
    
    expect(actions.setCollapseAllStates(collapseAllStates)).toEqual(expectedAction) 
  })

  it('should create an action to set store search input', () => {
    const searchInput = 'az'
    const expectedAction = { type: types.SET_STORE_SEARCH_INPUT, payload: searchInput }
    
    expect(actions.setStoreSearchInput(searchInput)).toEqual(expectedAction) 
  })

  it('should create an action to reset', () => {
    const expectedAction = { type: types.RESET }
    
    expect(actions.reset()).toEqual(expectedAction) 
  })
})

describe('create async actions', () => {
  it('should create an action to set order series name', () => {
    const store = mockStore(initialState);
    const name = 'Steven'
    const expectedActions = [
      {
        type: types.SET_NAME,
        payload: name,
      },{ type:types.SET_GRAY_OVERLAY_DISPLAY  },
    ]
    
    return store.dispatch(actions.setName(name)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('should create an action to set replenishment type', () => {
    const store = mockStore(initialState);
    const replenishmentType: SelectOption = {value: 1, label: '1'}
    const expectedActions = [
      {
        type: types.SELECT_REPLENISHMENT_TYPE,
        payload: replenishmentType,
      },
      { type:types.SET_GRAY_OVERLAY_DISPLAY  },
    ]

    return store.dispatch(actions.setReplenishmentType(replenishmentType)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
  
  it('should create an action to set origin location', () => {
    const store = mockStore(initialState);
    const originLocation: number = 3
    const expectedActions = [
      {
        type: types.SELECT_ORIGIN_LOCATION,
        payload: originLocation,
      },
      { type:types.SET_GRAY_OVERLAY_DISPLAY  },
    ]

    return store.dispatch(actions.selectOriginLocation(originLocation)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })  
  
  it('should create an action to select all origin locations', () => {
    const store = mockStore(initialState);
    const expectedActions = [
      { type: types.SELECT_ALL_ORIGIN_LOCATIONS },
      { type: types.SET_GRAY_OVERLAY_DISPLAY },
    ]
    
    return store.dispatch(actions.selectAllOriginLocations()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })  

  it('should create an action to un select all origin locations', () => {
    const store = mockStore(initialState);
    const expectedActions = [
      { type: types.UNSELECT_ALL_ORIGIN_LOCATIONS },
      { type: types.SET_GRAY_OVERLAY_DISPLAY },
    ]
    
    return store.dispatch(actions.unselectAllOriginLocations()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })  

  it('should create an action to select a state', () => {
    const store = mockStore(initialState);
    const stateKey = 3
    const expectedActions = [
      { type: types.SELECT_STATE, payload: stateKey },
      { type: types.SET_GRAY_OVERLAY_DISPLAY },
    ]
    
    return store.dispatch(actions.selectState(stateKey)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })  

  it('should create an action to unselect a state', () => {
    const store = mockStore(initialState);
    const stateKey = 3
    const expectedActions = [
      { type: types.UNSELECT_STATE, payload: stateKey },
      { type: types.SET_GRAY_OVERLAY_DISPLAY },
    ]
    
    return store.dispatch(actions.unselectState(stateKey)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })  

  it('should create an action to select a store', () => {
    const store = mockStore(initialState);
    const storeKey = 301
    const expectedActions = [
      { type: types.SELECT_STORE, payload: storeKey },
      { type: types.SET_GRAY_OVERLAY_DISPLAY },
    ]
    
    return store.dispatch(actions.selectStore(storeKey)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })  

  it('should create an action to select all stores', () => {
    const store = mockStore(initialState);
    const expectedActions = [
      { type: types.SELECT_ALL_STORES },
      { type: types.SET_GRAY_OVERLAY_DISPLAY },
    ]
    
    return store.dispatch(actions.selectAllStores()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })  

  it('should create an action to unselect all stores', () => {
    const store = mockStore(initialState);
    const expectedActions = [
      { type: types.UNSELECT_ALL_STORES },
      { type: types.SET_GRAY_OVERLAY_DISPLAY },
    ]
    
    return store.dispatch(actions.unselectAllStores()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })  

  it('should create an action to set gray overlay display and provided action', () => {
    const store = mockStore(initialState);
    const action = actions.selectAllRequestTypes()
    const expectedActions = [
      { type: types.SELECT_ALL_REQUEST_TYPES },
      { type: types.SET_GRAY_OVERLAY_DISPLAY },
    ]
    
    return store.dispatch(actions.setBasicInformation(action)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
