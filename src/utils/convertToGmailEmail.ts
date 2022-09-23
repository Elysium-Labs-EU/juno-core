import { IContact } from '../store/storeTypes/contactsTypes'

/**
 * @function convertToGmailEmail
 * @param data - takes in an array of Contact objects, and converts it to string format for the Gmail API
 * @returns {string} - returns string representing the contact object.
 */

const convertToGmailEmail = (data: IContact[]) => {
  if (data.length > 0 && typeof data !== 'string') {
    const convertedData = data
      .map((item) => `${item.name}<${item.emailAddress}>`)
      .toString()

    return convertedData
  }
  return ''
}

export default convertToGmailEmail
