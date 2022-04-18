import axios, { AxiosResponse } from 'axios'
import { BASE_API_URL, errorHandling, fetchToken } from './api'

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
  authenticateUser: async () => {
    try {
      const res: AxiosResponse<UserPromise> = await axios.post(
        `${BASE_API_URL}/api/auth`
      )
      return res
    } catch (err: any) {
      // console.log(err.message)
      return errorHandling(err)
    }
  },
  fetchUser: async () => {
    try {
      const res: AxiosResponse<UserPromise> = await axios.get(
        `${BASE_API_URL}/api/user`,
        {
          headers: {
            Authorization: fetchToken(),
          },
        }
      )
      return res
    } catch (err: any) {
      // console.log(err.message)
      return errorHandling(err)
    }
  },
})

export default userApi
