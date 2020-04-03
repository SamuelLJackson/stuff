import Footer from '../../../container/components/Footer'
import { expect } from 'chai'
import { makeShallowRender } from '../../../test-utils'

describe('Footer Component', () => {
    const getWrapper = () => makeShallowRender(Footer)()

    it('should render self and subcomponents', () => {
        const wrapper = getWrapper()

        expect(wrapper.find('div.footer')).to.have.lengthOf(1)
        expect(wrapper.find('div.fixed-bottom')).to.have.lengthOf(1)
    })
})
