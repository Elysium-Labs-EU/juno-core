import { AxiosResponse } from 'axios'
import { errorHandling, fetchToken, instance } from './api'

const draftApi = (signal?: AbortSignal) => ({
  createDrafts: async (data: any) => {
    try {
      const res = await instance.post(`/api/create-draft`, data, {
        headers: {
          Authorization: fetchToken(),
        },
      })
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },

  updateDrafts: async (data: any) => {
    const { draftId } = data
    try {
      const res: AxiosResponse<any> = await instance.put(
        `/api/update-draft/${draftId}`,
        data,
        {
          headers: {
            Authorization: fetchToken(),
          },
        }
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },

  getDrafts: async () => {
    try {
      const res: AxiosResponse<any> = await instance.get(`/api/drafts/`, {
        headers: {
          Authorization: fetchToken(),
        },
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
        `/api/draft/${draftId}`,
        {
          headers: {
            Authorization: fetchToken(),
          },
        }
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
        data,
        {
          headers: {
            Authorization: fetchToken(),
          },
        }
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
        headers: {
          Authorization: fetchToken(),
        },
      })
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
})

export default draftApi
