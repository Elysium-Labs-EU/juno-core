/* eslint-disable no-nested-ternary */
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login'
import { push } from 'redux-first-history'
import isElectron from 'is-electron'
import RouteConstants from '../../constants/routes.json'
import { setIsAuthenticated } from '../../Store/baseSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import * as global from '../../constants/globalConstants'
import * as S from './LoginStyles'
import * as HS from '../MainHeader/HeaderStyles'
import AnimatedMountUnmount from '../../utils/animatedMountUnmount'
import {
  selectServiceUnavailable,
  setServiceUnavailable,
} from '../../Store/utilsSlice'
import setCookie from '../../utils/Cookie/setCookie'
// import GoogleButton from './GoogleButton/GoogleButton'
import userApi from '../../data/userApi'
import handleUserTokens from '../../utils/handleUserTokens'
// import { signInWithGoogle } from '../../Firebase/firebase'
// import { signInWithGoogle2 } from '../../Firebase/firebaseManual'

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
const TITLE = 'Login'
const SUB_HEADER = 'To get started with Juno, log in with Google'
const ERROR_LOADING = 'Cannot load login. Try again later.'
const ELECTRON_WARNING =
  "The current login doesn't work yet with the Electron app. Please use the web version."

const SCOPES = [
  'openid',
  'profile',
  'https://mail.google.com',
  'https://www.googleapis.com/auth/gmail.addons.current.message.action',
  'https://www.googleapis.com/auth/gmail.addons.current.message.readonly',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/contacts.other.readonly',
]

interface IOnFailure {
  error: string
}

const thisIsElectron = isElectron()

const Login = () => {
  const dispatch = useAppDispatch()
  const serviceUnavailable = useAppSelector(selectServiceUnavailable)

  const handleSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const onlineGoogleResponse = response as GoogleLoginResponse
    setCookie(global.GOOGLE_TOKEN, onlineGoogleResponse.tokenObj, 30)
    dispatch(setIsAuthenticated(true))
    dispatch(push(RouteConstants.HOME))
  }

  const handleFailure = (data: IOnFailure) => {
    dispatch(setServiceUnavailable(`Unable to login - ${data.error}`))
  }

  const signInWithGoogle = () => {
    const fetchData = async () => {
      const response = await userApi().authenticateUser()
      handleUserTokens(response).setBothTokens()
      dispatch(setIsAuthenticated(true))
      dispatch(push(RouteConstants.HOME))
      console.log(response)
    }
    fetchData()
  }

  return (
    <S.Wrapper>
      <AnimatedMountUnmount>
        <S.LoginContainer>
          <S.Inner>
            <S.Header>
              <HS.PageTitle>{TITLE}</HS.PageTitle>
              <p>{SUB_HEADER}</p>
            </S.Header>
            <button type="button" onClick={signInWithGoogle}>
              Sign in with google
            </button>{' '}
            :
          </S.Inner>
        </S.LoginContainer>
      </AnimatedMountUnmount>
    </S.Wrapper>
  )
}

export default Login
