import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from 'reactstrap'
import { BaseState } from '../../common/types'

export default () => {
  const isLoading = useSelector((state: BaseState) => state.upload.isLoading)
  
  if (isLoading) {
    return (
      <div>
        <Spinner className="loading-spinner" color="primary" />
        <div className="loading-text">
          Processing Excel...
        </div>
      </div>
    )
  } else {
    return null
  }
}
