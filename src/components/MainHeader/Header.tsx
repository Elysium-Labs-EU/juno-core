import BackButton from 'components/Elements/Buttons/BackButton'
import type { ILayout } from 'components/Layout/Layout'
import * as S from 'components/MainHeader/HeaderStyles'
import {
  selectActiveEmailListIndex,
  selectEmailList,
} from 'store/emailListSlice'
import { useAppSelector } from 'store/hooks'
import { OuterContainer } from 'styles/globalStyles'
import getEmailListTimeStamp from 'utils/getEmailListTimeStamp'

import Navigation from './Navigation/Navigation'

const Header = ({
  activePage,
  additionalHeader = undefined,
  headerTitle,
  showNavigation,
  showBackButton,
}: Omit<ILayout, 'children'>) => {
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  const emailList = useAppSelector(selectEmailList)

  return (
    <OuterContainer>
      <S.NavContainer>
        {showBackButton ? (
          <S.BackButtonContainer>
            <BackButton />
          </S.BackButtonContainer>
        ) : (
          <div />
        )}
        <S.PageTitle
          title={getEmailListTimeStamp(emailList, activeEmailListIndex)}
        >
          {headerTitle}
        </S.PageTitle>
        {showNavigation ? <Navigation activePage={activePage} /> : null}
      </S.NavContainer>
      {additionalHeader}
    </OuterContainer>
  )
}

export default Header
