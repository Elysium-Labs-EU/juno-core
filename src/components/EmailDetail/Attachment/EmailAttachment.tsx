import EmailAttachmentBubble from './EmailAttachmentBubble'
import * as S from './EmailAttachmentStyles'
import { IEmailMessage } from '../../../store/storeTypes/emailListTypes'

const EmailAttachment = ({ message }: { message: IEmailMessage }) => (
  <S.AttachmentWrapper>
    {message?.payload?.files && message.payload.files.length > 0
      ? message?.payload?.files?.map((item) => (
          <EmailAttachmentBubble
            attachmentData={item}
            messageId={message.id}
            key={item.body.attachmentId}
          />
        ))
      : null}
  </S.AttachmentWrapper>
)

export default EmailAttachment
