import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import ORRequestTypes from './ORRequestTypes'
import ACTIONS from '../../store/actions'
import { dateUtilities } from '../../../../common'
import { WhiteCheckMark } from '../../../../icons'
import { BaseState } from '../../../../common/types'

const dateRegex = /\d\d\/\d\d\/\d\d\d\d/g

export default () => {
  const dispatch = useDispatch()
  const date = useSelector((state: BaseState) => state.create.selectedDate)
  const skipPresentationLevels = useSelector(
    (state: BaseState) => state.create.skipPresentationLevels
  )
  const shipUsingOnlyLowStockQuantities = useSelector(
    (state: BaseState) => state.create.shipUsingOnlyLowStockQuantities
  )
  const disableOrdering = useSelector(
    (state: BaseState) => state.create.disableOrdering
  )

  let noDatePicked = true
  if (date !== null && date !== undefined) {
    if (typeof date === 'object') {
      noDatePicked = false
    } else if (typeof date === 'string') {
      noDatePicked = !date.match(dateRegex)
    }
  }
  
  const today = new Date()

  let skipAdjustedStyles = {}
  let shipAdjustedStyles = {}
  if (window.innerWidth < 1200) {
    skipAdjustedStyles = {
      top: 862,
      left: 307,
    }

    shipAdjustedStyles = {
      top: 919,
      left: 307,
    }
  }

  return (
    <div
      style={{
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 10,
        filter: disableOrdering ? 'brightness(85%)' : undefined,
        backgroundColor: 'white',
      }}
    >
      <div style={{ marginBottom: 57 }}>
        <h4 style={{ float: 'left' }}>Ordering</h4>
        <button
          className="btn btn-primary main-process-button"
          disabled={noDatePicked}
          style={{
            float: 'right',
            width: 'auto',
          }}
          onClick={() => dispatch(ACTIONS.postCreate())}
        >
          Save & Continue
        </button>
      </div>
      <div style={{ display: 'flex' }}>
        <div className="order-series-parameter-name display-flex">
          Ordering Week
          <div className="asterisk">*</div>
        </div>
        <DayPickerInput
          dayPickerProps={{ disabledDays: { before: today } }}
          formatDate={dateUtilities.formatDate}
          format={dateUtilities.FORMAT}
          inputProps={{
            readOnly: true,
            disabled: disableOrdering,
            style: {
              width: 400,
              height: 39,
            },
          }}
          parseDate={dateUtilities.parseDate}
          placeholder={`${dateUtilities.dateFnsFormat(
            new Date(),
            dateUtilities.FORMAT
          )}`}
          value={date}
          onDayChange={day =>
            dispatch(
              ACTIONS.setDate(
                dateUtilities.dateFnsFormat(day, dateUtilities.FORMAT)
              )
            )
          }
        />
      </div>
      <ORRequestTypes />
      <div
        style={{
          display: 'flex',
          paddingTop: '20px',
          marginTop: 48,
        }}
      >
        <div className="order-series-parameter-name">Skip presentation levels</div>
        <div className="big-checkbox">
          <input
            type="checkbox"
            id={`skip-checkbox`}
            className="big-blue"
            checked={skipPresentationLevels}
            disabled={disableOrdering}
            onChange={event =>
              dispatch(ACTIONS.setSkipPresentationLevels(event.target.checked))
            }
          />
          <label htmlFor={`skip-checkbox`}></label>
          {skipPresentationLevels && (
            <img
              alt="skip presentation levels check mark"
              className="skip-check-mark-icon"
              src={WhiteCheckMark}
              style={skipAdjustedStyles}
              onClick={() => dispatch(ACTIONS.setSkipPresentationLevels(false))}
            />
          )}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 20,
        }}
      >
        <div className="order-series-parameter-name">Only low stock</div>
        <div className="big-checkbox">
          <input
            type="checkbox"
            id={`ship-checkbox`}
            className="big-blue"
            checked={shipUsingOnlyLowStockQuantities}
            disabled={disableOrdering}
            onChange={event =>
              dispatch(
                ACTIONS.setShipUsingOnlyLowStockQuantities(event.target.checked)
              )
            }
          />
          <label htmlFor={`ship-checkbox`}></label>
        </div>
      </div>
      {shipUsingOnlyLowStockQuantities && (
        <img
          alt="ship using only low stock check mark"
          className="ship-check-mark-icon"
          src={WhiteCheckMark}
          style={shipAdjustedStyles}
          onClick={() =>
            dispatch(ACTIONS.setShipUsingOnlyLowStockQuantities(false))
          }
        />
      )}
    </div>
  )
}
