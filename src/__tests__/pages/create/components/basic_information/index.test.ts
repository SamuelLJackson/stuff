import BasicInformation from '../../../../../pages/create/components/basic_information'
import { expect } from 'chai'
import {objectTemplates } from '../../../../../common'
import { reduxify, makeMountRender } from '../../../../../test-utils'

const defaultState: any = {
    create: objectTemplates.CreateState,
}

describe('Create > BasicInformation container', () => {
    const getWrapper = () => makeMountRender(reduxify(BasicInformation, {}, defaultState))()

    it('should render self and subcomponents', () => {
        const wrapper = getWrapper()

        expect(wrapper.find('h4')).to.have.lengthOf(1)
        expect(wrapper.find('.order-series-parameter-name')).to.have.lengthOf(4)
        expect(wrapper.find('.asterisk')).to.have.lengthOf(5)
    })
})
