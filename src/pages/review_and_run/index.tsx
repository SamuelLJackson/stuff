import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Loading from './Loading'
import ACTIONS from './store/actions'
import Grid from './components/grid'
import ResultModal from './components/modals/ResultModal'
import AddStoreModal from './components/modals/AddStoreModal'
import PageContainer from '../../common/PageContainer'
import OrderCreationWarningModal from './components/modals/OrderCreationWarning'

export default () => {
  const dispatch = useDispatch()

  useEffect(() => {
    window.removeEventListener('beforeunload', () => {
      dispatch(ACTIONS.closeReviewSession())
    })
    window.addEventListener('beforeunload', () => {
      dispatch(ACTIONS.closeReviewSession())
    })
  }, [dispatch])

  return (
    <PageContainer active={'Review And Run'} previous={['Home']} isBase={false}>
      <Loading />
      <Grid />
      <ResultModal />
      <AddStoreModal />
      <OrderCreationWarningModal />
    </PageContainer>
  )
}
