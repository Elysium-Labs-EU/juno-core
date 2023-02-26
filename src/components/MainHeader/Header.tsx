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
  const emailList = useAppSelector(selectEmailList)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)

  return (
    <OuterContainer
      position="sticky"
      style={{
        top: '0',
        left: '0',
        zIndex: 'var(--z-index-top-element)',
        backgroundColor: 'var(--color-neutral-100)',
      }}
    >
      <S.NavContainer>
        {showBackButton ? (
          <div style={{ position: 'relative', right: 'var(--spacing-2)' }}>
            <BackButton />
          </div>
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
