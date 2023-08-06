import { fetchWrapper } from 'data/api'
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

const draftApi = () => ({
  createDrafts: (data: FormData) =>
    fetchWrapper<TGmailV1SchemaDraftSchema>(
      `/api/create-draft`,
      {
        method: 'POST',
        body: data
      },
      gmailV1SchemaDraftSchema
    ),

  updateDrafts: ({ id, formData }: { id: string, formData: FormData }) =>
    fetchWrapper<TGmailV1SchemaDraftSchema>(
      `/api/update-draft/${id}`,
      {
        method: 'PUT',
        body: formData
      },
      gmailV1SchemaDraftSchema
    ),

  getDrafts: () =>
    fetchWrapper<TGmailV1SchemaListDraftsResponseSchema>(
      `/api/drafts/`,
      {
        method: 'GET',
      },
      DraftListResponse
    ),

  getDraftDetail: (draftId: string) =>
    fetchWrapper<TDraftResponseEntry>(
      `/api/draft/${draftId}`,
      {
        method: 'GET'
      },
      DraftResponseEntry
    ),

  sendDraft: (data: { id: string, timeOut: number }) =>
    fetchWrapper<TGmailV1SchemaMessageSchema>(
      `/api/send-draft`,
      {
        method: 'POST',
        body: data
      }
    ),
  deleteDraft: (id: string) =>
    fetchWrapper<''>(
      `/api/draft`,
      {
        method: 'DELETE',
        body: { id }
      }
    )
})

export default draftApi
