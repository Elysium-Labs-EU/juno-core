import React from 'react'
import Navigation from '../MainHeader/Navigation/Navigation'
import SpamClearOption from './SpamClearOption'
import * as GS from '../../styles/globalStyles'
import * as S from '../MainHeader/HeaderStyles'

const SPAM_HEADER = 'Spam'

const SpamHeader = () => (
  <GS.OuterContainer>
    <S.NavContainer>
      <S.HeaderCenter>
        <S.PageTitle>{SPAM_HEADER}</S.PageTitle>
      </S.HeaderCenter>
      <Navigation />
    </S.NavContainer>
    <SpamClearOption />
  </GS.OuterContainer>
)

export default SpamHeader
