import React from 'react'
import { FiPaperclip } from 'react-icons/fi'
import { EmailMessage } from '../Store/emailListTypes'

const EmailHasAttachment = ({ messages }: { messages: EmailMessage | EmailMessage[] }) => {
  const CheckAttachment = () => {
    if (
      messages &&
      Array.isArray(messages) &&
      messages.length > 0 &&
      messages.filter((thread) => Object.prototype.hasOwnProperty.call(thread.payload, 'parts'))
        .length > 0
    ) {
      const parts = messages
        .map((object) => object.payload.parts)
        .filter((item) => item !== undefined)
      if (parts.map((object) => object[1]?.filename.length).filter((part) => part).length > 0) {
        return <FiPaperclip />
      }
      return null
    }
    if (
      messages &&
      !Array.isArray(messages) &&
      Object.prototype.hasOwnProperty.call(messages, 'threadId')
    ) {
      if (Object.prototype.hasOwnProperty.call(messages.payload, 'parts')) {
        if (messages.payload.parts[messages.payload.parts.length - 1].filename.length > 0) {
          return <FiPaperclip />
        }
      } else if (messages.payload.filename.length > 0) {
        return <FiPaperclip />
      } else {
        return null
      }
    }
    return null
  }

  return <CheckAttachment />
}

export default EmailHasAttachment
