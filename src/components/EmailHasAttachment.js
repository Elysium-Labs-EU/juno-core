import { FiPaperclip } from 'react-icons/fi'

const EmailAttachment = ({ hasAttachment }) => {
  const CheckAttachment = () => {
    if (hasAttachment.filter((thread) => thread.payload.hasOwnProperty('parts')).length > 0) {
      let parts = hasAttachment.map((object) => object.payload.parts)
      if (parts.map((object) => object[1].filename.length > 0)) {
        return <FiPaperclip />
      } else {
        return null
      }
    } else {
      return null
    }
  }

  return (
    <CheckAttachment />
  )
}

export default EmailAttachment