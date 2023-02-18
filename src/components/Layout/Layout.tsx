import CommandPalette from 'components/CommandPalette/CommandPalette'
import Seo from 'components/Elements/Seo'
import StyledTooltip from 'components/Elements/StyledTooltip'
import Feedback from 'components/Help/Feedback/Feedback'
import HelpMenu from 'components/Help/HelpMenu'
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
import * as GS from 'styles/globalStyles'
import AnimatedMountUnmount from 'utils/animatedMountUnmount'

const BUTTON_TITLE = 'Feedback and help'

export interface ILayout {
  activePage: global.TActivePageHeader | undefined
  additionalHeader?: JSX.Element | Array<JSX.Element> | undefined
  children: JSX.Element | Array<JSX.Element>
  headerTitle: string
  showNavigation?: boolean
}

const Layout = ({
  activePage,
  additionalHeader = undefined,
  children,
  headerTitle,
  showNavigation = true,
}: ILayout) => {
  const activeModal = useAppSelector(selectActiveModal)
  return (
    <GS.Base>
      {global.ACTIVE_MODAL_MAP.feedback === activeModal && <Feedback />}
      {global.ACTIVE_MODAL_MAP.intro === activeModal && <Introduction />}
      {global.ACTIVE_MODAL_MAP.keyboard === activeModal && <KeyboardCombos />}
      {global.ACTIVE_MODAL_MAP.settings === activeModal && <Settings />}

      <Header
        activePage={activePage}
        additionalHeader={additionalHeader}
        headerTitle={headerTitle}
        showNavigation={showNavigation}
      />
      <CommandPalette />
      <NoMobileOverlay />
      <SendingBanner />
      <Seo title={headerTitle} />
      <SnackbarOrchestrator />

      <AnimatedMountUnmount>{children}</AnimatedMountUnmount>

      <div
        style={{
          bottom: '80px',
          position: 'fixed',
          right: '60px',
          zIndex: 'var(--z-index-popover)',
        }}
      >
        <StyledTooltip title={BUTTON_TITLE}>
          <div>
            <HelpMenu />
          </div>
        </StyledTooltip>
      </div>
    </GS.Base>
  )
}

export default Layout
