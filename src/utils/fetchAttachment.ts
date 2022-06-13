import { IEmailAttachmentType } from '../components/EmailDetail/Attachment/EmailAttachmentTypes'
import messageApi from '../data/messageApi'
import { baseBase64 } from './decodeBase64'

const NO_ATTACHMENT_FOUND = 'No attachment found'

export default async function fetchAttachment({
  attachmentData,
  messageId,
}: {
  attachmentData: IEmailAttachmentType
  messageId: string
}) {
  const {
    body: { attachmentId },
    filename,
    mimeType,
    headers,
  } = attachmentData
  try {
    if (attachmentId && messageId) {
      const fetchedAttachment = await messageApi().getAttachment({
        messageId,
        attachmentId,
      })
      if (fetchedAttachment) {
        const decodedB64 = baseBase64(fetchedAttachment.data.data)
        const contentID: string = headers
          .find((e: any) => e.name === 'Content-ID')
          .value.replace(/<|>/gi, '')
        const attachment = {
          mimeType,
          decodedB64,
          filename,
          contentID,
        }
        return attachment
      }
      return NO_ATTACHMENT_FOUND
    }
    return NO_ATTACHMENT_FOUND
  } catch (err) {
    return NO_ATTACHMENT_FOUND
  }
}
