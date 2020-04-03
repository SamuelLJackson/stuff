import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ACTIONS from '../../store/actions'
import { Collapse } from 'reactstrap'
import { State } from '../../store/types'
import { BaseState } from '../../../../common/types'

export default () => {
  const stores = useSelector((state: BaseState) => state.create.stores)
  const selectedStores = useSelector(
    (state: BaseState) => state.create.selectedStores
  )
  const allStoresSelected = stores.length === Object.keys(selectedStores).length
  const showNoResult = useSelector(
    (state: BaseState) => state.create.showNoResult
  )
  const states = useSelector((state: BaseState) => state.create.states)
  const filteredStates = useSelector(
    (state: BaseState) => state.create.filteredStates
  )
  const collapseState = useSelector(
    (state: BaseState) => state.create.collapseState
  )
  const collapseAll = useSelector(
    (state: BaseState) => state.create.collapseAll
  )

  const dispatch = useDispatch()

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(ACTIONS.setStoreSearchInput(event.target.value))
    dispatch(ACTIONS.setCollapseAllStates(false))
  }

  let stateCheckboxes = []

  const compare = (a: State, b: State): number => {
    if (a.stateName < b.stateName) {
      return -1
    } else {
      return 1
    }
  }

  const sortedStates =
    filteredStates && filteredStates.length
      ? Object.values(filteredStates).sort(compare)
      : Object.values(states).sort(compare)

  for (let i = 0; i < sortedStates.length; ++i) {
    let { stateKey, stateName, stores } = sortedStates[i]
    let allStoresInStateSelected = true

    let storeCheckboxes = []
    for (let j = 0; j < stores.length; ++j) {
      const { storeKey, storeName } = stores[j]

      storeCheckboxes.push(
        <div
          key={`store${storeKey}`}
          style={{
            display: 'flex',
            paddingLeft: 20,
          }}
        >
          <input
            type="checkbox"
            id={`styled-checkbox-store-${storeKey}`}
            className="styled-checkbox"
            checked={selectedStores[storeKey] === true}
            onChange={() => dispatch(ACTIONS.selectStore(storeKey))}
          />
          <label htmlFor={`styled-checkbox-store-${storeKey}`}></label>
          <p style={{ fontWeight: 'bold' }}>{storeName}</p>
        </div>
      )

      if (selectedStores[storeKey] !== true) {
        allStoresInStateSelected = false
      }
    }

    let collapseSign = collapseState[i] ? ' - ' : ' + '

    stateCheckboxes.push(
        <div
          key={`state${stateKey}`}
          className='state-checkbox-row'
        >
          <input
            type="checkbox"
            id={`styled-checkbox-state-${stateKey}`}
            className="styled-checkbox"
            checked={allStoresInStateSelected}
            onChange={() => {
              if (allStoresInStateSelected) {
                dispatch(ACTIONS.unselectState(stateKey))
              } else {
                dispatch(ACTIONS.selectState(stateKey))
              }
            }}
          />
          <label htmlFor={`styled-checkbox-state-${stateKey}`}></label>
          <p
            style={{
              fontSize: '1.0rem',
              fontWeight: 'bold',
              marginRight: '3px',
              marginTop: '-3px',
            }}
          >
            {collapseSign}{' '}
          </p>
          <p
            className="collapse-sign"
            style={{ fontWeight: 'bold' }}
            onClick={() => dispatch(ACTIONS.setCollapseState(i))}
          >
            {stateName}
          </p>
          <Collapse isOpen={collapseState[i]}>{storeCheckboxes}</Collapse>
        </div>
    )
    storeCheckboxes = []
    storeCheckboxes.length = 0
  }

  return (
    <div
      style={{
        display: 'flex',
        paddingTop: '20px',
      }}
    >
      <div className="order-series-parameter-name display-flex">
        Stores
        <div className="asterisk">*</div>
      </div>
      <div>
        <div
          style={{
            display: 'flex',
            border: '1px lightgray solid',
            borderRadius: '5px',
            width: '400px',
          }}
        >
          <input
            className="order-series-input-text"
            maxLength={50}
            placeholder="Search Store..."
            onChange={handleOnInputChange}
          ></input>
        </div>
        <div
          style={{
            display: 'flex',
            border: '1px lightgray solid',
            borderRadius: '5px',
            width: '400px',
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
              id={`styled-checkbox-all-stores`}
              className="styled-checkbox"
              checked={allStoresSelected}
              onChange={() => {
                if (allStoresSelected) {
                  dispatch(ACTIONS.unselectAllStores())
                } else {
                  dispatch(ACTIONS.selectAllStores())
                }
              }}
            />
            <label htmlFor={`styled-checkbox-all-stores`}></label>
            <p style={{ fontWeight: 'bold' }}>All</p>
            <p
              className="collapse-sign"
              style={{ marginLeft: '210px' }}
              onClick={() =>
                dispatch(ACTIONS.setCollapseAllStates(!collapseAll))
              }
            >
              Expand/Collapse All
            </p>
          </div>
        </div>
        {!showNoResult && (
          <div
            id="storesContainer"
            style={{
              border: '1px lightgray solid',
              borderTop: 'none',
              borderRadius: '5px',
              width: '400px',
              height: window.innerHeight - 570,
              overflow: 'scroll',
            }}
          >
            {stateCheckboxes}
          </div>
        )}
        {showNoResult && (
          <div
            id="storesContainer"
            style={{
              border: '1px lightgray solid',
              borderTop: 'none',
              borderRadius: '5px',
              width: '400px',
              height: window.innerHeight - 550,
              overflow: 'scroll',
            }}
          ></div>
        )}
      </div>
    </div>
  )
}
