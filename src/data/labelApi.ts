import axios from 'axios'

import type { ICustomError } from 'store/storeTypes/baseTypes'
import {
  gmailV1SchemaLabelSchema,
  gmailV1SchemaListLabelsResponseSchema,
  TGmailV1SchemaListLabelsResponseSchema,
} from 'store/storeTypes/gmailBaseTypes/gmailTypes'
import type { TGmailV1SchemaLabelSchema } from 'store/storeTypes/labelsTypes'

import { errorHandling, instance } from './api'
import type { TemplateApiResponse } from './api'

const labelApi = () => ({
  fetchLabels: async (): TemplateApiResponse<TGmailV1SchemaListLabelsResponseSchema> => {
    try {
      const res = await instance.get<TGmailV1SchemaListLabelsResponseSchema>(
        `/api/labels`
      )
      gmailV1SchemaListLabelsResponseSchema.parse(res.data)
      return res
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return errorHandling(err)
      }
      // Handle unexpected error
      return err as ICustomError
    }
  },
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
      if (axios.isAxiosError(err)) {
        return errorHandling(err)
      }
      // Handle unexpected error
      return err as ICustomError
    }
  },
  updateLabel: async (
    body: any
  ): TemplateApiResponse<TGmailV1SchemaLabelSchema> => {
    try {
      const res = await instance.patch<TGmailV1SchemaLabelSchema>(
        `/api/labels`,
        body
      )
      gmailV1SchemaLabelSchema.parse(res.data)
      return res
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return errorHandling(err)
      }
      // Handle unexpected error
      return err as ICustomError
    }
  },

  deleteLabel: async (id: string): TemplateApiResponse<''> => {
    try {
      const res = await instance.delete<''>(`/api/labels`, {
        data: { id },
      })
      return res
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return errorHandling(err)
      }
      // Handle unexpected error
      return err as ICustomError
    }
  },
  createLabel: async (
    body: string | TGmailV1SchemaLabelSchema
  ): TemplateApiResponse<TGmailV1SchemaLabelSchema> => {
    try {
      const res = await instance.post<TGmailV1SchemaLabelSchema>(
        `/api/labels`,
        body
      )
      gmailV1SchemaLabelSchema.parse(res.data)
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

export default labelApi
