import { useEffect, useState } from 'react'
import { push } from 'redux-first-history'
// import isElectron from 'is-electron'
import { useAppDispatch } from '../../Store/hooks'
import * as S from './LoginStyles'
import * as HS from '../MainHeader/HeaderStyles'
import * as GS from '../../styles/globalStyles'
import AnimatedMountUnmount from '../../utils/animatedMountUnmount'
import GoogleButton from './GoogleButton/GoogleButton'
import userApi from '../../data/userApi'

const TITLE = 'Login'
const SUB_HEADER = 'To get started with Juno, log in with Google'
const ENTER_HINT = 'use Enter to start'

const Login = () => {
  const dispatch = useAppDispatch()
  const [loginUrl, setLoginUrl] = useState<string | null>(null)

  const signInWithGoogle = () => {
    if (loginUrl) {
      // return isElectron()  :
      dispatch(push(loginUrl))
    }
    // return null
  }

  useEffect(() => {
    const fetchUrl = async () => {
      const response = await userApi().authGoogle()
      if (response?.status === 200) {
        setLoginUrl(response.data)
      }
    }
    fetchUrl()
  }, [])

  return (
    <S.Wrapper>
      <AnimatedMountUnmount>
        <S.LoginContainer>
          <S.Inner>
            <S.Header>
              <HS.PageTitle>{TITLE}</HS.PageTitle>
              <p>{SUB_HEADER}</p>
              <GS.TextMutedSmall>{ENTER_HINT}</GS.TextMutedSmall>
            </S.Header>
            <GoogleButton
              renderProps={{
                onClick: signInWithGoogle,
                disabled: loginUrl === null,
              }}
            />
          </S.Inner>
        </S.LoginContainer>
      </AnimatedMountUnmount>
    </S.Wrapper>
  )
}

export default Login
