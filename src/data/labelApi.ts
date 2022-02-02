import axios, { AxiosResponse } from 'axios'
import { BASE_API_URL, errorHandeling, fetchToken } from './api'

const labelApi = () => ({
  fetchLabels: async () => {
    try {
      const res: AxiosResponse<any> = await axios.get(
        `${BASE_API_URL}/api/labels`,
        {
          headers: {
            Authorization: fetchToken(),
          },
        }
      )
      return res.data
    } catch (err) {
      return errorHandeling(err)
    }
  },
  fetchSingleLabel: async (id: string) => {
    try {
      const res: AxiosResponse<any> = await axios.get(
        `${BASE_API_URL}/api/label/${id}`,
        {
          headers: {
            Authorization: fetchToken(),
          },
        }
      )
      return res.data
    } catch (err) {
      return errorHandeling(err)
    }
  },
  updateLabel: async (body: any) => {
    try {
      const res: AxiosResponse<any> = await axios.patch(
        `${BASE_API_URL}/api/labels`,
        body,
        {
          headers: {
            Authorization: fetchToken(),
          },
        }
      )
      return res.data
    } catch (err) {
      return errorHandeling(err)
    }
  },
  deleteLabel: async (id: string) => {
    try {
      const res: AxiosResponse<any> = await axios.delete(
        `${BASE_API_URL}/api/labels`,
        {
          data: { id },
          headers: {
            Authorization: fetchToken(),
          },
        }
      )
      return res.data
    } catch (err) {
      return errorHandeling(err)
    }
  },
  createLabel: async (body: any) => {
    try {
      const res: AxiosResponse<any> = await axios.post(
        `${BASE_API_URL}/api/labels`,
        body,
        {
          headers: {
            Authorization: fetchToken(),
          },
        }
      )
      return res
    } catch (err) {
      return errorHandeling(err)
    }
  },
})

export default labelApi
