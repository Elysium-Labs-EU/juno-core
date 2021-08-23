import axios from 'axios'
import qs from 'qs'
import { BASE_API_URL, errorHandeling } from './api'

const threadApi = () => {
  return {
    getThreads: async (query) => {
      try {
        const res = await axios.get(`${BASE_API_URL}/api/v1/threads/`, {
          params: {
            labelIds: query.labelIds,
            maxResults: query.maxResults ?? 20,
            pageToken: query.nextPageToken ?? undefined,
          },
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
          },
        })
        return res.data
      } catch (err) {
        return errorHandeling(err)
      }
    },

    getThreadDetail: async (messageId) => {
      try {
        const res = await axios.get(
          `${BASE_API_URL}/api/v1/thread/${messageId}`
        )
        return res.data
      } catch (err) {
        return errorHandeling(err)
      }
    },
  }
}

export default threadApi
