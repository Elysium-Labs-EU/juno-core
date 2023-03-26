import { gmailV1SchemaLabelSchema } from 'store/storeTypes/gmailBaseTypes/gmailTypes'
import type { TGmailV1SchemaLabelSchema } from 'store/storeTypes/labelsTypes'

import { instance, errorBlockTemplate } from './api'
import type { TemplateApiResponse } from './api'

const labelApi = () => ({
  fetchSingleLabel: async (
    id: string
  ): TemplateApiResponse<TGmailV1SchemaLabelSchema> => {
    try {
      const res = await instance.get<TGmailV1SchemaLabelSchema>(
        `/api/label/${id}`
      )
      gmailV1SchemaLabelSchema.parse(res.data)
      return res
    } catch (err) {
      return errorBlockTemplate(err)
    }
  },
  updateLabel: async (body: {
    id: string
    requestBody: any
  }): TemplateApiResponse<TGmailV1SchemaLabelSchema> => {
    try {
      const res = await instance.patch<TGmailV1SchemaLabelSchema>(
        `/api/labels`,
        body
      )
      const parsedResponse = gmailV1SchemaLabelSchema.parse(res.data)
      return { ...res, data: parsedResponse }
    } catch (err) {
      console.error(err)
      return errorBlockTemplate(err)
    }
  },

  deleteLabel: async (id: string): TemplateApiResponse<''> => {
    try {
      const res = await instance.delete<''>(`/api/labels`, {
        data: { id },
      })
      return res
    } catch (err) {
      return errorBlockTemplate(err)
    }
  },
})

export default labelApi
