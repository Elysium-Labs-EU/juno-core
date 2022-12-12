import type { AxiosResponse } from 'axios'

import { errorHandling, instance } from './api'

const labelApi = () => ({
  fetchLabels: async () => {
    try {
      const res: AxiosResponse<any> = await instance.get(`/api/labels`)
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },
  fetchSingleLabel: async (id: string) => {
    try {
      const res: AxiosResponse<any> = await instance.get(`/api/label/${id}`)
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },
  updateLabel: async (body: any) => {
    try {
      const res: AxiosResponse<any> = await instance.patch(`/api/labels`, body)
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },
  deleteLabel: async (id: string) => {
    try {
      const res: AxiosResponse<any> = await instance.delete(`/api/labels`, {
        data: { id },
      })
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },
  createLabel: async (body: any) => {
    try {
      const res: AxiosResponse<any> = await instance.post(`/api/labels`, body)
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
})

export default labelApi
