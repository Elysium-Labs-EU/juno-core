import { useState, useEffect } from 'react'
import EmailAttachmentBubble from './EmailAttachmentBubble'
import * as S from './EmailAttachmentStyles'
import { IEmailMessage } from '../../../Store/storeTypes/emailListTypes'
import checkAttachment from '../../../utils/checkAttachment'
import { IEmailAttachmentType } from './EmailAttachmentTypes'

const EmailAttachment = ({ message }: { message: IEmailMessage }) => {
  const [result, setResult] = useState<IEmailAttachmentType[]>([])

  useEffect(() => {
    let mounted = true
    const response = checkAttachment(message)
    mounted && setResult(response)
    return () => {
      mounted = false
    }
  }, [message])

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
