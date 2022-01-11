import { IEmailMessage } from '../../Store/emailListTypes'

const EmailSnippet = (message: IEmailMessage): string => {
  if (message) {
    if (message.snippet) {
      return message.snippet
    }
    return ''
  }
  return ''
}

export default EmailSnippet
