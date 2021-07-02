import React from 'react'
import BackButton from '../BackButton'
import NavControls from '../MainHeader/Navigation/NavControls'
import '../MainHeader/Navigation/NavControls.scss'
import * as local from '../../constants/composeEmailConstants'

const ComposeHeader = () => {
  return (
    <div className="tlOuterContainer">
      <div className="nav-container">
        <BackButton />
        <div className="header-center">
          <h2>{local.COMPOSE}</h2>
        </div>
        <NavControls />
      </div>
    </div>
  )
}

export default ComposeHeader
