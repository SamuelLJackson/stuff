import actions from '../../../../../../pages/review_and_run/components/button_array/store/actions'
import * as types from '../../../../../../pages/review_and_run/components/button_array/store/types'
import * as gridTypes from '../../../../../../pages/review_and_run/components/grid/store/types'
import { mockStore, mockResponse } from '../../../../../../test-utils'
import { objectTemplates as Templates, constants } from '../../../../../../common'
import { ThunkDispatch } from '../../../../../../store/types';
import { AnyAction } from 'redux';
import thunk from '../../../../../../store/thunk'
import configureMockStore from 'redux-mock-store'

const initialState = {};
type State = typeof initialState;
const middlewares = [thunk];

describe('review & run button aray synchronous actions', () => {
  it('should create an action to set is loading in state', () => {
    const expectedAction = {
      type: types.SET_IS_FORECAST,
      payload: true,
    }
    expect(actions.setIsForecast(true)).toEqual(expectedAction)
  })
})

describe('review & run button array async actions', () => {
  const mockStore = configureMockStore<State, ThunkDispatch<State, any, AnyAction>>(middlewares);
  const store = mockStore({reviewAndRun: Templates.ReviewAndRunState})
  it('should post data & dispatch actions', () => {
    const expectedActions = [
      {
        type: gridTypes.SET_IS_LOADING,
        payload: {isLoading: true, loadingType: constants.LoadingTypes.SAVE_CHANGES},
      },
      {
        type: gridTypes.SET_IS_LOADING,
        payload: {isLoading: false, loadingType: constants.LoadingTypes.SAVE_CHANGES},
      },
      {
        type: gridTypes.SET_IS_DIRTY,
        payload: false,
      },
      {
        type: gridTypes.CLEAR_DELETED_DETAILS,
      },
      {
        type: gridTypes.RECEIVE_DETAILS,
        payload: Templates.ReviewAndRunState.grid.data,
      },
    ]
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify({
        orderSeriesKey: 1,
        date: '0001-01-01T:00:00:00',
        statusKey: 1,
        isForecast: true,
        details: [Templates.OrderSeriesDetail],
      }))));

    return store.dispatch(actions.save())
      .then(() => {
        const dispatchedActions = store.getActions()
        expect(dispatchedActions.length).toBe(5)
        expect(dispatchedActions).toEqual(expectedActions)
      })
  })
})
