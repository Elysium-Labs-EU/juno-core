import { IContact } from '../store/storeTypes/contactsTypes'
// Takes the string email format from Gmail, and converts it to object email format for this app.

/**
 * @function convertToContact
 * @param data - takes in a string, a potential email address, coming from the email list item.
 * @returns - returns a Contact object
 */

export default function convertToContact(data: string): IContact {
  const splitted = data.split('<')

  if (splitted.length > 1) {
    const cleanUpName: string = splitted[0].trim().replace(/(")+/g, '')
    const cleanUpEmailAddress: string = splitted[1]
      .substring(0, splitted[1].length - 1)
      .replace(/(")+/g, '')

    if (cleanUpName.length > 1) {
      return { name: cleanUpName, emailAddress: cleanUpEmailAddress }
    }

    return { name: cleanUpEmailAddress, emailAddress: cleanUpEmailAddress }
  }

  splitted[0].replace(/(")+/g, '')
  return { name: splitted[0], emailAddress: splitted[0] }
}
