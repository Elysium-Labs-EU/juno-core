import { IEmailAttachmentType } from '../components/EmailDetail/Attachment/EmailAttachmentTypes'
import messageApi from '../data/messageApi'
import base64toBlob from './base64toBlob'

const FAIL_RESPONSE_OBJECT = {
  success: false,
  message: 'Cannot download attachment',
  blobUrl: null,
  mimeType: null,
}

const handleFetchedAttachment = (
  fetchedAttachment: any,
  filename: string,
  mimeType: string
) => {
  const base64Data = fetchedAttachment?.data?.data
  const blobData = base64toBlob({ base64Data, mimeType })
  const blobUrl = URL.createObjectURL(blobData)
  return { success: true, message: null, blobUrl: blobUrl, mimeType: mimeType }
}

/**
 * @function viewAttachment
 * @param attachmentData an object containing information regarding the attachment
 * @param messageId id of the message
 * @returns
 */

export async function viewAttachment({
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
  } = attachmentData
  try {
    if (attachmentId) {
      const fetchedAttachment = await messageApi().getAttachment({
        messageId,
        attachmentId,
      })
      if (fetchedAttachment) {
        return handleFetchedAttachment(fetchedAttachment, filename, mimeType)
      }
      return FAIL_RESPONSE_OBJECT
    }
    return FAIL_RESPONSE_OBJECT
  } catch (err) {
    return FAIL_RESPONSE_OBJECT
  }
}
