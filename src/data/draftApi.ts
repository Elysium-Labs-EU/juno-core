import { AxiosResponse } from 'axios'
import { errorHandling, instance } from 'data/api'

const draftApi = (signal?: AbortSignal) => ({
  createDrafts: async (data: FormData) => {
    try {
      const res = await instance.post(`/api/create-draft`, data)
      return res
    } catch (err) {
      console.error(err)
      return errorHandling(err)
    }
  },

  updateDrafts: async ({
    id,
    formData,
  }: {
    id: string
    formData: FormData
  }) => {
    try {
      const res: AxiosResponse<any> = await instance.put(
        `/api/update-draft/${id}`,
        formData
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

  sendDraft: async (data: { id: string; timeOut: number }) => {
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
