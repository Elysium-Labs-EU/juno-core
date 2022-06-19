import { FiPaperclip } from 'react-icons/fi'
import { IEmailMessage } from '../../Store/storeTypes/emailListTypes'
import checkAttachment from '../../utils/checkAttachment'

const EmailHasAttachment = ({
  messages,
}: {
  messages: IEmailMessage | IEmailMessage[]
}) => {
  if (Array.isArray(messages)) {
    let verdict = false
    for (let i = 0; i < messages.length; i += 1) {
      const checkResult = checkAttachment(messages[i])
      if (checkResult.length > 0) {
        verdict = true
        break
      }
    }
    if (verdict) {
      return <FiPaperclip />
    }
  }
  if (!Array.isArray(messages)) {
    const verdict = checkAttachment(messages)
    if (verdict) {
      return <FiPaperclip />
    }
  }
  return <div />
}

export default EmailHasAttachment
