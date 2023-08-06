import { z } from 'zod'

import { fetchWrapper } from 'data/api'
import { EmailListObject } from 'store/storeTypes/emailListTypes'
import type { TEmailListObject } from 'store/storeTypes/emailListTypes'
import type { TLabelState } from 'store/storeTypes/labelsTypes'

const historyApi = () => ({
  listHistory: (startHistoryId: number, storageLabels: TLabelState['storageLabels']) =>
    fetchWrapper<Array<TEmailListObject>>(
      `/api/history`,
      {
        method: 'POST',
        body: {
          startHistoryId,
          storageLabels,
        }
      },
      z.array(EmailListObject)
    )
})

export default historyApi
