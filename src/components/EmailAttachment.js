import EmailAttachmentBubble from './EmailAttachmentBubble'
import './EmailAttachment.scss'

const EmailAttachment = ({ message }) => {
  const parts = message.payload.parts
  const attachment = parts.map((item) => item)
  const messageId = message.id

  return (
    <>
      {attachment.map((item, index) => {
        return (
          <EmailAttachmentBubble attachmentData={item} messageId={messageId} key={index}/>
        )
      })}
    </>
  )
}

export default EmailAttachment
