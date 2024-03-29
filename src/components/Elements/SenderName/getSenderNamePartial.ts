import * as global from 'constants/globalConstants'
import type { TProfile } from 'store/storeTypes/baseTypes'
import type { TContact } from 'store/storeTypes/contactsTypes'
import { convertToContact } from 'utils/convertToContact'

export const NO_SENDER = '(No sender)'

export default function getSenderNamePartial(
  fromHeaders: string | null,
  emailAddress: TProfile['emailAddress']
): TContact {
  if (fromHeaders) {
    if (fromHeaders.length > 0) {
      if (emailAddress && fromHeaders.includes(emailAddress)) {
        return { name: global.ME_LABEL, emailAddress }
      }
      return convertToContact(fromHeaders)
    }
    return { name: NO_SENDER, emailAddress: NO_SENDER }
  }
  return { name: NO_SENDER, emailAddress: NO_SENDER }
}
