import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ACTIONS from './store/actions'
import { BaseState } from '../../../../common/types'

export default () => {
  const dispatch = useDispatch()

  const showModal = useSelector((state: BaseState) => state.reviewAndRun.modals.showOrderCreationWarningModal)

  return (
    <Modal
      isOpen={showModal}
      size={'lg'}
      toggle={() => dispatch(ACTIONS.setShowOrderCreationWarningModal(false))}
    >
      <ModalHeader>
        <h3>Warning</h3>
      </ModalHeader>
      <ModalBody>
        <h5>Process not completed; there is currently an order series run in progress.</h5>
      </ModalBody>
      <ModalFooter>
        <button
          className="btn btn-primary"
          autoFocus={true}
          onClick={() => dispatch(ACTIONS.setShowOrderCreationWarningModal(false))}
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  )
}
