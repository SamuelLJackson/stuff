import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import OPTION_BAR_ACTIONS from './components/option_bar/store/actions'
import CONTAINER_ACTIONS from '../../container/store/actions'
import { BaseState } from '../../common/types'
import OptionsBar from './components/option_bar'
import Grid from './components/grid'
import PageContainer from '../../common/PageContainer'
import { eventHandlers } from '../../common'

export default () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(OPTION_BAR_ACTIONS.requestAllOrderSeries())
    
    dispatch(CONTAINER_ACTIONS.checkPermissions())

    dispatch(CONTAINER_ACTIONS.resetApp())

    eventHandlers.resizeGridOnZoom()
  }, [dispatch])

  const showTable = useSelector((state: BaseState) => state.home.grid.showTable)
  
  return (
    <PageContainer active={'Home'} isBase={true}>
      <OptionsBar />
      {
        showTable
        &&
        <Grid />
      }
    </PageContainer>
  )
}
