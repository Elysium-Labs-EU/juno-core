import axios, { AxiosResponse } from 'axios'
import Session from 'supertokens-auth-react/recipe/session'
import { BASE_API_URL, errorHandling } from './api'

Session.addAxiosInterceptors(axios)

const draftApi = (signal?: AbortSignal) => ({
  createDrafts: async (data: any) => {
    try {
      const res = await axios.post(`${BASE_API_URL}/api/create-draft`, data)
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },

  updateDrafts: async (data: any) => {
    const { draftId } = data
    try {
      const res: AxiosResponse<any> = await axios.put(
        `${BASE_API_URL}/api/update-draft/${draftId}`,
        data
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },

  getDrafts: async () => {
    try {
      const res: AxiosResponse<any> = await axios.get(
        `${BASE_API_URL}/api/drafts/`,
        {
          signal,
        }
      )
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },

  getDraftDetail: async (draftId: string) => {
    try {
      const res: AxiosResponse<any> = await axios.get(
        `${BASE_API_URL}/api/draft/${draftId}`
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },

  sendDraft: async (data: any) => {
    try {
      const res: AxiosResponse<any> = await axios.post(
        `${BASE_API_URL}/api/send-draft`,
        data
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },

  deleteDraft: async (id: string) => {
    try {
      const res: AxiosResponse<any> = await axios.delete(
        `${BASE_API_URL}/api/draft`,
        {
          data: { id },
        }
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
})

export default draftApi
