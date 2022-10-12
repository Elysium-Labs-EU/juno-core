import Navigation from '../MainHeader/Navigation/Navigation'
import SpamClearOption from './SpamClearOption'
import * as GS from '../../styles/globalStyles'
import * as S from '../MainHeader/HeaderStyles'
import { useAppSelector } from '../../store/hooks'
import { selectEmailList,selectActiveEmailListIndex } from '../../store/emailListSlice'
import getEmailListTimeStamp from '../../utils/getEmailListTimeStamp'

const SPAM_HEADER = 'Spam'

const SpamHeader = () => {
  const emailList = useAppSelector(selectEmailList)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  
  return(
  <GS.OuterContainer>
    <S.NavContainer>
      <S.HeaderCenter>
        <S.PageTitle title={getEmailListTimeStamp(emailList,activeEmailListIndex)}>{SPAM_HEADER}</S.PageTitle>
      </S.HeaderCenter>
      <Navigation />
    </S.NavContainer>
    <SpamClearOption />
  </GS.OuterContainer>
)}

export default SpamHeader
