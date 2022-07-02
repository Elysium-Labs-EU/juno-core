import axios from 'axios'
// import { handleLogout } from '../components/MainHeader/Navigation/More/Options/LogoutOption'
import * as global from '../constants/globalConstants'
import assertNonNullish from '../utils/assertNonNullish'
import getCookie from '../utils/Cookie/getCookie'

assertNonNullish(
  import.meta.env.VITE_BACKEND_URL,
  'Unable to find API key in environment'
)

export const BASE_API_URL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '')

export const fetchToken = () => {
  const token = getCookie(global.ACCESS_TOKEN)
  if (token) {
    return token
  }
  return ''
}
export const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_API_URL,
})

export const errorHandling = async (err: any) => {
  console.error(err)
  const originalRequest = err.config
  if (
    err?.response?.data === global.INVALID_TOKEN &&
    !err?.response?.request?.responseURL.includes('/refresh') &&
    !originalRequest.isRetry
  ) {
    originalRequest.isRetry = true
    // const refreshToken = localStorage.getItem(global.REFRESH_TOKEN)
    // const body = { refresh: refreshToken }
    // console.log(body)
    // const response = await getRefreshToken(body)
    // if (response?.status === 200) {
    //   handleUserTokens(response).setBothTokens()
    //   return axios(originalRequest)
    // }
  }
  // if (err.response.data === global.INVALID_SESSION) {
  //   console.log(global.INVALID_SESSION)
  //   // handleLogout()
  // }
  return err?.response?.data ?? err?.message
}
