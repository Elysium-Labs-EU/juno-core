import axios from 'axios'

import { errorHandling, instance } from 'data/api'
import type { TemplateApiResponse } from 'data/api'
import type { ICustomError } from 'store/storeTypes/baseTypes'
import type { TGmailV1SchemaSendAsSchema } from 'store/storeTypes/gmailBaseTypes/gmailTypes'

const settingsApi = () => ({
  getSendAs: async (
    emailId: string
  ): TemplateApiResponse<TGmailV1SchemaSendAsSchema> => {
    try {
      const res = await instance.get<TGmailV1SchemaSendAsSchema>(
        `/api/settings/getSendAs`,
        {
          params: {
            emailId,
          },
        }
      )
      return res
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return errorHandling(err)
      }
      // Handle unexpected error
      return err as ICustomError
    }
  },
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
      if (axios.isAxiosError(err)) {
        return errorHandling(err)
      }
      // Handle unexpected error
      return err as ICustomError
    }
  },
})

export default settingsApi
