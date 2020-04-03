import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from 'reactstrap'
import { constants } from '../../common'
import { BaseState } from '../../common/types'

export default () => {
  const isLoading = useSelector((state: BaseState) => state.reviewAndRun.grid.isLoading)
  const loadingType = useSelector(
    (state: BaseState) => state.reviewAndRun.grid.loadingType
  )
  if (isLoading) {
    return (
      <div>
        <Spinner className="loading-spinner" color="primary" />
        <div className="loading-text">
          {constants.LoadingMessages[loadingType]}
        </div>
      </div>
    )
  } else {
    return null
  }
}
