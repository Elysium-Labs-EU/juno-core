import React from 'react'
import { useAppSelector } from '../../../Store/hooks'
import { setAvatarVisibility } from '../../../Store/utilsSlice'
import getRandomColor from '../../../utils/getRandomColor'
import * as S from './EmailAvatarStyles'

const EmailAvatar = ({ avatarURL }: { avatarURL: string }) => {
  const intialCreator = () => {
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

  const staticInitials = intialCreator()
  const avatarVisible = useAppSelector(setAvatarVisibility)

  return (
    avatarVisible ? <S.EmailAvatarContainer randomColor={getRandomColor(staticInitials)}>
      <span>{staticInitials}</span>
    </S.EmailAvatarContainer> : <div/>
  )
}

export default EmailAvatar
