import Stack from 'components/Elements/Stack/Stack'
import type { TThreadObject } from 'store/storeTypes/emailListTypes'

import EmailAttachmentBubble from './EmailAttachmentBubble'

const EmailAttachment = ({
  message,
}: {
  message: TThreadObject['messages'][0]
}) =>
  message?.payload?.files && message.payload.files.length > 0 ? (
    <Stack direction="vertical">
      {message.payload.files.map((item) => (
        <EmailAttachmentBubble
          attachmentData={item}
          messageId={message.id}
          key={item.body.attachmentId}
        />
      ))}
    </Stack>
  ) : null

export default EmailAttachment
