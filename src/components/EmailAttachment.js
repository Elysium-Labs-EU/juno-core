import EmailAttachmentBubble from './EmailAttachmentBubble'
import './EmailAttachment.scss'

const EmailAttachment = ({ message }) => {

  const parts = message.hasOwnProperty('parts') ? message.payload.parts.map((item) => item) : null
  const messageId = message.id

  return (
    <>
      {parts && parts.map((item, index) => {
        return (
          <EmailAttachmentBubble attachmentData={item} messageId={messageId} key={index}/>
        )
      })}
    </>
  )
}

export default EmailAttachment
