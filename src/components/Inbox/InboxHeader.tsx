import Navigation from '../MainHeader/Navigation/Navigation'
import InboxSortOption from './InboxSortOption'
import InboxRefreshOption from './InboxRefreshOption'
import * as S from '../MainHeader/HeaderStyles'
import * as InboxS from './InboxHeaderStyles'
import * as GS from '../../styles/globalStyles'
import { useAppSelector } from '../../store/hooks'
import { selectEmailList,selectActiveEmailListIndex } from '../../store/emailListSlice'
import getEmailListTimeStamp from '../../utils/getEmailListTimeStamp'

const INBOX_HEADER = 'Inbox'

const InboxHeader = () => {
  const emailList = useAppSelector(selectEmailList)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  
  return (
    <GS.OuterContainer>
      <S.NavContainer>
        <S.HeaderCenter>
          <S.PageTitle title={getEmailListTimeStamp(emailList,activeEmailListIndex)}>{INBOX_HEADER}</S.PageTitle>
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
