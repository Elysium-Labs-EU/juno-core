import { instance } from 'data/api'
import type { TemplateApiResponse } from 'data/api'
import type { TGmailV1SchemaSendAsSchema } from 'store/storeTypes/gmailBaseTypes/gmailTypes'

import { errorBlockTemplate } from './api'

const settingsApi = () => ({
  updateSendAs: async (
    emailId: string,
    request: { signature: string }
  ): TemplateApiResponse<TGmailV1SchemaSendAsSchema> => {
    try {
      const res = await instance.put<TGmailV1SchemaSendAsSchema>(
        `/api/settings/updateSendAs`,
        {
          params: {
            emailId,
            request,
          },
        }
      )
      return res
    } catch (err) {
      return errorBlockTemplate(err)
    }
  },
})

export default settingsApi
