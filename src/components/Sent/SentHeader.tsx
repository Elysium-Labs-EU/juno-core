import React from 'react'
import Navigation from '../MainHeader/Navigation/Navigation'
import * as S from '../MainHeader/HeaderStyles'
import * as GS from '../../styles/globalStyles'

const SENT_HEADER = 'Sent'

const SentHeader = () => (
  <GS.OuterContainer>
    <S.NavContainer>
      <div className="header-center">
        <S.PageTitle>{SENT_HEADER}</S.PageTitle>
      </div>
      <Navigation />
    </S.NavContainer>
  </GS.OuterContainer>
)

export default SentHeader
