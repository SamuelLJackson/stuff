import React from 'react'
import { useSelector } from 'react-redux'
import { BaseState } from '../../../../../common/types'
import { CellRenderProps } from '../store/types'
import { OriginLocation } from '../../../../../common/types'

export default (props: CellRenderProps) => {
  const {
    cellInfo: { value },
  } = props

  var originLocations = useSelector(
    (state: BaseState) => state.reviewAndRun.grid.originLocations
  )
  let originName = ''
  const selectedOrigin = originLocations.filter(
    (o: OriginLocation) => o.locationKey === parseInt(value)
  )[0]

  if (selectedOrigin) {
    originName = selectedOrigin.name
  }

  return <div>{originName}</div>
}
