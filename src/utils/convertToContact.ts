// Takes the string email format from Gmail, and converts it to object email format for this app.
import { Contact } from '../Store/contactsTypes'

const convertToContact = (data: string): Contact => {
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

export default convertToContact
