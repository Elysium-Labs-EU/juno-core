import React from 'react'
import { EmailMessage } from '../Store/emailListTypes'

const MessageCount = ({ countOfMessage }: { countOfMessage: EmailMessage[] }) => {
  const LengthMessageCount = () => {
    const length = countOfMessage && countOfMessage.length
    if (length > 1) {
      return <span className="messageCount">({length})</span>
    }
    return null
  }

  return <LengthMessageCount />
}

export default MessageCount
