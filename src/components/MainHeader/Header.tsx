import ArchiveHeader from 'components/Archive/ArchiveHeader'
import CommandPallette from 'components/CommandPalette/CommandPalette'
import ComposeHeader from 'components/Compose/ComposeHeader'
import DraftHeader from 'components/Draft/DraftHeader'
import Feedback from 'components/Help/Feedback/Feedback'
import KeyboardCombos from 'components/Help/KeyboardCombos/KeyboardCombos'
import InboxHeader from 'components/Inbox/InboxHeader'
import Introduction from 'components/Introduction/Introduction'
import NoMobileOverlay from 'components/NoMobileOverlay/noMobileOverlay'
import SentHeader from 'components/Sent/SentHeader'
import Settings from 'components/Settings/Settings'
import SpamHeader from 'components/Spam/SpamHeader'
import TodoHeader from 'components/ToDo/TodoHeader'
import * as global from 'constants/globalConstants'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'
import { selectActiveModal } from 'store/utilsSlice'

const SetHeader = () => {
  const location = useLocation()

  // The email detail header is coming from EmailDetail.
  if (location.pathname === '/inbox') {
    return <InboxHeader />
  }
  if (location.pathname === '/') {
    return <TodoHeader />
  }
  if (location.pathname.includes('/compose')) {
    return <ComposeHeader />
  }
  if (location.pathname === '/drafts') {
    return <DraftHeader />
  }
  if (location.pathname === '/sent') {
    return <SentHeader />
  }
  if (location.pathname === '/spam') {
    return <SpamHeader />
  }
  if (location.pathname === '/archive') {
    return <ArchiveHeader />
  }
  return null
}

const Header = () => {
  const activeModal = useAppSelector(selectActiveModal)

  return (
    <>
      <CommandPallette />
      {global.ACTIVE_MODAL_MAP.feedback === activeModal && <Feedback />}
      {global.ACTIVE_MODAL_MAP.keyboard === activeModal && <KeyboardCombos />}
      <NoMobileOverlay />
      <SetHeader />
      {global.ACTIVE_MODAL_MAP.settings === activeModal && <Settings />}
      {global.ACTIVE_MODAL_MAP.intro === activeModal && <Introduction />}
    </>
  )
}

export default Header
