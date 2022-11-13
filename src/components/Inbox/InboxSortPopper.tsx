import CustomIconButton from 'components/Elements/Buttons/CustomIconButton'
import StyledPopover from 'components/Elements/StyledPopover'
import { QiChevronDown } from 'images/svgIcons/quillIcons'

import InboxRefresh from './InboxRefreshOption'

// TODO: Add more options, such as preview latest 4 senders. Archive all, delete all

const InboxSortPopper = () => (
  <StyledPopover
    triggerButton={
      <CustomIconButton
        icon={<QiChevronDown />}
        onClick={() => {}}
        title="Show more options for inbox sorting"
      />
    }
  >
    <div style={{ display: 'flex', flexFlow: 'column' }}>
      <InboxRefresh showButtonLabel />
    </div>
  </StyledPopover>
)

export default InboxSortPopper
