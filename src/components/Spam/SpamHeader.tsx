import format from 'date-fns/format'
import Navigation from '../MainHeader/Navigation/Navigation'
import SpamClearOption from './SpamClearOption'
import * as GS from '../../styles/globalStyles'
import * as S from '../MainHeader/HeaderStyles'
import { useAppSelector } from '../../store/hooks'
import { selectEmailList,selectActiveEmailListIndex } from '../../store/emailListSlice'


const SPAM_HEADER = 'Spam'

const SpamHeader = () => {
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
        <S.PageTitle title={unixTimeStamp}>{SPAM_HEADER}</S.PageTitle>
      </S.HeaderCenter>
      <Navigation />
    </S.NavContainer>
    <SpamClearOption />
  </GS.OuterContainer>
)}

export default SpamHeader
