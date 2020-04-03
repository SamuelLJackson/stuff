import Grid from '../../../../../pages/home/components/grid'
import { expect } from 'chai'
import { GridState } from '../../../../../pages/home/components/grid/store/types'
import { objectTemplates as Templates} from '../../../../../common'
import { makeMountRender, reduxify } from '../../../../../test-utils'

const defaultGridState: GridState = {
    orderSeriesResults: [Templates.OrderSeries],
    showTable: false,
}

const defaultBaseState: any = {
    home: { grid: defaultGridState}
}

describe('Home Grid', () => {
    const getWrapper = () => makeMountRender(reduxify(Grid, {}, defaultBaseState))()

    it('should render self and subcomponents', () => {
        const wrapper = getWrapper()

        expect(wrapper.find('.section-container')).to.have.lengthOf(1)
        expect(wrapper.find('p')).to.have.lengthOf(1)
        expect(wrapper.find('p').text()).to.equal('Showing 1 of 1 rows')
        expect(wrapper.find('p').prop('style')).to.have.property('width', 300)

        expect(wrapper.find('.ReactTable')).to.have.lengthOf(1)
        expect(wrapper.find('.ReactTable').prop('style')).to.have.property('width', 1250)
        expect(wrapper.find('.ReactTable').prop('style')).to.have.property('height', window.innerHeight - 340)

        expect(wrapper.find('div.rt-th.table-header')).to.have.lengthOf(5)
        expect(wrapper.find('div.rt-th.table-header').at(0).text()).to.equal('Order Series Number')
        expect(wrapper.find('div.rt-th.table-header').at(1).text()).to.equal('Order Series Name')
        expect(wrapper.find('div.rt-th.table-header').at(2).text()).to.equal('Order Series Replenishment Type')
        expect(wrapper.find('div.rt-th.table-header').at(3).text()).to.equal('Forecast?')
        expect(wrapper.find('div.rt-th.table-header').at(4).text()).to.equal('Status')
    })
})
