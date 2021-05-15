import React, { useEffect } from 'react'
import EmailList from './EmailList'
import { connect } from 'react-redux'
import { setCurrentLabels } from './../Store/actions'

const LABEL = ['UNREAD', 'INBOX']

const Inbox = ({ dispatch }) => {
  useEffect(() => {
    dispatch(setCurrentLabels(LABEL))
  }, [])

  return <EmailList />
}

export default connect()(Inbox)
