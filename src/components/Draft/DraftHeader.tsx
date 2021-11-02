import React from 'react'
import Navigation from '../MainHeader/Navigation/Navigation'
import '../MainHeader/Navigation/Navigation.scss'
import * as local from '../../constants/draftConstants'
import * as S from '../MainHeader/HeaderStyles'
import BackButton from '../BackButton'
import * as GS from '../../styles/globalStyles'

const InboxHeader = () => (
  <GS.OuterContainer>
    <S.NavContainer>
      <BackButton />
      <div className="header-center">
        <h2 className="page_title">{local.DRAFT_HEADER}</h2>
      </div>
      <Navigation />
    </S.NavContainer>
  </GS.OuterContainer>
)

export default InboxHeader
