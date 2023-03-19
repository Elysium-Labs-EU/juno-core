import { BASE_ARRAY } from 'constants/baseConstants'
import { instance } from 'data/api'
import type { TemplateApiResponse } from 'data/api'
import {
  authenticateClientResponseSchema,
  baseCheckSchema,
  extendedGmailV1SchemaProfileSchemaSchema,
  getAuthUrlResponseSchema,
} from 'store/storeTypes/gmailBaseTypes/otherTypes'
import type {
  TBaseCheckSchema,
  TExtendedGmailV1SchemaProfileSchemaSchema,
  TAuthenticateClientResponseSchema,
  TGetAuthUrlResponseSchema,
} from 'store/storeTypes/gmailBaseTypes/otherTypes'

import { errorBlockTemplate } from './api'

const userApi = () => ({
  authGoogle: async (
    noSession?: boolean
  ): TemplateApiResponse<TGetAuthUrlResponseSchema> => {
    try {
      const res = await instance.post<TGetAuthUrlResponseSchema>(
        `/api/auth/oauth/google/`,
        {
          noSession,
        }
      )
      getAuthUrlResponseSchema.parse(res.data)
      return res
    } catch (err) {
      return errorBlockTemplate(err)
    }
  },
  authGoogleCallback: async (body: {
    code?: string
    state?: string
  }): TemplateApiResponse<TAuthenticateClientResponseSchema> => {
    try {
      const res = await instance.post<TAuthenticateClientResponseSchema>(
        `/api/auth/oauth/google/callback/`,
        body
      )
      authenticateClientResponseSchema.parse(res.data)
      return res
    } catch (err) {
      return errorBlockTemplate(err)
    }
  },
  fetchUser:
    async (): TemplateApiResponse<TExtendedGmailV1SchemaProfileSchemaSchema> => {
      try {
        const res =
          await instance.get<TExtendedGmailV1SchemaProfileSchemaSchema>(
            `/api/user`
          )
        extendedGmailV1SchemaProfileSchemaSchema.parse(res.data)
        return res
      } catch (err) {
        return errorBlockTemplate(err)
      }
    },
  baseCheck: async (): TemplateApiResponse<TBaseCheckSchema> => {
    try {
      const res = await instance.post(`/api/base`, { BASE_ARRAY })
      const validatedResponse = baseCheckSchema.parse(res.data)
      return { ...res, data: validatedResponse }
    } catch (err) {
      return errorBlockTemplate(err)
    }
  },
  logoutUser: async (): TemplateApiResponse<any> => {
    try {
      const res = await instance.get<any>(`/api/user/logout`)
      return res
    } catch (err) {
      return errorBlockTemplate(err)
    }
  },
})

export default userApi
