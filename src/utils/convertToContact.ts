import { ME_LABEL } from 'constants/globalConstants'
import type { TProfile } from 'store/storeTypes/baseTypes'
import type { TContact } from 'store/storeTypes/contactsTypes'
// Takes the string email format from Gmail, and converts it to object email format for this app.

const convertToMe = (
  header: string,
  emailAddress: TProfile['emailAddress']
) => {
  if (emailAddress && header.includes(emailAddress)) {
    return ME_LABEL
  }
  return null
}

/**
 * Converts a string of contact data into an TContact object.
 * @param {string} data - A string of contact data.
 * @param {string} [emailAddress] - The email address of the current user.
 * @returns {TContact} - An TContact object containing the contact's name and email address.
 */

export function convertToContact(
  data: string,
  emailAddress?: TProfile['emailAddress']
) {
  const splitted = data.split('<')
  const [first, second] = splitted
  if (splitted.length > 1 && first && second) {
    const cleanUpName: string = first.trim().replace(/(")+/g, '')
    const cleanUpEmailAddress: string = second
      .substring(0, second.length - 1)
      .replace(/(")+/g, '')

    if (cleanUpName.length > 1) {
      return {
        name: convertToMe(cleanUpEmailAddress, emailAddress) ?? cleanUpName,
        emailAddress: cleanUpEmailAddress,
      }
    }

    return {
      name:
        convertToMe(cleanUpEmailAddress, emailAddress) ?? cleanUpEmailAddress,
      emailAddress: cleanUpEmailAddress,
    }
  }

  if (first) {
    first.replace(/(")+/g, '')
    return {
      name: convertToMe(first, emailAddress) ?? first,
      emailAddress: first,
    }
  }
  if (second) {
    second.replace(/(")+/g, '')
    return {
      name: convertToMe(second, emailAddress) ?? second,
      emailAddress: second,
    }
  }
  return { name: '', emailAddress: '' }
}

/**
 * Converts a string of contacts into an array of TContact objects.
 * @param {string} contactValue - A string of contacts separated by commas.
 * @param {string} emailAddress - The email address of the current user.
 * @returns {Array<TContact>} - An array of TContact objects.
 */

export function handleContactConversion(
  contactValue: string | null,
  emailAddress?: TProfile['emailAddress']
): Array<TContact> {
  if (
    contactValue &&
    contactValue.length > 0 &&
    typeof contactValue === 'string'
  ) {
    return contactValue
      .split(',')
      .map((item) => convertToContact(item, emailAddress))
  }
  return []
}
