import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
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
  import.meta.env.VITE_USE_SESSION as string | null | undefined
)

const BASE_API_URL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '')

interface FetchOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: HeadersInit
  body?: any
}

interface ResponseType<T>
  extends Pick<Response, 'status' | 'statusText' | 'headers' | 'url'> {
  data: T
}

export const fetchToken = () => {
  if (import.meta.env.VITE_USE_SESSION === 'true') {
    const token = localStorage.getItem(global.ID_TOKEN)
    if (token) {
      return token
    }
    return null
  }
  const credentials = localStorage.getItem(global.CREDENTIALS)
  if (credentials) {
    return credentials
  }
  return null
}

export async function fetchWrapper<T>(
  url: string,
  options: FetchOptions,
  schema?: z.ZodSchema<T>
): Promise<ResponseType<T> | undefined> {
  console.log(options)
  try {
    const defaultHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }

    if (!url.includes('/api/auth/oauth/google/callback/')) {
      const token = fetchToken()
      if (token) {
        defaultHeaders.Authorization = `${token}`
      }
    }

    const fetchOptions: RequestInit = {
      method: options.method,
      headers: { ...defaultHeaders, ...options.headers },
    }

    console.log({ fetchOptions })

    if (options.body) {
      fetchOptions.body = JSON.stringify(options.body)
    }

    const res = await fetch(`${BASE_API_URL}${url}`, fetchOptions)

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    console.log(res)
    const data = await res.json()
    schema.parse(data)
    const response = {
      data,
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
      url: res.url,
    }
    return response
  } catch (err) {
    console.error(err)
    return undefined
  }
}



export const instance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 4000,
  withCredentials:
    import.meta.env.VITE_USE_SESSION === 'false',
})

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
      !config.url?.includes(`/api/auth/oauth/google/`)
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

export const errorHandling = (err: any) => {
  // eslint-disable-next-line no-console
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
    // eslint-disable-next-line no-console
    console.error(err.issues)
  }
  // Handle unexpected error
  return err as ICustomError
}
