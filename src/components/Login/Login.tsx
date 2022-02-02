import GoogleLogin from 'react-google-login'

const Login = () => {

  const responseGoogle = (response: any) => {
    console.log(response)
  }

  return <div>Login

    <GoogleLogin
      clientId="113671319507-9mhst0qa3kq4e5g55u4q8gl1af0k2dk0.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy='single_host_origin'
    />

  </div>
}

export default Login
