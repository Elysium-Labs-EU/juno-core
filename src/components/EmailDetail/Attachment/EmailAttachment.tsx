import isEmpty from 'lodash/isEmpty'
import EmailAttachmentBubble from './EmailAttachmentBubble'
import * as S from './EmailAttachmentStyles'
import { IEmailMessage } from '../../../Store/emailListTypes'
import { IEmailAttachmentType } from './EmailAttachmentTypes'

const EmailAttachment = ({ message }: { message: IEmailMessage }) => {
  const CheckAttachment = () => {
    if (
      message &&
      !isEmpty(message) &&
      Object.prototype.hasOwnProperty.call(message.payload, 'parts')
    ) {
      const parts = message.payload.parts.filter(
        (item: IEmailAttachmentType) => item !== undefined
      )
      if (
        parts &&
        parts.some(
          (object: IEmailAttachmentType) => object?.filename.length > 0
        )
      ) {
        return parts.map((attachment: IEmailAttachmentType) =>
          attachment?.filename.length > 0 ? (
            <EmailAttachmentBubble
              attachmentData={attachment}
              messageId={message.id}
              key={attachment.body.attachmentId}
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
