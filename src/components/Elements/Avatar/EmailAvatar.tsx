import { useAppSelector } from '../../../store/hooks'
import { selectIsAvatarVisible } from '../../../store/utilsSlice'
import getRandomColor from '../../../utils/getRandomColor'
import getUserInitials from '../../../utils/getUserInitials'
import * as S from './EmailAvatarStyles'

/**
 * @function intialCreator
 * @param avatarURL - the string representing the email of the user.
 * The function attempts to split the url
 * @returns if successful it will return the first character of both sections, otherwise a default case.
 */

/**
 * @component EmailAvatar
 * @param avatarURL - the string representing the email of the user
 * @returns an avatar or empty div depending on the outcome of the initialCreator function
 */

const EmailAvatar = ({ avatarURL }: { avatarURL: string }) => {
  const staticInitials = getUserInitials(avatarURL)
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
