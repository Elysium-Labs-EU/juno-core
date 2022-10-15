import * as global from '../constants/globalConstants'
import removeCookie from './cookie/removeCookie'

const handleUserTokens = (response?: any) => ({
  setIdToken: () => {
    localStorage.setItem(global.ID_TOKEN, response.data.idToken)
  },
  // Only used when the VITE_USE_LOCAL_FRONTEND_CLOUD_BACKEND is true
  setCredentials: () => {
    localStorage.setItem(
      global.CREDENTIALS,
      JSON.stringify(response.data.credentials)
    )
  },
  removeAllTokens: () => {
    localStorage.clear()
    removeCookie('junoSession')
  },
})

export default handleUserTokens
