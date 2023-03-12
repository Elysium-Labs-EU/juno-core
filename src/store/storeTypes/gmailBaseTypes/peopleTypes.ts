import { z } from 'zod'

export const peopleV1SchemaBatchDeleteContactsRequestSchema = z.object({
  resourceNames: z.array(z.string()).optional().nullable(),
})

export const peopleV1SchemaContactGroupMembershipSchema = z.object({
  contactGroupId: z.string().optional().nullable(),
  contactGroupResourceName: z.string().optional().nullable(),
})

export const peopleV1SchemaContactGroupMetadataSchema = z.object({
  deleted: z.boolean().optional().nullable(),
  updateTime: z.string().optional().nullable(),
})

export const peopleV1SchemaCopyOtherContactToMyContactsGroupRequestSchema =
  z.object({
    copyMask: z.string().optional().nullable(),
    readMask: z.string().optional().nullable(),
    sources: z.array(z.string()).optional().nullable(),
  })

export const peopleV1SchemaDateSchema = z.object({
  day: z.number().optional().nullable(),
  month: z.number().optional().nullable(),
  year: z.number().optional().nullable(),
})

export const peopleV1SchemaDomainMembershipSchema = z.object({
  inViewerDomain: z.boolean().optional().nullable(),
})

export const peopleV1SchemaEmptySchema = z.object({})

export const peopleV1SchemaGroupClientDataSchema = z.object({
  key: z.string().optional().nullable(),
  value: z.string().optional().nullable(),
})

export const peopleV1SchemaModifyContactGroupMembersRequestSchema = z.object({
  resourceNamesToAdd: z.array(z.string()).optional().nullable(),
  resourceNamesToRemove: z.array(z.string()).optional().nullable(),
})

export const peopleV1SchemaModifyContactGroupMembersResponseSchema = z.object({
  canNotRemoveLastContactGroupResourceNames: z
    .array(z.string())
    .optional()
    .nullable(),
  notFoundResourceNames: z.array(z.string()).optional().nullable(),
})

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

export const peopleV1SchemaStatusSchema = z.object({
  code: z.number().optional().nullable(),
  details: z.array(z.record(z.any())).optional().nullable(),
  message: z.string().optional().nullable(),
})

export const peopleV1SchemaUpdateContactPhotoRequestSchema = z.object({
  personFields: z.string().optional().nullable(),
  photoBytes: z.string().optional().nullable(),
  sources: z.array(z.string()).optional().nullable(),
})

export const peopleV1SchemaContactGroupSchema = z.object({
  clientData: z.array(peopleV1SchemaGroupClientDataSchema).optional(),
  etag: z.string().optional().nullable(),
  formattedName: z.string().optional().nullable(),
  groupType: z.string().optional().nullable(),
  memberCount: z.number().optional().nullable(),
  memberResourceNames: z.array(z.string()).optional().nullable(),
  metadata: peopleV1SchemaContactGroupMetadataSchema.optional(),
  name: z.string().optional().nullable(),
  resourceName: z.string().optional().nullable(),
})

export const peopleV1SchemaContactGroupResponseSchema = z.object({
  contactGroup: peopleV1SchemaContactGroupSchema.optional(),
  requestedResourceName: z.string().optional().nullable(),
  status: peopleV1SchemaStatusSchema.optional(),
})

export const peopleV1SchemaCreateContactGroupRequestSchema = z.object({
  contactGroup: peopleV1SchemaContactGroupSchema.optional(),
  readGroupFields: z.string().optional().nullable(),
})

export const peopleV1SchemaFieldMetadataSchema = z.object({
  primary: z.boolean().optional().nullable(),
  source: peopleV1SchemaSourceSchema.optional(),
  sourcePrimary: z.boolean().optional().nullable(),
  verified: z.boolean().optional().nullable(),
})

export const peopleV1SchemaFileAsSchema = z.object({
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  value: z.string().optional().nullable(),
})

export const peopleV1SchemaGenderSchema = z.object({
  addressMeAs: z.string().optional().nullable(),
  formattedValue: z.string().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  value: z.string().optional().nullable(),
})

export const peopleV1SchemaImClientSchema = z.object({
  formattedProtocol: z.string().optional().nullable(),
  formattedType: z.string().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  protocol: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
})

export const peopleV1SchemaInterestSchema = z.object({
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  value: z.string().optional().nullable(),
})

