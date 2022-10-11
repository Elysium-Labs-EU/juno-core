import format from 'date-fns/format'
import Navigation from '../MainHeader/Navigation/Navigation'
import * as local from '../../constants/draftConstants'
import * as S from '../MainHeader/HeaderStyles'
import * as GS from '../../styles/globalStyles'
import { useAppSelector } from '../../store/hooks'
import { selectIsFlexibleFlowActive } from '../../store/utilsSlice'
import { selectEmailList,selectActiveEmailListIndex } from '../../store/emailListSlice'

const InboxHeader = () => {
  const emailList = useAppSelector(selectEmailList)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  const timeStamp = emailList[activeEmailListIndex]?.timestamp 
  let unixTimeStamp
  if (timeStamp !== undefined){
  unixTimeStamp = format(timeStamp,"dd mm yyyy")
  }
  return(
  <GS.OuterContainer>
    <S.NavContainer>
      <S.HeaderCenter>
        <S.PageTitle title={unixTimeStamp}>{local.DRAFT_HEADER}</S.PageTitle>
      </S.HeaderCenter>
      <Navigation />
    </S.NavContainer>
  </GS.OuterContainer>
  )
}

export default InboxHeader
