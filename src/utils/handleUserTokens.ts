import * as global from '../constants/globalConstants'

const handleUserTokens = (response?: any) => ({
  setIdToken: () => {
    localStorage.setItem(global.ID_TOKEN, JSON.stringify(response.data.idToken))
  },
  removeAllTokens: () => {
    localStorage.clear()
  },
})

export default handleUserTokens
