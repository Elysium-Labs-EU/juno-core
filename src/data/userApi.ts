import { z } from 'zod'

import { BASE_ARRAY } from 'constants/baseConstants'
import { fetchWrapper } from 'data/api'
import {
  authenticateClientResponseSchema,
  baseCheckSchema,
  extendedGmailV1SchemaProfileSchemaSchema,
  getAuthUrlResponseSchema,
} from 'store/storeTypes/gmailBaseTypes/otherTypes'

const userApi = () => ({
  authGoogle: async (useSession?: boolean) =>
    fetchWrapper(
      '/api/auth/oauth/google/',
      {
        method: 'POST',
        body: {
          useSession,
        },
      },
      getAuthUrlResponseSchema
    ),

  authGoogleCallback: async (body: { code?: string; state?: string }) =>
    fetchWrapper(
      '/api/auth/oauth/google/callback/',
      {
        method: 'POST',
        body,
      },
      authenticateClientResponseSchema
    ),

  fetchUser: async () =>
    fetchWrapper(
      '/api/user',
      {
        method: 'GET',
      },
      extendedGmailV1SchemaProfileSchemaSchema
    ),

  baseCheck: async () =>
    fetchWrapper(
      '/api/base',
      {
        method: 'POST',
        body: { BASE_ARRAY },
      },
      baseCheckSchema
    ),

  logoutUser: async () =>
    fetchWrapper('/api/user/logout', { method: 'GET' }, z.any()),
})

export default userApi
