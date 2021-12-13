import { EmailMessage } from '../../../Store/emailListTypes'
import findPayloadHeadersData from '../../../utils/findPayloadHeadersData'
import { NO_SENDER } from './senderNamePartial'

const SenderNameFull = (message: EmailMessage): string => {
  if (message) {
    const query = 'From'
    const from = findPayloadHeadersData(query, message)
    if (from.length > 0) {
      return from
    }
    return NO_SENDER
  }
  return NO_SENDER
}

export default SenderNameFull
