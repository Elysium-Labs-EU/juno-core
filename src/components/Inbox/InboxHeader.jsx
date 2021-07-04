import React from 'react'
import NavControls from '../MainHeader/Navigation/NavControls'
import InboxSortOption from './InboxSortOption'
import '../MainHeader/Navigation/NavControls.scss'
import * as S from '../MainHeader/HeaderStyles'
import BackButton from '../BackButton'

const INBOX_HEADER = 'Inbox'

const InboxHeader = () => {
  return (
    <div className="tlOuterContainer">
      <S.NavContainer>
        <S.BackButtonContainer>
          <BackButton />
        </S.BackButtonContainer>
        <div className="header-center">
          <h2>{INBOX_HEADER}</h2>
        </div>
        <NavControls />
      </S.NavContainer>
      <InboxSortOption />
    </div>
  )
}

export default InboxHeader
