import { AxiosResponse } from 'axios'
import { errorHandling, fetchToken, instance } from './api'

const labelApi = () => ({
  fetchLabels: async () => {
    try {
      const res: AxiosResponse<any> = await instance.get(`/api/labels`, {
        headers: {
          Authorization: fetchToken(),
        },
      })
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },
  fetchSingleLabel: async (id: string) => {
    try {
      const res: AxiosResponse<any> = await instance.get(`/api/label/${id}`, {
        headers: {
          Authorization: fetchToken(),
        },
      })
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },
  updateLabel: async (body: any) => {
    try {
      const res: AxiosResponse<any> = await instance.patch(
        `/api/labels`,
        body,
        {
          headers: {
            Authorization: fetchToken(),
          },
        }
      )
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },
  deleteLabel: async (id: string) => {
    try {
      const res: AxiosResponse<any> = await instance.delete(`/api/labels`, {
        data: { id },
        headers: {
          Authorization: fetchToken(),
        },
      })
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },
  createLabel: async (body: any) => {
    try {
      const res: AxiosResponse<any> = await instance.post(`/api/labels`, body, {
        headers: {
          Authorization: fetchToken(),
        },
      })
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
})

export default labelApi
