import { IEmailMessage } from '../../store/storeTypes/emailListTypes'

const EmailSnippet = (message: IEmailMessage): string => {
  if (message?.snippet) {
    return message.snippet
  }
  return ''
}

export default EmailSnippet
