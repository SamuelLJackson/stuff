import React from 'react'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import { filters as commonFilters } from '../../../../common'
import { BaseState } from '../../../../common/types'
import { FilterProps } from './store/types'
import { Filter } from 'react-table'
import { RequestType } from '../../../../common/types'

const RequestTypeSelect = (props: FilterProps) => {
  const requestTypes = useSelector(
    (state: BaseState) => state.create.requestTypes
  )
  const { filter, onChange } = props

  return (
    <Select
      value={filter ? filter.value : null}
      isMulti
      options={requestTypes.map((type: RequestType) => ({
        value: type.key,
        label: type.name,
      }))}
      onChange={type => onChange(type)}
    />
  )
}

const requestType = (props: FilterProps) => (
  <RequestTypeSelect filter={props.filter} onChange={props.onChange} />
)

const yesOrNoMethod = (filter: Filter, row: any) => {
  if (filter.value === 'all') {
    return true
  } else {
    return String(row[filter.id]) === filter.value
  }
}

const matchTradingPartner = (filter: Filter, row: any) => {
  return row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
}

export default {
  ...commonFilters,
  requestType,
  yesOrNoMethod,
  matchTradingPartner,
}
