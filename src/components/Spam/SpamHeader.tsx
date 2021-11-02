import React from 'react'
import Navigation from '../MainHeader/Navigation/Navigation'
import SpamClearOption from './SpamClearOption'
import * as GS from '../../styles/globalStyles'

const SPAM_HEADER = 'Spam'

const SpamHeader = () => (
  <GS.OuterContainer>
    <div className="nav-container">
      <div className="header-center">
        <h2 className="page_title">{SPAM_HEADER}</h2>
      </div>
      <Navigation />
    </div>
    <SpamClearOption />
  </GS.OuterContainer>
)

export default SpamHeader
