import { fetchWrapper } from 'data/api'
import type { TGmailV1SchemaSendAsSchema } from 'store/storeTypes/gmailBaseTypes/gmailTypes'

const settingsApi = () => ({
  updateSendAs: (emailId: string, request: { signature: string }) =>
    fetchWrapper<TGmailV1SchemaSendAsSchema>(`/api/settings/updateSendAs`, {
      method: 'PUT',
      body: { emailId, ...request },
    }),
})

export default settingsApi
