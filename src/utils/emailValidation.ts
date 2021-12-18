const regexTest =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const emailValidation = (email: string | string[]) => {
  if (Array.isArray(email)) {
    const isValidEmail = (emailEntry: string) => regexTest.test(emailEntry)
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
