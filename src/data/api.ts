import type { z } from 'zod'

import * as global from 'constants/globalConstants'
// import type { CustomError } from 'store/storeTypes/baseTypes'
import assertNonNullish from 'utils/assertNonNullish'
import validateLocalSetup from 'utils/validateLocalSetup'

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
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: HeadersInit
  params?: Record<string, string | number | undefined>
  body?: Record<string, unknown> | FormData
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
  try {
    const defaultHeaders: Record<string, string> = {
      Accept: 'application/json, text/plain, */*',
    }

    if (!url.includes('/api/auth/oauth/google/callback/')) {
      const token = fetchToken()
      if (token) {
        defaultHeaders.Authorization = `${token}`
      }
    }

    if (!(options.body instanceof FormData)) {
      defaultHeaders['Content-Type'] = 'application/json'
    }

    const fetchOptions: RequestInit = {
      method: options.method,
      headers: { ...defaultHeaders, ...options.headers },
    }

    if (options.body) {
      if (options.body instanceof FormData) {
        fetchOptions.body = options.body
      } else {
        fetchOptions.body = JSON.stringify(options.body)
      }
    }

    if (options.params) {
      let output = ''
      Object.keys(options.params).forEach((key) => {
        if (options.params?.[key]) {
          output += `${key}=${options.params[key]}&`
        }
      })
      url += `?${output}`
    }

    const res = await fetch(`${BASE_API_URL}${url}`, fetchOptions)

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    const data: unknown = await res.json()
    const parsedData = schema?.parse(data)

    if (parsedData instanceof Object && !('error' in parsedData)) {
      const response = {
        data: parsedData,
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
        url: res.url,
      }
      return response
    }
  } catch (err) {
    console.error(err)
    return undefined
  }
}