import { z } from 'zod'

export const gmailV1SchemaProfileSchema = z.object({
  emailAddress: z.string().optional().nullable(),
  historyId: z.string().optional().nullable(),
  messagesTotal: z.number().optional().nullable(),
  threadsTotal: z.number().optional().nullable(),
})

export type TGmailV1SchemaProfileSchema = z.infer<
  typeof gmailV1SchemaProfileSchema
>

export const peopleV1SchemaProfileMetadataSchema = z.object({
  objectType: z.string().optional().nullable(),
  userTypes: z.array(z.string()).optional().nullable(),
})

export const peopleV1SchemaSourceSchema = z.object({
  etag: z.string().optional().nullable(),
  id: z.string().optional().nullable(),
  profileMetadata: peopleV1SchemaProfileMetadataSchema.optional(),
  type: z.string().optional().nullable(),
  updateTime: z.string().optional().nullable(),
})

export const peopleV1SchemaFieldMetadataSchema = z.object({
  primary: z.boolean().optional().nullable(),
  source: peopleV1SchemaSourceSchema.optional(),
  sourcePrimary: z.boolean().optional().nullable(),
  verified: z.boolean().optional().nullable(),
})

export const peopleV1SchemaNameSchema = z.object({
  displayName: z.string().optional().nullable(),
  displayNameLastFirst: z.string().optional().nullable(),
  familyName: z.string().optional().nullable(),
  givenName: z.string().optional().nullable(),
  honorificPrefix: z.string().optional().nullable(),
  honorificSuffix: z.string().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  middleName: z.string().optional().nullable(),
  phoneticFamilyName: z.string().optional().nullable(),
  phoneticFullName: z.string().optional().nullable(),
  phoneticGivenName: z.string().optional().nullable(),
  phoneticHonorificPrefix: z.string().optional().nullable(),
  phoneticHonorificSuffix: z.string().optional().nullable(),
  phoneticMiddleName: z.string().optional().nullable(),
  unstructuredName: z.string().optional().nullable(),
})

export type TPeopleV1SchemaNameSchema = z.infer<typeof peopleV1SchemaNameSchema>

export type extendedGmailV1SchemaProfileSchema = TGmailV1SchemaProfileSchema &
  Pick<TPeopleV1SchemaNameSchema, 'displayName'>

peopleV1SchemaNameSchema.pick({ displayName: true })
