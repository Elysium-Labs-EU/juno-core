import React, { memo } from 'react'
import { useLocation } from 'react-router-dom'
import ComposeHeader from '../Compose/ComposeHeader'
import InboxHeader from '../Inbox/InboxHeader'
import TodoHeader from '../ToDo/TodoHeader'
import DraftHeader from '../Draft/DraftHeader'
import SpamHeader from '../Spam/SpamHeader'
import SentHeader from '../Sent/SentHeader'
// import EmailDetailHeader from '../EmailDetail/EmailDetailHeader'
import NoMobileOverlay from '../NoMobileOverlay'
import { LocationObjectType } from '../types/globalTypes'

const SetHeader = memo(() => {
  const location = useLocation<LocationObjectType>()

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
  return null
  // return <EmailDetailHeader />
})

const Header = () => (
  <>
    <NoMobileOverlay />
    <SetHeader />
  </>
)

export default Header
