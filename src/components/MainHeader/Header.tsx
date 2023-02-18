import type { ILayout } from 'components/Layout/Layout'
import * as S from 'components/MainHeader/HeaderStyles';
import { selectActiveEmailListIndex, selectEmailList } from 'store/emailListSlice';
import { useAppSelector } from 'store/hooks';
import * as GS from 'styles/globalStyles';
import getEmailListTimeStamp from 'utils/getEmailListTimeStamp';

import Navigation from './Navigation/Navigation';

const Header = ({
  activePage,
  additionalHeader = undefined,
  headerTitle,
  showNavigation,
}: Omit<ILayout, 'children'>) => {
  const emailList = useAppSelector(selectEmailList)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)

  return (
    <GS.OuterContainer>
      <S.NavContainer>
        <div />
        <S.PageTitle
          title={getEmailListTimeStamp(emailList, activeEmailListIndex)}
        >
          {headerTitle}
        </S.PageTitle>
        {showNavigation ? <Navigation activePage={activePage} /> : null}
      </S.NavContainer>
      {additionalHeader}
    </GS.OuterContainer>
  )
}

export default Header
