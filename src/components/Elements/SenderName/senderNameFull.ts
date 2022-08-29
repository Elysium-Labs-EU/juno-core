import { NO_SENDER } from './senderNamePartial'
import * as global from '../../../constants/globalConstants'

const senderNameFull = (fromHeader: string, emailAddress: string): string => {
  if (fromHeader) {
    if (fromHeader.length > 0) {
      if (emailAddress && fromHeader.includes(emailAddress)) {
        return global.ME_LABEL
      }
      return fromHeader
    }
    return NO_SENDER
  }
  return NO_SENDER
}

export default senderNameFull
