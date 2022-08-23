import { AxiosResponse } from 'axios'
import { errorHandling, instance } from './api'

const messageApi = () => ({
  getMessageDetail: async (messageId: string) => {
    try {
      const res: AxiosResponse<any> = await instance.get(
        `/api/message/${messageId}`
      )
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },

  getAttachment: async ({
    messageId,
    attachmentId,
  }: {
    messageId: string
    attachmentId: string
  }) => {
    try {
      const res: AxiosResponse<any> = await instance.get(
        `/api/message/attachment/${messageId}/${attachmentId}`
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },

  sendMessage: async (data: any) => {
    try {
      const res: AxiosResponse<any> = await instance.post(
        `/api/send-message`,
        data
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
  updateMessage: async ({ messageId, request }: any) => {
    try {
      const res: AxiosResponse<any> = await instance.patch(
        `/api/message/${messageId}`,
        request
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
  thrashMessage: async ({ messageId }: { messageId: string }) => {
    const data = {}
    try {
      const res: AxiosResponse<any> = await instance.post(
        `/api/message/thrash/${messageId}`,
        data
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
  deleteMessage: async (messageId: string) => {
    try {
      const res: AxiosResponse<any> = await instance.delete(`/api/message/`, {
        data: { id: messageId },
      })
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },
})

export default messageApi
