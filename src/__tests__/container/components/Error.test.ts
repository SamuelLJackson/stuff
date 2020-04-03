import Error from '../../../container/components/Error'
import { expect } from 'chai'
import { makeMountRender, reduxify } from '../../../test-utils'
import { Error as ErrorType } from '../../../container/store/types'
import PageContainer from '../../../common/PageContainer'


const defaultError: ErrorType = {
    stack: 'Failed to Fetch',
    message: 'TypeError: Failed To Fetch',
    innerMessage: '',
    backTo: 'Home',
}


describe('Footer Component', () => {
    const getWrapper = () => makeMountRender(reduxify(Error, {}, {container: {error: defaultError}}))()

    it('should render self and subcomponents', () => {
        const wrapper = getWrapper()

        expect(wrapper.find(PageContainer)).to.have.lengthOf(1)
        expect(wrapper.find('h1')).to.have.lengthOf(1)
        expect(wrapper.find('h1').text()).to.equal(defaultError.message)
        expect(wrapper.find('h1').prop('style')).to.have.property('marginLeft', 30)
    })
})
