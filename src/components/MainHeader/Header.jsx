import React from 'react'
import { useLocation } from 'react-router-dom'
import ComposeHeader from '../Compose/ComposeHeader'
import InboxHeader from '../Inbox/InboxHeader'
import TodoHeader from '../ToDo/TodoHeader'
import DraftHeader from '../Draft/DraftHeader'
import SpamHeader from '../Spam/SpamHeader'
import SentHeader from '../Sent/SentHeader'
import EmailDetailHeader from '../EmailDetail/EmailDetailHeader'

const Header = () => {
  const SetHeader = () => {
    const location = useLocation()

    if (location.pathname === '/inbox') {
      return <InboxHeader />
    }
    if (location.pathname === '/') {
      return <TodoHeader />
    }
    if (location.pathname === '/compose') {
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
    return <EmailDetailHeader />
  }

  return <SetHeader data-testid="setheader" />
}

export default Header
