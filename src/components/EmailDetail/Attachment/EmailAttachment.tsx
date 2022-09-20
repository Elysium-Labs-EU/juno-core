import EmailAttachmentBubble from './EmailAttachmentBubble'
import * as S from './EmailAttachmentStyles'
import { IEmailMessage } from '../../../store/storeTypes/emailListTypes'

const EmailAttachment = ({ message }: { message: IEmailMessage }) =>
  message?.payload?.files && message.payload.files.length > 0 ? (
    <S.AttachmentWrapper>
      {message.payload.files.map((item) => (
        <EmailAttachmentBubble
          attachmentData={item}
          messageId={message.id}
          key={item.body.attachmentId}
        />
      ))}
    </S.AttachmentWrapper>
  ) : null

export default EmailAttachment
