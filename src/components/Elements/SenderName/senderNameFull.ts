import { IEmailMessage } from '../../../Store/emailListTypes'
import findPayloadHeadersData from '../../../utils/findPayloadHeadersData'
import { NO_SENDER } from './senderNamePartial'

const SenderNameFull = (
  message: IEmailMessage,
  emailAddress: string
): string => {
  if (message) {
    const query = 'From'
    const from = findPayloadHeadersData(query, message)
    if (from.length > 0) {
      if (from.includes(emailAddress)) {
        return 'me'
      }
      return from
    }
    return NO_SENDER
  }
  return NO_SENDER
}

export default SenderNameFull
