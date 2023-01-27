import DOMPurify from 'dompurify'

import type { TThreadObject } from 'store/storeTypes/emailListTypes'
import convertStringToHTML from 'utils/convertStringToHTML'

const emailSnippet = (message: TThreadObject['messages'][0]): string => {
  if (message?.snippet) {
    return DOMPurify.sanitize(convertStringToHTML(message.snippet), {
      USE_PROFILES: { html: true },
    })
  }
  return ''
}

export default emailSnippet
