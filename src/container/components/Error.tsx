import React from 'react'
import { useSelector } from 'react-redux'
import { BaseState } from '../../common/types'
import PageContainer from '../../common/PageContainer'

export default () => {
  const error = useSelector((state: BaseState) => state.container.error)
  let message = 'Client Error'
  let stack = 'check the console for message'
  let innerMessage = ''
  let backTo = 'Home'

  if (error.stack !== '') {
    message = error.message
    stack = error.stack
    innerMessage = error.innerMessage
    backTo = error.backTo
  }

  return (
    <PageContainer active={'Error'} previous={[backTo]} isBase={false}>
      <h1 style={{marginLeft: 30}}>{message}</h1>
      <p style={{marginLeft: 30}}>{stack}</p>
      <p style={{marginLeft: 30}}>{innerMessage}</p>
    </PageContainer>    
  )
}
