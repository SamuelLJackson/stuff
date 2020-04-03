import Ordering from '../../../../../pages/create/components/ordering'
import ORRequestTypes from '../../../../../pages/create/components/ordering/ORRequestTypes'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { expect } from 'chai'
import { objectTemplates } from '../../../../../common'
import { reduxify, makeMountRender } from '../../../../../test-utils'

const defaultState: any = {
    create: objectTemplates.CreateState,
}

describe('Create > Ordering container', () => {
    const getWrapper = () => makeMountRender(reduxify(Ordering, {}, defaultState))()

    it('should render self and subcomponents', () => {
        const wrapper = getWrapper()

        expect(wrapper.find('h4')).to.have.lengthOf(1)
        expect(wrapper.find('h4').text()).to.equal('Ordering')
        expect(wrapper.find('button.btn.btn-primary.main-process-button').text()).to.equal('Save & Continue')
        expect(wrapper.find('.order-series-parameter-name')).to.have.lengthOf(4)
        expect(wrapper.find('.asterisk')).to.have.lengthOf(1)

        expect(wrapper.find(ORRequestTypes)).to.have.lengthOf(1)
        expect(wrapper.find(DayPickerInput)).to.have.lengthOf(1)
        expect(wrapper.find('.big-checkbox')).to.have.lengthOf(2)
    })
})
