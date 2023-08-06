import type { EmailAttachmentType } from 'components/EmailDetail/Attachment/EmailAttachmentTypes'
import messageApi from 'data/messageApi'
import base64toBlob from 'utils/base64toBlob'

/**
 * @function convertB64AttachmentToFile
 * @param {object} - takes in the id of the message and the attachment files as an array
 * @returns a File object representing the attachment files.
 */

export default async function convertB64AttachmentToFile({
  id,
  files,
}: {
  id: string
  files: EmailAttachmentType[]
}) {
  if (files && id) {
    const buffer: Promise<any>[] = []
    for (let i = 0; i < files.length; i += 1) {
      const loopFile = files[i]
      if (loopFile?.body.attachmentId) {
        buffer.push(
          messageApi().getAttachment({
            messageId: id,
            attachmentId: loopFile.body.attachmentId,
          })
        )
      }
    }
    const result = await Promise.all(buffer)

    const output: File[] = []
    for (let i = 0; i < files.length; i += 1) {
      const loopFile = files[i]
      if (loopFile) {
        const base64Data = result[i]?.data?.data
        const blobData = base64toBlob({
          base64Data,
          mimeType: loopFile.mimeType,
        })
        const file = new File([blobData], loopFile.filename, {
          type: loopFile.mimeType,
        })
        output.push(file)
      }
    }
    return output
  }
  return []
}
