import React from 'react'
import { FiPaperclip } from 'react-icons/fi'

const EmailHasAttachment = (props) => {
  const { messages } = props
  const CheckAttachment = () => {
    if (
      messages &&
      messages.length > 0 &&
      messages.filter((thread) =>
        Object.prototype.hasOwnProperty.call(thread.payload, 'parts')
      ).length > 0
    ) {
      const parts = messages
        .map((object) => object.payload.parts)
        .filter((item) => item !== undefined)
      if (
        parts.map((object) => object[1]?.filename.length).filter((part) => part)
          .length > 0
      ) {
        return <FiPaperclip />
      }
      return null
    }
    if (
      messages &&
      Object.prototype.hasOwnProperty.call(messages, 'threadId')
    ) {
      if (
        messages.payload.parts[messages.payload.parts.length - 1].filename
          .length > 0
      ) {
        return <FiPaperclip />
      }
    }
    return null
  }

  return <CheckAttachment />
}

export default EmailHasAttachment
