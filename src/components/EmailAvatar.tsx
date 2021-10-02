import React from 'react'
import * as S from './EmailAvatarStyles'

const EmailAvatar = ({ avatarURL }: { avatarURL: string }) => {
  const intialCreator = () => {
    const splittedURL = avatarURL && avatarURL.split('<')
    if (splittedURL) {
      const name = splittedURL[0]
      const initials = name.match(/\b\w/g) || []
      const finalIntials = (
        (initials.shift() || '') + (initials.pop() || '')
      ).toUpperCase()
      return finalIntials
    }
    return null
  }

  // let name = splittedURL[0]
  // let initials = name.match(/\b\w/g) || []
  // initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()

  return (
    // <img className="avatar avatar-xs rounded-circle" src={item.image} alt={item.nameSurname} />
    <S.EmailAvatarContainer>
      {/* <>{finalIntials}</> */}
      {intialCreator()}
    </S.EmailAvatarContainer>
  )
}

export default EmailAvatar
