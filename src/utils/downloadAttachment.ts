import fileSaver from 'file-saver'
import { IEmailAttachmentType } from '../components/EmailDetail/Attachment/EmailAttachmentTypes'
import messageApi from '../data/messageApi'
import base64toBlob from './base64toBlob'

const FAIL_RESPONSE_OBJECT = {
  success: false,
  message: 'Cannot download attachment',
}

export default async function downloadAttachment({
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
    const fetchedAttachment = await messageApi().getAttachment({
      messageId,
      attachmentId,
    })
    if (fetchedAttachment) {
      const base64Data = fetchedAttachment.data.data
      const blobData = base64toBlob({ base64Data, mimeType })
      fileSaver(blobData, filename)
      return { success: true, message: null }
    }
    return FAIL_RESPONSE_OBJECT
  } catch (err) {
    return FAIL_RESPONSE_OBJECT
  }
}
