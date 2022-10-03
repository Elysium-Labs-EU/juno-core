const FALLBACK_AVATAR = '##'

const getUserInitials = (avatarURL: string) => {
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

export default getUserInitials
