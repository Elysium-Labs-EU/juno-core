// Takes the object email format from this app, and converts it to string format for the Gmail api.

import { Contact } from '../Store/contactsTypes'

const convertToGmailEmail = (data: Contact[]) => {
  if (data.length > 0 && typeof data !== 'string') {
    const convertedData = data
      .map((item) => `${item.name} <${item.emailAddress}>`)
      .toString()

    return convertedData
  }
  return ''
}

export default convertToGmailEmail
