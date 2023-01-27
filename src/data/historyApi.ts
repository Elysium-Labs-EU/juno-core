import axios from 'axios'
import { z } from 'zod'

import { errorHandling, instance } from 'data/api'
import type { TemplateApiResponse } from 'data/api'
import type { ICustomError } from 'store/storeTypes/baseTypes'
import { EmailListObject } from 'store/storeTypes/emailListTypes'
import type { TEmailListObject } from 'store/storeTypes/emailListTypes'
import type { TLabelState } from 'store/storeTypes/labelsTypes'

const historyApi = () => ({
  listHistory: async (
    startHistoryId: number,
    storageLabels: TLabelState['storageLabels']
  ): TemplateApiResponse<Array<TEmailListObject>> => {
    try {
      const res = await instance.post<Array<TEmailListObject>>(`/api/history`, {
        params: {
          startHistoryId,
          storageLabels,
        },
      })
      z.array(EmailListObject).parse(res.data)
      return res
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return errorHandling(err)
      }
      // Handle unexpected error
      return err as ICustomError
    }
  },
})

export default historyApi
