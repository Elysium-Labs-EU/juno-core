import { FiDownload, FiPaperclip } from 'react-icons/fi'
import base64url from 'base64url'
import EmailAttachmentBubble from './EmailAttachmentBubble'
import './EmailAttachment.scss'

const EmailAttachment = ({ message }) => {
  const parts = message.payload.parts
  const attachment = parts.map((item) => item)
  const messageId = message.id

  // console.log(attachment)

  return (
    <>
      {attachment.map((item, index) => {
        return (
          // <div
          //   key={item.partId}
          //   className="emailAttachment"
          //   onClick={() => fetchAttachment(messageId, item.body.attachmentId)}
          // >
          //   <span>{item.filename}</span>
          //   <FiDownload />
          // </div>
          <EmailAttachmentBubble attachmentData={item} messageId={messageId} key={index}/>
        )
      })}
    </>
  )
}

export default EmailAttachment

// display: ${props => props.hasAttachement === "image/png" ? "flex" : "none"};

// e.messages[0].payload.parts[1].body.attachmentId

// 1768c9b7816bed78
