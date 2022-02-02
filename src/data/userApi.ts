import axios, { AxiosResponse } from 'axios'
import { BASE_API_URL, errorHandeling, fetchToken } from './api'

interface UserType {
  emailAddress: string
  historyId: string
  messagesTotal: number
  threadsTotal: number
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
        `${BASE_API_URL}/api/user`,
        {
          headers: {
            Authorization: fetchToken(),
          },
        }
      )
      return res
    } catch (err) {
      return errorHandeling(err)
    }
  },
  authUser: async (googleData: any) => {
    const body = {
      token: googleData.tokenId,
    }
    try {
      const res: AxiosResponse<any> = await axios.post(
        `${BASE_API_URL}/api/auth/google`,
        body
      )
      console.log(res)
      return res
    } catch (err) {
      return errorHandeling(err)
    }
  },
})

export default userApi
