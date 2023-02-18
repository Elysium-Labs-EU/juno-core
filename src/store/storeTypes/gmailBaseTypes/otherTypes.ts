import { z } from 'zod'

import { gmailV1SchemaProfileSchema } from './gmailTypes'
import { peopleV1SchemaNameSchema } from './peopleTypes'

export const getAuthUrlResponseSchema = z.string()

export type TGetAuthUrlResponseSchema = z.infer<typeof getAuthUrlResponseSchema>

export const credentialsSchema = z.object({
  refresh_token: z.string().optional().nullable(),
  expiry_date: z.number().optional().nullable(),
  access_token: z.string().optional().nullable(),
  token_type: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  scope: z.string().optional(),
})

export type TCredentialsSchema = z.infer<typeof credentialsSchema>

export const sessionResponseSchema = z.object({
  idToken: z.string(),
})

export type TSessionResponseSchema = z.infer<typeof sessionResponseSchema>

export const authenticateClientResponseSchema = z.union([
  z.string(),
  credentialsSchema,
  sessionResponseSchema,
])

export type TAuthenticateClientResponseSchema = z.infer<
  typeof authenticateClientResponseSchema
>

export const extendedGmailV1SchemaProfileSchemaSchema = gmailV1SchemaProfileSchema.and(
  peopleV1SchemaNameSchema.pick({ displayName: true })
)

export type TExtendedGmailV1SchemaProfileSchemaSchema = z.infer<
  typeof extendedGmailV1SchemaProfileSchemaSchema
>
