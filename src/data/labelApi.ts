import { gmailV1SchemaLabelSchema } from 'store/storeTypes/gmailBaseTypes/gmailTypes'
import type { TGmailV1SchemaLabelSchema } from 'store/storeTypes/labelsTypes'

import { fetchWrapper } from './api'

const labelApi = () => ({
  fetchSingleLabel: (id: string) =>
    fetchWrapper<TGmailV1SchemaLabelSchema>(
      `/api/label/${id}`,
      {
        method: 'GET'
      },
      gmailV1SchemaLabelSchema
    ),

  updateLabel: (body: { id: string, requestBody: Record<string, unknown> }) =>
    fetchWrapper<TGmailV1SchemaLabelSchema>(
      `/api/labels`,
      {
        method: 'PATCH',
        body
      },
      gmailV1SchemaLabelSchema
    ),

  deleteLabel: (id: string) =>
    fetchWrapper<''>(
      `/api/labels`,
      {
        method: 'DELETE',
        body: { id }
      }
    )
})

export default labelApi
