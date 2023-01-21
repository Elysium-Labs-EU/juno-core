import * as S from 'components/MainHeader/HeaderStyles'
import Navigation from 'components/MainHeader/Navigation/Navigation'
import { HEADER_TRASH } from 'constants/globalConstants'
import {
  selectActiveEmailListIndex,
  selectEmailList,
} from 'store/emailListSlice'
import { useAppSelector } from 'store/hooks'
import * as GS from 'styles/globalStyles'
import getEmailListTimeStamp from 'utils/getEmailListTimeStamp'

const INFORMATION_MESSAGE =
  'Messages that have been in the Bin for more than 30 days will be deleted automatically.'

const TrashHeader = () => {
  const emailList = useAppSelector(selectEmailList)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)

  return (
    <GS.OuterContainer>
      <S.NavContainer>
        <S.HeaderCenter>
          <S.PageTitle
            title={getEmailListTimeStamp(emailList, activeEmailListIndex)}
          >
            {HEADER_TRASH}
          </S.PageTitle>
        </S.HeaderCenter>
        <Navigation />
      </S.NavContainer>
      <S.HeaderCenter>
        <GS.P small muted>
          {INFORMATION_MESSAGE}
        </GS.P>
      </S.HeaderCenter>
    </GS.OuterContainer>
  )
}

export default TrashHeader
