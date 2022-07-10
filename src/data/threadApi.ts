import { AxiosResponse } from 'axios'
import qs from 'qs'
import { errorHandling, fetchToken, instance } from './api'

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
      const res: AxiosResponse<any> = await instance.get(`/api/threads/`, {
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
      })
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },
  getFullThreads: async (query: EmailQueryObject) => {
    const res: AxiosResponse<any> = await instance.get(`/api/threads_full/`, {
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
    })
    return res
  },

  getThreadDetail: async (threadId: string) => {
    try {
      const res: AxiosResponse<any> = await instance.get(
        `/api/thread/${threadId}`,
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
  updateThread: async ({ threadId, request }: any) => {
    try {
      const res: AxiosResponse<any> = await instance.patch(
        `/api/thread/${threadId}`,
        request,
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
  thrashThread: async ({ threadId }: { threadId: string }) => {
    const data = {}
    try {
      const res: AxiosResponse<any> = await instance.post(
        `/api/thread/thrash/${threadId}`,
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
  deleteThread: async (threadId: string) => {
    try {
      const res: AxiosResponse<any> = await instance.delete(`/api/thread/`, {
        data: { id: threadId },
        headers: {
          Authorization: fetchToken(),
        },
      })
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },
})

export default threadApi
