import AttachmentBubble from 'components/Elements/AttachmentBubble/AttachmentBubble'

import { EmailAttachmentType } from './EmailAttachmentTypes'

const EmailAttachmentBubble = ({
  attachmentData,
  messageId,
}: {
  attachmentData: EmailAttachmentType
  messageId: string
}) =>
  attachmentData.filename.length > 0 && messageId.length > 0 ? (
    <AttachmentBubble attachmentData={attachmentData} messageId={messageId} />
  ) : null

export default EmailAttachmentBubble
