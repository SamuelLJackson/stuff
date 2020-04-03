import actions from '../../../../pages/upload/store/actions'
import * as types from '../../../../pages/upload/store/types'

describe('upload grid synchronous actions', () => {
  it('should create an action to set is loading in state', () => {
    const expectedAction = {
      type: types.SET_IS_LOADING,
      payload: true,
    }
    expect(actions.setIsLoading(true)).toEqual(expectedAction)
  })

  it('should create an action to set show modal in state', () => {
    const expectedAction = {
      type: types.SET_SHOW_MODAL,
      payload: true,
    }
    expect(actions.setShowModal(true)).toEqual(expectedAction)
  })

  it('should create an action to set file is selected in state', () => {
    const expectedAction = {
      type: types.SET_IS_FILE_SELECTED,
      payload: true,
    }
    expect(actions.setIsFileSelected(true)).toEqual(expectedAction)
  })

})