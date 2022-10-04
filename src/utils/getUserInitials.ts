const FALLBACK_AVATAR = '##'

/**
 * @function getUserInitials
 * @param avatarURL - takes in a string for the avatar
 * @returns the first letter of the first word and the first letter of the second word
 */

export default function getUserInitials(avatarURL: string) {
  const splittedURL = avatarURL.split('<')
  if (splittedURL) {
    const name = () => {
      if (splittedURL[0] && splittedURL[0].length > 0) {
        return splittedURL[0]
      }
      if (splittedURL[1] && splittedURL[1].length > 0) {
        return splittedURL[1]
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
