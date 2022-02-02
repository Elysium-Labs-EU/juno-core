import GoogleLogin from 'react-google-login'
import { push } from 'redux-first-history'
// import userApi from '../../data/userApi'
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

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
const TITLE = 'Login'
const SUB_HEADER = 'To get started with Juno, log in with Google'
const ERROR_LOADING = 'Cannot load login. Try again later.'

// const SCOPES = [
//   'https://mail.google.com',
//   'https://www.googleapis.com/auth/gmail.addons.current.message.action',
//   'https://www.googleapis.com/auth/gmail.addons.current.message.readonly',
//   'https://www.googleapis.com/auth/gmail.modify',
//   'https://www.googleapis.com/auth/gmail.readonly',
//   'https://www.googleapis.com/auth/gmail.modify',
//   'https://www.googleapis.com/auth/gmail.compose',
//   'https://www.googleapis.com/auth/gmail.send',
//   'https://www.googleapis.com/auth/contacts.other.readonly',
// ]

const Login = () => {
  const dispatch = useAppDispatch()
  const serviceUnavailable = useAppSelector(selectServiceUnavailable)

  const responseGoogle = async (response: any) => {
    localStorage.setItem(global.GOOGLE_TOKEN, JSON.stringify(response.tokenObj))
    // const test2 = await userApi().authUser(response)
    // console.log('here', test2)
    dispatch(setIsAuthenticated(true))
    dispatch(push(RouteConstants.HOME))
  }

  const handleFailure = () => {
    dispatch(setServiceUnavailable('Unable to login'))
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
            {CLIENT_ID && serviceUnavailable.length === 0 ? (
              <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={handleFailure}
                cookiePolicy="single_host_origin"
                theme="dark"
                accessType="offline"
              />
            ) : (
              <>
                <p>{ERROR_LOADING}</p>
                {serviceUnavailable.length > 0 && <p>{serviceUnavailable}</p>}
              </>
            )}
          </S.Inner>
        </S.LoginContainer>
      </AnimatedMountUnmount>
    </S.Wrapper>
  )
}

export default Login
