import { useLocation } from 'react-router-dom'

import { useAppSelector } from '../../store/hooks'
import { selectActiveModal } from '../../store/utilsSlice'
import ArchiveHeader from '../Archive/ArchiveHeader'
import CommandPallette from '../CommandPalette/CommandPalette'
import ComposeHeader from '../Compose/ComposeHeader'
import DraftHeader from '../Draft/DraftHeader'
import Feedback from '../Help/Feedback/Feedback'
import KeyboardCombos from '../Help/KeyboardCombos/KeyboardCombos'
import InboxHeader from '../Inbox/InboxHeader'
import Introduction from '../Introduction/Introduction'
import NoMobileOverlay from '../NoMobileOverlay/noMobileOverlay'
import SentHeader from '../Sent/SentHeader'
import Settings from '../Settings/Settings'
import SpamHeader from '../Spam/SpamHeader'
import TodoHeader from '../ToDo/TodoHeader'
import * as global from '../../constants/globalConstants'

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
