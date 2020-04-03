import Container from '../../../pages/create/index'
import { expect } from 'chai'
import { objectTemplates as Templates} from '../../../common'
import PageContainer from '../../../common/PageContainer'
import { reduxify, makeMountRender } from '../../../test-utils'

describe('Create container', () => {
    const getWrapper = () => makeMountRender(reduxify(Container, {}, {create: Templates.CreateState}))()

    it('should render self and subcomponents', () => {
        const wrapper = getWrapper()

        expect(wrapper.find(PageContainer)).to.have.lengthOf(1)
        expect(wrapper.find(PageContainer).children()).to.have.lengthOf(1)
    })
})
