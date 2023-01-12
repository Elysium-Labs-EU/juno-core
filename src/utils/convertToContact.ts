import { IContact } from 'store/storeTypes/contactsTypes'
// Takes the string email format from Gmail, and converts it to object email format for this app.

/**
 * @function convertToContact
 * @param data - takes in a string, a potential email address, coming from the email list item.
 * @returns - returns a Contact object
 */

export function convertToContact(data: string): IContact {
  const splitted = data.split('<')
  const [first, second] = splitted
  if (splitted.length > 1 && first && second) {
    const cleanUpName: string = first.trim().replace(/(")+/g, '')
    const cleanUpEmailAddress: string = second
      .substring(0, second.length - 1)
      .replace(/(")+/g, '')

    if (cleanUpName.length > 1) {
      return { name: cleanUpName, emailAddress: cleanUpEmailAddress }
    }

    return { name: cleanUpEmailAddress, emailAddress: cleanUpEmailAddress }
  }

  if (first) {
    first.replace(/(")+/g, '')
    return { name: first, emailAddress: first }
  }
  return { name: '', emailAddress: '' }
}

/**
 * @function handleContactConversion
 * @param contactValue - takes in a raw string an parses it
 * @returns an array of contact objects or an empty array
 */

export function handleContactConversion(contactValue: string): IContact[] {
  if (
    contactValue &&
    contactValue.length > 0 &&
    typeof contactValue === 'string'
  ) {
    return contactValue.split(',').map((item) => convertToContact(item))
  }
  return []
}
