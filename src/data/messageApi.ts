import { gmailV1SchemaMessagePartBodySchema, gmailV1SchemaMessageSchema, type TGmailV1SchemaMessageSchema } from 'store/storeTypes/gmailBaseTypes/gmailTypes'

import { fetchWrapper } from './api'

const messageApi = () => ({
  getAttachment: ({ messageId, attachmentId }: { messageId: string; attachmentId: string }) =>
    fetchWrapper(
      `/api/message/attachment/${messageId}/${attachmentId}`,
      { method: 'GET' },
      gmailV1SchemaMessagePartBodySchema
    ),

  sendMessage: ({ data, timeOut }: { data: FormData; timeOut: number }) =>
    fetchWrapper(
      `/api/send-message`,
      {
        method: 'POST',
        body: { data, timeOut }
      },
      gmailV1SchemaMessageSchema
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

export type MessageApiReturnType = ReturnType<typeof messageApi>

export default messageApi
