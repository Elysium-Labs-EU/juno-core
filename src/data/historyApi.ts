import axios, { AxiosResponse } from 'axios'
import { BASE_API_URL, errorHandling, fetchToken } from './api'

const historyApi = () => ({
  listHistory: async (startHistoryId: string) => {
    try {
      const res: AxiosResponse<any> = await axios.get(
        `${BASE_API_URL}/api/history`,
        {
          params: {
            startHistoryId,
          },
          headers: {
            Authorization: fetchToken(),
          },
        }
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
})

export default historyApi
