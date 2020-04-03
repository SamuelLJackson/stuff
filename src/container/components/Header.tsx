import React from 'react'
import { LogoIcon } from '../../icons'
import packageJson from '../../../package.json'

export default () => {

  return (
    <div className="header">
      <div className="logo-icon white-background">
        <img className="grape-logo" src={LogoIcon} alt="logo icon" />
      </div>
      <h3 className="app-title" title={packageJson.version}>Order Series</h3>
    </div>
  )
}
