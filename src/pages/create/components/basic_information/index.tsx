import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-select'
import Stores from './Stores'
import OriginLocations from './OriginLocations'
import ACTIONS from '../../store/actions'
import { BaseState } from '../../../../common/types'

export default () => {
  const name = useSelector((state: BaseState) => state.create.name)
  const selectedReplenishmentType = useSelector(
    (state: BaseState) => state.create.selectedReplenishmentType
  )
  const replenishmentTypes = useSelector(
    (state: BaseState) => state.create.replenishmentTypes
  )

  const dispatch = useDispatch()

  return (
    <div
      style={{
        float: 'left',
        marginLeft: '10px',
        marginTop: '10px',
      }}
    >
      <div style={{ display: 'flex' }}>
        <h4>Basic Information</h4>
      </div>
      <div
        style={{
          display: 'flex',
          paddingTop: '20px',
        }}
      >
        <div className="order-series-parameter-name display-flex">
          Order Series Name<div className="asterisk">*</div>
        </div>
        <input
          className="order-series-input-text"
          maxLength={50}
          placeholder="Enter name..."
          value={name}
          onChange={event => dispatch(ACTIONS.setName(event.target.value))}
        />
      </div>
      <div
        style={{
          display: 'flex',
          paddingTop: '20px',
        }}
      >
        <div className="order-series-parameter-name display-flex">
          Replenishment Type<div className="asterisk">*</div>
        </div>
        <Select
          className="order-series-select"
          options={replenishmentTypes
            .filter((type: any) => type.replenishmentTypeKey !== 3)
            .map((type: any) => ({
              value: type.replenishmentTypeKey,
              label: type.name,
            }))}
          value={selectedReplenishmentType}
          onChange={(type: any) => dispatch(ACTIONS.setReplenishmentType(type))}
        />
      </div>
      <OriginLocations />
      <Stores />
      <div
        style={{
          fontWeight: 'bold',
          display: 'flex',
          marginBottom: 0,
        }}
      >
        <div className="asterisk">*</div>
        required fields
      </div>
    </div>
  )
}
