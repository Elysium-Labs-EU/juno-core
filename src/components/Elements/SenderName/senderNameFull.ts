import { IEmailMessage } from '../../../store/storeTypes/emailListTypes'
import findPayloadHeadersData from '../../../utils/findPayloadHeadersData'
import { NO_SENDER } from './senderNamePartial'
import * as global from '../../../constants/globalConstants'

const SenderNameFull = (
  message: IEmailMessage,
  emailAddress: string
): string => {
  if (message) {
    const query = 'From'
    const from = findPayloadHeadersData(query, message)
    if (from.length > 0) {
      if (from.includes(emailAddress)) {
        return global.ME_LABEL
      }
      return from
    }
    return NO_SENDER
  }
  return NO_SENDER
}

export default SenderNameFull
