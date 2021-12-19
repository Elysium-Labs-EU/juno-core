// Takes the object email format from this app, and converts it to string format for the Gmail api.

import { Contact } from '../Store/contactsTypes'

const convertToGmailEmail = (data: Contact[]) => {
  const convertedData = data
    .map((item) => `${item.name} <${item.emailAddress}>`)
    .toString()

  return convertedData
}

export default convertToGmailEmail
