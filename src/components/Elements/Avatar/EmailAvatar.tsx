import { useAppSelector } from '../../../store/hooks'
import { selectIsAvatarVisible } from '../../../store/utilsSlice'
import getRandomColor from '../../../utils/getRandomColor'
import * as S from './EmailAvatarStyles'

/**
 * @function intialCreator
 * @param avatarURL - the string representing the email of the user.
 * The function attempts to split the url
 * @returns if successful it will return the first character of both sections, otherwise a default case.
 */

const FALLBACK_AVATAR = '##'

const intialCreator = (avatarURL: string) => {
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

/**
 * @component EmailAvatar
 * @param avatarURL - the string representing the email of the user
 * @returns an avatar or empty div depending on the outcome of the initialCreator function
 */

const EmailAvatar = ({ avatarURL }: { avatarURL: string }) => {
  const staticInitials = intialCreator(avatarURL)
  const isAatarVisible = useAppSelector(selectIsAvatarVisible)

  return isAatarVisible ? (
    <S.EmailAvatarContainer
      data-testid="avatar"
      randomColor={getRandomColor(staticInitials)}
    >
      <span>{staticInitials}</span>
    </S.EmailAvatarContainer>
  ) : (
    <div data-testid="avatar" />
  )
}

export default EmailAvatar
