import React from 'react'
import { useLocation } from 'react-router-dom'
import ComposeHeader from '../Compose/ComposeHeader'
import InboxHeader from '../Inbox/InboxHeader'
import TodoHeader from '../ToDo/TodoHeader'
import DraftHeader from '../Draft/DraftHeader'
import SpamHeader from '../Spam/SpamHeader'
import SentHeader from '../Sent/SentHeader'
import EmailDetailHeader from '../EmailDetail/EmailDetailHeader'
import NoMobileOverlay from '../NoMobileOverlay'

function Header() {
  const SetHeader = () => {
    const location = useLocation()

    if (location.pathname === '/') {
      return <TodoHeader />
    }
    if (location.pathname === '/inbox') {
      return <InboxHeader />
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
    if (location.pathname === '/login') {
      return null
    }
    return <EmailDetailHeader />
  }

  return (
    <>
      <NoMobileOverlay />
      <SetHeader />
    </>
  )
}

export default Header
