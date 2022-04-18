import { AxiosResponse } from 'axios'
import { errorHandling, fetchToken, instance } from './api'

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
      const res: AxiosResponse<UserPromise> = await instance.get(`/api/auth`)
      return res
    } catch (err: any) {
      return errorHandling(err)
    }
  },
  fetchUser: async () => {
    try {
      const res: AxiosResponse<UserPromise> = await instance.get(`/api/user`, {
        headers: {
          Authorization: fetchToken(),
        },
      })
      return res
    } catch (err: any) {
      return errorHandling(err)
    }
  },
})

export default userApi
