import AttachmentBubble from 'components/Elements/AttachmentBubble/AttachmentBubble'

import { IEmailAttachmentType } from './EmailAttachmentTypes'

const EmailAttachmentBubble = ({
  attachmentData,
  messageId,
}: {
  attachmentData: IEmailAttachmentType
  messageId: string
}) =>
  attachmentData.filename.length > 0 && messageId.length > 0 ? (
    <AttachmentBubble attachmentData={attachmentData} messageId={messageId} />
  ) : null

export default EmailAttachmentBubble
