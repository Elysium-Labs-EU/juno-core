import { useLocation } from 'react-router-dom'

import ArchiveHeader from 'components/Archive/ArchiveHeader'
import CommandPalette from 'components/CommandPalette/CommandPalette'
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
import { useAppSelector } from 'store/hooks'
import { selectActiveModal } from 'store/utilsSlice'

// The mail path has its own header logic.
const pathToHeader = {
  '/inbox': <InboxHeader />,
  '/compose': <ComposeHeader />,
  '/drafts': <DraftHeader />,
  '/sent': <SentHeader />,
  '/spam': <SpamHeader />,
  '/archive': <ArchiveHeader />,
  '/mail': null,
  '/': <TodoHeader />,
}

const SetHeader = () => {
  const location = useLocation()
  const matchedPaths = Object.keys(pathToHeader).filter((path) =>
    location.pathname.match(path)
  )
  if (matchedPaths[0]) {
    const header = pathToHeader[matchedPaths[0] as keyof typeof pathToHeader]
    return header || null
  }
  return null
}

const Header = () => {
  const activeModal = useAppSelector(selectActiveModal)

  return (
    <>
      <CommandPalette />
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
