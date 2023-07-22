import { z } from 'zod'

export const EmailAttachmentTypeSchema = z.object({
  body: z.object({
    size: z.number(),
    data: z.string().optional(),
    attachmentId: z.string().optional(),
  }),
  filename: z.string(),
  headers: z.any(),
  mimeType: z.string(),
  partId: z.string(),
})

export type EmailAttachmentType = z.infer<typeof EmailAttachmentTypeSchema>

export interface IFetchedAttachment {
  blobUrl: string | null
  mimeType: string | null
}
