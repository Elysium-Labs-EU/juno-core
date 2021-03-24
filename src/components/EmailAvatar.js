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
  const splittedURL = avatarURL.split('<')

  // const matchedURL = splittedURL.match(/.com/g)

  // function grabAvatar() {
  //     let `http://s2.googleusercontent.com/s2/favicons?domain_url=http://{splittedURL}`
  // }

  let name = splittedURL[0]
  // var name = 'Foo Bar 1Name too Long';
  let initials = name.match(/\b\w/g) || []
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
  // console.log(initials);

  // console.log("splittedURL", splittedURL[0])
  // console.log("matchedURL", matchedURL)

  return (
    // <img className="avatar avatar-xs rounded-circle" src={item.image} alt={item.nameSurname} />
    <EmailAvatarContainer>
      <>{initials}</>
    </EmailAvatarContainer>
  )
}

export default EmailAvatar
