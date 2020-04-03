import React, { ReactNode } from 'react'
import packageJson from '../../../package.json'

type CacheBusterProps = {
  children: (cacheState: CacheBusterState) => ReactNode
}

interface CacheBusterState {
  isLoading: boolean
  isStale: boolean
  refreshCacheAndReload: Function
}

export default class CacheBuster extends React.Component<
  CacheBusterProps,
  CacheBusterState
> {
  constructor(props: CacheBusterProps) {
    super(props)
    this.state = {
      isLoading: true,
      isStale: true,
      refreshCacheAndReload: () => {
        console.log('Clearing cache and hard reloading...')
        if (caches) {
          caches.keys().then(names => {
            for (let name of names) {
              caches.delete(name)
            }
          })
        }

        window.location.reload(true)
      },
    }
  }

  componentDidMount() {
    fetch('./meta.json')
      .then(response => response.json())
      .then(meta => {
        const latest = meta.version
        const current = packageJson.version

        const shouldForceRefresh = semanticVersionGreaterThan(latest, current)
        if (shouldForceRefresh) {
          console.log(`We have a new version - ${latest}. Should force refresh`)
          alert(`clearing app cache latest: ${latest}, current: ${current}`)
          this.setState({ isLoading: false, isStale: true })
        } else {
          console.log(
            `You already have the latest version - ${latest}. No cache refresh needed`
          )
          this.setState({ isLoading: false, isStale: false })
        }
      })
  }

  render() {
    const { isLoading, isStale, refreshCacheAndReload } = this.state

    return this.props.children({ isLoading, isStale, refreshCacheAndReload })
  }
}

const semanticVersionGreaterThan = (versionA: string, versionB: string) => {
  const versionsA = versionA.split(/\./g)

  const versionsB = versionB.split(/\./g)
  while (versionsA.length || versionsB.length) {
    const a = Number(versionsA.shift())

    const b = Number(versionsB.shift())

    if (a === b) continue

    return a > b || isNaN(b)
  }

  return false
}
