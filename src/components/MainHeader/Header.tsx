import { useLocation } from 'react-router-dom'

import { selectSelectedEmails } from '../../store/emailListSlice'
import { useAppSelector } from '../../store/hooks'
import ArchiveHeader from '../Archive/ArchiveHeader'
import ComposeHeader from '../Compose/ComposeHeader'
import DraftHeader from '../Draft/DraftHeader'
import Feedback from '../Help/Feedback/Feedback'
import KeyboardCombos from '../Help/KeyboardCombos/KeyboardCombos'
import InboxHeader from '../Inbox/InboxHeader'
import Introduction from '../Introduction/Introduction'
import NoMobileOverlay from '../NoMobileOverlay/noMobileOverlay'
import Search from '../Search/Search'
import SentHeader from '../Sent/SentHeader'
import Settings from '../Settings/Settings'
import SpamHeader from '../Spam/SpamHeader'
import TodoHeader from '../ToDo/TodoHeader'
import SelectedOptions from './SelectedOptions/SelectedOptions'

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

const ShowIntroduction = () => {
  const location = useLocation()

  if (location.pathname === '/') {
    return <Introduction />
  }
  return null
}

const Header = () => {
  const selectedEmails = useAppSelector(selectSelectedEmails)

  return (
    <>
      <ShowIntroduction />
      <NoMobileOverlay />
      <SetHeader />
      <Search />
      <Settings />
      <KeyboardCombos />
      <Feedback />
      {selectedEmails.length > 0 && <SelectedOptions />}
    </>
  )
}

export default Header
