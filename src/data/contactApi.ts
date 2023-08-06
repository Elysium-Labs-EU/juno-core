import { z } from 'zod'

import { fetchWrapper } from 'data/api'
import { Contact } from 'store/storeTypes/contactsTypes'
import type { TContactState } from 'store/storeTypes/contactsTypes'
import { peopleV1SchemaListOtherContactsResponseSchema } from 'store/storeTypes/gmailBaseTypes/peopleTypes'

interface AllContactsQueryObject {
  readMask: string
  pageSize?: number
  nextPageToken?: string
}

interface QueryContactObject {
  readMask: string
  query: string
}

const contactApi = () => ({
  // TODO: We currently do not use this api endpoint
  getAllContacts: (
    query: AllContactsQueryObject
  ) => fetchWrapper(
    `/api/contacts/`,
    {
      method: 'GET',
      params: {
        readMask: query.readMask,
        pageSize: query.pageSize ?? 1000,
        pageToken: query.nextPageToken ?? undefined,
      },
    },
    peopleV1SchemaListOtherContactsResponseSchema
  ),
  queryContacts: (
    query: QueryContactObject
  ) => fetchWrapper<TContactState['allContacts']>(
    `/api/contact/search/`,
    {
      method: 'GET',
      params: {
        readMask: query.readMask,
        query: query.query,
      },
    },
    z.array(Contact)
  ),
})

export default contactApi
