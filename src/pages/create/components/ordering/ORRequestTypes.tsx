import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ACTIONS from '../../store/actions'
import { BaseState } from '../../../../common/types'

export default () => {
  const requestTypes = useSelector(
    (state: BaseState) => state.create.requestTypes
  )
  const selectedRequestTypes = useSelector(
    (state: BaseState) => state.create.selectedRequestTypes
  )
  const disableCheckbox = useSelector(
    (state: BaseState) => state.create.disableOrdering
  )

  const allTypesSelected =
    requestTypes.length === Object.keys(selectedRequestTypes).length

  const dispatch = useDispatch()

  let checkboxes = []
  for (let i = 0; i < requestTypes.length; ++i) {
    const { key, name } = requestTypes[i]

    let html = (
      <div
        key={`request-type-${key}`}
        style={{
          display: 'flex',
          margin: 8,
          marginLeft: 8,
          marginBottom: '-10px',
        }}
      >
        <input
          type="checkbox"
          id={`styled-checkbox-request-type-${key}`}
          className="styled-checkbox or-request-type"
          checked={selectedRequestTypes[key] === true}
          disabled={disableCheckbox}
          onChange={() => {
            if (selectedRequestTypes[key] === true) {
              dispatch(ACTIONS.unselectRequestType(key))
            } else {
              dispatch(ACTIONS.selectRequestType(key))
            }
          }}
        />
        <label htmlFor={`styled-checkbox-request-type-${key}`}></label>
        <p style={{ fontWeight: 'bold' }}>{name}</p>
      </div>
    )

    checkboxes.push(html)
  }

  return (
    <div
      style={{
        display: 'flex',
        paddingTop: '20px',
      }}
    >
      <p className="order-series-parameter-name">OR Request Types</p>
      <div
        style={{
          width: '400px',
          height: 130,
        }}
      >
        <div
          style={{
            display: 'flex',
            border: '1px lightgray solid',
            borderRadius: '5px',
            height: 38,
          }}
        >
          <div
            style={{
              display: 'flex',
              margin: 8,
              marginBottom: '0px',
            }}
          >
            <input
              type="checkbox"
              id={`styled-checkbox-request-type-all`}
              className="styled-checkbox"
              checked={allTypesSelected}
              disabled={disableCheckbox}
              onChange={() => {
                if (allTypesSelected) {
                  dispatch(ACTIONS.unselectAllRequestTypes())
                } else {
                  dispatch(ACTIONS.selectAllRequestTypes())
                }
              }}
            />
            <label htmlFor={`styled-checkbox-request-type-all`}></label>
            <p style={{ fontWeight: 'bold' }}>All</p>
          </div>
        </div>
        <div
          style={{
            border: '1px lightgray solid',
            borderRadius: '5px',
            width: '400px',
            overflow: 'overlay',
            height: 140,
          }}
        >
          {checkboxes}
        </div>
      </div>
    </div>
  )
}
