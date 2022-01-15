import React from 'react'
import Navigation from '../MainHeader/Navigation/Navigation'
import * as local from '../../constants/draftConstants'
import * as S from '../MainHeader/HeaderStyles'
import * as GS from '../../styles/globalStyles'

const InboxHeader = () => (
  <GS.OuterContainer>
    <S.NavContainer>
      <S.HeaderCenter>
        <S.PageTitle>{local.DRAFT_HEADER}</S.PageTitle>
      </S.HeaderCenter>
      <Navigation />
    </S.NavContainer>
  </GS.OuterContainer>
)

export default InboxHeader
