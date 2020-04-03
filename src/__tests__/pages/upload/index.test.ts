import Upload from '../../../pages/upload/index'
import { expect } from 'chai'
import { UploadState } from '../../../pages/upload/store/types'
import PageContainer from '../../../common/PageContainer'
import { reduxify, makeMountRender } from '../../../test-utils'

const defaultUploadState: UploadState = {
    isLoading: false,
    showModal: false,
    successCount: 2,
    failureCount: 1,
    rejectedRows: [{
        itemCode: "123",
        originlocation: "1000",
        destinationLocation: "2000",
        isPrimary: "Yes",
        errors: "Item does not exist!"
    }],
    isFileSelected: false,
}

const defaultBaseState: any = {
    upload: defaultUploadState,
}

describe('Upload', () => {
    const getWrapper = () => makeMountRender(reduxify(Upload, {}, defaultBaseState))()

    it('should render self and subcomponents', () => {
        const wrapper = getWrapper()

        expect(wrapper.find(PageContainer)).to.have.lengthOf(1)
        expect(wrapper.find(PageContainer).children()).to.have.lengthOf(1)
        expect(wrapper.find(Upload).children()).to.have.lengthOf(1)
        expect(wrapper.find(Upload).children().at(0).is(PageContainer)).to.equal(true) 

        expect(wrapper.find('.section-container')).to.have.lengthOf(1)
       
        expect(wrapper.find('.btn-warning')).to.have.lengthOf(2)
        expect(wrapper.find('.btn-warning').at(0).prop('style')).to.have.property('marginLeft', 8)
        expect(wrapper.find('.btn-warning').at(1).text()).to.equal('Download Template')
        expect(wrapper.find('.btn-warning').at(1).prop('style')).to.have.property('marginLeft', 8)
        expect(wrapper.find('.btn-warning').at(0).text()).to.equal('Upload')

        expect(wrapper.find('input')).to.have.lengthOf(1)
        expect(wrapper.find('input').prop('id')).to.equal('excel-file')

        expect(wrapper.find('input').prop('style')).to.have.property('border', '1px solid black')
        expect(wrapper.find('input').prop('style')).to.have.property('borderRadius', 5)
        expect(wrapper.find('input').prop('style')).to.have.property('padding', 3)
    })
})
