import axios from 'axios'
import { BASE_API_URL } from './api'

const draftApi = () => {
  return {
    getDrafts: async () => {
      try {
        const res = await axios.get(`${BASE_API_URL}/api/drafts/`)
        return res.data
      } catch (err) {
        return console.log(err)
      }
    },

    getDraftDetail: async (draftId) => {
      console.log(draftId)
      try {
        const res = await axios.get(`${BASE_API_URL}/api/draft/${draftId}`)
        return res.data
      } catch (err) {
        return console.log(err)
      }
    },
  }
}

export default draftApi
