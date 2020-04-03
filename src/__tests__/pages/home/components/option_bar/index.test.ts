import OptionBar from '../../../../../pages/home/components/option_bar/index'
import { expect } from 'chai'
import { OptionBarState } from '../../../../../pages/home/components/option_bar/store/types'
import { reduxify, makeMountRender } from '../../../../../test-utils'


const defaultOptionBarState: OptionBarState = {
    orderSeries: [],
    selectedOrderSeries: null,
    isLoading: false,
}

const defaultState: any = {
    home: { optionBar: defaultOptionBarState}
}

const optionBarStateWithChosenOrderSeries: OptionBarState = {
    orderSeries: [],
    selectedOrderSeries: {value: 1, label: 1},
    isLoading: false,
}

const stateWithChosenOrderSeries: any = {
    home: { optionBar: optionBarStateWithChosenOrderSeries }
}

describe('OptionBar', () => {
    const getWrapper = () => makeMountRender(reduxify(OptionBar, {}, defaultState))()
    const getWrapperWithChosenOrderSeries = () => makeMountRender(reduxify(OptionBar, {}, stateWithChosenOrderSeries))()

    it('should render self and subcomponents', () => {
        const wrapper = getWrapper()
        const chosenOrderSeriesWrapper = getWrapperWithChosenOrderSeries()

        expect(wrapper.find('.section-container')).to.have.lengthOf(2)
        
        expect(wrapper.find('.section-container').at(0).find('button')).to.have.lengthOf(1)
        expect(wrapper.find('.section-container').at(0).find('button').text()).to.equal('Create Order Series')

        expect(wrapper.find('.section-container').at(1).find('button')).to.have.lengthOf(1)
        expect(wrapper.find('.section-container').at(1).find('button').text()).to.equal('Show All')

        expect(chosenOrderSeriesWrapper.find('.section-container').at(1).find('button')).to.have.lengthOf(1)
        expect(chosenOrderSeriesWrapper.find('.section-container').at(1).find('button').text()).to.equal('Search')
    })
})
