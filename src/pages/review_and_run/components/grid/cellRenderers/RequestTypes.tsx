import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ACTIONS from '../store/actions'
import { CellRenderProps, OrderSeriesDetail } from '../store/types'
import { BaseState } from '../../../../../common/types'
import { SelectOption, RequestType } from '../../../../../common/types'

export default (props: CellRenderProps) => {
  const {
    column: { id },
    original: { tradingPartnerLocationKey },
    row: { storeKey },
    value,
  } = props.cellInfo

  const dispatch = useDispatch()

  const rowId = `${tradingPartnerLocationKey}-${storeKey}`

  const valueArray = value.split(',')

  const requestTypesOptions: SelectOption[] = useSelector(
    (state: BaseState) => state.reviewAndRun.grid.requestTypes
  ).map((type: RequestType) => ({
    value: type.key,
    label: type.abbreviation,
  }))

  const updateDisplayRemoveValue = (abbreviation: string) => {
    const inputs: any = document.getElementsByClassName('selected-requestTypes')
    for (let i=0; i<inputs.length; ++i) {
      for(let j=0; j<inputs[i].childNodes[0].childNodes[0].childNodes.length; ++j) {
        let currentName = inputs[i].childNodes[0].childNodes[0].childNodes[j].getAttribute('id').split('-')[2]
        if(abbreviation === currentName) {
          inputs[i].childNodes[0].childNodes[0].childNodes[j].style.display = 'none'
        }
      }
      for(let k=0; k<inputs[i].childNodes[1].childNodes.length; ++k) {
        let currentName = inputs[i].childNodes[1].childNodes[k].getAttribute('id').split('-')[2]
        if(abbreviation === currentName) {
          inputs[i].childNodes[1].childNodes[k].style.display = 'block'
        }
      }
    }

    const sameStoreRows: any = document.getElementsByClassName(`${storeKey}-requestTypes`)
    for (let i=0; i<sameStoreRows.length; ++i) {
      for(let j=0; j<sameStoreRows[i].childNodes[0].childNodes[0].childNodes.length; ++j) {
        let currentName = sameStoreRows[i].childNodes[0].childNodes[0].childNodes[j].getAttribute('id').split('-')[2]
        if(abbreviation === currentName) {
          sameStoreRows[i].childNodes[0].childNodes[0].childNodes[j].style.display = 'none'
        }
      }
      for(let k=0; k<sameStoreRows[i].childNodes[1].childNodes.length; ++k) {
        let currentName = sameStoreRows[i].childNodes[1].childNodes[k].getAttribute('id').split('-')[2]
        if(abbreviation === currentName) {
          sameStoreRows[i].childNodes[1].childNodes[k].style.display = 'block'
        }
      }
    }
  }

  const updateDisplayAddValue = (abbreviation: string) => {
    const inputs: any = document.getElementsByClassName('selected-requestTypes')
    for (let i=0; i<inputs.length; ++i) {
      for(let j=0; j<inputs[i].childNodes[1].childNodes.length; ++j) {
        let currentName = inputs[i].childNodes[1].childNodes[j].getAttribute('id').split('-')[2]
        if(abbreviation === currentName) {
          inputs[i].childNodes[1].childNodes[j].style.display = 'none'
        }
      }

      for(let k=0; k<inputs[i].childNodes[0].childNodes[0].childNodes.length; ++k) {
        let currentName = inputs[i].childNodes[0].childNodes[0].childNodes[k].getAttribute('id').split('-')[2]
        if(abbreviation === currentName) {
          inputs[i].childNodes[0].childNodes[0].childNodes[k].style.display = 'inherit'
        }
      }
    }    

    const sameStoreRows: any = document.getElementsByClassName(`${storeKey}-requestTypes`)
    for (let i=0; i<sameStoreRows.length; ++i) {
      for(let j=0; j<sameStoreRows[i].childNodes[1].childNodes.length; ++j) {
        let currentName = sameStoreRows[i].childNodes[1].childNodes[j].getAttribute('id').split('-')[2]
        if(abbreviation === currentName) {
          sameStoreRows[i].childNodes[1].childNodes[j].style.display = 'none'
        }
      }

      for(let k=0; k<sameStoreRows[i].childNodes[0].childNodes[0].childNodes.length; ++k) {
        let currentName = sameStoreRows[i].childNodes[0].childNodes[0].childNodes[k].getAttribute('id').split('-')[2]
        if(abbreviation === currentName) {
          sameStoreRows[i].childNodes[0].childNodes[0].childNodes[k].style.display = 'inherit'
        }
      }
    }  
  }

  const updateDisplayRemoveAllValues = () => {
    const inputs: any = document.getElementsByClassName('selected-requestTypes')
    for (let i=0; i<inputs.length; ++i) {
      for(let j=0; j<inputs[i].childNodes[0].childNodes[0].childNodes.length; ++j) {
        inputs[i].childNodes[0].childNodes[0].childNodes[j].style.display = 'none'
      }
      for(let k=0; k<inputs[i].childNodes[1].childNodes.length; ++k) {
        inputs[i].childNodes[1].childNodes[k].style.display = 'block'
      }
    }

    const sameStoreRows: any = document.getElementsByClassName(`${storeKey}-requestTypes`)
    for (let i=0; i<sameStoreRows.length; ++i) {
      for(let j=0; j<sameStoreRows[i].childNodes[0].childNodes[0].childNodes.length; ++j) {
        sameStoreRows[i].childNodes[0].childNodes[0].childNodes[j].style.display = 'none'
      }
      for(let k=0; k<sameStoreRows[i].childNodes[1].childNodes.length; ++k) {
        sameStoreRows[i].childNodes[1].childNodes[k].style.display = 'block'
      }
    }
  }

  const getCurrentSelection = (): string => {   

    const multiSelect: any = document.getElementById(`requestTypes${rowId}`)
    let selection = ''
    for(let i=0; i<multiSelect.childNodes[0].childNodes[0].childNodes.length; ++i) {
      if (multiSelect.childNodes[0].childNodes[0].childNodes[i].style.display !== 'none') {
        let sections = multiSelect.childNodes[0].childNodes[0].childNodes[i].getAttribute('id').split('-')
        selection += sections[2] + ','
      }
    }
    return selection
  }

  const toggleOptionDisplay = () => {
    const optionsPanel: any = document.getElementById(`requestTypesOptions${rowId}`)
    if (optionsPanel.style.display === 'none' || optionsPanel.style.display === undefined || optionsPanel.style.display === null || optionsPanel.style.display === '') {
      optionsPanel.style.display = 'block'
    } else {
      optionsPanel.style.display = 'none'
    }
  }

  const suggestionsHTML = []
  for (let i=0; i<requestTypesOptions.length; ++i) {
    const abbreviation = requestTypesOptions[i].label
    const selectValueId = `requestTypeSuggestion${rowId}-${abbreviation}`
    suggestionsHTML.push(
      <div 
        id={selectValueId} 
        className='multi-select-suggestion'
        style={{display: valueArray.includes(abbreviation) ? 'none' : 'inherit'}}
        onClick={() => {
          updateDisplayAddValue(abbreviation)

          dispatch(
            ACTIONS.bulkUpdateSelectedRows(
              id as keyof OrderSeriesDetail,
              getCurrentSelection(),
            )
          )
        }}
      >
        {abbreviation}
      </div>
    )
  }
  
  const options = []
  for(let i=0; i<requestTypesOptions.length; ++i) {
    const abbreviation = requestTypesOptions[i].label
    const selectValueId = `requestTypeValue${rowId}-${abbreviation}`
    
    options.push(
      <div id={selectValueId} className='multi-select-value'
        style={{display: valueArray.includes(abbreviation) ? 'inherit' : 'none'}}>
        {abbreviation}
        <div 
          className='multi-select-x' 
          onClick={() => {
            updateDisplayRemoveValue(abbreviation)

            dispatch(
              ACTIONS.bulkUpdateSelectedRows(
                id as keyof OrderSeriesDetail,
                getCurrentSelection(),
              )
            )
          }}
        >
          <svg height="14" width="14" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-19bqh2r">
            <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
          </svg>
        </div>
      </div>
    )
  }
  return (
    <div id={`requestTypes${rowId}`} className={`multi-select-container ${storeKey}-requestTypes heyyyyyyyyy`} style={{height: '40px'}}>
      <div style={{height: '40px'}}>
        <div style={{display: 'flex', float: 'left'}}>{options}</div>
        <div 
          aria-hidden="true" 
          className="select__indicator select__dropdown-indicator css-tlfecz-indicatorContainer multi-select-x"
          style={{float: 'right', borderLeft: '1px solid black', marginLeft: '10px', padding: '3px', cursor: 'pointer'}}
          onClick={() => toggleOptionDisplay()}
        >
          <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-tj5bde-Svg">
            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
          </svg>
        </div>
        <div 
          aria-hidden="true" 
          className="select__indicator select__clear-indicator css-tlfecz-indicatorContainer multi-select-x"
          style={{float: 'right'}}
          onClick={() => {
            updateDisplayRemoveAllValues()

            dispatch(
              ACTIONS.bulkUpdateSelectedRows(
                id as keyof OrderSeriesDetail,
                getCurrentSelection(),
              )
            )
          }}
        >
          <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-tj5bde-Svg">
            <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
          </svg>
        </div>
      </div>
      <div className='multi-select-suggestions' id={`requestTypesOptions${rowId}`}>
        {suggestionsHTML}
      </div>

    </div>
  )
}
