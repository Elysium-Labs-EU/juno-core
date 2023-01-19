import { ME_LABEL } from 'constants/globalConstants'
import type { IContact } from 'store/storeTypes/contactsTypes'
// Takes the string email format from Gmail, and converts it to object email format for this app.

const convertToMe = (header: string, emailAddress: string | undefined) => {
  if (emailAddress && header.includes(emailAddress)) {
    return ME_LABEL
  }
  return null
}

/**
 * @function convertToContact
 * @param data - takes in a string, a potential email address, coming from the email list item.
 * @returns - returns a Contact object
 */

export function convertToContact(
  data: string,
  emailAddress?: string
): IContact {
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
 * @function handleContactConversion
 * @param contactValue - takes in a raw string an parses it
 * @returns an array of contact objects or an empty array
 */

export function handleContactConversion(
  contactValue: string,
  emailAddress: string
): Array<IContact> {
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
