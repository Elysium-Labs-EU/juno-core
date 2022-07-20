import React from 'react'
import { useAppSelector } from '../../../store/hooks'
import { selectAvatarVisibility } from '../../../store/utilsSlice'
import getRandomColor from '../../../utils/getRandomColor'
import * as S from './EmailAvatarStyles'

const intialCreator = (avatarURL: string) => {
  const splittedURL = avatarURL && avatarURL.split('<')
  if (splittedURL) {
    const name = splittedURL[0].length > 0 ? splittedURL[0] : splittedURL[1]
    const initials = name.match(/\b\w/g) || []
    const finalIntials = (
      (initials.shift() || '') + (initials.pop() || '')
    ).toUpperCase()
    return finalIntials
  }
  return '##'
}

const EmailAvatar = ({ avatarURL }: { avatarURL: string }) => {
  const staticInitials = intialCreator(avatarURL)
  const avatarVisible = useAppSelector(selectAvatarVisibility)

  return avatarVisible ? (
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
