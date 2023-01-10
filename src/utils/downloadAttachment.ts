/* eslint-disable no-underscore-dangle */
import type { IEmailAttachmentType } from 'components/EmailDetail/Attachment/EmailAttachmentTypes'
import messageApi from 'data/messageApi'
import base64toBlob from 'utils/base64toBlob'
import downloadBlob from 'utils/fileSaver'
import saveFileToFilesystem from 'utils/tauri/saveFileToSystem'

const FAIL_RESPONSE_OBJECT = {
  success: false,
  message: 'Cannot download attachment',
}

const handleSaveAttachment = (
  fetchedAttachment: any,
  filename: string,
  mimeType: string
): { success: boolean; message: string | null } => {
  if (!fetchedAttachment?.data?.data) {
    return { success: false, message: 'No attachment data found' }
  }
  try {
    const base64Data = fetchedAttachment.data.data
    const blobData = base64toBlob({ base64Data, mimeType })
    if (window.__TAURI_METADATA__) {
      saveFileToFilesystem(blobData, filename)
    } else {
      downloadBlob({ blob: blobData, fileName: filename })
    }
    return { success: true, message: null }
  } catch (err) {
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
        return handleSaveAttachment(fetchedAttachment, filename, mimeType)
      }
      return FAIL_RESPONSE_OBJECT
    }
    return FAIL_RESPONSE_OBJECT
  } catch (err) {
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

export interface IDownloadAttachmentData {
  attachmentData: IEmailAttachmentType[] | undefined
  messageId: string
}

export async function downloadAttachmentMultiple({
  attachmentData,
  messageId,
}: IDownloadAttachmentData) {
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
      result.forEach((attachment, index) => {
        if (attachment) {
          handleSaveAttachment(
            attachment,
            attachmentData[index].filename,
            attachmentData[index].mimeType
          )
        }
      })
      return { success: true, message: null }
    }
    return null
  } catch (err) {
    console.log('err', err)
    return FAIL_RESPONSE_OBJECT
  }
}
