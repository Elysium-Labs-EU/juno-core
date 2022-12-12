import DOMPurify from 'dompurify'

import { IEmailMessage } from 'store/storeTypes/emailListTypes'
import convertStringToHTML from 'utils/convertStringToHTML'

const EmailSnippet = (message: IEmailMessage): string => {
  if (message?.snippet) {
    return DOMPurify.sanitize(convertStringToHTML(message.snippet), {
      USE_PROFILES: { html: true },
    })
  }
  return ''
}

export default EmailSnippet
