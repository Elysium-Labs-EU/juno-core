import { IEmailMessage } from '../../Store/emailListTypes'
import findPayloadHeadersData from '../../utils/findPayloadHeadersData'

const EmailSubject = (message: IEmailMessage): string => {
  if (message) {
    const query = 'Subject'
    const from = findPayloadHeadersData(query, message)
    if (from.length > 0) {
      return from
    }
    return ''
  }
  return ''
}

export default EmailSubject
