import { useEffect, useState } from 'react'
import { push } from 'redux-first-history'
// import isElectron from 'is-electron'
import { useAppDispatch } from '../../store/hooks'
import * as S from './LoginStyles'
import * as HS from '../MainHeader/HeaderStyles'
import * as GS from '../../styles/globalStyles'
import AnimatedMountUnmount from '../../utils/animatedMountUnmount'
import GoogleButton from './GoogleButton/GoogleButton'
import userApi from '../../data/userApi'
import useCountDownTimer from '../../hooks/useCountDownTimer'

const TITLE = 'Login'
const SUB_HEADER = 'To get started with Juno'
const ENTER_HINT = 'use Enter to start'

const Login = () => {
  const dispatch = useAppDispatch()
  const [loginUrl, setLoginUrl] = useState<string | null>(null)
  const { countDown } = useCountDownTimer({ startSeconds: 5 })

  const fetchUrl = async () => {
    // A flag that can be set via the .env variable. If this is set, and witht the value of true, the auth mechanism will be changed.
    const response = await userApi().authGoogle(import.meta.env.VITE_USE_LOCAL_FRONTEND_CLOUD_BACKEND === 'true')
    if (response?.status === 200) {
      setLoginUrl(response.data)
    }
  }

  useEffect(() => {
    let mounted = true
    if (mounted && countDown === 0 && !loginUrl) {
      fetchUrl()
    }
    return () => {
      mounted = false
    }
  }, [countDown, loginUrl])

  const signInWithGoogle = () => {
    if (loginUrl) {
      // return isElectron()  :
      dispatch(push(loginUrl))
    }
    // return null
  }

  useEffect(() => {
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
            </S.Header>
            <GoogleButton
              renderProps={{
                onClick: signInWithGoogle,
                disabled: loginUrl === null,
              }}
            />
            <GS.TextMutedSmall>{ENTER_HINT}</GS.TextMutedSmall>
          </S.Inner>
        </S.LoginContainer>
      </AnimatedMountUnmount>
    </S.Wrapper>
  )
}

export default Login
