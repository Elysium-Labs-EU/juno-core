import axios from 'axios'
import { BASE_API_URL, errorHandeling } from './api'

const draftApi = () => {
  return {
    createDrafts: async (data) => {
      try {
        const res = await axios.post(
          `${BASE_API_URL}/api/v1/create-draft`,
          data
        )
        return res
      } catch (err) {
        return errorHandeling(err)
      }
    },

    updateDrafts: async (data) => {
      const { draftId } = data
      try {
        const res = await axios.put(
          `${BASE_API_URL}/api/v1/update-draft/${draftId}`,
          data
        )
        return res
      } catch (err) {
        return errorHandeling(err)
      }
    },

    getDrafts: async () => {
      try {
        const res = await axios.get(`${BASE_API_URL}/api/v1/drafts/`)
        return res.data
      } catch (err) {
        return errorHandeling(err)
      }
    },

    getDraftDetail: async (draftId) => {
      console.log(draftId)
      try {
        const res = await axios.get(`${BASE_API_URL}/api/v1/draft/${draftId}`)
        return res
      } catch (err) {
        return errorHandeling(err)
      }
    },

    sendDraft: async (data) => {
      console.log('data', data)
      try {
        const res = await axios.post(`${BASE_API_URL}/api/v1/send-draft`, data)
        return res
      } catch (err) {
        return errorHandeling(err)
      }
    },
  }
}

export default draftApi
