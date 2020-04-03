import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import PersistedStore, {history} from './store/PersistedStore'
import AppContainer from './container'
import CacheBuster from './container/components/CacheBuster'
import 'react-table/react-table.css'
import 'react-day-picker/lib/style.css'
import { ConnectedRouter } from 'connected-react-router'

export default () => {
  return (
    <CacheBuster>
      {cacheInfo => {
        const { isLoading, isStale, refreshCacheAndReload } = cacheInfo

        if (isLoading) {
          return null
        } else if (isStale) {
          refreshCacheAndReload()
        }

        return (
          <ReduxProvider store={PersistedStore.getDefaultStore().store}>
            <ConnectedRouter history={history}>
              <AppContainer />
            </ConnectedRouter>
          </ReduxProvider>
        )
      }}
    </CacheBuster>
  )
}
