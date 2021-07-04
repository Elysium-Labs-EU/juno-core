import React from 'react'
import { FiPaperclip } from 'react-icons/fi'

const EmailAttachment = ({ messages }) => {
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
    return null
  }

  return <CheckAttachment />
}

export default EmailAttachment
