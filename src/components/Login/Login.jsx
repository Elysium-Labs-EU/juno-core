import React, { useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import GoogleButton from 'react-google-button'
import Cookie from 'js-cookie'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import * as S from './LoginStyles'
import * as local from '../../constants/loginConstants'
import {
  selectIsAuthenticated,
  setIsAuthenticated,
} from '../../Store/baseSlice'
import userApi from '../../data/userApi'

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

const Login = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const history = useHistory()
  const dispatch = useDispatch()

  const responseGoogle = async (response) => {
    console.log(response)
    if (response && response.accessToken) {
      const { accessToken } = response
      console.log(accessToken)
      const authUser = await userApi().authGoogle(accessToken)
      console.log(authUser)
      // Cookie.set('token', token)
      // localStorage.setItem('accessToken', accessToken)
      // dispatch(setIsAuthenticated(true))
    }
  }

  const fetchAuthUser = async () => {
    const response = await axios
      .get('http://localhost:5000/api/v1/auth/user', { withCredentials: true })
      .catch((err) => {
        console.error(err)
        console.log('Not properly authenticated')
        dispatch(setIsAuthenticated(false))
        // dispatch(setAuthUser(null))
        history.push('/login/error')
      })

    if (response && response.data) {
      console.log('User: ', response.data)
      dispatch(setIsAuthenticated(true))
      localStorage.setItem('accessToken', response.data.accessToken)
      // dispatch(setAuthUser(response.data))
      history.push('/')
    }
  }

  const redirectToGoogleSSO = async () => {
    let timer = null
    const googleLoginURL = 'http://localhost:5000/api/v1/login/google'
    const newWindow = window.open(
      googleLoginURL,
      '_blank',
      'width=500,height=600'
    )

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          console.log("Yay we're authenticated")
          fetchAuthUser()
          if (timer) clearInterval(timer)
        }
      }, 500)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/')
    }
  }, [isAuthenticated])

  return (
    <S.LoginWrapper>
      <S.LoginContainer>
        <S.Inner>
          <h2>{local.LOGIN_HEADER}</h2>
          <p className="text_muted">{local.LOGIN_SUB}</p>
          <S.ButtonContainer>
            {/* <GoogleLogin
              // clientId={CLIENT_ID}
              buttonText={local.GOOGLE}
              // onSuccess={responseGoogle}
              // onFailure={responseGoogle}
              // cookiePolicy="single_host_origin"
              // scope={local.SCOPES}
              // isSignedIn
              // // uxMode={local.UX_MODE_RED}
            /> */}
            <GoogleButton onClick={redirectToGoogleSSO} />
          </S.ButtonContainer>
        </S.Inner>
      </S.LoginContainer>
    </S.LoginWrapper>
  )
}
export default Login
