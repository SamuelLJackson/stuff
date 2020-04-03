import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Ordering from './components/ordering'
import Basic from './components/basic_information'
import ACTIONS from './store/actions'
import PageContainer from '../../common/PageContainer'

export default () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ACTIONS.setGrayOverlayDisplay())
    dispatch(ACTIONS.requestLookups())
  }, [dispatch])

  return (
    <PageContainer active={'Create'} previous={['Home']} isBase={false}>
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '5px',
          marginLeft: '20px',
          marginRight: '20px',
          display: 'flex',
          flexDirection: window.innerWidth > 1200 ? 'row' : 'column',
          overflow: 'overlay',
        }}
      >
        <Basic />
        <Ordering />
      </div>
    </PageContainer>
  )
}
