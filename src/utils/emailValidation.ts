import { Contact } from '../Store/contactsTypes'

const regexTest =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Test the input if the content are valid emails.

const emailValidation = (email: Contact[]) => {
  if (Array.isArray(email)) {
    const isValidEmail = (emailEntry: Contact) =>
      regexTest.test(emailEntry.emailAddress)
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
