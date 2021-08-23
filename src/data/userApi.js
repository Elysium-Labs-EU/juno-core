import axios from 'axios'
import { BASE_API_URL, errorHandeling } from './api'

const userApi = () => {
  return {
    authGoogle: async (accessToken) => {
      try {
        const res = await axios.post(`${BASE_API_URL}/auth/google`, accessToken)
        return res
      } catch (err) {
        return errorHandeling(err)
      }
    },

    fetchUser: async () => {
      try {
        const res = await axios.get(`${BASE_API_URL}/api/v1/user`)
        return res
      } catch (err) {
        return errorHandeling(err)
      }
    },
  }
}

export default userApi
