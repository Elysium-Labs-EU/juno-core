import React from 'react'
import Navigation from '../MainHeader/Navigation/Navigation'
import '../MainHeader/Navigation/Navigation.scss'
import * as local from '../../constants/draftConstants'
import * as S from '../MainHeader/HeaderStyles'
import * as GS from '../../styles/globalStyles'

const InboxHeader = () => (
  <GS.OuterContainer>
    <S.NavContainer>
      <div className="header-center">
        <S.PageTitle>{local.DRAFT_HEADER}</S.PageTitle>
      </div>
      <Navigation />
    </S.NavContainer>
  </GS.OuterContainer>
)

export default InboxHeader
