import { EmailMessage } from '../../Store/emailListTypes'
import findPayloadHeadersData from '../../utils/findPayloadHeadersData'

const NO_SUBJECT = '(No subject)'

const EmailSubject = (message: EmailMessage): string => {
  if (message) {
    const query = 'Subject'
    const from = findPayloadHeadersData(query, message)
    if (from.length > 0) {
      return from
    }
    return NO_SUBJECT
  }
  return NO_SUBJECT
}

export default EmailSubject
