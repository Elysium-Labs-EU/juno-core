import styled from 'styled-components'

const EmailAvatarContainer = styled.div`
  background-color: rgba(165, 165, 165, 0.68);
  width: 2rem;
  display: flex;
  justify-content: center;
  color: #f5f5f5;
  font-weight: normal;
  border-radius: 50%;
  height: 2rem;
  align-items: center;
`

const EmailAvatar = ({ avatarURL }) => {
  const intialCreator = (avatarURL) => {
    const splittedURL = avatarURL && avatarURL.split('<')
    if (splittedURL) {
      let name = splittedURL[0]
      let initials = name.match(/\b\w/g) || []
      let finalIntials = (initials = (
        (initials.shift() || '') + (initials.pop() || '')
      ).toUpperCase())
      return finalIntials
    }
  }

  // let name = splittedURL[0]
  // let initials = name.match(/\b\w/g) || []
  // initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()

  return (
    // <img className="avatar avatar-xs rounded-circle" src={item.image} alt={item.nameSurname} />
    <EmailAvatarContainer>
      {/* <>{finalIntials}</> */}
      {intialCreator(avatarURL)}
    </EmailAvatarContainer>
  )
}

export default EmailAvatar
