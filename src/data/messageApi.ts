import type { TGmailV1SchemaMessageSchema } from 'store/storeTypes/gmailBaseTypes/gmailTypes'

import { errorBlockTemplate, instance } from './api'
import type { TemplateApiResponse } from './api'

const messageApi = () => ({
  getAttachment: async ({
    messageId,
    attachmentId,
  }: {
    messageId: string
    attachmentId: string
  }): TemplateApiResponse<any> => {
    try {
      const res = await instance.get(
        `/api/message/attachment/${messageId}/${attachmentId}`
      )
      return res
    } catch (err) {
      return errorBlockTemplate(err)
    }
  },

  sendMessage: async ({
    data,
    timeOut,
  }: {
    data: FormData
    timeOut: number
  }): TemplateApiResponse<TGmailV1SchemaMessageSchema> => {
    try {
      const res = await instance.post<TGmailV1SchemaMessageSchema>(
        `/api/send-message`,
        {
          data,
          timeOut,
        }
      )
      return res
    } catch (err) {
      return errorBlockTemplate(err)
    }
  },
  thrashMessage: async ({
    messageId,
  }: {
    messageId: string
  }): TemplateApiResponse<TGmailV1SchemaMessageSchema> => {
    const data = {}
    try {
      const res = await instance.post<TGmailV1SchemaMessageSchema>(
        `/api/message/thrash/${messageId}`,
        data
      )
      return res
    } catch (err) {
      return errorBlockTemplate(err)
    }
  },
})

export default messageApi
