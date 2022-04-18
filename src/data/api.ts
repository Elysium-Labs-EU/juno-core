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

export const errorHandling = (err: any) =>
  // if (process.env.NODE_ENV === 'development') {
  //   if (err.response) {
  //     return err.response.data
  //   }
  // }
  err.message
