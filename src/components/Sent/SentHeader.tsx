import * as S from 'components/MainHeader/HeaderStyles'
import Navigation from 'components/MainHeader/Navigation/Navigation'
import { HEADER_SENT } from 'constants/globalConstants'
import {
  selectActiveEmailListIndex,
  selectEmailList,
} from 'store/emailListSlice'
import { useAppSelector } from 'store/hooks'
import * as GS from 'styles/globalStyles'
import getEmailListTimeStamp from 'utils/getEmailListTimeStamp'

const SentHeader = () => {
  const emailList = useAppSelector(selectEmailList)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)

  return (
    <GS.OuterContainer>
      <S.NavContainer>
        <S.HeaderCenter>
          <S.PageTitle
            title={getEmailListTimeStamp(emailList, activeEmailListIndex)}
          >
            {HEADER_SENT}
          </S.PageTitle>
        </S.HeaderCenter>
        <Navigation />
      </S.NavContainer>
    </GS.OuterContainer>
  )
}

export default SentHeader
