import * as S from 'components/MainHeader/HeaderStyles'
import Navigation from 'components/MainHeader/Navigation/Navigation'
import {
  selectActiveEmailListIndex,
  selectEmailList,
} from 'store/emailListSlice'
import { useAppSelector } from 'store/hooks'
import * as GS from 'styles/globalStyles'
import getEmailListTimeStamp from 'utils/getEmailListTimeStamp'

import * as InboxS from './InboxHeaderStyles'
import InboxRefreshOption from './InboxRefreshOption'
import InboxSortOption from './InboxSortOption'

const INBOX_HEADER = 'Inbox'

const InboxHeader = () => {
  const emailList = useAppSelector(selectEmailList)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)

  return (
    <GS.OuterContainer>
      <S.NavContainer>
        <S.HeaderCenter>
          <S.PageTitle
            title={getEmailListTimeStamp(emailList, activeEmailListIndex)}
          >
            {INBOX_HEADER}
          </S.PageTitle>
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
}

export default InboxHeader
