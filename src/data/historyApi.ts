import { AxiosResponse } from 'axios'
import { errorHandling, instance } from './api'

const historyApi = () => ({
  listHistory: async (startHistoryId: number) => {
    try {
      const res: AxiosResponse<any> = await instance.get(`/api/history`, {
        params: {
          startHistoryId,
        },
      })
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
})

export default historyApi
