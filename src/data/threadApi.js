import axios from 'axios'
import qs from 'qs'

const threadApi = () => {
  return {
    getThreads: async (query) => {
      try {
        const res = await axios.get(`/api/threads/`, {
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
        const res = await axios.get(`/api/thread/${messageId}`)
        return res.data
      } catch (err) {
        return console.log(err)
      }
    },
  }
}

export default threadApi
