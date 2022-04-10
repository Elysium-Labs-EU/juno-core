import axios, { AxiosResponse } from 'axios'
import Session from 'supertokens-auth-react/recipe/session'
import { BASE_API_URL, errorHandling } from './api'

Session.addAxiosInterceptors(axios)

const labelApi = () => ({
  fetchLabels: async () => {
    try {
      const res: AxiosResponse<any> = await axios.get(
        `${BASE_API_URL}/api/labels`
      )
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },
  fetchSingleLabel: async (id: string) => {
    try {
      const res: AxiosResponse<any> = await axios.get(
        `${BASE_API_URL}/api/label/${id}`
      )
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },
  updateLabel: async (body: any) => {
    try {
      const res: AxiosResponse<any> = await axios.patch(
        `${BASE_API_URL}/api/labels`,
        body
      )
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },
  deleteLabel: async (id: string) => {
    try {
      const res: AxiosResponse<any> = await axios.delete(
        `${BASE_API_URL}/api/labels`,
        {
          data: { id },
        }
      )
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },
  createLabel: async (body: any) => {
    try {
      const res: AxiosResponse<any> = await axios.post(
        `${BASE_API_URL}/api/labels`,
        body
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
})

export default labelApi
