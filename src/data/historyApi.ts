import type { AxiosResponse } from 'axios'

import { errorHandling, instance } from 'data/api'
import type { ILabelIdName } from 'store/storeTypes/labelsTypes'

const historyApi = () => ({
  listHistory: async (startHistoryId: number, storageLabels: ILabelIdName[]) => {
    try {
      const res: AxiosResponse<any> = await instance.post(`/api/history`, {
        params: {
          startHistoryId,
          storageLabels,
        },
      })
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
})

export default historyApi
