import axios, { AxiosResponse } from 'axios'
import { BASE_API_URL, errorHandeling } from './api'

const labelApi = () => ({
  // createLabel: (body) => {
  //   console.log('body', body)
  //   return axios
  //     .post(`/api/labels`, body)
  //     .then((res) => res.data)
  //     .then((res) => {
  //       if (res.status === 'success') {

  //       })
  //     .catch((err) => console.log(err))
  // },
  fetchLabel: async () => {
    try {
      const res: AxiosResponse<any> = await axios.get(
        `${BASE_API_URL}/api/labels`
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
        body
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
        body
      )
      return res.data
    } catch (err) {
      return errorHandeling(err)
    }
  },
})

export default labelApi
