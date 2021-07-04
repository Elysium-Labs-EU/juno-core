import React from 'react'
import isEmpty from 'lodash/isEmpty'
import EmailAttachmentBubble from './EmailAttachmentBubble'
import * as S from './EmailAttachmentStyles'

const EmailAttachment = ({ message }) => {
  const CheckAttachment = () => {
    if (
      message &&
      !isEmpty(message) &&
      Object.prototype.hasOwnProperty.call(message.payload, 'parts')
    ) {
      const parts = message.payload.parts.filter((item) => item !== undefined)
      if (parts && parts.some((object) => object?.filename.length > 0)) {
        return parts.map((attachment, index) =>
          attachment?.filename.length > 0 ? (
            <EmailAttachmentBubble
              attachmentData={attachment}
              messageId={message.id}
              key={`${message.id + index}`}
            />
          ) : null
        )
      }
      return null
    }
    return null
  }

  return <S.AttachmentWrapper>{CheckAttachment()}</S.AttachmentWrapper>
}

export default EmailAttachment
