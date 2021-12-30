// Takes the string email format from Gmail, and converts it to object email format for this app.

const convertToContact = (data: any) => {
  if (data.length > 0) {
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
    if (splitted.length === 1) {
      splitted[0].replace(/(")+/g, '')
      return { name: splitted[0], emailAddress: splitted[0] }
    }
  }
  return data
}

export default convertToContact
