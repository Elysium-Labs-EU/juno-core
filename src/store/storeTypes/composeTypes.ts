import { z } from 'zod'

import { EmailAttachmentTypeSchema } from 'components/EmailDetail/Attachment/EmailAttachmentTypes'
import type { TContact } from 'store/storeTypes/contactsTypes'
import { Contact } from 'store/storeTypes/contactsTypes'
import { gmailV1SchemaMessagePartBodySchema, gmailV1SchemaMessagePartHeaderSchema, gmailV1SchemaMessagePartSchema } from './gmailBaseTypes/gmailTypes'

export interface ComposePayload {
  bcc?: Array<TContact>
  body?: string
  cc?: Array<TContact>
  files?: Array<File> | undefined
  id?: string
  subject?: string
  threadId?: string | undefined
  to?: Array<TContact>
  value?: string
  signature?: string
}

export const ComposeEmailReceiveSchema = z.object({
  bcc: z.union([z.string(), z.array(Contact)]).optional(),
  body: z.string().optional(),
  cc: z.union([z.string(), z.array(Contact)]).optional(),
  files: z.array(EmailAttachmentTypeSchema, z.instanceof(File)).optional(),
  id: z.string().optional(),
  subject: z.string().optional().nullable(),
  threadId: z.string().optional(),
  to: z.union([z.string(), z.array(Contact)]).optional(),
})

export type ComposeEmailReceive = z.infer<typeof ComposeEmailReceiveSchema>

export const ComposeEmailConvertedSchema = z.union([z.array(Contact), z.array(z.object({
  body: gmailV1SchemaMessagePartBodySchema.optional(),
  filename: z.string().optional().nullable(),
  headers: z.array(gmailV1SchemaMessagePartHeaderSchema).optional(),
  mimeType: z.string().optional().nullable(),
  partId: z.string().optional().nullable(),
  parts: z.array(gmailV1SchemaMessagePartSchema).optional(),
}))])

export type ComposeEmailConverted = z.infer<typeof ComposeEmailConvertedSchema>