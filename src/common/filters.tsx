import React from 'react'
import { Filter } from 'react-table'

const matchDate = (filter: Filter, row: any) => {
  if (typeof filter.value === 'string' && filter.value.length === 10) {
    const filterDate = new Date(row[filter.id]).setHours(12)
    const rowDate = new Date(filter.value).setHours(12)

    return filterDate === rowDate
  } else {
    return true
  }
}

const none = () => {
  return <div />
}

export default {
  matchDate,
  none,
}
