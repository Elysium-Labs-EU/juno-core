import * as global from 'constants/globalConstants'

import { NO_SENDER } from './senderNamePartial'

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
