import axios from 'axios'

import { errorHandling, instance } from 'data/api'
import type { TemplateApiResponse } from 'data/api'
import type { ICustomError } from 'store/storeTypes/baseTypes'
import {
  DraftListResponse,
  DraftResponseEntry,
} from 'store/storeTypes/draftsTypes'
import type { TDraftResponseEntry } from 'store/storeTypes/draftsTypes'
import { gmailV1SchemaDraftSchema } from 'store/storeTypes/gmailBaseTypes/gmailTypes'
import type {
  TGmailV1SchemaDraftSchema,
  TGmailV1SchemaListDraftsResponseSchema,
  TGmailV1SchemaMessageSchema,
} from 'store/storeTypes/gmailBaseTypes/gmailTypes'

const draftApi = (signal?: AbortSignal) => ({
  createDrafts: async (
    data: FormData
  ): TemplateApiResponse<TGmailV1SchemaDraftSchema> => {
    try {
      const res = await instance.post<TGmailV1SchemaDraftSchema>(
        `/api/create-draft`,
        data
      )
      gmailV1SchemaDraftSchema.parse(res.data)
      return res
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return errorHandling(err)
      }
      // Handle unexpected error
      return err as ICustomError
    }
  },

  updateDrafts: async ({
    id,
    formData,
  }: {
    id: string
    formData: FormData
  }): TemplateApiResponse<TGmailV1SchemaDraftSchema> => {
    try {
      const res = await instance.put<TGmailV1SchemaDraftSchema>(
        `/api/update-draft/${id}`,
        formData
      )
      gmailV1SchemaDraftSchema.parse(res.data)
      return res
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return errorHandling(err)
      }
      // Handle unexpected error
      return err as ICustomError
    }
  },

  getDrafts: async (): TemplateApiResponse<TGmailV1SchemaListDraftsResponseSchema> => {
    try {
      const res = await instance.get<TGmailV1SchemaListDraftsResponseSchema>(
        `/api/drafts/`,
        {
          signal,
        }
      )
      DraftListResponse.parse(res.data)
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },

  getDraftDetail: async (
    draftId: string
  ): TemplateApiResponse<TDraftResponseEntry> => {
    try {
      const res = await instance.get<TDraftResponseEntry>(
        `/api/draft/${draftId}`
      )
      DraftResponseEntry.parse(res.data)
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },

  sendDraft: async (data: {
    id: string
    timeOut: number
  }): TemplateApiResponse<TGmailV1SchemaMessageSchema> => {
    try {
      const res = await instance.post<TGmailV1SchemaMessageSchema>(
        `/api/send-draft`,
        data
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },

  deleteDraft: async (id: string): TemplateApiResponse<''> => {
    try {
      const res = await instance.delete<''>(`/api/draft`, {
        data: { id },
      })
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
})

export default draftApi
