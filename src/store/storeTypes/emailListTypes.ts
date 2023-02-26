import { z } from 'zod'

import { gmailV1SchemaMessagePartSchema } from './gmailBaseTypes/gmailTypes'
import type { TLabelState } from './labelsTypes'

const SelectedEmail = z.object({
  labelIds: z.array(z.string()),
  selectedIds: z.array(z.string()),
})

export type TSelectedEmail = z.infer<typeof SelectedEmail>

export interface ISelectedEmailAction {
  event: 'add' | 'remove'
  id: string
  labelIds: TLabelState['labelIds']
}

const PayloadHeaders = z.object({
  deliveredTo: z.string().nullable(),
  date: z.string().nullable(),
  from: z.string().nullable(),
  subject: z.string().nullable(),
  to: z.string().nullable(),
  cc: z.string().nullable(),
  bcc: z.string().nullable(),
})

type TPayloadHeaders = z.infer<typeof PayloadHeaders>

export const PayloadHeadersEnhanced = PayloadHeaders.extend({
  listUnsubscribe: z.string().nullable(),
})

export type TPayloadHeadersEnhanced = z.infer<typeof PayloadHeadersEnhanced>

export type TGmailV1SchemaMessagePartSchema = z.infer<
  typeof gmailV1SchemaMessagePartSchema
>

const SimpleMessage = z.object({
  historyId: z.string(),
  id: z.string(),
  internalDate: z.string(),
  labelIds: z.array(z.string()),
  payload: z.object({
    mimeType: z.string(),
    headers: PayloadHeaders,
    files: z.array(z.any()),
    parts: z.array(gmailV1SchemaMessagePartSchema).optional(),
  }),
  sizeEstimate: z.number(),
  snippet: z.string(),
  threadId: z.string(),
})

type TSimpleMessage = z.infer<typeof SimpleMessage>

const FullMessage = SimpleMessage.extend({
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
})

export type TFullMessage = z.infer<typeof FullMessage>

export const ThreadObject = z.object({
  id: z.string(),
  historyId: z.string(),
  messages: z.array(z.union([FullMessage, SimpleMessage])),
})

export type TThreadObject = z.infer<typeof ThreadObject>

export const EmailListObject = z.object({
  labels: z.array(z.string()),
  nextPageToken: z.string().optional().nullable(),
  q: z.string().optional(),
  resultSizeEstimate: z.number().optional().nullable(),
  threads: z.array(ThreadObject),
  timestamp: z.number().optional().nullable(),
})

export type TEmailListObject = z.infer<typeof EmailListObject>

const EmailListState = z.object({
  activeEmailListIndex: z.number(),
  emailList: z.array(EmailListObject),
  isFetching: z.boolean(),
  searchList: EmailListObject.nullable(),
  selectedEmails: SelectedEmail,
})

export type TEmailListState = z.infer<typeof EmailListState>

const BaseEmailList = z.array(
  z.object({
    labels: z.array(z.string()),
    nextPageToken: z.string().optional().nullable(),
    threads: z.array(z.any()),
  })
)

export type TBaseEmailList = z.infer<typeof BaseEmailList>
