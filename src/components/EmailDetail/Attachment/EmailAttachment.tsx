import EmailAttachmentBubble from './EmailAttachmentBubble'
import * as S from './EmailAttachmentStyles'
import { IEmailMessage } from '../../../Store/emailListTypes'
import checkAttachment from '../../../utils/checkAttachment'

const EmailAttachment = ({ message }: { message: IEmailMessage }) => {
  const result = checkAttachment(message)

  return (
    <S.AttachmentWrapper>
      {result.length > 0 ? (
        <div>
          {result.map((item) => (
            <EmailAttachmentBubble
              attachmentData={item}
              messageId={message.id}
              key={item.body.attachmentId}
            />
          ))}
        </div>
      ) : null}
    </S.AttachmentWrapper>
  )
}

export default EmailAttachment
