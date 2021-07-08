import React from 'react'
import NavControls from '../MainHeader/Navigation/NavControls'
import SpamClearOption from './SpamClearOption'
import * as GS from '../../styles/globalStyles'

const SPAM_HEADER = 'Spam'

const SpamHeader = () => {
  return (
    <GS.OuterContainer>
      <div className="nav-container">
        <div className="header-center">
          <h2>{SPAM_HEADER}</h2>
        </div>
        <NavControls />
      </div>
      <SpamClearOption />
    </GS.OuterContainer>
  )
}

export default SpamHeader
