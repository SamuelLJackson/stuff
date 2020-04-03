import Header from '../../../container/components/Header'
import { expect } from 'chai'
import { makeShallowRender } from '../../../test-utils'

describe('Header Component', () => {
    const getWrapper = () => makeShallowRender(Header)()

    it('should render self and subcomponents', () => {
        const wrapper = getWrapper()

        expect(wrapper.find('div.header')).to.have.lengthOf(1)
        expect(wrapper.find('div.logo-icon')).to.have.lengthOf(1)
        expect(wrapper.find('div.white-background')).to.have.lengthOf(1)

        expect(wrapper.find('img.grape-logo')).to.have.lengthOf(1)
        expect(wrapper.find('h3.app-title')).to.have.lengthOf(1)
        expect(wrapper.find('h3.app-title').text()).to.equal('Order Series')
    })
})
