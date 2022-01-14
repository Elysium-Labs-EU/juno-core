import React from 'react'
import Navigation from '../MainHeader/Navigation/Navigation'
import InboxSortOption from './InboxSortOption'
import InboxRefreshOption from './InboxRefreshOption'
import '../MainHeader/Navigation/Navigation.scss'
import * as S from '../MainHeader/HeaderStyles'
import * as InboxS from './InboxHeaderStyles'
import * as GS from '../../styles/globalStyles'

const INBOX_HEADER = 'Inbox'

const InboxHeader = () => (
  <GS.OuterContainer>
    <S.NavContainer>
      <S.HeaderCenter>
        <S.PageTitle>{INBOX_HEADER}</S.PageTitle>
      </S.HeaderCenter>
      <Navigation />
    </S.NavContainer>
    <InboxS.OptionsContainer>
      <div />
      <InboxS.SortOptionWrapper>
        <InboxSortOption />
      </InboxS.SortOptionWrapper>
      <InboxS.RefreshOptionWrapper>
        <InboxRefreshOption />
      </InboxS.RefreshOptionWrapper>
    </InboxS.OptionsContainer>
  </GS.OuterContainer>
)

export default InboxHeader
