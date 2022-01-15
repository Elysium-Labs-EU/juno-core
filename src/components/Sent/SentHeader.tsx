import React from 'react'
import Navigation from '../MainHeader/Navigation/Navigation'
import * as S from '../MainHeader/HeaderStyles'
import * as GS from '../../styles/globalStyles'

const SENT_HEADER = 'Sent'

const SentHeader = () => (
  <GS.OuterContainer>
    <S.NavContainer>
      <S.HeaderCenter>
        <S.PageTitle>{SENT_HEADER}</S.PageTitle>
      </S.HeaderCenter>
      <Navigation />
    </S.NavContainer>
  </GS.OuterContainer>
)

export default SentHeader
