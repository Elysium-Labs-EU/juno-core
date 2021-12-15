const regexTest =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const emailValidation = (email: string | string[]) => {
  if (Array.isArray(email)) {
    for (let i = 0; i < email.length; i += 1) {
      if (!regexTest.test(email[i])) {
        return false
      }
    }
  }
  if (typeof email === 'string' && regexTest.test(email)) {
    return email
  }
  return false
}

export default emailValidation
