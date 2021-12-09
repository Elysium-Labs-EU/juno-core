import React from 'react'
import Navigation from '../MainHeader/Navigation/Navigation'
import SpamClearOption from './SpamClearOption'
import * as GS from '../../styles/globalStyles'
import * as S from '../MainHeader/HeaderStyles'

const SPAM_HEADER = 'Spam'

const SpamHeader = () => (
  <GS.OuterContainer>
    <div className="nav-container">
      <div className="header-center">
        <S.PageTitle>{SPAM_HEADER}</S.PageTitle>
      </div>
      <Navigation />
    </div>
    <SpamClearOption />
  </GS.OuterContainer>
)

export default SpamHeader
