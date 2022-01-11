import React, { memo } from 'react'
import { IEmailMessage } from '../../Store/emailListTypes'

const MessageCount = ({ countOfMessage }: { countOfMessage: IEmailMessage[] }) => {
  const LengthMessageCount = memo(() => {
    const length = countOfMessage && countOfMessage.length
    if (length > 1) {
      return <span className="messageCount">({length})</span>
    }
    return null
  })

  return <LengthMessageCount />
}

export default MessageCount
