/* eslint-disable no-underscore-dangle */
import type { EmailAttachmentType } from 'components/EmailDetail/Attachment/EmailAttachmentTypes'
import type { MessageApiReturnType } from 'data/messageApi'
import messageApi from 'data/messageApi'
import base64toBlob from 'utils/base64toBlob'
import downloadBlob from 'utils/fileSaver'
import saveFileToFilesystem from 'utils/tauri/saveFileToSystem'

const FAIL_RESPONSE_OBJECT = {
  success: false,
  message: 'Cannot download attachment',
}

const handleSaveAttachment = (
  fetchedAttachment: Awaited<ReturnType<MessageApiReturnType[
    'getAttachment'
  ]>>,
  filename: string,
  mimeType: string
): { success: boolean; message: string | null } => {
  if (!fetchedAttachment?.data.data) {
    return { success: false, message: 'No attachment data found' }
  }
  try {
    const base64Data = fetchedAttachment.data.data
    const blobData = base64toBlob({ base64Data, mimeType })
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (window.__TAURI_METADATA__) {
      void saveFileToFilesystem(blobData, filename)
    } else {
      downloadBlob({ blob: blobData, fileName: filename })
    }
    return { success: true, message: null }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error downloading attachment:', err)
    return FAIL_RESPONSE_OBJECT
  }
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
  attachmentData: EmailAttachmentType
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
        return handleSaveAttachment(fetchedAttachment, filename, mimeType)
      }
      return FAIL_RESPONSE_OBJECT
    }
    return FAIL_RESPONSE_OBJECT
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('err', err)
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

interface DownloadAttachmentData {
  attachmentData: Array<EmailAttachmentType> | undefined
  messageId: string
}

export async function downloadAttachmentMultiple({
  attachmentData,
  messageId,
}: DownloadAttachmentData) {
  try {
    if (attachmentData?.length) {
      const buffer: ReturnType<MessageApiReturnType['getAttachment']>[] = []
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
        const relevantAttachment = attachmentData[i]
        if (relevantAttachment) {
          handleSaveAttachment(
            result[i],
            relevantAttachment.filename,
            relevantAttachment.mimeType
          )
        }
      }
      return { success: true, message: null }
    }
    return null
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('err', err)
    return FAIL_RESPONSE_OBJECT
  }
}
