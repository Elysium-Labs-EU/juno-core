import * as global from 'constants/globalConstants'
import type { TProfile } from 'store/storeTypes/baseTypes'

import { NO_SENDER } from './getSenderNamePartial'

export default function getSenderNameFull(
  fromHeader: string | null,
  emailAddress: TProfile['emailAddress']
): string {
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
