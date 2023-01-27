import axios from 'axios'

import type { ICustomError } from 'store/storeTypes/baseTypes'
import type { TGmailV1SchemaMessageSchema } from 'store/storeTypes/gmailBaseTypes/gmailTypes'

import { errorHandling, instance } from './api'
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
      const res = await instance.get<any>(
        `/api/message/attachment/${messageId}/${attachmentId}`
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
      if (axios.isAxiosError(err)) {
        return errorHandling(err)
      }
      // Handle unexpected error
      return err as ICustomError
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
      if (axios.isAxiosError(err)) {
        return errorHandling(err)
      }
      // Handle unexpected error
      return err as ICustomError
    }
  },
})

export default messageApi
