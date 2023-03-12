import axios, { AxiosError } from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axiosRetry from 'axios-retry'
import { z } from 'zod'

import * as global from 'constants/globalConstants'
import type { ICustomError } from 'store/storeTypes/baseTypes'
import assertNonNullish from 'utils/assertNonNullish'
import validateLocalSetup from 'utils/validateLocalSetup'

export type TemplateApiResponse<T> = Promise<
  AxiosResponse<T, AxiosRequestConfig> | AxiosError | ICustomError
>

export type TemplateApiResponseSettled<T> = PromiseSettledResult<
  AxiosResponse<T, AxiosRequestConfig> | AxiosError | ICustomError
>

assertNonNullish(
  import.meta.env.VITE_BACKEND_URL,
  'Unable to find backend URL in environment'
)

validateLocalSetup(
  import.meta.env.VITE_BACKEND_URL,
  import.meta.env.VITE_USE_LOCAL_FRONTEND_CLOUD_BACKEND
)

const BASE_API_URL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '')

export const fetchToken = () => {
  if (import.meta.env.VITE_USE_LOCAL_FRONTEND_CLOUD_BACKEND === 'true') {
    const credentials = localStorage.getItem(global.CREDENTIALS)
    if (credentials) {
      return credentials
    }
    return null
  }
  const token = localStorage.getItem(global.ID_TOKEN)
  if (token) {
    return token
  }
  return null
}

export const instance = axios.create({
  withCredentials:
    import.meta.env.VITE_USE_LOCAL_FRONTEND_CLOUD_BACKEND === 'false',
  baseURL: BASE_API_URL,
})
axiosRetry(instance, { retries: 3, retryDelay: axiosRetry.exponentialDelay })

/**
 * Set an accessToken for all the urls within the system, barring the Google oAuth API and external api.
 */
instance.interceptors.request.use(
  (config) => {
    // (config: AxiosRequestConfig) => {
    const accessToken = fetchToken()
    if (
      accessToken &&
      config.headers &&
      !config.url?.includes(`/api/auth/oauth/google/`) &&
      !config.url?.includes(import.meta.env.VITE_HEADLESS_FEEDBACK_URL ?? '')
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
    !originalRequest.isRetry
  ) {
    originalRequest.isRetry = true
  }
  return err?.response?.data ?? err?.message
}

export const errorBlockTemplate = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    return errorHandling(err)
  }
  if (err instanceof z.ZodError) {
    console.log(err.issues)
  }
  // Handle unexpected error
  return err as ICustomError
}
