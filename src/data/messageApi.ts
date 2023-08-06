import type { TGmailV1SchemaMessageSchema } from 'store/storeTypes/gmailBaseTypes/gmailTypes'

import { fetchWrapper } from './api'

const messageApi = () => ({
  getAttachment: ({ messageId, attachmentId }: { messageId: string; attachmentId: string }) =>
    fetchWrapper(
      `/api/message/attachment/${messageId}/${attachmentId}`,
      { method: 'GET' }
    ),

  sendMessage: ({ data, timeOut }: { data: FormData; timeOut: number }) =>
    fetchWrapper<TGmailV1SchemaMessageSchema>(
      `/api/send-message`,
      {
        method: 'POST',
        body: { data, timeOut }
      }
    ),

  thrashMessage: (messageId: string) =>
    fetchWrapper<TGmailV1SchemaMessageSchema>(
      `/api/message/thrash/${messageId}`,
      {
        method: 'POST',
        body: {}
      }
    )
})

export default messageApi
