import { z } from 'zod'

import {
  gmailV1SchemaModifyMessageRequestSchema,
  gmailV1SchemaModifyThreadRequestSchema,
} from './gmailBaseTypes/gmailTypes'
import { Location } from './utilsTypes'

export const gmailV1SchemaModifyMessageRequestSchemaEnhanced =
  gmailV1SchemaModifyMessageRequestSchema.extend({
    delete: z.boolean().optional(),
  })

export type TGmailV1SchemaModifyMessageRequestSchemaEnhanced = z.infer<
  typeof gmailV1SchemaModifyMessageRequestSchemaEnhanced
>

export const gmailV1SchemaModifyThreadRequestSchemaEnhanced =
  gmailV1SchemaModifyThreadRequestSchema.extend({
    delete: z.boolean().optional(),
  })

export type TGmailV1SchemaModifyThreadRequestSchemaEnhanced = z.infer<
  typeof gmailV1SchemaModifyThreadRequestSchemaEnhanced
>

export const UpdateRequestParamsBatchMessage = z.object({
  request: gmailV1SchemaModifyMessageRequestSchemaEnhanced,
})

export type TUpdateRequestParamsBatchMessage = z.infer<
  typeof UpdateRequestParamsBatchMessage
>

export const UpdateRequestParamsBatchThread = z.object({
  request: gmailV1SchemaModifyThreadRequestSchemaEnhanced,
})

export type TUpdateRequestParamsBatchThread = z.infer<
  typeof UpdateRequestParamsBatchThread
>

export const UpdateRequestParamsSingleMessage = z.object({
  threadId: z.string(),
  request: gmailV1SchemaModifyMessageRequestSchemaEnhanced,
  labelIds: z.array(z.string()),
  location: Location.optional(),
})

export type TUpdateRequestParamsSingleMessage = z.infer<
  typeof UpdateRequestParamsSingleMessage
>

export const UpdateRequestParamsSingleThread = z.object({
  threadId: z.string(),
  request: gmailV1SchemaModifyThreadRequestSchemaEnhanced,
  labelIds: z.array(z.string()),
  location: Location.optional(),
})

export type TUpdateRequestParamsSingleThread = z.infer<
  typeof UpdateRequestParamsSingleThread
>
