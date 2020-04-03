import reducer from '../../../../pages/upload/store/reducer'
import * as types from '../../../../pages/upload/store/types'

const defaultState: types.UploadState = {
    isLoading: false,
    showModal: false,
    successCount: 0,
    failureCount: 0,
    rejectedRows: [],
    isFileSelected: false,
}

describe('home grid reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(defaultState)
    })

    it('should handle SET_IS_LOADING', () => {
        expect(
            reducer(defaultState, {
                type: types.SET_IS_LOADING,
                payload: true,
            })
        ).toEqual({
            isLoading: true,
            showModal: false,
            successCount: 0,
            failureCount: 0,
            rejectedRows: [],
            isFileSelected: false,
        })
    })

    it('should handle SET_SHOW_MODAL', () => {
        expect(
            reducer(defaultState, {
                type: types.SET_SHOW_MODAL,
                payload: true,
            })
        ).toEqual({
            isLoading: false,
            showModal: true,
            successCount: 0,
            failureCount: 0,
            rejectedRows: [],
            isFileSelected: false,
        })
    })

    it('should handle SET_IS_FILE_SELECTED', () => {
        expect(
            reducer(defaultState, {
                type: types.SET_IS_FILE_SELECTED,
                payload: true,
            })
        ).toEqual({
            isLoading: false,
            showModal: false,
            successCount: 0,
            failureCount: 0,
            rejectedRows: [],
            isFileSelected: true,
        })
    })
/*
    it('should handle RECEIVE_RESULTS', (results: any) => {
      expect(
        reducer(defaultState, {
          type: RECEIVE_RESULTS,
          payload: {
            successCount: 2,
            failureCount: 1,
            rejectedRows: [{
                itemCode: "123",
                originlocation: "1000",
                destinationLocation: "2000",
                isPrimary: "Yes",
                errors: "Item does not exist!"
            }]
          },
        })
      ).toEqual({
        isLoading: false,
            showModal: false,
            successCount: 2,
            failureCount: 1,
            rejectedRows: [{
                itemCode: "123",
                originlocation: "1000",
                destinationLocation: "2000",
                isPrimary: "Yes",
                errors: "Item does not exist!"
            }],
            isFileSelected: false,
        })
    })
    */
})
