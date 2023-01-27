import axios from 'axios'

import { errorHandling, instance } from 'data/api'
import type { TemplateApiResponse } from 'data/api'
import type { ICustomError } from 'store/storeTypes/baseTypes'
import {
  peopleV1SchemaListOtherContactsResponseSchema,
  peopleV1SchemaSearchResponseSchema,
} from 'store/storeTypes/gmailBaseTypes/peopleTypes'
import type {
  TPeopleV1SchemaSearchResponseSchema,
  TPeopleV1SchemaListOtherContactsResponseSchema,
} from 'store/storeTypes/gmailBaseTypes/peopleTypes'

interface IAllContactsQueryObject {
  readMask: string
  pageSize?: number
  nextPageToken?: string
}

interface IQueryContactObject {
  readMask: string
  query: string
}

const contactApi = () => ({
  getAllContacts: async (
    query: IAllContactsQueryObject
  ): TemplateApiResponse<TPeopleV1SchemaListOtherContactsResponseSchema> => {
    try {
      const res = await instance.get<TPeopleV1SchemaListOtherContactsResponseSchema>(
        `/api/contacts/`,
        {
          params: {
            readMask: query.readMask,
            pageSize: query.pageSize ?? 1000,
            pageToken: query.nextPageToken ?? undefined,
          },
        }
      )
      peopleV1SchemaListOtherContactsResponseSchema.parse(res.data)
      return res
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return errorHandling(err)
      }
      // Handle unexpected error
      return err as ICustomError
    }
  },
  queryContacts: async (
    query: IQueryContactObject
  ): TemplateApiResponse<TPeopleV1SchemaSearchResponseSchema> => {
    try {
      const res = await instance.get<TPeopleV1SchemaSearchResponseSchema>(
        `/api/contact/search/`,
        {
          params: {
            readMask: query.readMask,
            query: query.query,
          },
        }
      )
      peopleV1SchemaSearchResponseSchema.parse(res.data)
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

export default contactApi
