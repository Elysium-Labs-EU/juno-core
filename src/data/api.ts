import * as global from '../constants/globalConstants'
import getCookie from '../utils/Cookie/getCookie'

export const BASE_API_URL = process.env.REACT_APP_BACKEND_URL!.replace(
  /\/$/,
  ''
)

export const fetchToken = () => {
  const token = getCookie(global.GOOGLE_TOKEN)
  if (token) {
    return token
  }
  return ''
}

export const errorHandling = (err: any) => {
  console.log(err)
  if (process.env.NODE_ENV === 'development') {
    console.error(err)
    if (err.response) {
      return err.response.data
    }
  }
  return err.response.data
}
