import * as global from '../constants/globalConstants'

export const BASE_API_URL = process.env.REACT_APP_BACKEND_URL

export const fetchToken = () => {
  const token = localStorage.getItem(global.GOOGLE_TOKEN)
  if (token) {
    return token
  }
  return ''
}

export const errorHandeling = (err: any) => {
  console.log(err)
  if (process.env.NODE_ENV === 'development') {
    console.error(err)
    if (err.response) {
      return err.response.data
    }
  }
  return err.response.data
}
