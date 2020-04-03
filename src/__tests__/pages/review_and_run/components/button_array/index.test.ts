import Container from '../../../../../pages/review_and_run/components/button_array'
import { expect } from 'chai'
import { objectTemplates as Templates} from '../../../../../common'
import { reduxify, makeMountRender } from '../../../../../test-utils'

const defaultState = {
    reviewAndRun: Templates.ReviewAndRunState,
}
const stateRun = {
    reviewAndRun: {
        ...Templates.ReviewAndRunState,
        buttonArray: { isForecast: false }
    }
}

const stateDirty = {
    reviewAndRun: {
        ...Templates.ReviewAndRunState,
        grid: {
            ...Templates.ReviewAndRunState.grid,
            isDirty: true,
        },
    }
}

const runCompleteState = {
    reviewAndRun: {
        ...Templates.ReviewAndRunState,
        buttonArray: { isForecast: false},
        titleBar: {
            name: '',
            statusKey: 4,
        }
    }
}

describe('Create container', () => {
    const getWrapperForecast = () => makeMountRender(reduxify(Container, {}, defaultState))()
    const getWrapperRun = () => makeMountRender(reduxify(Container, {}, stateRun))()
    const getDirtyWrapper = () => makeMountRender(reduxify(Container, {}, stateDirty))()
    const getRunCompleteWrapper = () => makeMountRender(reduxify(Container, {}, runCompleteState))()

    it('should render self and subcomponents', () => {
        const wrapper = getWrapperForecast()
        const runWrapper = getWrapperRun()
        const dirtyWrapper = getDirtyWrapper()
        const runCompleteWrapper = getRunCompleteWrapper()

        expect(wrapper.find('button')).to.have.lengthOf(4)
        expect(wrapper.find('button').at(0).text()).to.equal('Clear Filters')
        expect(wrapper.find('button').at(1).text()).to.equal('Remove')
        expect(wrapper.find('button').at(2).text()).to.equal('Add Store')
        expect(wrapper.find('button').at(3).text()).to.equal('Forecast')

        expect(wrapper.find('p.showing-items-text')).to.have.lengthOf(1)
        expect(wrapper.find('p.showing-items-text').text()).to.equal('Showing 1 of 1 rows')

        expect(runWrapper.find('button').at(3).text()).to.equal('Run')
        expect(dirtyWrapper.find('button').at(3).text()).to.equal('Save')

        expect(runCompleteWrapper.find('button').at(1).prop('disabled')).to.equal(true)
        expect(runCompleteWrapper.find('button').at(2).prop('disabled')).to.equal(true)
        expect(runCompleteWrapper.find('button').at(3).prop('disabled')).to.equal(true)
    })
})
