import axios, { AxiosResponse } from 'axios'
import Session from 'supertokens-auth-react/recipe/session'
import { BASE_API_URL, errorHandling } from './api'

Session.addAxiosInterceptors(axios)

interface UserType {
  emailAddress?: string | null
  historyId?: string | null
  messagesTotal?: number | null
  threadsTotal?: number | null
}

interface UserPromise {
  config: any
  method: any
  data: {
    data: UserType
  }
  headers: any
  request: any
  status: number
  statusText: string
}

const userApi = () => ({
  fetchUser: async () => {
    try {
      const res: AxiosResponse<UserPromise> = await axios.get(
        `${BASE_API_URL}/api/user`
      )
      return res
    } catch (err: any) {
      // console.log(err.message)
      return errorHandling(err)
    }
  },
})

export default userApi
