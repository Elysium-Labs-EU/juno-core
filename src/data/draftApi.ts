import { AxiosResponse } from 'axios'
import { errorHandling, instance } from './api'

const draftApi = (signal?: AbortSignal) => ({
  createDrafts: async (data: any) => {
    try {
      console.log('data', data)
      const res = await instance.post(`/api/create-draft`, data)
      return res
    } catch (err) {
      console.error(err)
      return errorHandling(err)
    }
  },

  updateDrafts: async (data: any) => {
    const { draftId } = data
    console.log('data2', data)
    try {
      const res: AxiosResponse<any> = await instance.put(
        `/api/update-draft/${draftId}`,
        data
      )
      return res
    } catch (err) {
      console.error(err)
      return errorHandling(err)
    }
  },

  getDrafts: async () => {
    try {
      const res: AxiosResponse<any> = await instance.get(`/api/drafts/`, {
        signal,
      })
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },

  getDraftDetail: async (draftId: string) => {
    try {
      const res: AxiosResponse<any> = await instance.get(
        `/api/draft/${draftId}`
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },

  sendDraft: async (data: { id: string }) => {
    try {
      const res: AxiosResponse<any> = await instance.post(
        `/api/send-draft`,
        data
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },

  deleteDraft: async (id: string) => {
    try {
      const res: AxiosResponse<any> = await instance.delete(`/api/draft`, {
        data: { id },
      })
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
})

export default draftApi
