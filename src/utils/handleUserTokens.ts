import setCookie from './cookie/setCookie'
import * as global from '../constants/globalConstants'
import removeCookie from './cookie/removeCookie'

const handleUserTokens = (response?: any) => ({
  setAccessToken: () => {
    setCookie(global.ACCESS_TOKEN, response.data.access_token, 30)
  },
  removeAllTokens: () => {
    removeCookie(global.ACCESS_TOKEN)
    localStorage.clear()
  },
})

export default handleUserTokens
