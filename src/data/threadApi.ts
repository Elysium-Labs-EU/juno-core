import { instance } from 'data/api'
import type { TemplateApiResponse } from 'data/api'
import {
  EmailListObject,
  TEmailListObject,
  ThreadObject,
} from 'store/storeTypes/emailListTypes'
import type { TThreadObject } from 'store/storeTypes/emailListTypes'
import type { TGmailV1SchemaThreadSchema } from 'store/storeTypes/gmailBaseTypes/gmailTypes'
import type { TLabelState } from 'store/storeTypes/labelsTypes'
import type { TUpdateRequestParamsSingleThread } from 'store/storeTypes/metaEmailListTypes'

import { errorBlockTemplate } from './api'

export interface IEmailQueryObject {
  labelIds?: TLabelState['labelIds']
  maxResults?: number
  nextPageToken: TEmailListObject['nextPageToken']
  q?: TEmailListObject['q']
  silentLoading?: boolean
}

const threadApi = ({
  controller,
  signal,
}: {
  controller?: AbortController
  signal?: AbortSignal
}) => ({
  getSimpleThreads: async (
    query: IEmailQueryObject
  ): TemplateApiResponse<TEmailListObject> => {
    try {
      const res = await instance.get(`/api/threads/`, {
        params: {
          labelIds: query?.labelIds?.toString() ?? '',
          maxResults: query.maxResults ?? 20,
          pageToken: query.nextPageToken ?? undefined,
          q: query.q ?? undefined,
        },
      })
      EmailListObject.omit({ labels: true }).parse(res.data)
      return res
    } catch (err) {
      return errorBlockTemplate(err)
    }
  },
  getFullThreads: async (
    query: IEmailQueryObject
  ): TemplateApiResponse<TThreadObject> => {
    try {
      const res = await instance.get<TThreadObject>(`/api/threads_full/`, {
        params: {
          labelIds: query?.labelIds?.toString() ?? '',
          maxResults: query.maxResults ?? 20,
          pageToken: query.nextPageToken ?? undefined,
          q: query.q ?? undefined,
        },
        signal: controller?.signal || signal,
      })
      EmailListObject.omit({ labels: true }).parse(res.data)
      return res
    } catch (err) {
      return errorBlockTemplate(err)
    }
  },

  getThreadDetail: async ({
    threadId,
  }: Pick<
    TUpdateRequestParamsSingleThread,
    'threadId'
  >): TemplateApiResponse<TThreadObject> => {
    try {
      const res = await instance.get<TThreadObject>(`/api/thread/${threadId}`)
      ThreadObject.parse(res.data)
      return res
    } catch (err) {
      return errorBlockTemplate(err)
    }
  },
  updateThread: async ({
    threadId,
    request,
  }: Pick<
    TUpdateRequestParamsSingleThread,
    'threadId' | 'request'
  >): TemplateApiResponse<TGmailV1SchemaThreadSchema> => {
    try {
      const res = await instance.patch<TGmailV1SchemaThreadSchema>(
        `/api/update-thread/${threadId}`,
        request
      )
      return res
    } catch (err) {
      return errorBlockTemplate(err)
    }
  },
  thrashThread: async ({
    threadId,
  }: Pick<
    TUpdateRequestParamsSingleThread,
    'threadId'
  >): TemplateApiResponse<TGmailV1SchemaThreadSchema> => {
    const data = {}
    try {
      const res = await instance.post<TGmailV1SchemaThreadSchema>(
        `/api/thread/thrash/${threadId}`,
        data
      )
      return res
    } catch (err) {
      return errorBlockTemplate(err)
    }
  },
  deleteThread: async ({
    threadId,
  }: Pick<
    TUpdateRequestParamsSingleThread,
    'threadId'
  >): TemplateApiResponse<''> => {
    try {
      const res = await instance.delete<''>(`/api/thread/`, {
        data: { id: threadId },
      })
      return res
    } catch (err) {
      return errorBlockTemplate(err)
    }
  },
})

export default threadApi
