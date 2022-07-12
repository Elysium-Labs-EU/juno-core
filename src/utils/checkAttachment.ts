import { IEmailAttachmentType } from '../components/EmailDetail/Attachment/EmailAttachmentTypes'
import { IEmailMessage } from '../store/storeTypes/emailListTypes'
import * as global from '../constants/globalConstants'

let foundAttachments: IEmailAttachmentType[] = []
const loopThroughParts = ({
  input,
  reset = false,
}: {
  input: any
  reset?: boolean
}): any => {
  if (reset) {
    foundAttachments = []
  }
  for (let i = 0; input.length > i; i += 1) {
    if (Object.prototype.hasOwnProperty.call(input[i], 'parts')) {
      loopThroughParts({ input: input[i].parts })
    }

    // Don't allow certain attachments. If it has an ContentID but it type is application/octet-stream, allow it. Otherwise, don't show it.
    if (
      !Object.prototype.hasOwnProperty.call(input[i], 'parts') &&
      Object.prototype.hasOwnProperty.call(input[i], 'filename') &&
      input[i].filename.length > 0 &&
      input[i].mimeType === global.MIME_TYPE_NO_INLINE
    ) {
      foundAttachments.push(input[i])
    }
    if (
      !Object.prototype.hasOwnProperty.call(input[i], 'parts') &&
      Object.prototype.hasOwnProperty.call(input[i], 'filename') &&
      input[i].filename.length > 0 &&
      input[i].headers.find(
        (header: any) =>
          header.name === 'Content-ID' || header.name === 'Content-Id'
      ) === undefined &&
      input[i].mimeType !== 'application/ics'
    ) {
      foundAttachments.push(input[i])
    }
  }
  return foundAttachments
}
const checkAttachment = (message: IEmailMessage): IEmailAttachmentType[] => {
  if (Object.prototype.hasOwnProperty.call(message?.payload, 'parts')) {
    const parts: IEmailAttachmentType[] = message.payload.parts.filter(
      (item: IEmailAttachmentType) => item !== undefined
    )
    return loopThroughParts({ input: parts, reset: true })
  }
  return []
}

export default checkAttachment
