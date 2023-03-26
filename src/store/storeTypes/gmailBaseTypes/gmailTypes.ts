import { z } from 'zod'

/**
 * The body of a single MIME message part.
 */
export interface Schema$MessagePartBody {
  /**
   * When present, contains the ID of an external attachment that can be retrieved in a separate `messages.attachments.get` request. When not present, the entire content of the message part body is contained in the data field.
   */
  attachmentId?: string | null
  /**
   * The body data of a MIME message part as a base64url encoded string. May be empty for MIME container types that have no message body or when the body data is sent as a separate attachment. An attachment ID is present if the body data is contained in a separate attachment.
   */
  data?: string | null
  /**
   * Number of bytes for the message part data (encoding notwithstanding).
   */
  size?: number | null
}

export interface Schema$MessagePartHeader {
  /**
   * The name of the header before the `:` separator. For example, `To`.
   */
  name?: string | null
  /**
   * The value of the header after the `:` separator. For example, `someuser@example.com`.
   */
  value?: string | null
}

/**
 * A single MIME message part.
 */
export interface Schema$MessagePart {
  /**
   * The message part body for this part, which may be empty for container MIME message parts.
   */
  body?: Schema$MessagePartBody
  /**
   * The filename of the attachment. Only present if this message part represents an attachment.
   */
  filename?: string | null
  /**
   * List of headers on this message part. For the top-level message part, representing the entire message payload, it will contain the standard RFC 2822 email headers such as `To`, `From`, and `Subject`.
   */
  headers?: Schema$MessagePartHeader[]
  /**
   * The MIME type of the message part.
   */
  mimeType?: string | null
  /**
   * The immutable ID of the message part.
   */
  partId?: string | null
  /**
   * The child MIME message parts of this part. This only applies to container MIME message parts, for example `multipart/x`. For non- container MIME message part types, such as `text/plain`, this field is empty. For more information, see RFC 1521.
   */
  parts?: Schema$MessagePart[]
}

export const gmailV1SchemaMessagePartBodySchema = z.object({
  attachmentId: z.string().optional().nullable(),
  data: z.string().optional().nullable(),
  size: z.number().optional().nullable(),
})

export const gmailV1SchemaMessagePartHeaderSchema = z.object({
  name: z.string().optional().nullable(),
  value: z.string().optional().nullable(),
})

export const gmailV1SchemaMessagePartSchema: z.ZodSchema<Schema$MessagePart> =
  z.lazy(() =>
    z.object({
      body: gmailV1SchemaMessagePartBodySchema.optional(),
      filename: z.string().optional().nullable(),
      headers: z.array(gmailV1SchemaMessagePartHeaderSchema).optional(),
      mimeType: z.string().optional().nullable(),
      partId: z.string().optional().nullable(),
      parts: z.array(gmailV1SchemaMessagePartSchema).optional(),
    })
  )

export const gmailV1SchemaLabelColorSchema = z.object({
  backgroundColor: z.string().optional().nullable(),
  textColor: z.string().optional().nullable(),
})

export const gmailV1SchemaLabelSchema = z.object({
  color: gmailV1SchemaLabelColorSchema.optional(),
  id: z.string().optional().nullable(),
  labelListVisibility: z.string().optional().nullable(),
  messageListVisibility: z.string().optional().nullable(),
  messagesTotal: z.number().optional().nullable(),
  messagesUnread: z.number().optional().nullable(),
  name: z.string().optional().nullable(),
  threadsTotal: z.number().optional().nullable(),
  threadsUnread: z.number().optional().nullable(),
  type: z.string().optional().nullable(),
})

export type TGmailV1SchemaLabelSchema = z.infer<typeof gmailV1SchemaLabelSchema>

export const gmailV1SchemaListLabelsResponseSchema = z.object({
  labels: z.array(gmailV1SchemaLabelSchema).optional(),
})

export type TGmailV1SchemaListLabelsResponseSchema = z.infer<
  typeof gmailV1SchemaListLabelsResponseSchema
>

export const gmailV1SchemaModifyMessageRequestSchema = z.object({
  addLabelIds: z.array(z.string()).optional().nullable(),
  removeLabelIds: z.array(z.string()).optional().nullable(),
})

export const gmailV1SchemaModifyThreadRequestSchema = z.object({
  addLabelIds: z.array(z.string()).optional().nullable(),
  removeLabelIds: z.array(z.string()).optional().nullable(),
})

export const gmailV1SchemaProfileSchema = z.object({
  emailAddress: z.string().optional().nullable(),
  historyId: z.string().optional().nullable(),
  messagesTotal: z.number().optional().nullable(),
  threadsTotal: z.number().optional().nullable(),
})

export const gmailV1SchemaMessageSchema = z.object({
  historyId: z.string().optional().nullable(),
  id: z.string().optional().nullable(),
  internalDate: z.string().optional().nullable(),
  labelIds: z.array(z.string()).optional().nullable(),
  payload: gmailV1SchemaMessagePartSchema.optional(),
  raw: z.string().optional().nullable(),
  sizeEstimate: z.number().optional().nullable(),
  snippet: z.string().optional().nullable(),
  threadId: z.string().optional().nullable(),
})

export type TGmailV1SchemaMessageSchema = z.infer<
  typeof gmailV1SchemaMessageSchema
>

export const gmailV1SchemaThreadSchema = z.object({
  historyId: z.string().optional().nullable(),
  id: z.string().optional().nullable(),
  messages: z.array(gmailV1SchemaMessageSchema).optional(),
  snippet: z.string().optional().nullable(),
})

export type TGmailV1SchemaThreadSchema = z.infer<
  typeof gmailV1SchemaThreadSchema
>

export const gmailV1SchemaDraftSchema = z.object({
  id: z.string().optional().nullable(),
  message: gmailV1SchemaMessageSchema.optional(),
})

export type TGmailV1SchemaDraftSchema = z.infer<typeof gmailV1SchemaDraftSchema>

export const gmailV1SchemaListDraftsResponseSchema = z.object({
  drafts: z.array(gmailV1SchemaDraftSchema).optional(),
  nextPageToken: z.string().optional().nullable(),
  resultSizeEstimate: z.number().optional().nullable(),
})

export type TGmailV1SchemaListDraftsResponseSchema = z.infer<
  typeof gmailV1SchemaListDraftsResponseSchema
>

export const gmailV1SchemaSmtpMsaSchema = z.object({
  host: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  port: z.number().optional().nullable(),
  securityMode: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
})

export const gmailV1SchemaSendAsSchema = z.object({
  displayName: z.string().optional().nullable(),
  isDefault: z.boolean().optional().nullable(),
  isPrimary: z.boolean().optional().nullable(),
  replyToAddress: z.string().optional().nullable(),
  sendAsEmail: z.string().optional().nullable(),
  signature: z.string().optional().nullable(),
  smtpMsa: gmailV1SchemaSmtpMsaSchema.optional(),
  treatAsAlias: z.boolean().optional().nullable(),
  verificationStatus: z.string().optional().nullable(),
})

export type TGmailV1SchemaSendAsSchema = z.infer<
  typeof gmailV1SchemaSendAsSchema
>
