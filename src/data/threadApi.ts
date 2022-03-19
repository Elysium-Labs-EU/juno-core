import axios, { AxiosResponse } from 'axios'
import qs from 'qs'
import { BASE_API_URL, errorHandling, fetchToken } from './api'

export interface EmailQueryObject {
  labelIds?: string[]
  maxResults?: number
  nextPageToken: string | null
  q?: string
  silentLoading?: boolean
}

const threadApi = ({
  controller,
  signal,
}: {
  controller?: AbortController
  signal?: AbortSignal
}) => ({
  getThreads: async (query: EmailQueryObject) => {
    try {
      const res: AxiosResponse<any> = await axios.get(
        `${BASE_API_URL}/api/threads/`,
        {
          params: {
            labelIds: query.labelIds ?? [''],
            maxResults: query.maxResults ?? 20,
            pageToken: query.nextPageToken ?? undefined,
            q: query.q ?? undefined,
          },
          paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: 'repeat' }),
          headers: {
            Authorization: fetchToken(),
          },
        }
      )
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },
  getFullThreads: async (query: EmailQueryObject) => {
    const res: AxiosResponse<any> = await axios.get(
      `${BASE_API_URL}/api/threads_full/`,
      {
        params: {
          labelIds: query.labelIds ?? [''],
          maxResults: query.maxResults ?? 20,
          pageToken: query.nextPageToken ?? undefined,
          q: query.q ?? undefined,
        },
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: 'repeat' }),

        headers: {
          Authorization: fetchToken(),
        },
        signal: controller?.signal || signal,
      }
    )
    return res
  },

  getThreadDetail: async (messageId: string) => {
    try {
      const res: AxiosResponse<any> = await axios.get(
        `${BASE_API_URL}/api/thread/${messageId}`,
        {
          headers: {
            Authorization: fetchToken(),
          },
        }
      )
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },
})

export default threadApi
