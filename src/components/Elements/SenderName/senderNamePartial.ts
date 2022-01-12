import { Contact } from '../../../Store/contactsTypes'
import { IEmailMessage } from '../../../Store/emailListTypes'
import convertToContact from '../../../utils/convertToContact'
import findPayloadHeadersData from '../../../utils/findPayloadHeadersData'

export const NO_SENDER = '(No sender)'

const SenderNamePartial = (
  message: IEmailMessage,
  emailAddress: string
): Contact => {
  if (message) {
    const query = 'From'
    const from = findPayloadHeadersData(query, message)
    if (from.length > 0) {
      if (from.includes(emailAddress)) {
        return { name: 'me', emailAddress }
      }
      return convertToContact(from)
    }
    return { name: NO_SENDER, emailAddress: NO_SENDER }
  }
  return { name: NO_SENDER, emailAddress: NO_SENDER }
}

export default SenderNamePartial
