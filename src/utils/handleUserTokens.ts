/* eslint-disable no-console */
import { CREDENTIALS, ID_TOKEN } from 'constants/globalConstants'
import type userApi from 'data/userApi'
import removeCookie from 'utils/removeCookie'

const possibleAuthLocalStorageItems = { CREDENTIALS, ID_TOKEN } as const

type UserApiReturnType = ReturnType<typeof userApi>

const handleUserTokens = (response?: Awaited<ReturnType<UserApiReturnType['authGoogleCallback']>>) => ({
  setIdToken: () => {
    try {
      const data = response?.data
      if (!data || typeof data === 'string' || !(data instanceof Object && 'idToken' in data)) {
        throw new Error('No idToken found in response')
      }
      localStorage.setItem(ID_TOKEN, data.idToken)
    } catch (error) {
      console.error('Error setting item to localStorage:', error)
    }
  },
  // Only used when the VITE_USE_SESSION is true
  setCredentials: () => {
    try {
      const data = response?.data
      if (!data || typeof data === 'string' || !(data instanceof Object && 'credentials' in data)) {
        throw new Error('No credentials found in response')
      }
      localStorage.setItem(
        CREDENTIALS,
        JSON.stringify(data.credentials)
      )
    } catch (error) {
      console.error('Error setting item to localStorage:', error)
    }
  },
  removeAllAuthTokens: () => {
    try {
      Object.values(possibleAuthLocalStorageItems).forEach((value) => {
        localStorage.removeItem(value)
      })
    } catch (error) {
      console.error('Error removing items from localStorage:', error)
    }
    removeCookie('junoSession')
  },
})

export default handleUserTokens
