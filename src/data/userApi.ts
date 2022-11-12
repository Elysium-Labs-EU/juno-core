import { AxiosResponse } from 'axios'
import { errorHandling, instance } from 'data/api'

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
  authGoogle: async (noSession?: boolean) => {
    try {
      const res: AxiosResponse<UserPromise> = await instance.post(
        `/api/auth/oauth/google/`,
        { noSession }
      )
      return res
    } catch (err: any) {
      return errorHandling(err)
    }
  },
  authGoogleCallback: async (body: { code?: string; state?: string }) => {
    try {
      const res: AxiosResponse<UserPromise> = await instance.post(
        `/api/auth/oauth/google/callback/`,
        body
      )
      return res
    } catch (err: any) {
      return errorHandling(err)
    }
  },
  fetchUser: async () => {
    try {
      const res: AxiosResponse<UserPromise> = await instance.get(`/api/user`)
      return res
    } catch (err: any) {
      return errorHandling(err)
    }
  },
  logoutUser: async () => {
    try {
      const res: AxiosResponse<UserPromise> = await instance.get(
        `/api/user/logout`
      )
      return res
    } catch (err: any) {
      return errorHandling(err)
    }
  },
})

export default userApi
