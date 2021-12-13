import { EmailMessage } from '../../Store/emailListTypes'

const EmailSnippet = (message: EmailMessage): string => {
  if (message) {
    if (message.snippet) {
      return message.snippet
    }
    return ''
  }
  return ''
}

export default EmailSnippet
