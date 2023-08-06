import type { TContact } from 'store/storeTypes/contactsTypes'

const regexTest =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/**
 * @function emailValidation
 * @param email - takes in an array of Contact objects and checks the validity of the email address.
 * @returns - the input if validation is succesful, otherwise returns false.
 */

const emailValidation = (email: Array<TContact>) => {
  if (Array.isArray(email)) {
    const isValidEmail = (emailEntry: TContact) =>
      emailEntry.emailAddress ? regexTest.test(emailEntry.emailAddress) : false
    const arrayTestResult = email.every(isValidEmail)
    if (arrayTestResult) {
      return email
    }
  }
  if (typeof email === 'string' && regexTest.test(email)) {
    return email
  }
  return false
}

export default emailValidation
