import { Contact } from '../../../store/storeTypes/contactsTypes'
import { IEmailMessage } from '../../../store/storeTypes/emailListTypes'
import convertToContact from '../../../utils/convertToContact'
import findPayloadHeadersData from '../../../utils/findPayloadHeadersData'
import * as global from '../../../constants/globalConstants'

export const NO_SENDER = '(No sender)'

const senderNamePartial = (
  message: IEmailMessage,
  emailAddress: string
): Contact => {
  if (message) {
    const query = 'From'
    const from = findPayloadHeadersData(query, message)
    if (from.length > 0) {
      if (from.includes(emailAddress)) {
        return { name: global.ME_LABEL, emailAddress }
      }
      return convertToContact(from)
    }
    return { name: NO_SENDER, emailAddress: NO_SENDER }
  }
  return { name: NO_SENDER, emailAddress: NO_SENDER }
}

export default senderNamePartial
