import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ACTIONS from '../../store/actions'
import { BaseState } from '../../../../common/types'

export default () => {
  const availableOriginLocations = useSelector(
    (state: BaseState) => state.create.availableOriginLocations
  )
  const selectedOriginLocations = useSelector(
    (state: BaseState) => state.create.selectedOriginLocations
  )
  const selectedReplenishmentType = useSelector(
    (state: BaseState) => state.create.selectedReplenishmentType
  )

  const dispatch = useDispatch()

  const allOriginsSelected =
    availableOriginLocations.length ===
    Object.keys(selectedOriginLocations).length

  let checkBoxes = []
  if (selectedReplenishmentType !== null) {
    checkBoxes.push(
      <div key={'all'} style={{ display: 'flex' }}>
        <input
          type="checkbox"
          id={'styled-checkbox-all-origins'}
          className="styled-checkbox"
          checked={allOriginsSelected}
          onChange={() => {
            if (allOriginsSelected) {
              dispatch(ACTIONS.unselectAllOriginLocations())
            } else {
              dispatch(ACTIONS.selectAllOriginLocations())
            }
          }}
        />
        <label htmlFor={`styled-checkbox-all-origins`}></label>
        <p style={{ fontWeight: 'bold' }}>All</p>
      </div>
    )
    for (let i = 0; i < availableOriginLocations.length; ++i) {
      let key = 'originLocation' + availableOriginLocations[i].locationKey
      let originId = availableOriginLocations[i].locationKey
      let name = availableOriginLocations[i].name
      checkBoxes.push(
        <div key={key} style={{ display: 'flex' }}>
          <input
            type="checkbox"
            id={`styled-checkbox-${key}`}
            className="styled-checkbox"
            checked={selectedOriginLocations[originId] === true}
            onChange={() => dispatch(ACTIONS.selectOriginLocation(originId))}
          />
          <label htmlFor={`styled-checkbox-${key}`}></label>
          <p style={{ fontWeight: 'bold' }}>{name}</p>
        </div>
      )
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        paddingTop: '20px',
      }}
    >
      <div className="order-series-parameter-name display-flex">
        Origin Locations
        <div className="asterisk">*</div>
      </div>
      <div
        style={{
          border: '1px lightgray solid',
          borderRadius: '5px',
          width: '400px',
          height: 120,
          overflow: 'overlay',
        }}
      >
        {selectedReplenishmentType && checkBoxes}
      </div>
    </div>
  )
}
