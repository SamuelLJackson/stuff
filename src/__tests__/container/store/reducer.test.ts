import reducer from '../../../container/store/reducer'
import * as types from '../../../container/store/types'
import { objectTemplates as Templates } from '../../../common'

describe('app container reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual({error: types.BaseError})
    })

    const newError: types.Error = {
        stack: 'Stack',
        message: 'Message',
        innerMessage: 'Inner Message',
        backTo: 'Back To',
    }

    it('should handle SET_ERROR', () => {
        expect(
            reducer({ error: Templates.Error}, {
                type: types.SET_ERROR,
                payload: newError,
            })
        ).toEqual({
            error: newError,
        })
    })
})
