import axios, { AxiosRequestConfig } from 'axios'
import * as global from '../constants/globalConstants'
import assertNonNullish from '../utils/assertNonNullish'

assertNonNullish(
  import.meta.env.VITE_BACKEND_URL,
  'Unable to find API key in environment'
)

export const BASE_API_URL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '')

export const fetchToken = () => {
  const token = localStorage.getItem(global.ID_TOKEN)
  if (token) {
    return token
  }
  return ''
}
export const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_API_URL,
})

/**
 * Set an accessToken for all the urls within the system, barring the Google oAuth API and external api.
 */
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const accessToken = fetchToken()
    if (
      accessToken &&
      config.headers &&
      !config.url?.includes(`/api/auth/oauth/google/`) &&
      !config.url?.includes(import.meta.env.VITE_HEADLESS_FEEDBACK_URL)
    ) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `${accessToken}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export const errorHandling = async (err: any) => {
  process.env.NODE_ENV === 'development' && console.error(err)
  const originalRequest = err.config
  if (
    err?.response?.data === global.INVALID_TOKEN &&
    !err?.response?.request?.responseURL.includes('/refresh') &&
    !originalRequest.isRetry
  ) {
    originalRequest.isRetry = true
  }
  return err?.response?.data ?? err?.message
}
