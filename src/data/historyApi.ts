import { z } from 'zod'

import { instance } from 'data/api'
import type { TemplateApiResponse } from 'data/api'
import { EmailListObject } from 'store/storeTypes/emailListTypes'
import type { TEmailListObject } from 'store/storeTypes/emailListTypes'
import type { TLabelState } from 'store/storeTypes/labelsTypes'

import { errorBlockTemplate } from './api'

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
      return errorBlockTemplate(err)
    }
  },
})

export default historyApi
