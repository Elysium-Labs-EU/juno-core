import * as global from 'constants/globalConstants'
import type { TProfile } from 'store/storeTypes/baseTypes'
import type { IContact } from 'store/storeTypes/contactsTypes'
import { convertToContact } from 'utils/convertToContact'

const NO_RECIPIENT = '(No recipient)'

const recipientName = (
  toHeaders: string | null,
  emailAddress: TProfile['emailAddress']
): IContact => {
  if (toHeaders && toHeaders.length > 0) {
    if (emailAddress && toHeaders.includes(emailAddress)) {
      return { name: global.ME_LABEL, emailAddress }
    }
    return convertToContact(toHeaders)
  }
  return { name: NO_RECIPIENT, emailAddress: NO_RECIPIENT }
}

export default recipientName
