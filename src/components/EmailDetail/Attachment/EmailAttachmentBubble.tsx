import AttachmentBubble from 'components/Elements/AttachmentBubble/AttachmentBubble'
import type { Schema$MessagePart } from 'store/storeTypes/gmailBaseTypes/gmailTypes'

const EmailAttachmentBubble = ({
  attachmentData,
  messageId,
}: {
  attachmentData: Schema$MessagePart
  messageId: string
}) =>
  attachmentData.filename && attachmentData.filename.length > 0 && messageId.length > 0 ? (
    <AttachmentBubble attachmentData={attachmentData} messageId={messageId} />
  ) : null

export default EmailAttachmentBubble
