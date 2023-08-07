import type { TContact } from 'store/storeTypes/contactsTypes'

import { convertToContact } from './convertToContact'

const regexTest =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const isValidEmailString = (emailEntry: string) => regexTest.test(emailEntry)

const isValidEmailInContact = (emailEntry: TContact) =>
  emailEntry.emailAddress ? regexTest.test(emailEntry.emailAddress) : false


/**
 * @function emailValidation
 * @param email - takes in an array of Contact objects and checks the validity of the email address.
 * @returns - the input if validation is succesful, otherwise returns false.
 */


export const emailValidationArray = (email: Array<TContact | string>) => {
  const invalidEmails: Array<string | Record<string, unknown>> = []
  const validEmails: Array<TContact> = []

  for (const entry of email) {
    if (typeof entry === 'string') {
      if (isValidEmailString(entry)) {
        validEmails.push(convertToContact(entry))
      } else {
        invalidEmails.push(entry)
      }
      return
    }
    if (entry instanceof Object) {
      if (isValidEmailInContact(entry)) {
        validEmails.push(entry)
      } else {
        invalidEmails.push(entry)
      }
    }
  }

  // if (invalidEmails.length > 0) {
  //   return null
  // }
  return validEmails
}

export const emailValidationString = (email: string) => {
  if (isValidEmailString(email)) {
    return convertToContact(email)
  }
  return null
}
