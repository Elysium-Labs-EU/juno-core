import axios, { AxiosResponse } from 'axios'
import qs from 'qs'
import { BASE_API_URL, errorHandeling } from './api'

interface QueryObject {
  labelIds: string[]
  maxResults?: number
  nextPageToken?: string
}

const threadApi = () => ({
  getThreads: async (query: QueryObject) => {
    try {
      const res: AxiosResponse<any> = await axios.get(
        `${BASE_API_URL}/api/threads/`,
        {
          params: {
            labelIds: query.labelIds,
            maxResults: query.maxResults ?? 20,
            pageToken: query.nextPageToken ?? undefined,
          },
          paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: 'repeat' }),
        }
      )
      return res.data
    } catch (err) {
      return errorHandeling(err)
    }
  },

  getThreadDetail: async (messageId: string) => {
    try {
      const res: AxiosResponse<any> = await axios.get(
        `${BASE_API_URL}/api/thread/${messageId}`
      )
      return res.data
    } catch (err) {
      return errorHandeling(err)
    }
  },
})

export default threadApi
