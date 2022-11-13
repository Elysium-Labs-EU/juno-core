import * as S from 'components/MainHeader/HeaderStyles'
import Navigation from 'components/MainHeader/Navigation/Navigation'
import {
  selectActiveEmailListIndex,
  selectEmailList,
} from 'store/emailListSlice'
import { useAppSelector } from 'store/hooks'
import * as GS from 'styles/globalStyles'
import getEmailListTimeStamp from 'utils/getEmailListTimeStamp'

import SpamClearOption from './SpamClearOption'

const SPAM_HEADER = 'Spam'

const SpamHeader = () => {
  const emailList = useAppSelector(selectEmailList)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)

  return (
    <GS.OuterContainer>
      <S.NavContainer>
        <S.HeaderCenter>
          <S.PageTitle
            title={getEmailListTimeStamp(emailList, activeEmailListIndex)}
          >
            {SPAM_HEADER}
          </S.PageTitle>
        </S.HeaderCenter>
        <Navigation />
      </S.NavContainer>
      <SpamClearOption />
    </GS.OuterContainer>
  )
}

export default SpamHeader
