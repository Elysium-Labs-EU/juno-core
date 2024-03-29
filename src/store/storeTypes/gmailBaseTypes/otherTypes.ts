import { z } from 'zod'

import {
  gmailV1SchemaLabelSchema,
  gmailV1SchemaProfileSchema,
  gmailV1SchemaSendAsSchema,
} from './gmailTypes'
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

export const extendedGmailV1SchemaProfileSchemaSchema =
  gmailV1SchemaProfileSchema.and(
    peopleV1SchemaNameSchema.pick({ displayName: true })
  )

export type TExtendedGmailV1SchemaProfileSchemaSchema = z.infer<
  typeof extendedGmailV1SchemaProfileSchemaSchema
>

export const profileExtendWithSignature = gmailV1SchemaSendAsSchema
  .pick({ signature: true })
  .merge(gmailV1SchemaProfileSchema)

export const userSettingsSchema = z.object({
  alternateActions: z.boolean(),
  emailFetchSize: z.union([z.literal(20), z.literal(25), z.literal(30)]),
  isAvatarVisible: z.boolean(),
  isFlexibleFlowActive: z.boolean(),
  showIntroduction: z.boolean(),
})

export type TUserSettings = z.infer<typeof userSettingsSchema>

export const baseCheckSchema = z.object({
  prefetchedBoxes: z.array(gmailV1SchemaLabelSchema),
  profile: profileExtendWithSignature,
  userSettings: userSettingsSchema,
  userSettingsLabel: gmailV1SchemaLabelSchema,
})

export type TBaseCheckSchema = z.infer<typeof baseCheckSchema>
