import React from 'react'
import isEmpty from 'lodash/isEmpty'
import EmailAttachmentBubble from './EmailAttachmentBubble'
import * as fileOverview from '../../../constants/filesOverviewConstants'
import * as S from './EmailAttachmentStyles'
import { EmailMessage } from '../../../Store/emailListTypes'
import { EmailAttachmentType } from './EmailAttachmentTypes'

const EmailAttachment = ({ message, overview }: { message: EmailMessage, overview: boolean }) => {
  const CheckAttachment = () => {
    if (
      message &&
      !isEmpty(message) &&
      Object.prototype.hasOwnProperty.call(message.payload, 'parts')
    ) {
      const parts = message.payload.parts.filter((item: EmailAttachmentType) => item !== undefined)
      if (parts && parts.some((object: EmailAttachmentType) => object?.filename.length > 0)) {
        return parts.map((attachment: EmailAttachmentType) =>
          attachment?.filename.length > 0 ? (
            <EmailAttachmentBubble
              attachmentData={attachment}
              messageId={message.id}
              key={message.id}
            />
          ) : null
        )
      }
      return overview ? fileOverview.NO_FILES : null
    }
    return null
  }

  return <S.AttachmentWrapper>{CheckAttachment()}</S.AttachmentWrapper>
}

export default EmailAttachment
