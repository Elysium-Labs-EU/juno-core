import { useEffect, useState } from 'react'
import { push } from 'redux-first-history'
import { useAppDispatch } from '../../Store/hooks'
import * as S from './LoginStyles'
import * as HS from '../MainHeader/HeaderStyles'
import AnimatedMountUnmount from '../../utils/animatedMountUnmount'
import { setServiceUnavailable } from '../../Store/utilsSlice'
import GoogleButton from './GoogleButton/GoogleButton'
import userApi from '../../data/userApi'

const TITLE = 'Login'
const SUB_HEADER = 'To get started with Juno, log in with Google'

interface IOnFailure {
  error: string
}

const Login = () => {
  const dispatch = useAppDispatch()
  const [loginUrl, setLoginUrl] = useState<string | null>(null)

  const handleFailure = (data: IOnFailure) => {
    dispatch(setServiceUnavailable(`Unable to login - ${data.error}`))
  }

  const signInWithGoogle = () => {
    if (loginUrl) {
      dispatch(push(loginUrl))
    }
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
