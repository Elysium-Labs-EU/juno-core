import { FiPaperclip } from 'react-icons/fi'
import { IEmailMessage } from '../../store/storeTypes/emailListTypes'
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
      return <FiPaperclip data-testid="email-has-attachment" />
    }
  }
  if (!Array.isArray(messages)) {
    const verdict = checkAttachment(messages)
    if (verdict.length > 0) {
      return <FiPaperclip data-testid="email-has-attachment" />
    }
  }
  return <div data-testid="email-has-no-attachment" />
}

export default EmailHasAttachment
