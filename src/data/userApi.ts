import axios from 'axios'

import { errorHandling, instance } from 'data/api'
import type { TemplateApiResponse } from 'data/api'
import type { ICustomError } from 'store/storeTypes/baseTypes'
import {
  authenticateClientResponseSchema,
  extendedGmailV1SchemaProfileSchemaSchema,
  getAuthUrlResponseSchema,
} from 'store/storeTypes/gmailBaseTypes/otherTypes'
import type {
  TExtendedGmailV1SchemaProfileSchemaSchema,
  TAuthenticateClientResponseSchema,
  TGetAuthUrlResponseSchema,
} from 'store/storeTypes/gmailBaseTypes/otherTypes'

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
      if (axios.isAxiosError(err)) {
        return errorHandling(err)
      }
      // Handle unexpected error
      return err as ICustomError
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
      if (axios.isAxiosError(err)) {
        return errorHandling(err)
      }
      // Handle unexpected error
      return err as ICustomError
    }
  },
  fetchUser: async (): TemplateApiResponse<TExtendedGmailV1SchemaProfileSchemaSchema> => {
    try {
      const res = await instance.get<TExtendedGmailV1SchemaProfileSchemaSchema>(
        `/api/user`
      )
      extendedGmailV1SchemaProfileSchemaSchema.parse(res.data)
      return res
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return errorHandling(err)
      }
      // Handle unexpected error
      return err as ICustomError
    }
  },
  logoutUser: async (): TemplateApiResponse<any> => {
    try {
      const res = await instance.get<any>(`/api/user/logout`)
      return res
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return errorHandling(err)
      }
      // Handle unexpected error
      return err as ICustomError
    }
  },
})

export default userApi
