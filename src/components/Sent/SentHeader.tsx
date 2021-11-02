import React from 'react'
import Navigation from '../MainHeader/Navigation/Navigation'
import * as S from '../MainHeader/HeaderStyles'
import * as GS from '../../styles/globalStyles'
import BackButton from '../BackButton'

const SENT_HEADER = 'Sent'

const SentHeader = () => (
  <GS.OuterContainer>
    <S.NavContainer>
      <BackButton />
      <div className="header-center">
        <h2 className="page_title">{SENT_HEADER}</h2>
      </div>
      <Navigation />
    </S.NavContainer>
  </GS.OuterContainer>
)

export default SentHeader
