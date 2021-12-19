import { Contact } from '../../Store/contactsTypes'
import convertToContact from '../../utils/convertToContact'
import findPayloadHeadersData from '../../utils/findPayloadHeadersData'

const NO_RECIPIENT = '(No recipient)'

const RecipientName = (email: any): Contact => {
  const query = 'To'
  if (email) {
    const to = findPayloadHeadersData(query, email)
    if (to.length > 0) {
      return convertToContact(to)
    }
    return { name: NO_RECIPIENT, emailAddress: NO_RECIPIENT }
  }
  return { name: NO_RECIPIENT, emailAddress: NO_RECIPIENT }
}

export default RecipientName
