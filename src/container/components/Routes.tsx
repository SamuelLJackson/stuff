import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import Create from '../../pages/create'
import ReviewAndRun from '../../pages/review_and_run'
import Home from '../../pages/home'
import UpdateShippingRoute from '../../pages/upload'
import Error from './Error'
import ACTIONS from '../store/actions'

export default () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ACTIONS.resetApp())

    const browserIsNotChrome = !window.browser.startsWith('Chrome')
    if (browserIsNotChrome) {
      dispatch(
        ACTIONS.setError({
          message: 'Browser Error',
          stack: 'This application is only supported by Chrome',
          innerMessage: 'Please open the application with Chrome.',
          backTo: 'Home'
        })
      )
    }
  }, [dispatch])

  return (
      <Switch>
        <Route path={`${window.appName}/create`} component={Create} />
        <Route path={`${window.appName}/reviewAndRun`} component={ReviewAndRun} />
        <Route path={`${window.appName}/home`} component={Home} />
        <Route path={`${window.appName}/updateShippingRoute`} component={UpdateShippingRoute} />

        <Route path={`${window.appName}/error`} component={Error} />

        <Redirect from={`${window.appName}/`} to={`${window.appName}/home`} />
      </Switch>
  )
}
