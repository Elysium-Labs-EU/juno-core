import React from 'react'
import EmailAttachmentBubble from './EmailAttachmentBubble'
import './EmailAttachment.scss'

const EmailAttachment = ({ message }) => {
  const parts =
    Object.prototype.hasOwnProperty.call(message, 'parts') &&
    message.payload.parts.map((item) => item)

  return (
    <>
      {parts &&
        parts.map((item) => {
          return (
            <EmailAttachmentBubble
              attachmentData={item}
              messageId={message.id}
              key={message.id}
            />
          )
        })}
    </>
  )
}

export default EmailAttachment
