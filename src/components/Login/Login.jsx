import React from 'react'
import GoogleLogin from 'react-google-login'
import * as S from './LoginStyles'

const LOGIN_HEADER = 'Log In to Juno'
const GOOGLE = 'Log In with Google'
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

const responseGoogle = (response) => {
  console.log(response)
}

const Login = () => {
  return (
    <S.LoginWrapper>
      Test
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      />
    </S.LoginWrapper>
  )
}
export default Login
