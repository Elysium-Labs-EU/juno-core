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
  const location = useLocation()

  const headerMap = {
    '/': <TodoHeader />,
    '/compose': <ComposeHeader />,
    '/drafts': <DraftHeader />,
    '/inbox': <InboxHeader />,
    '/sent': <SentHeader />,
    '/spam': <SpamHeader />,
    default: <EmailDetailHeader />,
  }

  return (
    <>
      <NoMobileOverlay />
      {headerMap[location.pathname]}
    </>
  )
}

export default Header
