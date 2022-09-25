import * as global from '../constants/globalConstants'

const handleUserTokens = (response?: any) => ({
  setIdToken: () => {
    localStorage.setItem(global.ID_TOKEN, JSON.stringify(response.data.idToken))
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
  },
})

export default handleUserTokens
