const FALLBACK_AVATAR = '##'

/**
 * @function getUserInitials
 * @param userEmail - takes in a string for the avatar
 * @returns the first letter of the first word and the first letter of the second word
 */

export default function getUserInitials(userEmail: string | undefined | null) {
  const splittedEmail = userEmail?.split('<')
  if (splittedEmail) {
    const name = () => {
      if (splittedEmail[0] && splittedEmail[0].length > 0) {
        return splittedEmail[0]
      }
      if (splittedEmail[1] && splittedEmail[1].length > 0) {
        return splittedEmail[1]
      }
      return FALLBACK_AVATAR
    }
    const initials = name().match(/\b\w/g) || []
    const finalIntials = (
      (initials.shift() || '') + (initials.pop() || '')
    ).toUpperCase()
    return finalIntials
  }
  return FALLBACK_AVATAR
}
