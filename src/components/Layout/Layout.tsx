import CommandPalette from 'components/CommandPalette/CommandPalette'
import AnimatedMountUnmount from 'components/Elements/AnimatedMountUnmount'
import Seo from 'components/Elements/Seo'
import StyledTooltip from 'components/Elements/StyledTooltip'
import Feedback from 'components/Help/Feedback/Feedback'
import HelpMenu from 'components/Help/HelpMenu'
import { HelpMenuContainer } from 'components/Help/HelpMenuStyles'
import KeyboardCombos from 'components/Help/KeyboardCombos/KeyboardCombos'
import Introduction from 'components/Introduction/Introduction'
import Header from 'components/MainHeader/Header'
import NoMobileOverlay from 'components/NoMobileOverlay/noMobileOverlay'
import SendingBanner from 'components/SendingBanner/SendingBanner'
import Settings from 'components/Settings/Settings'
import SnackbarOrchestrator from 'components/SnackbarOrchestrator/SnackbarOrchestrator'
import * as global from 'constants/globalConstants'
import { useAppSelector } from 'store/hooks'
import { selectActiveModal } from 'store/utilsSlice'
import { Base } from 'styles/globalStyles'

const BUTTON_TITLE = 'Feedback and help'

export interface ILayout {
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
}: ILayout) => {
  const activeModal = useAppSelector(selectActiveModal)
  return (
    <Base>
      {global.ACTIVE_MODAL_MAP.feedback === activeModal && <Feedback />}
      {global.ACTIVE_MODAL_MAP.intro === activeModal && <Introduction />}
      {global.ACTIVE_MODAL_MAP.keyboard === activeModal && <KeyboardCombos />}
      {global.ACTIVE_MODAL_MAP.settings === activeModal && <Settings />}

      <Header
        activePage={activePage}
        additionalHeader={additionalHeader}
        headerTitle={headerTitle}
        showNavigation={showNavigation}
        showBackButton={showBackButton}
      />
      <CommandPalette />
      <NoMobileOverlay />
      <SendingBanner />
      <Seo title={headerTitle} />
      <SnackbarOrchestrator />

      <AnimatedMountUnmount>{children}</AnimatedMountUnmount>

      <HelpMenuContainer>
        <StyledTooltip title={BUTTON_TITLE}>
          <div>
            <HelpMenu />
          </div>
        </StyledTooltip>
      </HelpMenuContainer>
    </Base>
  )
}

export default Layout
