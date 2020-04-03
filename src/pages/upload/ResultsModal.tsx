import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ACTIONS from './store/actions'
import { BaseState } from '../../common/types'

export default () => {
  const dispatch = useDispatch()

  const showModal = useSelector((state: BaseState) => state.upload.showModal)
  const successCount = useSelector((state: BaseState) => state.upload.successCount)
  const failureCount = useSelector((state: BaseState) => state.upload.failureCount)

  let header = 'Update Results'
  let successMessage = ''
  let failureMessage = ''
  if (successCount > 0) {
    successMessage = `${successCount} routes successfully updated!`
  }

  if (failureCount > 0) {
    failureMessage = `${failureCount} rows of your upload failed. Please review the downloaded excel file for more information.`
  }

  return (
    <Modal
      isOpen={showModal}
      size={'lg'}
      toggle={() => dispatch(ACTIONS.setShowModal(false))}
    >
      <ModalHeader>
        <h3>{header}</h3>
      </ModalHeader>
      <ModalBody>
        <h5>{successMessage}</h5>
        <h5>{failureMessage}</h5>
      </ModalBody>
      <ModalFooter>
        <button
          className="btn btn-primary"
          autoFocus={true}
          onClick={() => dispatch(ACTIONS.setShowModal(false))}
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  )
}
