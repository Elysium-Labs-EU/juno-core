import { z } from 'zod'

import { PayloadHeadersEnhanced } from './emailListTypes'
import { gmailV1SchemaMessagePartSchema } from './gmailBaseTypes/gmailTypes'

export interface IOpenDraftEmailType {
  messageId: string
  id: string
}

export interface IDraftDetails {
  draftId: string
}

const DraftListEntry = z.object({
  id: z.string(),
  message: z.object({
    id: z.string(),
    threadId: z.string(),
  }),
})

const FullDraftMessage = z.object({
  id: z.string(),
  threadId: z.string(),
  labelIds: z.array(z.string()).optional(),
  snippet: z.string().optional(),
  payload: z.object({
    mimeType: z.string(),
    headers: PayloadHeadersEnhanced,
    body: z.object({
      emailHTML: z.string(),
      emailFileHTML: z.array(z.any()),
      removedTrackers: z.array(z.string()).optional(),
    }),
    files: z.array(z.any()),
    parts: z.array(gmailV1SchemaMessagePartSchema).optional(),
  }),
  sizeEstimate: z.number(),
  historyId: z.string(),
  internalDate: z.string(),
})

export const DraftResponseEntry = z.object({
  id: z.string(),
  message: FullDraftMessage,
})
export type TDraftResponseEntry = z.infer<typeof DraftResponseEntry>

export const DraftListResponse = z.object({
  drafts: z.array(DraftListEntry),
  resultSizeEstimate: z.number(),
})

const DraftsState = z.object({
  draftList: z.array(DraftListEntry).nullable(),
})

export type TDraftsState = z.infer<typeof DraftsState>
