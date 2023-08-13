import messageApi from 'data/messageApi'
import type { Schema$MessagePart } from 'store/storeTypes/gmailBaseTypes/gmailTypes'

import base64toBlob from './base64toBlob'

const FAIL_RESPONSE_OBJECT = {
  success: false,
  message: 'Cannot download attachment',
  blobUrl: null,
  mimeType: null,
}

const handleFetchedAttachment = (
  fetchedAttachment: unknown,
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
      const base64Data = fetchedAttachment.data.data
      if (typeof base64Data !== 'string') {
        return FAIL_RESPONSE_OBJECT
      }
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
  attachmentData: Schema$MessagePart
  messageId: string
}) {
  const {
    body,
    mimeType,
  } = attachmentData
  try {
    if (body?.attachmentId) {
      const fetchedAttachment = await messageApi().getAttachment({
        messageId,
        attachmentId: body.attachmentId,
      })
      if (fetchedAttachment && mimeType) {
        const test = handleFetchedAttachment(
          fetchedAttachment,
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
