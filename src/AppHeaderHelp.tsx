import StyledTooltip from 'components/Elements/StyledTooltip'
import HelpMenu from 'components/Help/HelpMenu'
import Header from 'components/MainHeader/Header'
import * as GS from 'styles/globalStyles'

const BUTTON_TITLE = 'Feedback and help'

const AppHeaderHelp = () => (
  <>
    <GS.OuterContainer>
      <Header data-test-id="header" />
    </GS.OuterContainer>
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
  </>
)

export default AppHeaderHelp
