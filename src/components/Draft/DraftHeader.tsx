import Navigation from '../MainHeader/Navigation/Navigation'
import * as local from '../../constants/draftConstants'
import * as S from '../MainHeader/HeaderStyles'
import * as GS from '../../styles/globalStyles'
import { useAppSelector } from '../../store/hooks'
import { selectEmailList, selectActiveEmailListIndex } from '../../store/emailListSlice'
import getEmailListTimeStamp from '../../utils/getEmailListTimeStamp'

const InboxHeader = () => {
  const emailList = useAppSelector(selectEmailList)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)

  return (
    <GS.OuterContainer>
      <S.NavContainer>
        <S.HeaderCenter>
          <S.PageTitle title={getEmailListTimeStamp(emailList, activeEmailListIndex)}>{local.DRAFT_HEADER}</S.PageTitle>
        </S.HeaderCenter>
        <Navigation />
      </S.NavContainer>
    </GS.OuterContainer>
  )
}

export default InboxHeader
