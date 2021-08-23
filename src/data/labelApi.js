import axios from 'axios'
import { BASE_API_URL, errorHandeling } from './api'

const labelApi = () => {
  return {
    // createLabel: (body) => {
    //   console.log('body', body)
    //   return axios
    //     .post(`/api/v1/labels`, body)
    //     .then((res) => res.data)
    //     .then((res) => {
    //       if (res.status === 'success') {

    //       })
    //     .catch((err) => console.log(err))
    // },
    fetchLabel: async () => {
      try {
        const res = await axios.get(`${BASE_API_URL}/api/v1/labels`)
        return res.data
      } catch (err) {
        return errorHandeling(err)
      }
    },
    updateLabel: async (body) => {
      console.log('body', body)
      try {
        const res = await axios.patch(`${BASE_API_URL}/api/v1/labels`, body)
        return res.data
      } catch (err) {
        return errorHandeling(err)
      }
    },
    deleteLabel: async (id) => {
      console.log('id', id)
      try {
        const res = await axios.delete(`${BASE_API_URL}/api/v1/labels`, {
          data: { id },
        })
        return res.data
      } catch (err) {
        return errorHandeling(err)
      }
    },
    createDraft: async (body) => {
      console.log('body', body)
      try {
        const res = await axios.post(`${BASE_API_URL}/api/v1/labels`, body)
        return res.data
      } catch (err) {
        return errorHandeling(err)
      }
    },
  }
}

export default labelApi