export const peopleV1SchemaListContactGroupsResponseSchema = z.object({
  contactGroups: z.array(peopleV1SchemaContactGroupSchema).optional(),
  nextPageToken: z.string().optional().nullable(),
  nextSyncToken: z.string().optional().nullable(),
  totalItems: z.number().optional().nullable(),
})

export const peopleV1SchemaLocaleSchema = z.object({
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  value: z.string().optional().nullable(),
})

export const peopleV1SchemaLocationSchema = z.object({
  buildingId: z.string().optional().nullable(),
  current: z.boolean().optional().nullable(),
  deskCode: z.string().optional().nullable(),
  floor: z.string().optional().nullable(),
  floorSection: z.string().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  type: z.string().optional().nullable(),
  value: z.string().optional().nullable(),
})

export const peopleV1SchemaMembershipSchema = z.object({
  contactGroupMembership: peopleV1SchemaContactGroupMembershipSchema.optional(),
  domainMembership: peopleV1SchemaDomainMembershipSchema.optional(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
})

export const peopleV1SchemaMiscKeywordSchema = z.object({
  formattedType: z.string().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  type: z.string().optional().nullable(),
  value: z.string().optional().nullable(),
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

export const peopleV1SchemaNicknameSchema = z.object({
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  type: z.string().optional().nullable(),
  value: z.string().optional().nullable(),
})

export const peopleV1SchemaOccupationSchema = z.object({
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  value: z.string().optional().nullable(),
})

export const peopleV1SchemaOrganizationSchema = z.object({
  costCenter: z.string().optional().nullable(),
  current: z.boolean().optional().nullable(),
  department: z.string().optional().nullable(),
  domain: z.string().optional().nullable(),
  endDate: peopleV1SchemaDateSchema.optional(),
  formattedType: z.string().optional().nullable(),
  fullTimeEquivalentMillipercent: z.number().optional().nullable(),
  jobDescription: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  name: z.string().optional().nullable(),
  phoneticName: z.string().optional().nullable(),
  startDate: peopleV1SchemaDateSchema.optional(),
  symbol: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
})

export const peopleV1SchemaPersonMetadataSchema = z.object({
  deleted: z.boolean().optional().nullable(),
  linkedPeopleResourceNames: z.array(z.string()).optional().nullable(),
  objectType: z.string().optional().nullable(),
  previousResourceNames: z.array(z.string()).optional().nullable(),
  sources: z.array(peopleV1SchemaSourceSchema).optional(),
})

export const peopleV1SchemaPhoneNumberSchema = z.object({
  canonicalForm: z.string().optional().nullable(),
  formattedType: z.string().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  type: z.string().optional().nullable(),
  value: z.string().optional().nullable(),
})

export const peopleV1SchemaPhotoSchema = z.object({
  default: z.boolean().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  url: z.string().optional().nullable(),
})

export const peopleV1SchemaRelationSchema = z.object({
  formattedType: z.string().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  person: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
})

export const peopleV1SchemaRelationshipInterestSchema = z.object({
  formattedValue: z.string().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  value: z.string().optional().nullable(),
})

export const peopleV1SchemaRelationshipStatusSchema = z.object({
  formattedValue: z.string().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  value: z.string().optional().nullable(),
})

export const peopleV1SchemaResidenceSchema = z.object({
  current: z.boolean().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  value: z.string().optional().nullable(),
})

export const peopleV1SchemaSipAddressSchema = z.object({
  formattedType: z.string().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  type: z.string().optional().nullable(),
  value: z.string().optional().nullable(),
})

export const peopleV1SchemaSkillSchema = z.object({
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  value: z.string().optional().nullable(),
})

export const peopleV1SchemaTaglineSchema = z.object({
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  value: z.string().optional().nullable(),
})

export const peopleV1SchemaUpdateContactGroupRequestSchema = z.object({
  contactGroup: peopleV1SchemaContactGroupSchema.optional(),
  readGroupFields: z.string().optional().nullable(),
  updateGroupFields: z.string().optional().nullable(),
})

export const peopleV1SchemaUrlSchema = z.object({
  formattedType: z.string().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  type: z.string().optional().nullable(),
  value: z.string().optional().nullable(),
})

export const peopleV1SchemaUserDefinedSchema = z.object({
  key: z.string().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  value: z.string().optional().nullable(),
})

export const peopleV1SchemaAddressSchema = z.object({
  city: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  countryCode: z.string().optional().nullable(),
  extendedAddress: z.string().optional().nullable(),
  formattedType: z.string().optional().nullable(),
  formattedValue: z.string().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  poBox: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable(),
  region: z.string().optional().nullable(),
  streetAddress: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
})

export const peopleV1SchemaAgeRangeTypeSchema = z.object({
  ageRange: z.string().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
})

export const peopleV1SchemaBatchGetContactGroupsResponseSchema = z.object({
  responses: z.array(peopleV1SchemaContactGroupResponseSchema).optional(),
})

export const peopleV1SchemaBiographySchema = z.object({
  contentType: z.string().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  value: z.string().optional().nullable(),
})

export const peopleV1SchemaBirthdaySchema = z.object({
  date: peopleV1SchemaDateSchema.optional(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  text: z.string().optional().nullable(),
})

export const peopleV1SchemaBraggingRightsSchema = z.object({
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  value: z.string().optional().nullable(),
})

export const peopleV1SchemaCalendarUrlSchema = z.object({
  formattedType: z.string().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  type: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
})

export const peopleV1SchemaClientDataSchema = z.object({
  key: z.string().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  value: z.string().optional().nullable(),
})

export const peopleV1SchemaCoverPhotoSchema = z.object({
  default: z.boolean().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  url: z.string().optional().nullable(),
})

export const peopleV1SchemaEmailAddressSchema = z.object({
  displayName: z.string().optional().nullable(),
  formattedType: z.string().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  type: z.string().optional().nullable(),
  value: z.string().optional().nullable(),
})

export const peopleV1SchemaEventSchema = z.object({
  date: peopleV1SchemaDateSchema.optional(),
  formattedType: z.string().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  type: z.string().optional().nullable(),
})

export const peopleV1SchemaExternalIdSchema = z.object({
  formattedType: z.string().optional().nullable(),
  metadata: peopleV1SchemaFieldMetadataSchema.optional(),
  type: z.string().optional().nullable(),
  value: z.string().optional().nullable(),
})

export const peopleV1SchemaPersonSchema = z.object({
  addresses: z.array(peopleV1SchemaAddressSchema).optional(),
  ageRange: z.string().optional().nullable(),
  ageRanges: z.array(peopleV1SchemaAgeRangeTypeSchema).optional(),
  biographies: z.array(peopleV1SchemaBiographySchema).optional(),
  birthdays: z.array(peopleV1SchemaBirthdaySchema).optional(),
  braggingRights: z.array(peopleV1SchemaBraggingRightsSchema).optional(),
  calendarUrls: z.array(peopleV1SchemaCalendarUrlSchema).optional(),
  clientData: z.array(peopleV1SchemaClientDataSchema).optional(),
  coverPhotos: z.array(peopleV1SchemaCoverPhotoSchema).optional(),
  emailAddresses: z.array(peopleV1SchemaEmailAddressSchema).optional(),
  etag: z.string().optional().nullable(),
  events: z.array(peopleV1SchemaEventSchema).optional(),
  externalIds: z.array(peopleV1SchemaExternalIdSchema).optional(),
  fileAses: z.array(peopleV1SchemaFileAsSchema).optional(),
  genders: z.array(peopleV1SchemaGenderSchema).optional(),
  imClients: z.array(peopleV1SchemaImClientSchema).optional(),
  interests: z.array(peopleV1SchemaInterestSchema).optional(),
  locales: z.array(peopleV1SchemaLocaleSchema).optional(),
  locations: z.array(peopleV1SchemaLocationSchema).optional(),
  memberships: z.array(peopleV1SchemaMembershipSchema).optional(),
  metadata: peopleV1SchemaPersonMetadataSchema.optional(),
  miscKeywords: z.array(peopleV1SchemaMiscKeywordSchema).optional(),
  names: z.array(peopleV1SchemaNameSchema).optional(),
  nicknames: z.array(peopleV1SchemaNicknameSchema).optional(),
  occupations: z.array(peopleV1SchemaOccupationSchema).optional(),
  organizations: z.array(peopleV1SchemaOrganizationSchema).optional(),
  phoneNumbers: z.array(peopleV1SchemaPhoneNumberSchema).optional(),
  photos: z.array(peopleV1SchemaPhotoSchema).optional(),
  relations: z.array(peopleV1SchemaRelationSchema).optional(),
  relationshipInterests: z
    .array(peopleV1SchemaRelationshipInterestSchema)
    .optional(),
  relationshipStatuses: z
    .array(peopleV1SchemaRelationshipStatusSchema)
    .optional(),
  residences: z.array(peopleV1SchemaResidenceSchema).optional(),
  resourceName: z.string().optional().nullable(),
  sipAddresses: z.array(peopleV1SchemaSipAddressSchema).optional(),
  skills: z.array(peopleV1SchemaSkillSchema).optional(),
  taglines: z.array(peopleV1SchemaTaglineSchema).optional(),
  urls: z.array(peopleV1SchemaUrlSchema).optional(),
  userDefined: z.array(peopleV1SchemaUserDefinedSchema).optional(),
})

export const peopleV1SchemaPersonResponseSchema = z.object({
  httpStatusCode: z.number().optional().nullable(),
  person: peopleV1SchemaPersonSchema.optional(),
  requestedResourceName: z.string().optional().nullable(),
  status: peopleV1SchemaStatusSchema.optional(),
})

export const peopleV1SchemaSearchDirectoryPeopleResponseSchema = z.object({
  nextPageToken: z.string().optional().nullable(),
  people: z.array(peopleV1SchemaPersonSchema).optional(),
  totalSize: z.number().optional().nullable(),
})

export const peopleV1SchemaSearchResultSchema = z.object({
  person: peopleV1SchemaPersonSchema.optional(),
})

export const peopleV1SchemaUpdateContactPhotoResponseSchema = z.object({
  person: peopleV1SchemaPersonSchema.optional(),
})

export const peopleV1SchemaBatchCreateContactsResponseSchema = z.object({
  createdPeople: z.array(peopleV1SchemaPersonResponseSchema).optional(),
})

export const peopleV1SchemaBatchUpdateContactsRequestSchema = z.object({
  contacts: z.record(peopleV1SchemaPersonSchema).optional().nullable(),
  readMask: z.string().optional().nullable(),
  sources: z.array(z.string()).optional().nullable(),
  updateMask: z.string().optional().nullable(),
})

export const peopleV1SchemaBatchUpdateContactsResponseSchema = z.object({
  updateResult: z
    .record(peopleV1SchemaPersonResponseSchema)
    .optional()
    .nullable(),
})

export const peopleV1SchemaContactToCreateSchema = z.object({
  contactPerson: peopleV1SchemaPersonSchema.optional(),
})

export const peopleV1SchemaDeleteContactPhotoResponseSchema = z.object({
  person: peopleV1SchemaPersonSchema.optional(),
})

export const peopleV1SchemaGetPeopleResponseSchema = z.object({
  responses: z.array(peopleV1SchemaPersonResponseSchema).optional(),
})

export const peopleV1SchemaListConnectionsResponseSchema = z.object({
  connections: z.array(peopleV1SchemaPersonSchema).optional(),
  nextPageToken: z.string().optional().nullable(),
  nextSyncToken: z.string().optional().nullable(),
  totalItems: z.number().optional().nullable(),
  totalPeople: z.number().optional().nullable(),
})

export const peopleV1SchemaListDirectoryPeopleResponseSchema = z.object({
  nextPageToken: z.string().optional().nullable(),
  nextSyncToken: z.string().optional().nullable(),
  people: z.array(peopleV1SchemaPersonSchema).optional(),
})

export const peopleV1SchemaListOtherContactsResponseSchema = z.object({
  nextPageToken: z.string().optional().nullable(),
  nextSyncToken: z.string().optional().nullable(),
  otherContacts: z.array(peopleV1SchemaPersonSchema).optional(),
  totalSize: z.number().optional().nullable(),
})

export type TPeopleV1SchemaListOtherContactsResponseSchema = z.infer<
  typeof peopleV1SchemaListOtherContactsResponseSchema
>

export const peopleV1SchemaSearchResponseSchema = z.object({
  results: z.array(peopleV1SchemaSearchResultSchema).optional(),
})
export type TPeopleV1SchemaSearchResponseSchema = z.infer<
  typeof peopleV1SchemaSearchResponseSchema
>

export const peopleV1SchemaBatchCreateContactsRequestSchema = z.object({
  contacts: z.array(peopleV1SchemaContactToCreateSchema).optional(),
  readMask: z.string().optional().nullable(),
  sources: z.array(z.string()).optional().nullable(),
})
