/* eslint-disable no-console */
import { CREDENTIALS, ID_TOKEN } from 'constants/globalConstants'
import removeCookie from 'utils/removeCookie'

const possibleAuthLocalStorageItems = { CREDENTIALS, ID_TOKEN } as const

const handleUserTokens = (response?: any) => ({
  setIdToken: () => {
    try {
      localStorage.setItem(ID_TOKEN, response.data.idToken)
    } catch (error) {
      console.error('Error setting item to localStorage:', error)
    }
  },
  // Only used when the VITE_USE_LOCAL_FRONTEND_CLOUD_BACKEND is true
  setCredentials: () => {
    try {
      localStorage.setItem(
        CREDENTIALS,
        JSON.stringify(response.data.credentials)
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
