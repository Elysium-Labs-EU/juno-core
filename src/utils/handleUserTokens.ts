import setCookie from './Cookie/setCookie'
import * as global from '../constants/globalConstants'
import removeCookie from './Cookie/removeCookie'

const handleUserTokens = (response?: any) => ({
  setBothTokens: () => {
    setCookie(global.SESSION_TOKEN, response.data.access_token, 30)
    localStorage.setItem(global.REFRESH_TOKEN, response.data.refresh_token)
  },
  setAccessToken: () => {
    setCookie(global.SESSION_TOKEN, response.data.access_token, 30)
  },
  removeAllTokens: () => {
    removeCookie(global.SESSION_TOKEN)
    localStorage.clear()
  },
})

export default handleUserTokens
