import axios from 'axios'
import qs from 'qs'
import { BASE_API_URL } from './api'

const threadApi = () => {
  return {
    getThreads: async (query) => {
      try {
        const res = await axios.get(`${BASE_API_URL}/api/threads/`, {
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
        return console.log(err)
      }
    },

    getThreadDetail: async (messageId) => {
      try {
        const res = await axios.get(`${BASE_API_URL}/api/thread/${messageId}`)
        return res.data
      } catch (err) {
        return console.log(err)
      }
    },
  }
}

export default threadApi
