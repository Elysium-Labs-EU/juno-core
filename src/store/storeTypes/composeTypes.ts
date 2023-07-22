import { EmailAttachmentTypeSchema } from 'components/EmailDetail/Attachment/EmailAttachmentTypes'
import type { TContact } from 'store/storeTypes/contactsTypes'
import { Contact } from 'store/storeTypes/contactsTypes'
import { z } from 'zod'

export interface IComposePayload {
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
  to: z.union([z.string(), z.array(Contact)]).optional()
})

export type IComposeEmailReceive = z.infer<typeof ComposeEmailReceiveSchema>
