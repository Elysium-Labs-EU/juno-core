import React from 'react'
import Navigation from '../MainHeader/Navigation/Navigation'
import InboxSortOption from './InboxSortOption'
import '../MainHeader/Navigation/Navigation.scss'
import * as S from '../MainHeader/HeaderStyles'
import * as GS from '../../styles/globalStyles'
// import BackButton from '../BackButton'

const INBOX_HEADER = 'Inbox'

const InboxHeader = () => (
  <GS.OuterContainer>
    <S.NavContainer>
      {/* <S.BackButtonContainer>
          <BackButton />
        </S.BackButtonContainer> */}
      <div className="header-center">
        <h2 className="page_title">{INBOX_HEADER}</h2>
      </div>
      <Navigation />
    </S.NavContainer>
    <InboxSortOption />
  </GS.OuterContainer>
)

export default InboxHeader
