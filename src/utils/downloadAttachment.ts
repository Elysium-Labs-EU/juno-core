import { IEmailAttachmentType } from 'components/EmailDetail/Attachment/EmailAttachmentTypes'
import messageApi from 'data/messageApi'
import fileSaver from 'file-saver'
import base64toBlob from 'utils/base64toBlob'

const FAIL_RESPONSE_OBJECT = {
  success: false,
  message: 'Cannot download attachment',
}

const handleFetchedAttachment = (
  fetchedAttachment: any,
  filename: string,
  mimeType: string
) => {
  const base64Data = fetchedAttachment?.data?.data
  const blobData = base64toBlob({ base64Data, mimeType })
  fileSaver(blobData, filename)
  return { success: true, message: null }
}

/**
 * @function downloadAttachmentSingle
 * @param attachmentData an object containing information regarding the attachment
 * @param messageId id of the message
 * @returns
 */

export async function downloadAttachmentSingle({
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

/**
 * @function downloadAttachmentMultiple
 * This function will handle multiple events, it does so by sending all the promises in one go and it will wait for all to be completed.
 * @param attachmentData an object containing information regarding the attachment
 * @param messageId id of the message
 * @returns
 */

export async function downloadAttachmentMultiple({
  attachmentData,
  messageId,
}: {
  attachmentData: IEmailAttachmentType[] | undefined
  messageId: string
}) {
  try {
    if (attachmentData && attachmentData.length) {
      const buffer: Promise<any>[] = []
      attachmentData.forEach((attachment) => {
        const { attachmentId } = attachment.body
        if (attachmentId) {
          buffer.push(
            messageApi().getAttachment({
              messageId,
              attachmentId,
            })
          )
        }
      })
      const result = await Promise.all(buffer)
      for (let i = 0; i < result.length; i += 1) {
        handleFetchedAttachment(
          result[i],
          attachmentData[i].filename,
          attachmentData[i].mimeType
        )
      }
      return { success: true, message: null }
    }
    return FAIL_RESPONSE_OBJECT
  } catch (err) {
    return FAIL_RESPONSE_OBJECT
  }
}
