import type { EmailAttachmentType } from 'components/EmailDetail/Attachment/EmailAttachmentTypes'
import messageApi from 'data/messageApi'

import base64toBlob from './base64toBlob'

const FAIL_RESPONSE_OBJECT = {
  success: false,
  message: 'Cannot download attachment',
  blobUrl: null,
  mimeType: null,
}

const handleFetchedAttachment = (
  fetchedAttachment: unknown,
  filename: string,
  mimeType: string
) => {
  if (
    typeof fetchedAttachment === 'object' &&
    fetchedAttachment !== null &&
    'data' in fetchedAttachment
  ) {
    if (
      typeof fetchedAttachment.data === 'object' &&
      fetchedAttachment.data !== null &&
      'data' in fetchedAttachment.data
    ) {
      const base64Data = fetchedAttachment?.data?.data
      const blobData = base64toBlob({ base64Data, mimeType })
      const blobUrl = URL.createObjectURL(blobData)
      return { success: true, message: null, blobUrl, mimeType }
    }
  }
}

/**
 * @function viewAttachment
 * @param attachmentData an object containing information regarding the attachment
 * @param messageId id of the message
 * @returns
 */

export default async function viewAttachment({
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
        const test = handleFetchedAttachment(
          fetchedAttachment,
          filename,
          mimeType
        )
        // console.log(test)
        //   // TODO: Write the blob to the file system, but first we need to get the file
        //  const base64Data = test?.
        //   const array = new Uint8Array(await test.blobUrl.arrayBuffer())
        //   console.log(array)
        return test
      }
      return FAIL_RESPONSE_OBJECT
    }
    return FAIL_RESPONSE_OBJECT
  } catch (err) {
    return FAIL_RESPONSE_OBJECT
  }
}
