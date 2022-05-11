import axios from 'axios'
import { handleLogout } from '../components/MainHeader/Navigation/More/Options/LogoutOption'
import * as global from '../constants/globalConstants'
import assertNonNullish from '../utils/assertNonNullish'
import getCookie from '../utils/Cookie/getCookie'

assertNonNullish(
  process.env.REACT_APP_BACKEND_URL,
  'Unable to find API key in environment'
)

export const BASE_API_URL = process.env.REACT_APP_BACKEND_URL.replace(/\/$/, '')

export const fetchToken = () => {
  const token = getCookie(global.SESSION_TOKEN)
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
  // console.log(err)
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
  // if (
  //   err.response.data === global.INVALID_TOKEN &&
  //   err.response.request.responseURL.includes('/refresh')
  // ) {
  //   console.log(global.INVALID_TOKEN)
  //   // handleLogout()
  // }
  // if (err.response.data === global.INVALID_SESSION) {
  //   console.log(global.INVALID_SESSION)
  //   // handleLogout()
  // }
  return err?.response?.data ?? err?.message
}
