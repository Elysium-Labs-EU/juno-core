import { z } from 'zod'

import { fetchWrapper } from 'data/api'
import { EmailListObject, ThreadObject } from 'store/storeTypes/emailListTypes'
import type { TEmailListObject } from 'store/storeTypes/emailListTypes'
import { gmailV1SchemaThreadSchema } from 'store/storeTypes/gmailBaseTypes/gmailTypes'
import type { TLabelState } from 'store/storeTypes/labelsTypes'
import type { TUpdateRequestParamsSingleThread } from 'store/storeTypes/metaEmailListTypes'

export interface EmailQueryObject {
  labelIds?: TLabelState['labelIds']
  maxResults?: number
  nextPageToken: TEmailListObject['nextPageToken']
  q?: TEmailListObject['q']
  silentLoading?: boolean
}

const threadApi = () => ({
  getSimpleThreads: async (query: EmailQueryObject) =>
    fetchWrapper(
      '/api/threads/',
      {
        method: 'GET',
        params: {
          labelIds: query.labelIds?.toString() ?? '',
          maxResults: query.maxResults ?? 20,
          pageToken: query.nextPageToken ?? undefined,
          q: query.q ?? undefined,
        },
      },
      EmailListObject.omit({ labels: true })
    ),
  getFullThreads: async (query: EmailQueryObject) =>
    fetchWrapper(
      '/api/threads_full/',
      {
        method: 'GET',
        params: {
          labelIds: query.labelIds?.toString() ?? '',
          maxResults: query.maxResults ?? 20,
          pageToken: query.nextPageToken ?? undefined,
          q: query.q ?? undefined,
        },
      },
      EmailListObject.omit({ labels: true })
    ),
  getThreadDetail: async ({
    threadId,
  }: Pick<TUpdateRequestParamsSingleThread, 'threadId'>) =>
    fetchWrapper(
      `/api/thread/${threadId}`,
      {
        method: 'GET',
      },
      ThreadObject
    ),
  updateThread: async ({
    threadId,
    request,
  }: Pick<TUpdateRequestParamsSingleThread, 'threadId' | 'request'>) =>
    fetchWrapper(
      `/api/update-thread/${threadId}`,
      {
        method: 'PATCH',
        body: request,
      },
      gmailV1SchemaThreadSchema
    ),
  thrashThread: async ({
    threadId,
  }: Pick<TUpdateRequestParamsSingleThread, 'threadId'>) =>
    fetchWrapper(
      `/api/thread/thrash/${threadId}`,
      {
        method: 'POST',
        body: {},
      },
      gmailV1SchemaThreadSchema
    ),
  deleteThread: async ({
    threadId,
  }: Pick<TUpdateRequestParamsSingleThread, 'threadId'>) =>
    fetchWrapper(
      `/api/thread/`,
      {
        method: 'DELETE',
        body: { id: threadId },
      },
      z.any()
    ),
})

export default threadApi
