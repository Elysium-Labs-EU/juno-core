import AppWrapper from 'components/AppWrapper/AppWrapper'
import AnimatedMountUnmount from 'components/Elements/AnimatedMountUnmount'
import StyledTooltip from 'components/Elements/StyledTooltip'
import HelpMenu from 'components/Help/HelpMenu'
import { HelpMenuContainer } from 'components/Help/HelpMenuStyles'
import KeyboardCombos from 'components/Help/KeyboardCombos/KeyboardCombos'
import Introduction from 'components/Introduction/Introduction'
import Header from 'components/MainHeader/Header'
import Settings from 'components/Settings/Settings'
import * as global from 'constants/globalConstants'
import { useAppSelector } from 'store/hooks'
import { selectActiveModal } from 'store/utilsSlice'
import { Base } from 'styles/globalStyles'

const BUTTON_TITLE = 'Feedback and help'

export interface LayoutProps {
  activePage: global.TActivePageHeader | undefined
  additionalHeader?: JSX.Element | Array<JSX.Element> | undefined
  children: JSX.Element | Array<JSX.Element>
  headerTitle: string
  showBackButton?: boolean
  showNavigation?: boolean
}

const Layout = ({
  activePage,
  additionalHeader = undefined,
  children,
  headerTitle,
  showNavigation = true,
  showBackButton = false,
}: LayoutProps) => {
  const activeModal = useAppSelector(selectActiveModal)
  return (
    <AppWrapper headerTitle={headerTitle}>
      <Base>
        {global.ACTIVE_MODAL_MAP.intro === activeModal ? (
          <Introduction />
        ) : null}
        {global.ACTIVE_MODAL_MAP.keyboard === activeModal ? (
          <KeyboardCombos />
        ) : null}
        {global.ACTIVE_MODAL_MAP.settings === activeModal ? <Settings /> : null}

        <Header
          activePage={activePage}
          additionalHeader={additionalHeader}
          headerTitle={headerTitle}
          showNavigation={showNavigation}
          showBackButton={showBackButton}
        />

        <AnimatedMountUnmount>{children}</AnimatedMountUnmount>

        <HelpMenuContainer>
          <StyledTooltip title={BUTTON_TITLE}>
            <div>
              <HelpMenu />
            </div>
          </StyledTooltip>
        </HelpMenuContainer>
      </Base>
    </AppWrapper>
  )
}

export default Layout
