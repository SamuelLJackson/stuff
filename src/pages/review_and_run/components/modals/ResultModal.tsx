import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ACTIONS from './store/actions'
import { constants } from '../../../../common'
import { BaseState } from '../../../../common/types'

export default () => {
  const dispatch = useDispatch()

  const showModal = useSelector((state: BaseState) => state.reviewAndRun.modals.showModal)
  const runResultType = useSelector(
    (state: BaseState) => state.reviewAndRun.modals.runResultType
  )
  const currentRunTimer = useSelector((state: BaseState) => state.reviewAndRun.modals.runTimer)
  const storeMessage = useSelector((state: BaseState) => state.reviewAndRun.modals.storeMessage)
  let secondsElapsed: number = 0

  let header = ''
  let message = ''
  let runTimer: any = null
  
  switch (runResultType) {
    case constants.RunResultTypes.FORECAST: {
      header = 'Forecast'
      message =
        'Forecast Created Successfully, please review the results in the downloaded Excel file.'
      break
    }

    case constants.RunResultTypes.ORDER_CREATION: {
      header = 'Order Creation'
      message = 'Process Completed Successfully.' + storeMessage
      break
    }

    case constants.RunResultTypes.NO_ITEMS: {
      header = 'No Eligible Items'
      message = 'No eligible items were found to process.'
      break
    }

    case constants.RunResultTypes.WARNING_FORECAST: {
      header = 'Warning'
      message =
        'Another order series instance to create orders is currently in progress. The warehouse inventory may be impacted by this run.'
      break
    }

    case constants.RunResultTypes.IN_REVIEW: {
      header = 'In Review'
      message = 'This order series is currently in review by another user.'

      clearInterval(currentRunTimer)
      const elapsedTime = document.getElementById("elapsedTime")
      if (elapsedTime !== null) {
        elapsedTime.innerHTML = '';
      }      
      break
    }

    case constants.RunResultTypes.PROCESSING: {
      header = 'Processing...'
      message = 'Elapsed time:'
      
      if (currentRunTimer === null) {
        runTimer = setInterval(myCounter, 1000)
        dispatch(ACTIONS.setRunTimer(runTimer))
      }
      break
    }

    default:
  }

  function myCounter() {
    ++secondsElapsed

    const elapsedTime = document.getElementById("elapsedTime")
    if (elapsedTime !== null) {
      elapsedTime.innerHTML = getTimeString(secondsElapsed);
    }
  }

  function getTimeString(elapsedSeconds: number): string {
    var hours = Math.floor((elapsedSeconds % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((elapsedSeconds % (60 * 60)) / (60));
    var seconds = Math.floor((elapsedSeconds % (60)));
    
    return 'hours: ' + hours + ' minutes: ' + minutes + ' seconds: ' + seconds
  }

  return (
    <Modal
      isOpen={showModal}
      size={'lg'}
      toggle={() => {
        dispatch(
          ACTIONS.setShowResultModal(
            false,
            constants.RunResultTypes.ORDER_CREATION
          )
        )
        clearInterval(runTimer)
      }}
    >
      <ModalHeader>
        <h3>{header}</h3>
      </ModalHeader>
      <ModalBody>
        <h5>{message.split("\n").map((text, i) => i ? [<br/>, text] : text)}</h5>
        <h5 id="elapsedTime">hours: 0 minutes: 0 seconds: 0</h5>
      </ModalBody>
      <ModalFooter>
        <button
          className="btn btn-primary"
          autoFocus={true}
          onClick={() => {
            dispatch(
              ACTIONS.setShowResultModal(
                false,
                constants.RunResultTypes.ORDER_CREATION
              )
            )
            clearInterval(runTimer)
          }}
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  )
}
