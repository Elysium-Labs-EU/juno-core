import { AxiosResponse } from 'axios'
import { errorHandling, fetchToken, instance } from './api'

const historyApi = () => ({
  listHistory: async (startHistoryId: string) => {
    try {
      const res: AxiosResponse<any> = await instance.get(`/api/history`, {
        params: {
          startHistoryId,
        },
        headers: {
          Authorization: fetchToken(),
        },
      })
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
})

export default historyApi
