import { IEmailAttachmentType } from '../components/EmailDetail/Attachment/EmailAttachmentTypes'
import { IEmailMessage } from '../Store/emailListTypes'

const checkAttachment = (message: IEmailMessage) => {
  const attachmentArray: IEmailAttachmentType[] = []
  if (Object.prototype.hasOwnProperty.call(message?.payload, 'parts')) {
    const parts: IEmailAttachmentType[] = message.payload.parts.filter(
      (item: IEmailAttachmentType) => item !== undefined
    )
    if (parts?.some((object) => object?.filename.length > 0)) {
      parts.forEach((attachment) => {
        attachment.filename.length > 0 && attachmentArray.push(attachment)
      })
      return attachmentArray
    }
    return attachmentArray
  }
  return attachmentArray
}

export default checkAttachment
